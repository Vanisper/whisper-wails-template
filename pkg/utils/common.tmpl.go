package utils

import (
	"fmt"
	"html"
	"math/rand"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"{{.ProjectName}}/pkg/utils/file"

	"github.com/gofrs/uuid"
)

// Uuid uuid 生成
func Uuid() string {
	u2, err := uuid.NewV4()
	if err != nil {
		fmt.Println(err)
	}
	return u2.String()
}

func HandleXml(htmlStr string) string {
	re := regexp.MustCompile(`(?s) xml.*? :`)
	return re.ReplaceAllString(htmlStr, " ")
}

func MakeMarkdownFriendly(str string) string {
	// 在处理字符串前先对其进行一次Unquote以删除其中的转义序列
	unquoted, err := strconv.Unquote(`"` + str + `"`)
	if err != nil {
		// 如果 Unquote 出错，则返回错误
		return ""
	}

	// 用 "&" 替换 "&amp;"
	replaced := strings.ReplaceAll(unquoted, "&amp;", "&")

	// 解码 HTML 实体
	unescaped := html.UnescapeString(replaced)

	// 将 "\n" 替换为 Markdown 的换行符 "  \n"
	friendlyMarkdown := strings.ReplaceAll(unescaped, "\n", "  \n")

	return friendlyMarkdown
}

// GetCurrPath 获取程序运行路径
func GetCurrPath() string {
	f, _ := exec.LookPath(os.Args[0])
	path, _ := filepath.Abs(f)
	index := strings.LastIndex(path, string(os.PathSeparator))
	ret := path[:index]
	return ret
}

func GetCurrentExecDirectory() (string, error) {
	dir, err := os.Getwd()
	if err != nil {
		return "", err
	} else {
		fmt.Println("Current Directory: ", dir)
		return dir, nil
	}
}

// MkDir ...
func MkDir(path string) string {
	path = filepath.FromSlash(path)
	// 如果是文件 并且文件存在 会获取文件路径 直接返回
	if file.IsFile(path) {
		path = file.GetFileDir(path)
		return path
	}

	//如果不是文件并且不存在 如果是含有带“.”的路径,一定要确保是路径而不是文件名,
	//所以确保传入的要么是有效的文件路径，要么是文件夹，不要传入不存在的文件路径
	if !file.IsExist(path) {
		err := os.MkdirAll(path, os.ModePerm)
		if err != nil {
			panic("创建目录失败: " + err.Error())
		}
	}
	return path
}

// WriteToFile ...
func WriteToFile(content string, filepath string, overwrite bool) error {
	if !overwrite {
		// 文件存在则返回错误
		if _, err := os.Stat(filepath); err == nil {
			return fmt.Errorf("该文件存在于此路径（你可以选择覆盖写入该文件）: %q", filepath)
		}
	}
	err := os.WriteFile(filepath, []byte(content), 0644)
	if err != nil {
		return fmt.Errorf("写入文件失败: %v", err)
	}
	return nil
}

// GetRandNum n以内的随机数
func GetRandNum(n int) int {
	source := rand.NewSource(time.Now().UnixNano())
	rng := rand.New(source)
	num := rng.Intn(n)

	return num
}

func SpiderTime() string {
	// 获取当前时间
	t := time.Now()

	// 使用自定义格式打印时间
	return t.Format("2006-01-02 15:04:05")
}
