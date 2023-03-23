import { IFileInfo } from "../../sharedTypes"
import { StoredFile } from "../generated/dstorage/stored_file"

export const storedToFileInfo = (file: StoredFile): IFileInfo => {
    return {
        name: file.name,
        content: file.content,
        format: file.format,
        index: parseInt(file.index, 10)
    }
}