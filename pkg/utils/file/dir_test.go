package file

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDir(t *testing.T) {
	assert.NotEmpty(t, GetCurrentDir())
	assert.NotEmpty(t, GetHomeDir())

	assert.Equal(t, 8, len(ListFiles("./", "")))
	assert.Less(t, 0, len(ListFiles("../", "is", true)))
	assert.Equal(t, 0, len(ListFiles("./aaa", "")))
}
