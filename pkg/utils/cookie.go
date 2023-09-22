package utils

import (
	"fmt"
	"strings"
)

// CookiesMap2Str cookies map to str
func CookiesMap2Str(cookiesMap map[string]string) string {
	cookieParts := make([]string, len(cookiesMap))

	i := 0
	for key, value := range cookiesMap {
		cookieParts[i] = fmt.Sprintf("%s=%s", key, value)
		i++
	}

	return strings.Join(cookieParts, "; ")
}

// CookiesStr2Map cookies str to map
func CookiesStr2Map(cookieStr string) map[string]string {
	cookiesMap := make(map[string]string)

	for _, s := range strings.Split(cookieStr, ";") {
		parts := strings.SplitN(strings.TrimSpace(s), "=", 2)
		if len(parts) == 2 {
			cookiesMap[parts[0]] = parts[1]
		}
	}
	return cookiesMap
}
