package file

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIsExist(t *testing.T) {
	assert.True(t, IsExist("./file.go"))
	assert.False(t, IsExist("./file_t.go"))
}

func TestIsFile(t *testing.T) {
	assert.True(t, IsFile("./file.go"))
	assert.False(t, IsFile("./file_t.go"))
}

func TestIsDir(t *testing.T) {
	assert.True(t, IsDir("../xutil"))
	assert.False(t, IsDir("./file.go"))
}

func TestIsImage(t *testing.T) {
	assert.True(t, IsImage("../logo.png"))
	assert.False(t, IsImage("../README.md"))
	assert.False(t, IsImage("../README"))
}
