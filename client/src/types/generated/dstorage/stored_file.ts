/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dfsapp.dstorage.dstorage";

export interface StoredFile {
  index: string;
  content: string;
  format: string;
  name: string;
}

function createBaseStoredFile(): StoredFile {
  return { index: "", content: "", format: "", name: "" };
}

export const StoredFile = {
  encode(
    message: StoredFile,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StoredFile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStoredFile();
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
    return {
      index: isSet(object.index) ? String(object.index) : "",
      content: isSet(object.content) ? String(object.content) : "",
      format: isSet(object.format) ? String(object.format) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: StoredFile): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.content !== undefined && (obj.content = message.content);
    message.format !== undefined && (obj.format = message.format);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StoredFile>, I>>(
    object: I
  ): StoredFile {
    const message = createBaseStoredFile();
    message.index = object.index ?? "";
    message.content = object.content ?? "";
    message.format = object.format ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

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
