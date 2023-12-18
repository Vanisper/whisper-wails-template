package encoding

import (
	"fmt"
	"strconv"
	"strings"
)

// UnicodeEncode ...
func UnicodeEncode(s string) string {
	quoted := strconv.QuoteToASCII(s)
	return quoted[1 : len(quoted)-1]
}

// UnicodeDecode ...
func UnicodeDecode(s string) string {
	res := ""
	for _, v := range strings.Split(s, "\\u") {
		if len(v) < 1 {
			continue
		}
		vv, err := strconv.ParseInt(v, 16, 32)
		if err != nil {
			return ""
		}
		res += fmt.Sprintf("%c", vv)
	}
	return res
}
