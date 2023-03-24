import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DstorageStargateClient } from '../dstorage_stargateclient';
import { DstorageSigningStargateClient } from '../dstorage_signingstargateclient';
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { getDstorageChainInfo, dstorageChainId } from '../types/dstorage/chain';
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import {} from "../types/dstorage/extensions-gui"

declare global {
    interface Window extends KeplrWindow {}
}

export interface IMessage {
    name: string;
    content: string;
    format: string;
}

export interface FormProps {
    rpcUrl: string;
}

interface CreatorInfo {
    creator: string
    signingClient: DstorageSigningStargateClient
}

export const BasicForm = (({ rpcUrl }: FormProps): JSX.Element => {
    const [client, setClient] = useState<DstorageStargateClient | undefined>();

    const [creatorClient, setCreatorClient] = useState<string>('');
    const [signingClient, setSigningClient] = useState<DstorageSigningStargateClient | undefined>();

    const [fileName, setFileName] = useState<string>('');
    const [fileContent, setFileContent] = useState<string>('');
    const [fileFormat, setFileFormat] = useState<string>('');

    const [message, setMessage] = useState<IMessage>();

    const getStargateClient = async (): Promise<DstorageStargateClient> => {
        const clientConnection: DstorageStargateClient =
            client ?? (await DstorageStargateClient.connect(rpcUrl));
        if (!client) setClient(clientConnection);
        return clientConnection;
    }

    const getSigningStargateClient = async (): Promise<CreatorInfo> => {
        if (creatorClient && signingClient)
            return {
                creator: creatorClient,
                signingClient: signingClient,
            }
        const { keplr } = window
        if (!keplr) {
            alert("You need to install Keplr")
            throw new Error("You need to install Keplr")
        }
        await keplr.experimentalSuggestChain(getDstorageChainInfo())
        const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(dstorageChainId)
        const creator = (await offlineSigner.getAccounts())[0].address
        const client: DstorageSigningStargateClient = await DstorageSigningStargateClient.connectWithSigner(
            rpcUrl,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString("1stake")
            },
        )
        setCreatorClient(creator)
        setSigningClient(client)
        return { creator: creator, signingClient: client }
    }

    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();

        console.log(fileName, fileContent, fileFormat);

        setMessage({
            name: fileName,
            content: fileContent,
            format: fileFormat
        });

        const { creator, signingClient } = await getSigningStargateClient();
        const index: string = await signingClient.createGuiFile(creator, message!.name, message!.content, message!.format);
        console.log(`New file with index ${index} created`);
    }

    useEffect(() => console.log(message), [message]);

    return(
        <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="fileName">Название файла</Form.Label>
                    <Form.Control
                        id="fileName"
                        name="fileName"
                        type="text"
                        placeholder="Введите название файла"
                        onChange={event => setFileName(event.target.value)}
                        value={fileName}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Содержимое файла</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3}
                        onChange={event => setFileContent(event.target.value)}
                        value={fileContent}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select 
                        aria-label="File format select"
                        onChange={event => setFileFormat(event.target.value)}
                    >
                        <option>Выберите формат</option>
                        <option value="txt">txt</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Отправить
                </Button>
        </Form>
    )
});