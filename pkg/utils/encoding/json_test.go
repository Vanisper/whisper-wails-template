package encoding

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type js struct {
	Title string
	Text  string
}

func TestJSONEncode(t *testing.T) {
	s := &js{
		Title: "AAA",
		Text:  "BBB",
	}
	assert.JSONEq(t, `{"Text":"BBB","Title":"AAA"}`, JSONEncode(s))
}

func TestJSONDecode(t *testing.T) {
	s := &js{}
	assert.Nil(t, JSONDecode(`{"Text":"BBB","Title":"AAA"}`, s))
	assert.Equal(t, "AAA", s.Title)
}
