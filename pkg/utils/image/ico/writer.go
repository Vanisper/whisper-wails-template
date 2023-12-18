package ico

import (
	"bufio"
	"bytes"
	"encoding/binary"
	"image"
	"image/draw"
	"image/png"
	"io"
)

func Encode(w io.Writer, im image.Image) error {

	b := im.Bounds()
	m := image.NewRGBA(b)
	draw.Draw(m, b, im, b.Min, draw.Src)

	header := head{
		0,
		1,
		1,
	}
	entry := direntry{
		Plane:  1,
		Bits:   32,
		Offset: 22,
	}

	pngBuffer := new(bytes.Buffer)
	pngWriter := bufio.NewWriter(pngBuffer)
	err := png.Encode(pngWriter, m)
	if err != nil {
		return err
	}
	err = pngWriter.Flush()
	if err != nil {
		return err
	}
	entry.Size = uint32(len(pngBuffer.Bytes()))

	bounds := m.Bounds()
	entry.Width = uint8(bounds.Dx())
	entry.Height = uint8(bounds.Dy())
	bb := new(bytes.Buffer)

	var e error
	e = binary.Write(bb, binary.LittleEndian, header)
	if e != nil {
		return e
	}
	e = binary.Write(bb, binary.LittleEndian, entry)
	if e != nil {
		return e
	}

	_, e = w.Write(bb.Bytes())
	if e != nil {
		return e
	}
	_, e = w.Write(pngBuffer.Bytes())
	if e != nil {
		return e
	}

	return e
}
