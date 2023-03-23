import { QueryClient, StargateClient, StargateClientOptions } from "@cosmjs/stargate"
import { Tendermint34Client, BroadcastTxSyncResponse } from "@cosmjs/tendermint-rpc"
import { DstorageExtension, setupDstorageExtension } from "./modules/dstorage/queries"

export class DstorageStargateClient extends StargateClient {
    public readonly dstorageQueryClient: DstorageExtension | undefined

    public static async connect(
        endpoint: string,
        options?: StargateClientOptions,
    ): Promise<DstorageStargateClient> {
        const tmClient = await Tendermint34Client.connect(endpoint)
        return new DstorageStargateClient(tmClient, options)
    }

    protected constructor(tmClient: Tendermint34Client | undefined, options: StargateClientOptions = {}) {
        super(tmClient, options)
        if (tmClient) {
            this.dstorageQueryClient = QueryClient.withExtensions(tmClient, setupDstorageExtension)
        }
    }

    public async tmBroadcastTxSync(tx: Uint8Array): Promise<BroadcastTxSyncResponse> {
        return this.forceGetTmClient().broadcastTxSync({ tx })
    }
}