import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing"
import {
    defaultRegistryTypes,
    DeliverTxResponse,
    QueryClient,
    SigningStargateClient,
    SigningStargateClientOptions,
    StdFee,
} from "@cosmjs/stargate"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"
import Long from "long"
import { DstorageExtension, setupDstorageExtension } from "./modules/dstorage/queries"
import {
    dstorageTypes,
    MsgCreateFileEncodeObject,
    typeUrlMsgCreateFile,
} from "./types/dstorage/messages"

export const dstorageDefaultRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    ...defaultRegistryTypes,
    ...dstorageTypes,
]

function createDefaultRegistry(): Registry {
    return new Registry(dstorageDefaultRegistryTypes)
}

export class DstorageSigningStargateClient extends SigningStargateClient {
    public readonly dstorageQueryClient: DstorageExtension | undefined

    public static async connectWithSigner(
        endpoint: string,
        signer: OfflineSigner,
        options: SigningStargateClientOptions = {},
    ): Promise<DstorageSigningStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new DstorageSigningStargateClient(tmClient, signer, {
            registry: createDefaultRegistry(),
            ...options,
        })
    }

    protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningStargateClientOptions,
    ) {
        super(tmClient, signer, options)
        if (tmClient) {
            this.dstorageQueryClient = QueryClient.withExtensions(tmClient, setupDstorageExtension)
        }
    }

    public async createFile(
        creator: string,
        content: string,
        format: string,
        name: string,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const createMsg: MsgCreateFileEncodeObject = {
            typeUrl: typeUrlMsgCreateFile,
            value: {
                creator: creator,
                content: content,
                format: format,
                name: name
            },
        }
        return this.signAndBroadcast(creator, [createMsg], "auto", memo)
    }
}