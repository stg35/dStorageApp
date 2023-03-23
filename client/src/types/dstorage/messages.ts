import { EncodeObject, GeneratedType } from "@cosmjs/proto-signing"
import {
    MsgCreateFile,
    MsgCreateFileResponse,
} from "../generated/dstorage/tx"

export const typeUrlMsgCreateFile = "/dfsapp.dstorage.dstorage.MsgCreateFile"
export const typeUrlMsgCreateFileResponse = "/dfsapp.dstorage.dstorage.MsgCreateFileResponse"

export const dstorageTypes: ReadonlyArray<[string, GeneratedType]> = [
    [typeUrlMsgCreateFile, MsgCreateFile],
    [typeUrlMsgCreateFileResponse, MsgCreateFileResponse],
]

export interface MsgCreateFileEncodeObject extends EncodeObject {
    readonly typeUrl: "/dfsapp.dstorage.dstorage.MsgCreateFile"
    readonly value: Partial<MsgCreateFile>
}

export function isMsgCreateFileEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgCreateFileEncodeObject {
    return (encodeObject as MsgCreateFileEncodeObject).typeUrl === typeUrlMsgCreateFile
}

export interface MsgCreateFileResponseEncodeObject extends EncodeObject {
    readonly typeUrl: "/dfsapp.dstorage.dstorage.MsgCreateFileResponse"
    readonly value: Partial<MsgCreateFileResponse>
}

export function isMsgCreateFileResponseEncodeObject(
    encodeObject: EncodeObject,
): encodeObject is MsgCreateFileResponseEncodeObject {
    return (encodeObject as MsgCreateFileResponseEncodeObject).typeUrl === typeUrlMsgCreateFileResponse
}