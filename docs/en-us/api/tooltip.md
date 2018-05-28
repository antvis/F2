# Tooltip

Tooltip serves as a plug-in for chart in F2. You need to register it to Chart class or a chart instance first in order to use it.

If you are using the complete version of F2, tooltip is already registered to the Chart class. If the require-on-demand strategy is used, you fist need to register the tooltip to Chart class or a chart instance.

```js]
const F2 = require('@antv/f2/lib/core');
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
Chart.plugins.register(Tooltip); // Method 1: Global Registeration

// Method 2: Register tooltip for a chart instance
const chart = new Chart({
  id: 'canvas',
  plugins: Tooltip
});
```

## API

```js
chart.tooltip(false); // turn off tooltip
chart.tooltip({
  offsetX: 0, // offset of x-axis
  offsetY: 0, // offset of y-axis
  triggerOn: [ 'touchstart', 'touchmove' ], // customizable action when the tooltip appears, similar to legend's triggerOn
  triggerOff: 'touchend', // customizable action when tooltip disappears
  showTitle: false, // Wether to display the title, not showing by default
  showCrosshairs: false, // Wether to display auxiliary line, dot chart, path chart, line chart and area chart display the auxiliary lin by default.
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: 2
  }, // style of the auxiliary
  showTooltipMarker: true, // Wether to display tooltipMarker
  tooltipMarkerStyle: {
    fill: '#fff' // style of the tooltipMarker
  },
  background: {
    radius: 2,
    fill: '#1890FF',
    padding: [ 6, 10 ]
  }, // style of background
  titleStyle: {
    fontSize: 24,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'top'
  }, // style for tooltip's title, invalid if showTitle is false
  nameStyle: {
    fontSize: 24,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  }, // style for name text
  valueStyle: {
    fontSize: 24,
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle'
  }, // style for tooltip value
  showItemMarker: true, // Wether to show the marker before each record
  itemMarkerStyle: {
    radius: 7,
    symbol: 'circle',
    lineWidth: 2,
    stroke: '#fff'
  }, // style for the marker before each record
  custom: {Boolean}, // Wether to custom the tooltip
  onShow(obj) {
    // obj: { x, y, title, items }
  }, // callback when the tooltip displays
  onHide(obj) {
    // obj: { x, y, title, items }
  }, // callback when the tooltip hides
  onChange(obj) {
    // obj: { x, y, title, items }
  } // callback when the content of the tooltip changes
});
```

## Example

On mobile devices, We often use the tooltip with legend, and it is achieved by configuring the custom attribute.

```js
const data =[
      { name: 'London', month: 'Jan.', monthly_rainfall: 18.9 },
      { name: 'London', month: 'Feb.', monthly_rainfall: 28.8 },
      { name: 'London', month: 'Mar.', monthly_rainfall: 39.3 },
      { name: 'London', month: 'Apr.', monthly_rainfall: 81.4 },
      { name: 'London', month: 'May.', monthly_rainfall: 47 },
      { name: 'London', month: 'Jun.', monthly_rainfall: 20.3 },
      { name: 'London', month: 'Jul.', monthly_rainfall: 24 },
      { name: 'London', month: 'Aug.', monthly_rainfall: 35.6 },
      { name: 'Berlin', month: 'Jan.', monthly_rainfall: 12.4 },
      { name: 'Berlin', month: 'Feb.', monthly_rainfall: 23.2 },
      { name: 'Berlin', month: 'Mar.', monthly_rainfall: 34.5 },
      { name: 'Berlin', month: 'Apr.', monthly_rainfall: 99.7 },
      { name: 'Berlin', month: 'May.', monthly_rainfall: 52.6 },
      { name: 'Berlin', month: 'Jun.', monthly_rainfall: 35.5 },
      { name: 'Berlin', month: 'Jul.', monthly_rainfall: 37.4 },
      { name: 'Berlin', month: 'Aug.', monthly_rainfall: 42.4 }
    ];
    const chart = new F2.Chart({
      id: 'mountNode',
      pixelRatio: window.devicePixelRatio,
      width: 400,
      height: 260
    });
    chart.source(data);
    chart.tooltip({
      custom: true, // custom tooltip
      onChange(obj) {
        const legend = chart.get('legendController').legends.top[0]; // get legend
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.map(item => {
          map[item.name] = F2.Util.mix({}, item);
        });
        tooltipItems.map(item => {
          const { name, value } = item;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(Object.values(map));
      },
      onHide(tooltip) {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });

    chart.interval().position('month*monthly_rainfall')
      .color('name')
      .adjust({
        type: 'dodge',
        marginRatio: 0.05
      });
    chart.render();
```

