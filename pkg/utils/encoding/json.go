package encoding

import (
	"encoding/json"
)

// JSONEncode  将对象转换为json字符串
func JSONEncode(v interface{}) string {
	b, err := json.MarshalIndent(v, "", "\t")
	if err != nil {
		panic(err)
	}
	return string(b)
}

// JSONDecode 将json字符串转换为对象
func JSONDecode(s string, dst interface{}) error {
	return json.Unmarshal([]byte(s), dst)
}
