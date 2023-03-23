import { IFileInfo } from "../../sharedTypes"
import { DstorageSigningStargateClient } from "../../dstorage_signingstargateclient"
import { DstorageStargateClient } from "../../dstorage_stargateclient"
import Long from "long"
import { storedToFileInfo } from "./file"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { Log } from "@cosmjs/stargate/build/logs"
import { getCreateFileEvent, getCreatedFileId } from "./events"


declare module "../../dstorage_stargateclient" {
    interface DstorageStargateClient {
        getGuiFiles(): Promise<IFileInfo[]>
        getGuiFile(index: string): Promise<IFileInfo | undefined>
    }
}

declare module "../../dstorage_signingstargateclient" {
    interface DstorageSigningStargateClient {
        createGuiFile(creator: string, name: string, content: string, format: string): Promise<string>
    }
}

DstorageStargateClient.prototype.getGuiFiles = async function (): Promise<IFileInfo[]> {
    return (
        await this.dstorageQueryClient!.checkers.getAllStoredFiles(
            Uint8Array.from([]),
            Long.ZERO,
            Long.fromNumber(20),
            true,
        )
    ).storedFiles.map(storedToFileInfo)
}

DstorageSigningStargateClient.prototype.createGuiFile = async function (
    creator: string,
    name: string,
    content: string,
    format: string
): Promise<string> {
    const result: DeliverTxResponse = await this.createFile(creator, content, format, name)
    const logs: Log[] = JSON.parse(result.rawLog!)
    return getCreatedFileId(getCreateFileEvent(logs[0])!)
}