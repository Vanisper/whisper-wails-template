package encoding

import (
	"encoding/base64"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBase64Encode(t *testing.T) {
	assert.Equal(t, "aGVsbG93b3JsZA==", Base64Encode("helloworld"))
	assert.Equal(t, "aGVsbG93b3JsZA", Base64Encode("helloworld", base64.RawStdEncoding))
}

func TestBase64Decode(t *testing.T) {
	assert.Equal(t, "helloworld", Base64Decode("aGVsbG93b3JsZA=="))
	assert.Equal(t, "helloworld", Base64Decode("aGVsbG93b3JsZA", base64.RawStdEncoding))
	assert.Empty(t, Base64Decode("1"))
}
