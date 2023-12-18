package file

import (
	"fmt"
	"os"
	"os/user"
	"path/filepath"
	"regexp"
	"strings"
)

// GetCurrentDir ...
func GetCurrentDir() string {
	if dir, err := os.Getwd(); err == nil {
		return dir
	}
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		return ""
	}
	return strings.Replace(dir, "\\", "/", -1)
}

// GetHomeDir ...
func GetHomeDir() string {
	dir, err := user.Current()
	if err != nil {
		return ""
	}
	return dir.HomeDir
}

// ListFiles ...
func ListFiles(dir string, match string, recurse ...bool) []string {
	res := make([]string, 0)
	files, err := os.ReadDir(dir)
	if err != nil {
		return res
	}
	re := regexp.MustCompile(match)
	for _, file := range files {
		fp := fmt.Sprintf("%s/%s", strings.TrimRight(dir, "/"), file.Name())
		if file.IsDir() {
			if len(recurse) > 0 {
				res = append(res, ListFiles(fp, match, recurse...)...)
			}
			continue
		}
		if match != "" && !re.MatchString(file.Name()) {
			continue
		}
		res = append(res, fp)
	}
	return res
}
