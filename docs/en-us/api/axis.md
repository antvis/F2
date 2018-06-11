# Axis

Configuration for axes. The composition of the axis of F2 is as follows:

<img src="https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png" style="width: 500px;">

## API

### `chart.axis(false)`

Do not render the axes.

### `chart.axis(field, false)`

Do not render the axis corresponding to the field.

- `field`: String, the data field name corresponding to the axis

### `chart.axis(field, config)`

Setups for the axis corresponding to the field.

- `field`: String, the data field name corresponding to the axis

- `config`: Object, configuration object for the axis. It can be used to configure each component of the axis:

  |   Attribute   |         Type         |                         Description                          |
  | :-----------: | :------------------: | :----------------------------------------------------------: |
  |    `line`     |     Object/null      | The coordinate axis line's configuration. The axis line is not displayed when `line` set to null. It supports all canvas attributes, see [./canvas.html] for more details |
  | `labelOffset` |        Number        |       The distance between the axis text and axis line       |
  |    `grid`     | Object/Function/null | The coordinate grid's configuration. The coordinate grid is not displayed when `grid` is set to null. It supports all canvas attributes, see [./canvas.html] for more details |
  |  `tickLine`   |     Object/null      | The configuration for style of the scale line in axis. The scale line of axis is not displayed when `tickLine` is set to null. It supports all canvas attributes, see [./canvas.html] for more details |
  |    `label`    | Object/Function/null | Configuration for text of the axis. The text of the axis is not displayed when `label` is set to null. It supports all canvas attributes, see [./canvas.html] for more details |
  |  `position`   |        String        | Configuration for the position of the axes. X-axis defaults to 'bottom', the position of y-axis can be set to 'left' or 'right' |
  |     `top`     |       Boolean        | Used to adjust the layer level. True represents the top layer level, false means the bottom layer level. |

  **Note: When grid and label are callback functions, the return values must be an object**

  Example:

  ```js
  chart.axis('field', {
    // Set the style of the axis line
    line: {
      lineWidth: 1, 
      stroke: '#ccc' 
    }, 
    // distance between the axis text and axis line
    labelOffset: 20, 
    // axis scale line
    tickLine: {
      lineWidth: 1,
      stroke: '#ccc',
      length: 5,// length of the scale line
    },
    // highlight for grid line at 0%
    grid: (text, index) => {
      if(text === '0%') {
        return {
          stroke: '#efefef'
        };
      }
      return {
        stroke: '#f7f7f7'
      }
    },
    // The fist one is left-aligned, the last one is right-aligned, the rest is centered, and it is left-aligned when there is only one point.
    label: (text, index, total) => {
      const cfg = {
        textAlign: 'center'
      };
      if (index === 0) {
        cfg.textAlign = 'start';
      }
      if (index > 0 && index === total - 1) {
        cfg.textAlign = 'end';
      }
      cfg.text = text + '%';  // cfg.text supports text formatting
      return cfg;
    }
  });
  ```

  