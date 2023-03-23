/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "dfsapp.dstorage.dstorage";

export interface SystemInfo {
  nextId: number;
  newFileIds: number[];
}

const baseSystemInfo: object = { nextId: 0, newFileIds: 0 };

export const SystemInfo = {
  encode(message: SystemInfo, writer: Writer = Writer.create()): Writer {
    if (message.nextId !== 0) {
      writer.uint32(8).uint64(message.nextId);
    }
    writer.uint32(18).fork();
    for (const v of message.newFileIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SystemInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSystemInfo } as SystemInfo;
    message.newFileIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.newFileIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.newFileIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SystemInfo {
    const message = { ...baseSystemInfo } as SystemInfo;
    message.newFileIds = [];
    if (object.nextId !== undefined && object.nextId !== null) {
      message.nextId = Number(object.nextId);
    } else {
      message.nextId = 0;
    }
    if (object.newFileIds !== undefined && object.newFileIds !== null) {
      for (const e of object.newFileIds) {
        message.newFileIds.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: SystemInfo): unknown {
    const obj: any = {};
    message.nextId !== undefined && (obj.nextId = message.nextId);
    if (message.newFileIds) {
      obj.newFileIds = message.newFileIds.map((e) => e);
    } else {
      obj.newFileIds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SystemInfo>): SystemInfo {
    const message = { ...baseSystemInfo } as SystemInfo;
    message.newFileIds = [];
    if (object.nextId !== undefined && object.nextId !== null) {
      message.nextId = object.nextId;
    } else {
      message.nextId = 0;
    }
    if (object.newFileIds !== undefined && object.newFileIds !== null) {
      for (const e of object.newFileIds) {
        message.newFileIds.push(e);
      }
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
