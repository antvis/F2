# Util

How to get util:

```js
const Util = F2.Util;
```

## Methods

### upperFirst

`upperFirst(s)`

- Description: Convert the first letter of a string to uppercase
- Parameter: String
- Return: String with first letter converted to uppercase

### lowerFirst

`lowerFirst(s)`

- Description: Conter the first letter of a string to lowercase
- Parameter: String
- Return: String with first letter converted to lowercase

### isString

`isString(value)`

- Description: Determine wehther it is a string
- Parameter: Value of any type
- Return: Result indicating wether it is a string

### isNumber

`isNumber(value)`

- Description: Determine wether it is a number
- Parameter: Value of any type
- Return: Result indicating wether it is a number

### isBoolean

`isBoolean(value)`

- Description: Determine wether it is a boolean value
- Parameter: Value of any type
- Return: Result indicating wether it is a boolean value

### isFunction

`isFunction(fn)`

- Description: Determine wether it is a function
- Parameter: Value of any type
- Return: Result indicating wether it is a function

### isArray

`isArray(value)`

- Description: Determine wether it is an array
- Parameter: Value of any type
- Return: Result indicating wether it is an array

### isDate

`isDate(value)`

- Description: Determine wether it is a date
- Parameter: Value of any type
- Return: Result indicating wether it is a date

### isNil

`isNil(o)`

- Description: Determine wether the value is null (undefined or null)
- Parameter: Value of any type
- Return: Result indicating wether the value is null

### isObject

`isObject(value)`

- Description: Determine wether it is an object
- Parameter: Value of any type
- Return: Result indicating wether it is an object

### deepMix

`deepMix(target, source1, source2 source3)`

- Description: Deep copy
- Parameters: Support up to 3 sources of the copy
- Return: The copy result

### indexOf

`indexOf(arr, element)`

- Description: Return the index of specific element in an array
- Parameters: arr: the array to look for, element: the specific element
- Return: The index of the element

### each

`each(elements, func)`

- Description: Traversing an array or object

- Parameters: elements: the array or object needed to be traversed, func: the callback for each element

- Return:

  ```js
  Util.each([ 1, 2, 3 ], (val, index) => {
    console.log('value of element', val);
    console.log('index', index);
  });
  ```

### getPixelRatio

`getPixelRatio()`

- Description: Get the pixel ratio of the current device
- Parameter: None
- Return: Pixel ratio of the current device

### getRelativePosition

`getRelativePosition(point, canvas)`

- Description: Convert the position of the mouse to the relative coordinate of the canvas

- Parameters: point: position of the mouse, canvas: the current canvas object, gained through `chart.get('canvas')`

- Return: An object of canvas coordinate

  ```js
  const chart = new Chart({});
  
  const mousePoint = {
    x: 10,
    y:39
  };
  
  const canvasPoint = F2.Util.getRelativePosition(mousePoint, chart.get('canvas'));
  ```

  