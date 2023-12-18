package utils

import (
	"github.com/dop251/goja"
)

func GetJsVariable(jsName, jsStr string) (jsValue any, err error) {
	vm := goja.New()
	_, err = vm.RunString(jsStr)
	if err != nil {
		return
	}
	jsValue = vm.Get(jsName).Export()
	//log.Printf("jsName:%s; jsStr:%s ,jsValue:%s", jsName, jsStr, jsValue)
	return
}
