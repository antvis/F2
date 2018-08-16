const Util = require('../../util/common');
const Global = require('../../global');
const Vector2 = require('../../graphic/util/vector2');

class Abastract {
  _initDefaultCfg() {
    /**
     * ticks
     * @type {Array}
     */
    this.ticks = [];
    /**
     * the configuration for tickLine
     * @type {Object}
     */
    this.tickLine = {};
    /**
     * the direction of ticks, 1 means clockwise
     * @type {Number}
     */
    this.offsetFactor = 1;
    /**
     * the top container
     * @type {container}
     */
    this.frontContainer = null;
    /**
     * the back container
     * @type {[type]}
     */
    this.backContainer = null;
    /**
     * points for draw grid line
     * @type {Array}
     */
    this.gridPoints = [];
  }

  constructor(cfg) {
    this._initDefaultCfg();
    Util.mix(this, cfg);
    this.draw();
  }

  draw() {
    const { line, tickLine, label, grid } = this;

    grid && this.drawGrid(grid); // draw the grid lines
    tickLine && this.drawTicks(tickLine); // draw the tickLine
    line && this.drawLine(line); // draw axis line
    label && this.drawLabels(); // draw ticks
  }

  drawTicks(tickCfg) {
    const self = this;
    const ticks = self.ticks;
    const length = tickCfg.length;
    const container = self.getContainer(tickCfg.top);
    Util.each(ticks, function(tick) {
      const start = self.getOffsetPoint(tick.value);
      const end = self.getSidePoint(start, length);
      const shape = container.addShape('line', {
        className: 'axis-tick',
        attrs: Util.mix({
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y
        }, tickCfg)
      });
      shape._id = self._id + '-ticks';
    });
  }

  drawLabels() {
    const self = this;
    const labelOffset = self.labelOffset;
    const labels = self.labels;
    Util.each(labels, labelShape => {
      const container = self.getContainer(labelShape.get('top'));
      const start = self.getOffsetPoint(labelShape.get('value'));
      const { x, y } = self.getSidePoint(start, labelOffset);
      labelShape.attr(Util.mix({
        x,
        y
      }, self.getTextAlignInfo(start, labelOffset), labelShape.get('textStyle')));
      labelShape._id = self._id + '-' + labelShape.attr('text');
      container.add(labelShape);
    });
  }

  drawLine() {}

  drawGrid(grid) {
    const self = this;
    const { gridPoints, ticks } = self;
    let gridCfg = grid;
    const count = gridPoints.length;

    Util.each(gridPoints, function(subPoints, index) {
      if (Util.isFunction(grid)) {
        const tick = ticks[index] || {};
        gridCfg = Util.mix({}, Global._defaultAxis.grid, grid(tick.text, index, count));
      }

      if (gridCfg) {
        const type = gridCfg.type; // has two types: 'line' and 'arc'
        const points = subPoints.points;
        const container = self.getContainer(gridCfg.top);
        let shape;

        if (type === 'arc') {
          const { center, startAngle, endAngle } = self;
          const radius = Vector2.length([ points[0].x - center.x, points[0].y - center.y ]);
          shape = container.addShape('Arc', {
            className: 'axis-grid',
            attrs: Util.mix({
              x: center.x,
              y: center.y,
              startAngle,
              endAngle,
              r: radius
            }, gridCfg)
          });
        } else {
          shape = container.addShape('Polyline', {
            className: 'axis-grid',
            attrs: Util.mix({
              points
            }, gridCfg)
          });
        }

        shape._id = subPoints._id;
      }
    });
  }

  getOffsetPoint() {}
  getAxisVector() {}

  getOffsetVector(point, offset) {
    const self = this;
    const axisVector = self.getAxisVector(point);
    const normal = Vector2.normalize([], axisVector);
    const factor = self.offsetFactor;
    const verticalVector = [ normal[1] * -1 * factor, normal[0] * factor ];
    return Vector2.scale([], verticalVector, offset);
  }

  getSidePoint(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    return {
      x: point.x + offsetVector[0],
      y: point.y + offsetVector[1]
    };
  }

  getTextAlignInfo(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    let align;
    let baseLine;
    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
    }
    if (offsetVector[1] > 0) {
      baseLine = 'top';
    } else if (offsetVector[1] < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }
    return {
      textAlign: align,
      textBaseline: baseLine
    };
  }

  getContainer(isTop) {
    const { frontContainer, backContainer } = this;
    return isTop ? frontContainer : backContainer;
  }
}

module.exports = Abastract;
