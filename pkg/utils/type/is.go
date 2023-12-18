package _type

import (
	"encoding/json"
	"fmt"
	"reflect"
	"time"
)

// Typeof 检测变量类型
func Typeof(v interface{}) string {
	return fmt.Sprintf("%T", v)
}

// is ...
func is(v interface{}, types ...reflect.Kind) bool {
	elemType := reflect.ValueOf(v).Kind()
	for _, t := range types {
		if t == elemType {
			return true
		}
	}
	return false
}

// IsInt ...
func IsInt(v interface{}) bool {
	return is(
		v,
		reflect.Int,
		reflect.Int8,
		reflect.Int16,
		reflect.Int32,
		reflect.Int64,
	)
}

// IsUint ...
func IsUint(v interface{}) bool {
	return is(
		v,
		reflect.Uint,
		reflect.Uint8,
		reflect.Uint16,
		reflect.Uint32,
		reflect.Uint64,
		reflect.Uintptr,
	)
}

// IsFloat ...
func IsFloat(v interface{}) bool {
	return is(
		v,
		reflect.Float32,
		reflect.Float64,
	)
}

// IsNumeric ...
func IsNumeric(v interface{}) bool {
	return is(
		v,
		reflect.Int,
		reflect.Int8,
		reflect.Int16,
		reflect.Int32,
		reflect.Int64,
		reflect.Float32,
		reflect.Float64,
		reflect.Uint,
		reflect.Uint8,
		reflect.Uint16,
		reflect.Uint32,
		reflect.Uint64,
		reflect.Uintptr,
	)
}

// IsBool ...
func IsBool(v interface{}) bool {
	return is(v, reflect.Bool)
}

// IsString ...
func IsString(v interface{}) bool {
	return is(v, reflect.String)
}

// IsSlice ...
func IsSlice(v interface{}) bool {
	return is(v, reflect.Slice)
}

// IsArray ...
func IsArray(v interface{}) bool {
	return is(v, reflect.Array)
}

// IsStruct ...
func IsStruct(v interface{}) bool {
	return is(v, reflect.Struct)
}

// IsMap ...
func IsMap(v interface{}) bool {
	return is(v, reflect.Map)
}

// IsFunc ...
func IsFunc(v interface{}) bool {
	return is(v, reflect.Func)
}

// IsChannel ...
func IsChannel(v interface{}) bool {
	return is(v, reflect.Chan)
}

// IsTime ...
func IsTime(v interface{}) bool {
	if _, ok := v.(time.Time); ok {
		return true
	}
	return false
}

// IsEmpty ...
func IsEmpty(v interface{}) bool {
	if v == nil {
		return true
	}
	elemValue := reflect.ValueOf(v)
	return reflect.DeepEqual(elemValue.Interface(), reflect.Zero(elemValue.Type()).Interface())
}

// IsJSONString ...
func IsJSONString(s string) bool {
	var raw json.RawMessage
	return json.Unmarshal([]byte(s), &raw) == nil
}

// IsJSONObject ...
func IsJSONObject(v interface{}) bool {
	b, _ := json.Marshal(v)
	return IsJSONString(string(b))
}

// IsContains ...
func IsContains(src, v interface{}) bool {
	srcValue := reflect.ValueOf(src)
	switch reflect.TypeOf(src).Kind() {
	case reflect.Slice, reflect.Array:
		for i := 0; i < srcValue.Len(); i++ {
			if srcValue.Index(i).Interface() == v {
				return true
			}
		}
	case reflect.Map:
		return srcValue.MapIndex(reflect.ValueOf(v)).IsValid()
	}
	return false
}
