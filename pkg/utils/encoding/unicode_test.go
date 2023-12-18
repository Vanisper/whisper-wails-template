package encoding

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUnicodeEncode(t *testing.T) {
	assert.Equal(t, `\u4f60\u597d`, UnicodeEncode("你好"))
}

func TestUnicodeDecode(t *testing.T) {
	assert.Equal(t, "你好", UnicodeDecode("\\u4f60\\u597d"))
	assert.Empty(t, UnicodeDecode("\\u4f60\\u597d\\u-"))
}
