package filemanage

import (
	"os"
)

var (
    newFile *os.File
    err     error
)

func CreateFile(path, content, format, name string) {
	pathFile := path + name + "." + format
	newFile, err = os.Create(pathFile)
	if err != nil {
		panic("Cannot create a file")
	}
	defer newFile.Close()

	_, err := newFile.Write([]byte(content))
	if err != nil {
		panic("Cannot write to file")
	}
}