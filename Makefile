build-all:
	GOOS=linux GOARCH=amd64 go build -o ./build/dstoraged-linux-amd64 ./cmd/dstoraged/main.go
	GOOS=linux GOARCH=arm64 go build -o ./build/dstoraged-linux-arm64 ./cmd/dstoraged/main.go
	GOOS=darwin GOARCH=amd64 go build -o ./build/dstoraged-darwin-amd64 ./cmd/dstoraged/main.go
	GOOS=darwin GOARCH=arm64 go build -o ./build/dstoraged-darwin-arm64 ./cmd/dstoraged/main.go

do-checksum:
	cd build && sha256sum \
		dstoraged-linux-amd64 dstoraged-linux-arm64 \
		dstoraged-darwin-amd64 dstoraged-darwin-arm64 \
		> dstorage_checksum

build-with-checksum: build-all do-checksum

.PHONY: build-with-checksum do-checksum build-all