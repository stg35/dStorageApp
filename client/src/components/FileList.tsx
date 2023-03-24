import { useEffect, useState } from "react"
import {} from "../types/dstorage/extensions-gui"
import QueryString from "query-string"
import { DstorageStargateClient } from "../dstorage_stargateclient"
import { IFileInfo } from "../sharedTypes"
import { ListGroup } from "react-bootstrap"
import "./FileList.css"

export interface FileListProps {
    rpcUrl: string
}

export const FileList = ({rpcUrl}: FileListProps): JSX.Element => {
    const [files, setFiles] = useState<IFileInfo[]>()
    const [client, setClient] = useState<DstorageStargateClient | undefined>();

    useEffect(() => {
        const asyncDidMount = async (): Promise<void> => {
            const fs: IFileInfo[] = await (await getStargateClient()).getGuiFiles()
            setFiles(fs)
        }

        asyncDidMount().catch(console.error)

    }, []);

    const getStargateClient = async (): Promise<DstorageStargateClient> => {
        const clientConnection: DstorageStargateClient =
            client ?? (await DstorageStargateClient.connect(rpcUrl));
        if (!client) setClient(clientConnection);
        return clientConnection;
    }

    return(
        <>
            <div className="title">Список файлов</div>
            <ListGroup>
                {files?.map((file) => (<ListGroup.Item key={file.index}>{file.name}</ListGroup.Item>))}
            </ListGroup>
        </>
    )
}