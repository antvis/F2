import F2 from '@antv/f2';
import '@antv/data-set';
const DataSet = window.DataSet;

const {
  Shape,
  Util
} = F2;


Shape.registerShape('polygon', 'labeledPolygon', {
  draw: function draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      fill: cfg.color,
      points
    }, cfg.style);
    const polygon = container.addShape('Polygon', {
      className: 'polygon',
      attrs: style
    });
    // 在 polygon 的中心添加文本
    const text = container.addShape('Text', {
      // className: 'polygon',
      attrs: {
        x: (points[0].x + points[2].x) / 2,
        y: (points[0].y + points[2].y) / 2,
        text: cfg.origin._origin.name,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 12
      }
    });

    const polygonBBox = polygon.getBBox();
    const textBBox = text.getBBox();

    // 这里为了让文本显示全，根据文本和矩形框的宽度比来设置文本大小
    const ratio = polygonBBox.width / textBBox.width;
    text.attr('fontSize', ratio * 12 * 0.6);

    return [ polygon, text ];
  }
});

const data = {
  name: 'root',
  children: [{
    name: '分类 1',
    value: 560
  }, {
    name: '分类 2',
    value: 500
  }, {
    name: '分类 3',
    value: 150
  }, {
    name: '分类 4',
    value: 140
  }, {
    name: '分类 5',
    value: 115
  }, {
    name: '分类 6',
    value: 95
  }, {
    name: '分类 7',
    value: 90
  }, {
    name: '分类 8',
    value: 75
  }, {
    name: '分类 9',
    value: 98
  }, {
    name: '分类 10',
    value: 60
  }, {
    name: '分类 11',
    value: 45
  }, {
    name: '分类 12',
    value: 40
  }, {
    name: '分类 13',
    value: 40
  }, {
    name: '分类 14',
    value: 35
  }, {
    name: '分类 15',
    value: 40
  }, {
    name: '分类 16',
    value: 40
  }, {
    name: '分类 17',
    value: 40
  }, {
    name: '分类 18',
    value: 30
  }, {
    name: '分类 19',
    value: 28
  }, {
    name: '分类 20',
    value: 16
  }]
};
const dv = new DataSet.DataView();
dv.source(data, {
  type: 'hierarchy'
}).transform({
  field: 'value',
  type: 'hierarchy.treemap',
  tile: 'treemapResquarify',
  as: [ 'x', 'y' ]
});
const nodes = dv.getAllNodes();
nodes.map(function(node) {
  node.name = node.data.name;
  node.value = node.data.value;
  return node;
});

const chart = new F2.Chart({
  id: 'container',
  padding: 20,
  pixelRatio: window.devicePixelRatio
});
chart.source(nodes);
chart.scale({
  value: {
    nice: false
  }
});
chart.axis(false);
chart.legend(false);
chart.tooltip(false);
chart.polygon()
  .position('x*y')
  .color('name')
  .shape('labeledPolygon')
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });
chart.render();
