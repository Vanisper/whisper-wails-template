package encoding

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUrlEncode(t *testing.T) {
	assert.Equal(t, "http%3A%2F%2Ft.cn", URLEncode("http://t.cn"))
}

func TestUrlDecode(t *testing.T) {
	assert.Equal(t, "http://t.cn", URLDecode("http%3A%2F%2Ft.cn"))
	assert.Empty(t, URLDecode("%"))
}
