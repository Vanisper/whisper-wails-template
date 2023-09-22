package file

import (
	"bufio"
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	_type "{{.ProjectName}}/pkg/utils/type"
)

// Read ...
func Read(filepath string) string {
	b, err := os.ReadFile(filepath)
	if err != nil {
		return ""
	}
	return string(b)
}

// Write ...
func Write(filepath, str string) error {
	return os.WriteFile(filepath, []byte(str), 0755)
}

// Copy ...
func Copy(src, dst string) error {
	return Write(dst, Read(src))
}

// Size ...
func Size(filepath string) int64 {
	f, err := os.Stat(filepath)
	if err != nil {
		return 0
	}
	return f.Size()
}

// SizeText ...
func SizeText(size int64) string {
	s := float64(size)
	units := []string{"B", "KB", "MB", "GB", "TB"}
	index := 0
	for s >= 1024 {
		s /= 1024
		index++
		if index == len(units)-1 {
			break
		}
	}
	return fmt.Sprintf("%.2f%s", s, units[index])
}

// LineCount ...
func LineCount(filepath string) (count int) {
	f, err := os.Open(filepath)
	if err != nil {
		return count
	}
	defer f.Close()
	fr := bufio.NewReader(f)
	buf := make([]byte, 32*1024)
	separator := []byte("\n")
	for {
		b, err := fr.Read(buf)
		count += bytes.Count(buf[:b], separator)
		// io.EOF 或异常都直接返回
		if err != nil {
			return count
		}
	}
}

// LineContent ...
func LineContent(filepath string, numbers ...int) map[int]string {
	res := make(map[int]string)
	file, err := os.Open(filepath)
	if err != nil {
		return res
	}
	defer file.Close()
	count := len(numbers)
	fileScanner := bufio.NewScanner(file)
	for number := 1; fileScanner.Scan(); number++ {
		if count == 0 || _type.IsContains(numbers, number) {
			res[number] = fileScanner.Text()
		}
	}
	return res
}

// MineType ...
func MineType(filepath string) string {
	f, err := os.Open(filepath)
	if err != nil {
		return ""
	}
	return ReaderMineType(f)
}

// ReaderMineType ...
func ReaderMineType(r io.Reader) string {
	// 512 http/sniff.go sniffLen
	var buf [512]byte
	n, _ := io.ReadFull(r, buf[:])
	if n == 0 {
		return ""
	}
	return http.DetectContentType(buf[:n])
}

// WriteJSON write data to JSON file
func WriteJSON(filepath string, data interface{}) error {
	b, err := json.MarshalIndent(data, "", "    ")
	if err != nil {
		return err
	}
	return os.WriteFile(filepath, b, 0664)
}

// ReadJSON read JSON file data
func ReadJSON(filepath string, data interface{}) error {
	b, err := os.ReadFile(filepath)
	if err != nil {
		return err
	}
	return json.Unmarshal(b, data)
}

// Md5 file md5
func Md5(path string) (string, error) {
	f, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer f.Close()
	fi, err := f.Stat()
	if err != nil {
		return "", err
	}
	var size int64 = 1024 * 1024
	hash := md5.New()
	if fi.Size() < size {
		data, err := os.ReadFile(path)
		if err != nil {
			return "", err
		}
		hash.Write(data)
	} else {
		b := make([]byte, size)
		for {
			n, err := f.Read(b)
			if err != nil {
				break
			}
			hash.Write(b[:n])
		}
	}
	return hex.EncodeToString(hash.Sum(nil)), nil
}
