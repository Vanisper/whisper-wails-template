package utils

import (
	"bytes"
	"log"
	"regexp"
	"strings"

	"github.com/88250/lute"
	"github.com/PuerkitoBio/goquery"
)

// HtmlDecode 是对 html 内容进行替换解码
func HtmlDecode(htmlStr string) string {
	htmlStr = strings.ReplaceAll(htmlStr, "&#39;", "'")
	htmlStr = strings.ReplaceAll(htmlStr, "&nbsp;", " ")
	htmlStr = strings.ReplaceAll(htmlStr, "&lt;", "<")
	htmlStr = strings.ReplaceAll(htmlStr, "&gt;", ">")
	htmlStr = strings.ReplaceAll(htmlStr, "&quot;", "\"")
	htmlStr = strings.ReplaceAll(htmlStr, "&amp;", "&")
	htmlStr = strings.ReplaceAll(htmlStr, "data-src", "src")
	// re := regexp.MustCompile("<br\\s*(/)?\\s*>")
	// (?i) 表示匹配 <br> 标签时不区分大小写  使用模板字符串无需使用字符转义
	re := regexp.MustCompile(`(?i)<br\s*(/)?\s*>`)
	htmlStr = re.ReplaceAllString(htmlStr, "\n")
	return htmlStr
}

// Html2MD 是把html转为markdown
func Html2MD(htmlStr string) string {
	doc, err := goquery.NewDocumentFromReader(bytes.NewReader([]byte(htmlStr)))
	if err != nil {
		log.Fatal(err)
	}

	// Find the div with id="page-content"
	pageContentSelection := doc.Find("#page-content")
	//activity-name,js_tags,meta_content,,js_content
	// Remove all script tags and its contained content
	pageContentSelection.Find("script").Each(func(i int, scriptSelection *goquery.Selection) {
		scriptSelection.Remove()
	})
	// 合集
	pageContentSelection.Find("#js_tags").Each(func(i int, jsTagsSelection *goquery.Selection) {
		jsTagsSelection.Remove()
	})
	pageContentSelection.Find("#meta_content").Each(func(i int, Selection *goquery.Selection) {
		Selection.Remove()
	})
	// 预览时标签不可点 去除
	pageContentSelection.Find("#js_tags_preview_toast").Each(func(i int, Selection *goquery.Selection) {
		Selection.Remove()
	})

	// Get the HTML content of div with id="page-content" after removing the scripts
	pageContent, _ := pageContentSelection.Html()

	//fmt.Println(pageContent)
	// Format the HTML content
	luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
	// SoftBreak2HardBreak 设置是否将软换行（\n）渲染为硬换行（<br />）。
	luteEngine.SetSoftBreak2HardBreak(true)
	//设置是否对普通文本中的中西文间自动插入空格。
	luteEngine.SetAutoSpace(true)
	// CodeSyntaxHighlight 设置是否对代码块进行语法高亮。
	luteEngine.SetCodeSyntaxHighlight(true)
	// CodeSyntaxHighlightInlineStyle 设置语法高亮是否为内联样式，默认不内联。
	luteEngine.SetCodeSyntaxHighlightLineNum(true)
	// HeadingAnchor 设置是否对标题生成链接锚点。
	luteEngine.SetHeadingAnchor(true)
	luteEngine.SetEmoji(true)
	mdStr, _ := luteEngine.HTML2Markdown(pageContent)

	// 进行其它的特定清理
	re := regexp.MustCompile(`\*\*\s*\*\*`)    // 匹配连续的空字符
	mdStr = re.ReplaceAllString(mdStr, " ** ") // 将连续的空字符替换为正确的 Markdown 语法
	re = regexp.MustCompile(`(\n\s*){2,}`)
	mdStr = re.ReplaceAllString(mdStr, "\n\n")
	re = regexp.MustCompile(` {2,}`)        // 匹配两个以上的连续空格
	mdStr = re.ReplaceAllString(mdStr, " ") // 将连续的空格替换为一个空格
	//fmt.Println(mdStr)
	return mdStr
}
