# Rendering Engine G

Before version 3.1, F2 uses native Canvas directly to render the chart. Although it has an advantage in performance, it is too low-level and the apis are rough. Besides, the stateless and objectless nature of instant rendering makes it impossible for animation or interactions. Therefore, the new rendering engine G was introduced in version 3.1. Rendering engine G has the following features:

1. Hierarchical structure
2. Supports the creation, modification and destruction of the containers and various graphics.
3. Animation
4. Maxtrix transformation

## Hierarchical Structure of the Container

G has heirarchical structure design:

<img src="https://gw.alipayobjects.com/zos/skylark/bf8b4e5a-0421-48ae-ac32-a789b0079d17/2018/png/3c63f255-011a-4166-8715-0f72511175b5.png" style="width: 248px;">

- Canvas is the entrance, it includes all the Group and Shape objects;
- Group contains Group and Shape Objects
- Shape is the specific shape objects.

## API

1. How to require `G`

   ```js
   const { G } = F2;
   ```

2. The classes provided in the namespace of `G`

   ```js
   const { Canvas, Group, Shape, Matrix, Vector2 } = G;
   ```

- [Canvas](#_Canvas)
- [Group](#_Group)
- [Shape](#_Shape)
- [Matrix](#_Matrix)
- [Vector2](#_Vector2)

### Canvas

Use `new Canvas(config)` to create a canvas object.

```js
// <canvas id="c1"></canvas>

new Canvas({
  el: 'c1',
  width: 500,
  height: 500
});
```

- parameter: `config`

Type: Object, the configuration needed to create a canvas object, it includes the following attributes:

|  Attribute   |           Type           |                         Description                          |
| :----------: | :----------------------: | :----------------------------------------------------------: |
|     `el`     |    String/HtmlElement    | The corresponding id of the canvas dom or canvas dom object  |
|  `context`   | CanvasRenderingContext2D | The context of the canvas, the canvas object is created by passing in the convas context |
|   `width`    |          Number          | Width of the canvas, optional. If it is omitted, the actual width of the canvas is used by default. |
|   `height`   |          Number          | Height of the canvas, optional. If it is omitted, the actual height of the canvas is used by default. |
| `pixelRatio` |          Number          | The display resolution of the canvas, current device's pixel ratio is used by default. |

#### Attributes

Quick Index

- [children](#_children)
- [destroyed](#_destroyed)

Method to get attribute: `canvas.get(attributeName)`

##### `children`

Type: Array

Description: The elements contained in the container

##### `destroyed`

Type: Boolean

Description: Wether the marked object is destroyed.

#### Methods

Quick Index

- [getWidth](#_getWidth-)
- [getHeight](#_getHeight-)
- [changeSize(width, height)](#_changeSize-width,-height-)
- [getPointByClient(clientX, clientY)](#_getPointByClient-clientX,-clientY-)
- [addShape(type, config)](#_addShape-type,-config-)
- [addGroup(config)](#_addGroup-config-)
- [add(items)](#_add-items-)
- [contain(item)](#_contain-item-)
- [sort()](#_sort-)
- [get(name)](#_get-name-)
- [set(name, value)](#_set-name,-value-)
- [clear()](#_clear-)
- [draw()](#_draw-)
- [destroy()](#_destroy-)

##### `getWidth()`

```js
/**
 * Get width of the canvas's corresponding dom object
 * @return {Number} Corresponding width
 */
getWidth()	
```

##### `getHeight()`

```js
/**
 * Get height of the canvas's corresponding dom object
 * @return {Number} Corresponding height
 */
getHeight()
```

##### `changeSize(width, height)`

```js
/**
 * Change the size of the canvas
 * @param  {Number} width  
 * @param  {Number} height 
 */
changeSize(width, height)
```

##### `getPointByClient(clientX, clientY)`
```js
/**
 * Convert the coordinate on client window to coordinate on canvas
 * @param  {Number} clientX Coordinate of x-axis on client window
 * @param  {Number} clientY Coordinate of y-axis on client window
 * @return {Object} canvas Coordinate on canvas
 */
getPointByClient(clientX, clientY)
```

##### `addShape(type, config)`

```js
/**
 * Create a shape and add it to canvas
 * @param {String} type Type of shape to create and add
 * @param {Object} config  Configuration of the shape
 * @return {Shape} The created shape instance
 */
addShape(type, config = {})
```

The `config` parameter passed in is the configuration of the shape, includes:

```js
{
  className: String, // class name specified by users
  zIndex: Number, // hierarchical index of the shape
  visible: Boolean, // wether the shape is visible
  attrs: Object // graphic attributes of the shape, different shapes have different attributes, see Shape for more details.
}
```

##### `addGroup(config)`

```js
/**
 * Create and add a group
 * @param {Object||null} cfg Configuration for group
 * @return {Group} The created group instance
 */
addGroup(config)
```

The `config` parameter passed in is the configuration for Group, includes:

```js
{
  className: String, // user specified class name
  zIndex: Number, // hierarchical index of the group
  visible: Boolean // wether the group is visible
}
```

##### `add(items)`

```js
/**
 * Add items to canvas
 * @param {Array||Group||Shape} Items can be a shape instance, a group instance, a shape array or a group array
 * @return {Canvas}  The current canvas object
 */
add(items)
```

##### `contain(item)`

```js
/**
 * Wether current canvas contains the item
 * @param  {Shape||Group} Item can be a shape instance or group instance
 * @return {Boolean} True means canvas contains the item, otherwise it's false.
 */
contain(item)
```

##### `sort()`

```js
/**
 * Sort the elements in the container by their zIndexes, in descending order
 * @return {Canvas||Group} The container itself
 */
sort()
```

##### `get(name)`

Get the attribute from canvas by attribute name

##### `set(name, value)`

Set the attribute value for the corresponding attribute name.

##### `clear()`

```js
/**
  * Clear all the elements
  * @return {Canvas|Group} The container itself
  */
clear()
```

##### `draw()`

Draw the canvas.

##### `destroy()`

Destroy the canvas object.

### Group

Uses `new Group(config)` to create a group object.

```js
new Group({
  zIndex: 0,
  visible: true
});
```

- Parameter: `config`

Type: Object, the configuration passed in to create a group object, includes:

|  Attribute  |  Type   |              Description               |
| :---------: | :-----: | :------------------------------------: |
|  `zIndex`   | Number  |           hierarchical index           |
|  `visible`  | Boolean |           visible or hidden            |
| `className` | String  | mark of the object, specified by users |

#### Attributes

Quick Index

- [children](#__children)
- [destroyed](#__destroyed)
- [visible](#_visible)
- [isGroup](#_isGroup)
- [attrs](#_attrs)

Use `group.get(attributeName)` to get attribute from group.

##### `children`

Type: Array

Description: The elements contained in the container

##### `destroyed`

Type: Boolean

Description: Wether the marked object is destroyed.

##### `visible`

Type: Boolean

Description: Wether the current group object is visible.

##### `isGroup`

Type: Boolean

Description: If true, the current object is a group object.

##### `attrs`

The graphical attributes of the group object, only `matrix` is supported currently.

#### Methods

Quick Index:

- [addShape(type, config)](#__addShape-type,-config-)
- [addGroup(config)](#__addGroup-config-)
- [add(items)](l#__add-items-)
- [contain(item)](#__contain-item-)
- [sort()](#__sort-)
- [getBBox()](#_getBBox-)
- [getParent()](#_getParent-)
- [show()](#_show-)
- [hide()](#_hide-)
- [get(name)](#__get-name-)
- [set(name, value)](#__set-name,-value-)
- [getMatrix()](#_getMatrix-)
- [setMatrix(m)](#_setMatrix-m-)
- [transform(actions)](#_transform-actions-)
- [translate(x, y)](#_translate-x,-y-)
- [rotate(radian)](#_rotate-radian-)
- [scale(sx, sy)](#_scale-sx,-sy-)
- [setTransform(actions)](#_setTransform-actions-)
- [clear()](#__clear-)
- [remove(destroy)](#_remove-destroy-)
- [destroy()](#__destroy-)

##### `addShape(type, config)`

```js
/**
 * Create a shape and add it to canvas
 * @param {String} type Type of shape to create and add
 * @param {Object} config  Configuration of the shape
 * @return {Shape} The created shape instance
 */
addShape(type, config = {})
```

The `config` parameter passed in is the configuration of the shape, includes:

```js
{
  className: String, // class name specified by users
  zIndex: Number, // hierarchical index of the shape
  visible: Boolean, // wether the shape is visible
  attrs: Object // graphic attributes of the shape, different shapes have different attributes, see Shape for more details.
}
```
##### `contain(item)`

```js
/**
 * Wether current canvas contains the item
 * @param  {Shape||Group} Item can be a shape instance or group instance
 * @return {Boolean} True means canvas contains the item, otherwise it's false.
 */
contain(item)
```

##### `sort()`

```js
/**
 * Sort the elements in the container by their zIndexes, in descending order
 * @return {Canvas||Group} The container itself
 */
sort()
```
##### `getBBox()`

```js
/**
 * Get the minimum bounding box of the current group
 * @return {Object} The bounding box
 */
getBBox()
```

The bounding box returned has the following structure:

```js
{
  minX: 39.17999267578125, 
  minY: 52.131654999999995,
  maxX: 211,
  maxY: 116.58097999999998,
  width: 171.82000732421875,
  height: 64.44932499999999
}
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/yWPVnEUaOzHZItcKeIWD.png" style="width: 540px;">

##### `getParent()`

```js
/**
 * Get the parent element
 * @return {Group || Canvas} The parent element of the current object, may be a group object or canvas object
 */
getParent()
```

##### `show()`

Display the object.

#####`hide()` 

Hide the object.

##### `get(name)`

Get attribute from group by attribute name.

##### `set(name, value)`

Set the attribute with the corresponding attribute name.

##### `getMatrix()`

```js
/**
  * Get the current matrix
  * @return {Array} The current matrix
  */
getMatrix() 
```

##### `setMatrix(m)`

```js
/**
 * Set matrix
 * @param {Array} m Matrix array
 */
setMatrix(m)
```

##### `transform(actions)`

Perform matrix transformation on the current object.

```js
transform(actions) // actions is an array containing the set of operations
```

The operations supported in actions are 't' (translate), 's' (scale), 'r' (rotate), operations can be combined in any combination order. For example:

```js
[
  [ 't', x, y ], // t for translate, x for offset on x-axis direction, y for offset in y-axis direction
  [ 's', sx, sy ], // s for scale, sx for scale on x-axis direction, sy for scale on y-axis direction
  [ 'r', radian] // r for rotate，radian for the radians of the rotation
]
```

##### `translate(x, y)`

```js
/**
 * Translate the current element
 * @param  {Number} x Offset in x-axis direction
 * @param  {Number} y Offset in y-axis direction
 */
translate(x, y)
```

##### `rotate(radians)`

```js
/**
 * Rotate the current element
 * @param  {Number} radian The radians of the rotation
 */
rotate(radian)
```

##### `scale(sx, sy)`

```js
/**
 * Perform scale operation on current object
 * @param  {Number} sx The scale on x-axis direction
 * @param  {Number} sy The scale on y-axis direction
 */
scale(sx, sy)
```

##### `setTransform(actions)`

Perform translating, rotating and scaling operations after resetting the matrix.

```js
setTransform(actions) // actions is an array containing operations
```

The `actions` parameter is same as the parameter in `transform(actions)`.

##### `clear()`

```js
/**
  * Clear all the elements
  * @return {Group} The container itself
  */
clear() 
```

##### `remove(destroy)`

```js
/**
 * Remove item from its parent
 * @param  {Boolean} destroy true Wether to destroy iteself after removing, false means not removing.
 * @return {null}
 */
remove(destroy)

```

##### `destroy()`

Destroy the element itself, if it has a parent, remove it from parent first.

### Shape

We provide the following shape objects:

```js
const { Line, Arc, Circle, Polygon, Polyline, Rect, Sector, Text, Custom } = Shape;
```

- [Line](#_Line-线) 
- [Arc](#_Arc-圆弧) 
- [Circle](#_Circle-圆) 
- [Polygon](#_Polygon-多边形) 
- [Polyline](#_Polyline-多点线段) 
- [Rect](#_Rect-矩形) rectangle
- [Sector](#_Sector-扇形) 
- [Text](#_Text-文本) 
- [Custom](#_Custom-自定义图形) custom graph

These shapes have some common attributes and different shapes have their own attributes.

Use `new Shape[shapeType](config)` to create a specific type of shape.

```js
new Shape.Line({
  zIndex: 0,
  visible: true,
  attrs: {}
});
```

- Parameter: `config`

Type: Object, configuration passed in for the creation of the shape object, includes:

|  Attribute  |  Type   |            Description            |
| :---------: | :-----: | :-------------------------------: |
|   `attrs`   | Object  | Graphical attributes, must be set |
|  `zIndex`   | Number  |        Hierarchical Index         |
|  `visible`  | Boolean |         Wether to display         |
| `className` | String  | Object marker specified by users  |

#### Common Attributes

Quick Index

- [type](#_type)
- [attrs](#__attrs)
- [destroyed](#___destroyed)
- [visible](#__visible)
- [isShape](#_isShape)

Use `shape.get(attributeName)` to get the attribute from shape.

##### `type`

Type: String

Description: The value of this attribute represents the type of the shape

##### `attrs`

Type: Object

Description: The graphical attributes of the shape

##### `destroyed`

Type: Boolean

Description: Wether the marked object is destroyed

##### `visible`

Type: Boolean

Description: Wether the shape object is visible

##### `isShape`

Description: If true, the current object is a shape object

#### Common Methods

Quick Index

- [attr()](#_attr-)
- [getBBox()](#__getBBox-)
- [getParent()](#__getParent-)
- [show()](#__show-)
- [hide()](#__hide-)
- [get(name)](#___get-name-)
- [set(name, value)](#___set-name,-value-)
- [getMatrix()](#__getMatrix-)
- [setMatrix(m)](#__setMatrix-m-)
- [transform(actions)](#__transform-actions-)
- [translate(x, y)](#__translate-x,-y-)
- [rotate(radian)](#__rotate-radian-)
- [scale(sx, sy)](#__scale-sx,-sy-)
- [setTransform(actions)](#__setTransform-actions-)
- [remove(destroy)](#__remove-destroy-)
- [destroy()](#___destroy-)

##### `attr()`

Set or Get attribute.

```js
/**
 * Return all the graphical attributes
 * @return {Object} Object contains all the graphical attributes
 */
attr()

/**
 * Return the graphical attribute corresponds to name
 * @return The corresponding attribute
 */
attr(name)

/**
 * Set graphical attribute value for the attribute name
 * @param  {String} name  Attribue name
 * @param  {Any} value    Attribute value
 * @return {Shape}       The current shape object
 */
attr(name, value)

/**
 * Set multiple graphical attributes
 * @param  {Object} config  Object contains attributes
 * @return {Shape}       The current shape object	
 */
attr(config)
```

Use `attr('matrix')` to get matrix attribute.

Use `attr('clip')` to get clip attribute.

##### `getBBox()`

```js
/**
 * Get the minimum bounding box of the shape
 * @return {Object} The minimum bounding box
 */
getBBox()
```

The structure of the bounding box is as follows:

```js
{
  minX: 39.17999267578125, 
  minY: 52.131654999999995,
  maxX: 211,
  maxY: 116.58097999999998,
  width: 171.82000732421875,
  height: 64.44932499999999
}
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/yWPVnEUaOzHZItcKeIWD.png" style="width: 540px;">

##### `getParent()`

```js
/**
 * Get the parent element
 * @return {Group || Canvas} The parent of the current object, may be a group instance or canvas instance
 */
getParent()
```

##### `show()`

Show the object.

##### `hide()`

Hide the object.

##### `get(name)`

Get attribute value according to attribute name.

##### `set(name, value)`

Set attribute value with the corresponding attribute name.

##### `getMatrix()`

```js
/**
  * Get the current matrix
  * @return {Array} Current matrix
  */
getMatrix()
```

##### `setMatrix(m)`

```js
/**
 * Set matrix
 * @param {Array} m Matrix array
 */
setMatrix(m) 
```

##### `transform(actions)`

Perform matrix transformation on the current object.

```js
transform(actions) // actions is an array containing the set of operations
```

The operations supported in actions are 't' (translate), 's' (scale), 'r' (rotate), operations can be combined in any combinatin order. For example:

```js
[
  [ 't', x, y ], // t for translate, x for offset on x-axis direction, y for offset in y-axis direction
  [ 's', sx, sy ], // s for scale, sx for scale on x-axis direction, sy for scale on y-axis direction
  [ 'r', radian] // r for rotate，radian for the radians of the rotation
]
```

##### `translate(x, y)`

```js
/**
 * Translate the current element
 * @param  {Number} x Offset in x-axis direction
 * @param  {Number} y Offset in y-axis direction
 */
translate(x, y)
```

##### `rotate(radians)`

```js
/**
 * Rotate the current element
 * @param  {Number} radian The radians of the rotation
 */
rotate(radian)
```

##### `scale(sx, sy)`

```js
/**
 * Perform scale operation on current object
 * @param  {Number} sx The scale on x-axis direction
 * @param  {Number} sy The scale on y-axis direction
 */
scale(sx, sy)
```

##### `setTransform(actions)`

Perform translating, rotating and scaling operations after resetting the matrix.

```js
setTransform(actions) // actions is an array containing operations
```

The `actions` parameter is same as the parameter in `transform(actions)`.

##### `clear()`

```js
/**
  * Clear all the elements
  * @return {Group} The container itself
  */
clear() 
```

##### `remove(destroy)`

```js
/**
 * Remove item from its parent
 * @param  {Boolean} destroy true Wether to destroy iteself after removing, false means not removing.
 * @return {null}
 */
remove(destroy)

```

##### `destroy()`

Destroy the element itself, if it has a parent, remove it from parent first.

#### Creation of Specific Shape Object

#### Line

```js
new G.Shape.Line({
  attrs: {
    x1: 50, // starting x coordiante of the line
    y1: 50,// starting y coordinate of the line
    x2: 100,// ending x coordinate of the line
    y2: 100,// ending y coordinate of the line
    lineWidth: 40, // graphical attributes of html5 canvas
    strokeStyle: '#223273', // graphical attributes of html5 canvas
    lineCap: 'round' // graphical attributes of html5 canvas
  }
})
```

#### Arc

```js
new G.Shape.Arc({
  attrs: {
    x: 20, // center's x coordiante
    y: 20, // center's y coordinate
    r: 50, // radius
    startAngle: 0, // starting arc
    endAngle: Math.PI / 2, // ending arc
    lineWidth: 2, // graphical attributes of html5 canvas
    stroke: '#18901f' // graphical attributes of html5 canvas
  }
})
```

#### Circile

```js
new G.Shape.Circle({
  attrs: {
    x: 10, // center's x coordinate
    y: 10, // center's y coordinate
    r: 50, // radius
    fill: 'red' // graphical attributes of html5 canvas
  }
});
```

#### Polygon

```js
new G.Shape.Polygon({
  attrs: {
    points: [
      { x: 10, y: 10 },
      { x: 20, y: 45 },
      { x: 40, y: 80 },
      { x: 123, y: 70 },
      { x: 80, y: 32 }
    ], // the points the make up the polygon
    lineWidth: 1, // graphical attributes of html5 canvas
    fill: 'red' // graphical attributes of html5 canvas
  }
})
```

#### Polyline

```js
new G.Shape.Polyline({
  attrs: {
    points: [
      { x: 10, y: 10 },
      { x: 20, y: 45 },
      { x: 40, y: 80 },
      { x: 123, y: 70 },
      { x: 80, y: 32 }
    ],
    smooth: true | false, // Wether it's curve, the default value is false, not a curve.
    lineWidth: 1, // graphical attributes of html5 canvas
    stroke: 'red' // graphical attributes of html5 canvas
  }
})
```

#### Rect

```js
new G.Shape.Rect({
  attrs: {
    x: 50, // x coordinate of upper left point of the rectangle
    y: 50, // y coordinate of upper left point of the rectangle
    height: 20, // Height of the rectangle
    width: 80, // Width of the rectangle
    lineWidth: 1, // graphical attributes of html5 canvas
    fill: '#1890FF', // graphical attributes of html5 canvas
    strokeStyle: '#000' // graphical attributes of html5 canvas
    radius: 0 // Rounding corner configuration of the rectangle, an array can be used to set radius for each corner respectively, usage is  same as padding.
  }
})
```

#### Sector

```js
new G.Shape.Sector({
  attrs: {
    x: 100, // center's x coordinate 
    y: 150, // center's y coordinate
    r: 50, // outer radius of the ring
    r0: 30, // inner radius of the ring
    startAngle: -Math.PI / 3, // starting arc
    endAngle: Math.PI / 2, // ending arc
    lineWidth: 0, // graphical attributes of html5 canvas
    fill: '#223273' // graphical attributes of html5 canvas
  }
});
```

#### Text

```js
new G.Shape.Text({
  attrs: {
    x: 30, // x coordinate of the display position
    y: 30, // y coordinate of the display position
    fontFamily: 'Arial', // font
    fontSize: 12, // font size
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    fill: 'red', // graphical attributes of html5 canvas
    lineWidth: 1, // graphical attributes of html5 canvas
  }
});
```

#### Custom Shape

```js
new G.Shape.Custom({
  attrs: {},
  createPath(context) {
    // Draw shape here
  },
  calculateBox() {
    // Custom bounding box
  }
})
```

### Matrix

F2 provides operations for 2x3 matrix, includes:

Quick Index:

- [multiply(m1, m2)](#_multiply-m1,-m2-)
- [scale(out, m, v)](#_scale-out,-m,-v-)
- [rotate(out, m, radian)](#_rotate-out,-m,-radian-)
- [translate(out, m, v)](#_translate-out,-m,-v-)
- [transform(m, actions)](#_transform-m,-actions-)

#### `multiply(m1, m2)`

Multiply the two matrices.

```js
/**
  * Multiply the two matrices.
  * @param  {Array} m1 Left matrix
  * @param  {Array} m2 Right matrix
  * @return {Array}    Result of multiplication
  */
multiply(m1, m2)
```

#### `scale(out, m, v)`

Scale operation.

```js
/**
  * Scale operation
  * @param  {Array} out Stores the result of the scale operation
  * @param  {Array} m   The matrix to scale
  * @param  {Array} v   Scale vector [sx, sy]
  * @return {Array}     The scale result
  */
scale(out, m, v)
```

#### `rotate(out, m, radian)`

Rotation operation.

```js
/**
  * Rotation operation
  * @param  {Array} out      Stores the result of the rotation
  * @param  {Array} m        The matrix to rotate
  * @param  {Array} radian   Rotation radian
  * @return {Array}          The rotation result
  */
rotate(out, m, radian)
```

#### `translate(out, m, v)`

Translation operation.

```js
**
  * 平移变换。
  * @param  {Array} out      Stores the translation result
  * @param  {Array} m        Matrix to translate
  * @param  {Array} v        Translation vector [ x, y ]
  * @return {Array}          The translation result
  */
translate(out, m, v)
```

#### `transform(m, actions)`

Perform translation, rotation and scale operations. All operations are configured and stored in actions, the supported operations in actions attribute are: 't' (translate), 's' (scale), 'r' (rotate). Operations can be combined in any combination. For example:

```js
[
  [ 't', x, y ], // t for translate, x for offset on x-axis direction, y for offset in y-axis direction
  [ 's', sx, sy ], // s for scale, sx for scale on x-axis direction, sy for scale on y-axis direction
  [ 'r', radian] // r for rotate，radian for the radians of the rotation
]
```

```js
/**
  * 
  * @param  {Array} m        Matrix to transform
  * @param  {Array} actions  Operation set
  * @return {Array}          The transformation result
  */
transform(m, actions)
```

### Vector2

Operations of 2-dimensinal vectors, includes:

Quick Index:

- [create()](#_create-)
- [length(v)](#_length-v-)
- [normalize(out, v)](#_normalize-out,-v-)
- [add(out, v1, v2)](#_add-out,-v1,-v2-)
- [sub(out, v1, v2)](#_sub-out,-v1,-v2-)
- [scale(out, v, s)](#_scale-out,-v,-s-)
- [dot(v1, v2)](#_dot-v1,-v2-)
- [direction(v1, v2)](#_direction-v1,-v2-)
- [angle(v1, v2)](#_angle-v1,-v2-)
- [angleTo(v1, v2, direction)](#_angleTo-v1,-v2,-direction-)
- [zero(v)](#_zero-v-)
- [distance(v1, v2)](#_distance-v1,-v2-)
- [clone(v)](#_clone-v-)
- [min(out, v1, v2)](#_min-out,-v1,-v2-)
- [max(out, v1, v2)](#_max-out,-v1,-v2-)
- [transformMat2d(out, v, m)](#_transformMat2d-out,-v,-m-)

#### `create()`

Create a new 2-dimensional vector, [0, 0] is returned.

#### `length(v)`

```js
/**
 * The length of the vector
 * @param {Array} v   Vector to calculate length
 * @return {Number}   Length of the vector
 */
length(v)
```

#### `normalize(out, v)`

```js
/**
 * Normalize the vector
 * @param {Array} out   Stores the normalization result
 * @param {Array} v     Vector to normalize
 * @return {Array} out  The normalization result
 */
normalize(out, v)
```

#### `add(out, v1, v2)`

```js
/**
 * Add the two vectors v1, v2.
 * @param {Array} out    Stores the addition result
 * @param {Array} v1     Vector v1 to add
 * @param {Array} v2     Vector v2 to add
 * @return {Array} out   The addition result
 */
add(out, v1, v2)
```

#### `sub(out, v1, v2)`

```js
/**
 * Subtraction of the two vectors v1, v2.
 * @param {Array} out    Stores the substraction result
 * @param {Array} v1     Vector v1 of the substraction
 * @param {Array} v2     Vector v2 of the substraction
 * @return {Array} out   The substraction result
 */
sub(out, v1, v2)
```

#### `scale(out, v, s)`

```js
/**
 * Scale the vector
 * @param {Array} out    Stores the scale result
 * @param {Array} v      Vector to scale
 * @param {Array} s      Scale vector [ sx, sy ]
 * @return {Array} out   The scale result
 */
scale(out, v, s)
```

#### `dot(v1, v2)`

Multiplication of the two vectors.

#### `direction(v1, v2)`

Calculate the direction formed by two vectors v1, v2.

#### `angleTo(v1, v2, direction)`

Calculate the angle between the two vectors v1, v2.

#### `zero(v)`

Determine if vector v is 0 vector.

#### `clone(v)`

Clone a vector from vector v.

#### `min(out, v1, v2)`

Get the minimum vector from two vectors v1, v2.

#### max(out, v1, v2)

Get the maximum vector from two vectors v1, v2.

#### `transformMat2d(out, v, m)`

```js
/**
 * Left multiplication of a matrix and a vector
 * @param  {Array} out  Stores the multiplication result
 * @param  {Array} v    Vector to multiply
 * @param  {Array} m    Matrix to multiply
 * @return {Array}      The multiplication result
 */
transformMat2d(out, v, m)
```

## Example

<canvas id="canvas"></canvas>

```js
const { Canvas } = F2.G; // require Canvas
const canvas = new Canvas({
  el: 'canvas',
  width: 200,
  height: 100
}); // create a canvas object
const container = canvas.addGroup(); // add a group to canvas 
const itemGroup = container.addGroup(); // add a group to container 
itemGroup.addShape('circle', {
  attrs: {
    x: 5,
    y: 0,
    r: 5,
    fill: 'red'
  }
}); // add a circle to group
itemGroup.addShape('text', {
  attrs: {
    x: 17,
    y: 0,
    textAlign: 'start',
    textBaseline: 'middle',
    fontSize: 12,
    fill: 'red',
    text: '分类一'
  }
}); // add text to group
const bbox = itemGroup.getBBox(); // get the bounding box of the group in order to calculate the display position of other graphs
container.addShape('rect', {
  zIndex: -1,
  attrs: {
    x: bbox.minX - 5,
    y: bbox.minY - 5,
    width: bbox.width + 10,
    height: bbox.height + 10,
    fill: 'rgba(0, 0, 0, 0.09)'
  }
}); // add a rectangle

canvas.addShape('rect', {
  zIndex: 0,
  attrs: {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    fill: 'rgba(0, 0, 0, 0.09)'
  }
}); // add a rectangle

container.sort(); // sort by hierarchical index, i.e. zIndex.
container.moveTo(30, 50); // move the container
canvas.draw(); // draw

```

