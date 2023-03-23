/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "dfsapp.dstorage.dstorage";

export interface StoredFile {
  index: string;
  content: string;
  format: string;
  name: string;
}

const baseStoredFile: object = { index: "", content: "", format: "", name: "" };

export const StoredFile = {
  encode(message: StoredFile, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
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

  decode(input: Reader | Uint8Array, length?: number): StoredFile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStoredFile } as StoredFile;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
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

  fromJSON(object: any): StoredFile {
    const message = { ...baseStoredFile } as StoredFile;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
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

  toJSON(message: StoredFile): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.content !== undefined && (obj.content = message.content);
    message.format !== undefined && (obj.format = message.format);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<StoredFile>): StoredFile {
    const message = { ...baseStoredFile } as StoredFile;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
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
