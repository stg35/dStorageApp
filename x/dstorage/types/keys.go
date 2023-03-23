package types

const (
	// ModuleName defines the module name
	ModuleName = "dstorage"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_dstorage"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	SystemInfoKey = "SystemInfo-value-"
)

const (
	FileCreatedEventType      = "new-file-created" // Indicates what event type to listen to
	FileCreatedEventCreator   = "creator"          // Subsidiary information
	FileCreatedEventFileIndex = "file-index"       // What game is relevant
	FileCreatedEventContent   = "content"          // Is it relevant to me?
	FileCreatedEventFormat    = "format"           // Is it relevant to me?
	FileCreatedEventName      = "name"
)
