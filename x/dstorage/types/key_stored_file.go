package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// StoredFileKeyPrefix is the prefix to retrieve all StoredFile
	StoredFileKeyPrefix = "StoredFile/value/"
)

// StoredFileKey returns the store key to retrieve a StoredFile from the index fields
func StoredFileKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
