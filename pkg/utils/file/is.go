package file

import (
	"bufio"
	"image"
	_ "image/gif"  // ...
	_ "image/jpeg" // ...
	_ "image/png"  // ...
	"os"
)

// IsExist ...
func IsExist(filepath string) bool {
	_, err := os.Stat(filepath)
	return err == nil || os.IsExist(err)
}

// IsFile ...
func IsFile(filepath string) bool {
	file, err := os.Stat(filepath)
	return err == nil && !file.IsDir()
}

// IsDir ...
func IsDir(filepath string) bool {
	file, err := os.Stat(filepath)
	return err == nil && file.IsDir()
}

// IsImage ...
func IsImage(filepath string) bool {
	file, err := os.Open(filepath)
	//首先判断能不能打开
	if err != nil {
		return false
	}
	//延时关闭 / 匿名函数 defer
	defer file.Close()
	//使用image 是否成功解码
	_, _, err = image.Decode(bufio.NewReader(file))
	return err == nil
}
