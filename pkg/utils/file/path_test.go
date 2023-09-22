package file

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPath(t *testing.T) {
	filepath := "/home/data/logo.png"

	assert.Equal(t, "logo.png", GetFileName(filepath))
	assert.Equal(t, "logo", GetFileNameWithoutExt(filepath))
	assert.Equal(t, "/home/data", GetFileDir(filepath))
	assert.Equal(t, "/home/data/logo", GetFilePathWithoutExt(filepath))
	assert.Equal(t, "png", GetFileExt(filepath))
}
