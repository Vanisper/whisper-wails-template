package network

import (
	"bytes"
	"fmt"
	"os/exec"
	"runtime"
	"syscall"
)

func CheckUrl(url string) (string, error) {
	cmd := exec.Command("curl", "-sSf", url)
	if runtime.GOOS == "windows" {
		cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true} // 隐藏命令行窗口
	}
	var out bytes.Buffer
	cmd.Stdout = &out
	err := cmd.Run()
	if err != nil {
		return "", err
	}
	if out.String() == "" {
		return "", fmt.Errorf("URL %s returned empty response", url)
	}
	return out.String(), nil
}
