package file

import (
	"path"
	"strings"
)

// GetFileName ...
func GetFileName(filepath string) string {
	return path.Base(filepath)
}

// GetFileNameWithoutExt ...
func GetFileNameWithoutExt(filepath string) string {
	return strings.ReplaceAll(path.Base(filepath), path.Ext(filepath), "")
}

// GetFilePathWithoutExt ...
func GetFilePathWithoutExt(filepath string) string {
	return GetFileDir(filepath) + "/" + GetFileNameWithoutExt(filepath)
}

// GetFileDir ...
func GetFileDir(filepath string) string {
	return path.Dir(filepath)
}

// GetFileExt ...
func GetFileExt(file string) string {
	return strings.ToLower(strings.Trim(path.Ext(file), "."))
}
