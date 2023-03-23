export interface LatestBlockStatus {
    height: number
}

export interface DbStatus {
    block: LatestBlockStatus
}

export interface FileInfo {
    content: string
    format: string
    name: string
}

export interface FilesInfo {
    [fileId: string]: FileInfo
}

export interface DbType {
    status: DbStatus
    files: FilesInfo
}