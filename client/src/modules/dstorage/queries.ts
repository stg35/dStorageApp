import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate"
import { assert } from "@cosmjs/utils"
import Long from "long"
import {
    QueryAllStoredFileResponse,
    QueryClientImpl,
    QueryGetStoredFileResponse,
} from "../../types/generated/dstorage/query"
import { StoredFile } from "../../types/generated/dstorage/stored_file"
import { SystemInfo } from "../../types/generated/dstorage/system_info"
import { PageResponse } from "../../types/generated/cosmos/base/query/v1beta1/pagination"

export interface AllStoredFileResponse {
    storedGames: StoredFile[]
    pagination?: PageResponse
}

export interface DstorageExtension {
    readonly checkers: {
        readonly getSystemInfo: () => Promise<SystemInfo>
        readonly getStoredFile: (index: string) => Promise<StoredFile | undefined>
        readonly getAllStoredFiles: (
            key: Uint8Array,
            offset: Long,
            limit: Long,
            countTotal: boolean,
        ) => Promise<AllStoredFileResponse>
    }
}

export function setupDstorageExtension(base: QueryClient): DstorageExtension {
    const rpc = createProtobufRpcClient(base)
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc)

    return {
        checkers: {
            getSystemInfo: async (): Promise<SystemInfo> => {
                const { SystemInfo } = await queryService.SystemInfo({})
                assert(SystemInfo)
                return SystemInfo
            },
            getStoredFile: async (index: string): Promise<StoredFile | undefined> => {
                const response: QueryGetStoredFileResponse = await queryService.StoredFile({
                    index: index,
                })
                return response.storedFile
            },
            getAllStoredFiles: async (
                key: Uint8Array,
                offset: Long,
                limit: Long,
                countTotal: boolean,
            ): Promise<AllStoredFileResponse> => {
                const response: QueryAllStoredFileResponse = await queryService.StoredFileAll({
                    pagination: {
                        key: key,
                        offset: offset,
                        limit: limit,
                        countTotal: countTotal,
                        reverse: false,
                    },
                })
                return {
                    storedGames: response.storedFile,
                    pagination: response.pagination,
                }
            }
        },
    }
}