package utils

import (
	"fmt"
	"strconv"
	"time"
)

func Timestamp10() string {
	timestamp := time.Now().Unix()          // Get the time in seconds
	return strconv.FormatInt(timestamp, 10) // Convert to string
}

func Timestamp13() string {
	return strconv.FormatInt(time.Now().UnixNano()/int64(time.Millisecond), 10)
}

func Timestamp15() string {
	timestamp := time.Now().UnixNano() // 获取纳秒时间戳
	timestampStr := strconv.FormatInt(timestamp, 10)
	fmt.Println(len(timestampStr[:15]))
	return timestampStr[:15] // 保留前15位
}
