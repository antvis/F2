# F2: a canvas library which providing 2d draw for mobile

## Installing

```
tnpm install @ali/f2

```

## Documents

### Chart

#### attrs

* id
* el
* context

#### method

* source
* scale
* clear
* destroy
* axis
* guide
* coord
* geometry
* animate

### Geometry

* position
* color
* size
* shape


### F2.Shape

* registerShape(geomType, shapeName, cfg)

### F2.Util

* ucfirst
* isString
* isNumber
* isNumeric
* isBoolean
* isFunction
* isArray
* isDate
* isNull
* isObject
* toArray
* mix
* deepMix
* each
* requestAnimationFrame
* cancelAnimationFrame

### F2.Graphic

* drawLine(start, end, canvas, cfg)
* drawText(text, pos, canvas, cfg)
* drawCircle(center, radius, canvas, cfg)
* drawArc(center, radius, startAngle, endAngle, canvas, cfg)
* drawRect(points, canvas, cfg)
* drawShape(canvas, cfg, shapeFn)
* drawLines(points, canvas, cfg)
* drawFan(points, center, canvas, cfg)
* drawSmooth(points, canvas, cfg)


## Contributing

- project structure
- core style guide
- work flow
