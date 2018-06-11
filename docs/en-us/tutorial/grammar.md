# Introduction to grammar of graphics

Like [G2](https://antv.alipay.com/zh-cn/g2/3.x/index.html), F2 is based on the theory proposed by Leland Wilkinson in The Grammar of Graphics. It is a set of rules to describe the characteristics of all statistical graphs. The grammar answers the question "What is a statistical graph", and it uses a bottom-up manner to form higher-level elements using basic elements.

So for F2, there is no concrete concept of chart types. All charts are formed by combining different graphic syntax elements. These graphic syntax elements include:

- The most basic part is the [data](./data.html) that you wish to visualize and a series of mappings that map the data's variables to the [graphical attributes](./attribute.html);
- [Geometry](./geometry.html): Geometry can be understood as the graphic elements you actually see in the chart, such as points, lines, polygons, etc. Each geometry object contains multiple graphic attributes. The core of graphic grammars used in F2 is to establish mappings from data variables to graphic attributes;
- [Scale](./scale.html): Scale is the conversion bridge from data space to graphic attribute space, each graphic attribute corresponds to one or more scales;
- [Coordinate](./coordinate.html): Coordinate describes how the data is mapped to the plane where the graph is located. A geometry will perform differently in different coordinates. F2 supports Cartesian and polar coordinates for now;
- The supplementary elements are used to enhance the readability and comprehensibility of the chart. The supplementary elements in F2 include Axis, Legend, Tooltip, and Guide.

So we usualy describes a chart in the following manner: A chart is a mapping from data source to graphic attributes of geometry object. In addition, the chart may also contain statistical transformations of the data. The chart will finally be drawn at a specific coordinate.

For more information about graphic grammars, read:

- [Understanding F2 Charts](./understanding-f2-charts.html)
- [Data](./data.html)
- [Scale](./scale.html)
- [Geometry](./geometry.html)
- [Attribute](./attribute.html)
- [Coordinate](./coordinate.html)