package encoding

import (
	"net/url"
)

// URLEncode ...
func URLEncode(s string) string {
	return url.QueryEscape(s)
}

// URLDecode ...
func URLDecode(s string) string {
	resp, err := url.QueryUnescape(s)
	if err != nil {
		return ""
	}
	return resp
}
