#  Understanding F2 Chars

In order to better use F2 for data visualization, we need to undertand the composition of F2 charts and related terms.

## F2 Charts

In general, F2 chart includes Axis, Geometry, Tooltip, Legend, etc., and may also includes Guide, Data Labels.

The basic components of F2 chart is shown below:

<img src="https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png" style="width: 373px;">

<img src="https://gw.alipayobjects.com/zos/rmsportal/lUqXwLjgRWhugemcNsqc.png" style="width: 373px;">

## Terms

|    Term    |               Description                |
| :--------: | :--------------------------------------: |
|    Axis    | Each chart usually contains two axes, x-axis and y-axis in Cartesian coordinate and the angle and radius in polar coordinate. Each axis consists of a coordiante line, a tick line, a label and a grid. |
|   Legend   | Legend serves as an auxiliary element of the chart, and is used to demonstrate data types and the range of values. It is used to assist in reading the chart and help the user filter the data in chart. |
|  Geometry  | Geometries are shapes such as points, lines, areas. The type of geometry in graphic syntax determines ther type of the generated chart, that is, the actual display after data visualization. Different geometries contain corresponding attributes. |
| Attribute  | Attributes correspond to visual channels in visual coding and are very important and flexible in graphic syntax. Different geometries have their own attributes. F2 provides position, color, size and shape these four attributes. |
| Coordinate | A coordinate is a 2-dimensional positioning system that combines two kinds of position scales and describes how the data to mapped to the plane where chart is located. |
|  Tooltip   | When the mouse is hovered over a certain point, the information of the data corresponding to the currrent point is displayed in the form of a prompt box, such as the value of the point, the data unit, etc.. Tooltip helps user to obtain the specific information from the chart. |
|   Guide    | When you need to draw auxiliary lines, auxiliary frames or text on a chart, such as the warning line, the highest value line, or marking a clear range of areas, the Guide is a very helpful tool. |

