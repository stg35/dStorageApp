import { sha256 } from "@cosmjs/crypto"
import { toHex } from "@cosmjs/encoding"
import { Block, IndexedTx } from "@cosmjs/stargate"
import { ABCIMessageLog, Attribute, StringEvent } from "cosmjs-types/cosmos/base/abci/v1beta1/abci"
import { config } from "dotenv"
import express, { Express, Request, Response } from "express"
import { writeFile } from "fs/promises"
import { Server } from "http"
import _ from "../../environment"
import { StoredFile } from "../types/generated/dstorage/stored_file"
import { IndexerStargateClient } from "./indexer_stargateclient"
import { DbType, FileInfo } from "./types"

config()

export const createIndexer = async () => {
    const port = "3001"
    const dbFile = `${__dirname}/db.json`
    const db: DbType = require(dbFile)
    const fs = require('fs');
    const pollIntervalMs = 5_000 // 5 seconds
    let timer: NodeJS.Timer | undefined
    let client: IndexerStargateClient

    const app: Express = express()
    app.get("/", (req: Request, res: Response) => {
        res.send({
            error: "Not implemented",
        })
    })

    app.get("/status", (req: Request, res: Response) => {
        res.json({
            block: {
                height: db.status.block.height,
            },
        })
    })

    app.get("/files/:fileId", (req: Request, res: Response) => {
        res.json({
            fileInfo: db.files[req.params.fileId],
        })
    })

    // app.get("/players/:playerAddress/gameIds", (req: Request, res: Response) => {
    //     res.json(db.players[req.params.playerAddress]?.gameIds ?? [])
    // })

    // app.patch("/games/:gameId", async (req: Request, res: Response) => {
    //     const found = await patchGame(req.params.gameId)
    //     if (!found) res.status(404)
    //     else {
    //         res.json({
    //             result: "Thank you",
    //         })
    //     }
    // })

    const saveDb = async () => {
        await writeFile(dbFile, JSON.stringify(db, null, 4))
    }

    const init = async () => {
        client = await IndexerStargateClient.connect(process.env.RPC_URL)
        console.log("Connected to chain-id:", await client.getChainId())
        setTimeout(poll, 1)
    }

    const poll = async () => {
        const currentHeight = await client.getHeight()
        if (db.status.block.height <= currentHeight - 100)
            console.log(`Catching up ${db.status.block.height}..${currentHeight}`)
        while (db.status.block.height < currentHeight) {
            const processing = db.status.block.height + 1
            process.stdout.cursorTo(0)
            // Get the block
            const block: Block = await client.getBlock(processing)
            process.stdout.write(`Handling block: ${processing} with ${block.txs.length} txs`)
            await handleBlock(block)
            db.status.block.height = processing
        }
        await saveDb()
        timer = setTimeout(poll, pollIntervalMs)
    }

    const handleBlock = async (block: Block) => {
        if (0 < block.txs.length) console.log("")
        let txIndex = 0
        while (txIndex < block.txs.length) {
            const txHash: string = toHex(sha256(block.txs[txIndex])).toUpperCase()
            const indexed: IndexedTx | null = await client.getTx(txHash)
            if (!indexed) throw new Error(`Could not find indexed tx: ${txHash}`)
            await handleTx(indexed)
            txIndex++
        }
        const events: StringEvent[] = await client.getEndBlockEvents(block.header.height)
        if (0 < events.length) console.log("")
        await handleEvents(events)
    }

    const handleTx = async (indexed: IndexedTx) => {
        const rawLog: any = JSON.parse(indexed.rawLog)
        const events: StringEvent[] = rawLog.flatMap((log: ABCIMessageLog) => log.events)
        await handleEvents(events)
    }

    const handleEvents = async (events: StringEvent[]): Promise<void> => {
        try {
            let eventIndex = 0
            while (eventIndex < events.length) {
                await handleEvent(events[eventIndex])
                eventIndex++
            }
        } catch (e) {
            // Skipping if the handling failed. Most likely the transaction failed.
        }
    }

    const handleEvent = async (event: StringEvent): Promise<void> => {
        if (event.type == "new-file-created") {
            await handleEventCreate(event)
        }
    }

    const getAttributeValueByKey = (attributes: Attribute[], key: string): string | undefined => {
        return attributes.find((attribute: Attribute) => attribute.key === key)?.value
    }

    const handleEventCreate = async (event: StringEvent): Promise<void> => {
        const newId: string | undefined = getAttributeValueByKey(event.attributes, "file-index")
        if (!newId) throw new Error(`Create event missing file-index`)
        const content: string | undefined = getAttributeValueByKey(event.attributes, "content")
        if (!content) throw new Error(`Create event missing content`)
        const format: string | undefined = getAttributeValueByKey(event.attributes, "format")
        if (!format) throw new Error(`Create event missing format`)
        const name: string | undefined = getAttributeValueByKey(event.attributes, "name")
        if (!format) throw new Error(`Create event missing name`)
        console.log(`New game: ${newId}, content: ${content}, format: ${format}, name: ${name}`)
        db.files[newId] = {
            content: content,
            format: format,
            name: name ?? 'default',
        }

        fs.writeFile(`${name}.${format}`, content, function (err: Error) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    }

    process.on("SIGINT", () => {
        if (timer) clearTimeout(timer)
        saveDb()
            .then(() => {
                console.log(`${dbFile} saved`)
            })
            .catch(console.error)
            .finally(() => {
                server.close(() => {
                    console.log("server closed")
                    process.exit(0)
                })
            })
    })

    const server: Server = app.listen(port, () => {
        init()
            .catch(console.error)
            .then(() => {
                console.log(`\nserver started at http://localhost:${port}`)
            })
    })
}