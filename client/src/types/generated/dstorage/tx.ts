/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dfsapp.dstorage.dstorage";

export interface MsgCreateFile {
  creator: string;
  content: string;
  format: string;
  name: string;
}

export interface MsgCreateFileResponse {
  fileIndex: string;
}

function createBaseMsgCreateFile(): MsgCreateFile {
  return { creator: "", content: "", format: "", name: "" };
}

export const MsgCreateFile = {
  encode(
    message: MsgCreateFile,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.format !== "") {
      writer.uint32(26).string(message.format);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateFile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.content = reader.string();
          break;
        case 3:
          message.format = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateFile {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      content: isSet(object.content) ? String(object.content) : "",
      format: isSet(object.format) ? String(object.format) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: MsgCreateFile): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.content !== undefined && (obj.content = message.content);
    message.format !== undefined && (obj.format = message.format);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateFile>, I>>(
    object: I
  ): MsgCreateFile {
    const message = createBaseMsgCreateFile();
    message.creator = object.creator ?? "";
    message.content = object.content ?? "";
    message.format = object.format ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMsgCreateFileResponse(): MsgCreateFileResponse {
  return { fileIndex: "" };
}

export const MsgCreateFileResponse = {
  encode(
    message: MsgCreateFileResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fileIndex !== "") {
      writer.uint32(10).string(message.fileIndex);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateFileResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateFileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileIndex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateFileResponse {
    return {
      fileIndex: isSet(object.fileIndex) ? String(object.fileIndex) : "",
    };
  },

  toJSON(message: MsgCreateFileResponse): unknown {
    const obj: any = {};
    message.fileIndex !== undefined && (obj.fileIndex = message.fileIndex);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateFileResponse>, I>>(
    object: I
  ): MsgCreateFileResponse {
    const message = createBaseMsgCreateFileResponse();
    message.fileIndex = object.fileIndex ?? "";
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateFile(request: MsgCreateFile): Promise<MsgCreateFileResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateFile = this.CreateFile.bind(this);
  }
  CreateFile(request: MsgCreateFile): Promise<MsgCreateFileResponse> {
    const data = MsgCreateFile.encode(request).finish();
    const promise = this.rpc.request(
      "dfsapp.dstorage.dstorage.Msg",
      "CreateFile",
      data
    );
    return promise.then((data) =>
      MsgCreateFileResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
