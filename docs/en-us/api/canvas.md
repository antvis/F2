# Canvas

Since F2 use canvas as its underlying technique, all charts drawn support the attributes of the canvas. This chapter lists commonly used attributes, see [Canvas Attributes](http://www.w3school.com.cn/tags/html_ref_canvas.asp) for more details.

## Common Attributes

- `fill`: The filled color or gradient
- `stroke`: Color or gradient used for stroke 
- `shadowColor`: The color used for shadow
- `shadowBlur`: The blurry level of the shadow
- `shadowOffsetX`: The horizontal distance between the shadow and the shape
- `shapdowOffsetY`: The vertical distance between the shadow and the shape
- `opacity`: The current transparency value
- `globalCompositionOperation`: Setups for how the new image is drawn onto the existing image

**! Note **

- `fillStyle` is abbreviated to `fill`
- `strokeStyle` is abbreviated to `stroke`
- `globalAlpha` is same as `opacity`

### Style of Line

- `lineCap`: The style of line's ending point
- `lineJoin`:The shape of the line's join point
- `lineWidth`: The width of line
- `miterLimit`: The maximum miter length

**! Note **

- F2 adds dash line support to exsiting line styles
- `lineDash`: Use an array to set the style of the dash line. Array is a set of numbers describe the length of segments and the spacing among segments. If the number of the array is odd, the elements of the array are copied and repeated. For example, [5, 15, 25] will become [5, 15, 25, 5, 15, 25].

This attribute is determined by wether the browser supports `setLineDash` function, ses [setLineDash](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash) for more details.

### Text Attributes

- `textAlign`: Current alignment of the text. Supportted attributes are: center, end, left, right, start
- `textBaseline`: Baseline for the text. Supported attributes are: top, middle, bottom
- `rotate`: Rotation angle for text in arc length

**! Note**

F2 provides some extra attributes for users to set the font of the text. See [Canvas Font](http://www.w3school.com.cn/tags/canvas_font.asp) for more details.

- `fontStyle`: same as `font-style`
- `fontVariant`: same as `font-variant`
- `fontWeight`: same as `font-weight`
- `fontSize`: same as `font-size`
- `fontFamily`: same as `font-family`