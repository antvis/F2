# Plugin

F2 provides a plug-in mechanism for extending the functionality of a chart, which can help users customize or change the default chart's default behavior at various stages of the chart creation.

The four default plug-ins supported in F2 are legend, guide, tooltip and animation (including group animation and detail animation).

F2 registers a static attribute called `Chart.plugins` on the Chart class, and uses publish-subscribe mechanism to notify plug-ins to perform their own operation during the life circle of the chart.

The current open lift circle includes:

- `init`: After initialization of the chart
- `beforeGeomDraw`: Before drawing the geom
- `afterGeomDraw`: After drawing the deom
- `beforeCanvasDraw`: before drawing the canvas
- `clear`: Clear the chart, remove geom
- `clearInner`: Clear the layers
- `repaint`: Redraw

## How to custom plug-in

The implementation of a plug-in is very simple, all you need to do is define the behaviors of the plug-in during the specific life circle of the chart. See [Guide](https://github.com/antvis/f2/blob/master/src/plugin/guide.jsl) for more details.

```js
const plugin = {
    init(chart) {
       // do something when initialize the chart 
    }
};   
```

## How to register/use plug-ins

1. Global Registeration for plug-ins

   ```js
   const plugin1 = { /* plugin implementation */ };
   const plugin2 = { /* plugin implementation */ };
   // Global registeration, plug-in will be registered to all the chart plugins
   Chart.plugins.register(plugin1); 
   // Global registeration for multiple plug-in
   Chart.plugins.register([ plugin1, plugin2 ]); 
   ```

2. Register for a chart instance

   ```js
   const plugin1 = { /* plugin implementation */ };
   const plugin2 = { /* plugin implementation */ };
   
   // chart1 use "plugin1"
   const chart1 = new Chart({
     plugins: plugin1
   );
   // chart2 use "plugin2"
   const chart2 = new Chart({
     plugins: plugin2
   );
   // chart3 doesn't use "plugin"
   const chart3 = new Chart({});
   ```

## Unregister plug-in

Use `Chart.plugins.unregister(plugins)` to unregister a plug-in.

## Clear plug-ins

Use `Chart.plugins.clear()` to clear all the plug-ins.

## Get all the registered plug-ins

Use `Chart.plugins.getAll()` to get all successfully registered plug-ins.

## Current plug-ins

- [Tooltip](./tooltip,md)
- [Legend](./legend.md)
- [Guide](./guide.md)
- [Animation](./animation.md)
- [Gesture](./gesture.md)

