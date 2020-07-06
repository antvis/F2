import { mix } from '../util/common';

const DEFAULT_CFG = {
  label: null,
  offsetX: 0,
  offsetY: 0
};

const DEFAULT_LABEL_CFG = {
  textBaseline: 'middle',
  fill: '#808080'
};

// 2个点的中心点
function getMiddlePoint(a, b) {
  const x = (a.x - b.x) / 2 + b.x;
  const y = (a.y - b.y) / 2 + b.y;
  return { x, y };
}

// function getLabelPoint(points, nextPoints) {
//   let start;
//   if (nextPoints && nextPoints.length) {
//     start = getMiddlePoint(points[1], nextPoints[1]);
//   } else {
//     const nextPoint = getMiddlePoint(points[2], points[3]);
//     start = getMiddlePoint(points[1], nextPoint);
//   }
//   const end = getMiddlePoint(points[1], points[2]);
//   return { start, end };
// }

class Controller {
  constructor({ chart, container }) {
    this.cfg = null;
    this.chart = chart;
    this.container = container;
  }

  draw() {
    const { chart, container, cfg } = this;
    if (!cfg) return;
    const labelCfg = mix({}, DEFAULT_CFG, cfg);
    const coord = chart.get('coord');
    const geom = chart.get('geoms')[0];
    const shapes = geom.get('container').get('children');
    shapes.forEach(shape => {
      const origin = shape.get('origin');
      const { _origin, color, points } = origin;
      if (labelCfg.label) {
        const labelAttrs = labelCfg.label(_origin, color);
        const group = container.addGroup();
        const point = coord.convertPoint(getMiddlePoint(points[1], points[2]));

        group.addShape('Text', {
          attrs: mix({
            x: point.x + labelCfg.offsetX,
            y: point.y + labelCfg.offsetY
          }, labelAttrs, DEFAULT_LABEL_CFG)
        });
      }
    });
  }

  clear() {
    const { container } = this;
    container.clear();
  }
}

function init(chart) {
  const frontPlot = chart.get('frontPlot');
  const labelGroup = frontPlot.addGroup({
    className: 'label',
    zIndex: 0
  });
  const labelController = new Controller({
    chart,
    container: labelGroup
  });
  chart.set('intervalLabelController', labelController);
  chart.intervalLabel = function(cfg) {
    labelController.cfg = cfg;
  };
}
function afterGeomDraw(chart) {
  const labelController = chart.get('intervalLabelController');
  labelController.draw();
}

function clearInner(chart) {
  const labelController = chart.get('intervalLabelController');
  labelController.clear();
}

export {
  init,
  afterGeomDraw,
  clearInner
};

export default {
  init,
  afterGeomDraw,
  clearInner
};
