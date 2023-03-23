import { Attribute, Event, Log } from "@cosmjs/stargate/build/logs"

export type FileCreatedEvent = Event

export const getCreateFileEvent = (log: Log): FileCreatedEvent | undefined =>
    log.events!.find((event: Event) => event.type === "new-file-created")

export const getCreatedFileId = (createdFileEvent: FileCreatedEvent): string =>
    createdFileEvent.attributes.find((attribute: Attribute) => attribute.key == "file-index")!.value