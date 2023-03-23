/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

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

const baseMsgCreateFile: object = {
  creator: "",
  content: "",
  format: "",
  name: "",
};

export const MsgCreateFile = {
  encode(message: MsgCreateFile, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): MsgCreateFile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateFile } as MsgCreateFile;
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
    const message = { ...baseMsgCreateFile } as MsgCreateFile;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = "";
    }
    if (object.format !== undefined && object.format !== null) {
      message.format = String(object.format);
    } else {
      message.format = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgCreateFile): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.content !== undefined && (obj.content = message.content);
    message.format !== undefined && (obj.format = message.format);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateFile>): MsgCreateFile {
    const message = { ...baseMsgCreateFile } as MsgCreateFile;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = "";
    }
    if (object.format !== undefined && object.format !== null) {
      message.format = object.format;
    } else {
      message.format = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgCreateFileResponse: object = { fileIndex: "" };

export const MsgCreateFileResponse = {
  encode(
    message: MsgCreateFileResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.fileIndex !== "") {
      writer.uint32(10).string(message.fileIndex);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateFileResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateFileResponse } as MsgCreateFileResponse;
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
    const message = { ...baseMsgCreateFileResponse } as MsgCreateFileResponse;
    if (object.fileIndex !== undefined && object.fileIndex !== null) {
      message.fileIndex = String(object.fileIndex);
    } else {
      message.fileIndex = "";
    }
    return message;
  },

  toJSON(message: MsgCreateFileResponse): unknown {
    const obj: any = {};
    message.fileIndex !== undefined && (obj.fileIndex = message.fileIndex);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateFileResponse>
  ): MsgCreateFileResponse {
    const message = { ...baseMsgCreateFileResponse } as MsgCreateFileResponse;
    if (object.fileIndex !== undefined && object.fileIndex !== null) {
      message.fileIndex = object.fileIndex;
    } else {
      message.fileIndex = "";
    }
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
  }
  CreateFile(request: MsgCreateFile): Promise<MsgCreateFileResponse> {
    const data = MsgCreateFile.encode(request).finish();
    const promise = this.rpc.request(
      "dfsapp.dstorage.dstorage.Msg",
      "CreateFile",
      data
    );
    return promise.then((data) =>
      MsgCreateFileResponse.decode(new Reader(data))
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

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
