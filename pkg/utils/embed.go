package utils

import (
	"embed"
	"io/fs"
	"os"
)

type FileData struct {
	Path    string `json:"Path"`
	Content string `json:"Content"`
}

type FolderData struct {
	Path string `json:"Path"`
}
type FoldersData struct {
	Path    string
	Files   []*FileData
	Folders []*FolderData
}

// deepWalk 深度遍历 将embed.FS中的文件夹和文件写入到本地
// @param path string 遍历的路径:此路径一定要和`go:embed all:path` 对应
func DeepWalk(path string, assets *embed.FS) (FoldersData, error) {
	var folderData FoldersData
	folderData.Path = path
	asset := *assets

	err := fs.WalkDir(asset, path, func(fpath string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			// 创建文件夹(深度)
			MkDir(GetCurrPath() + "\\" + fpath)
			folderData.Folders = append(folderData.Folders, &FolderData{
				Path: fpath,
			})
		} else {
			fContent, err := asset.ReadFile(fpath)
			if err != nil {
				return err
			}
			err = os.WriteFile(GetCurrPath()+"\\"+fpath, fContent, 0666)
			if err != nil {
				return err
			}

			folderData.Files = append(folderData.Files, &FileData{
				Path:    fpath,
				Content: "",
			})
		}
		return nil
	})

	return folderData, err
}
