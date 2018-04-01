const Util = require('../../util/common');
const GuideBase = require('./base');

class Tag extends GuideBase {
  _initDefaultCfg() {
    this.type = 'tag';
    this.position = null;
    this.content = null;
    this.direct = 'auto'; // 默认自动计算，如果用户设置了就按照用户设置的渲染
    this.offsetX = 0;
    this.offsetY = 0;
    this.side = 4; //  三角标的边长
    this.background = {
      padding: 5, // tag 内边距
      radius: 2, // tag 圆角
      fill: '#1890FF' // tag 背景色
    };
    this.textStyle = {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    };
    this.withPoint = true;
    this.pointStyle = {
      fill: '#1890FF',
      r: 3,
      lineWidth: 1,
      stroke: '#fff'
    };
  }

  _getDirect(container, point, tagWidth, tagHeight) {
    let direct = this.direct;
    if (direct === 'auto') { // 自动计算
      const side = this.side;
      const canvas = container.get('canvas');
      const clientWidth = canvas.getWidth();
      const clientHeight = canvas.getHeight();
      const { x, y } = point;

      let vertical = 't';
      let horizontal = 'l';

      if (y - side - tagHeight < 0) {
        vertical = 'b';
      }

      if (vertical === 'b') {
        if (y + side + tagHeight > clientHeight) {
          vertical = 't';
        }
      }

      const diff = vertical === 'c' ? side : 0;
      if (x - diff - tagWidth < 0) {
        horizontal = 'r';
      }
      if (horizontal === 'r') {
        const diff = vertical === 'c' ? side : 0;
        if (x + diff + tagWidth > clientWidth) {
          horizontal = 'l';
        }
      }
      direct = vertical + horizontal;
      this.direct = direct;
    }

    return direct;
  }

  render(coord, container) {
    const position = this.parsePoint(coord, this.position);
    const { content, background, textStyle } = this;

    const wrapperContainer = container.addGroup({
      className: 'guide-tag'
    });

    if (this.withPoint) {
      wrapperContainer.addShape('Circle', {
        className: 'guide-tag-point',
        attrs: Util.mix({
          x: position.x,
          y: position.y
        }, this.pointStyle)
      });
    }

    const tagContainer = wrapperContainer.addGroup();
    // 绘制文本
    const tagText = tagContainer.addShape('text', {
      className: 'guide-tag-text',
      zIndex: 1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        text: content
      }, textStyle)
    });

    // 绘制背景框
    const textBBox = tagText.getBBox();
    const padding = Util.parsePadding(background.padding);
    const tagWidth = textBBox.width + padding[1] + padding[3];
    const tagHeight = textBBox.height + padding[0] + padding[2];
    const yMin = textBBox.minY - padding[0];
    const xMin = textBBox.minX - padding[3];
    const tagBg = tagContainer.addShape('rect', {
      className: 'guide-tag-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: xMin,
        y: yMin,
        width: tagWidth,
        height: tagHeight
      }, background)
    });
    const direct = this._getDirect(container, position, tagWidth, tagHeight);
    const side = this.side;
    let x = position.x + this.offsetX;
    let y = position.y + this.offsetY;
    let arrowPoints;
    const radius = Util.parsePadding(background.radius);
    if (direct === 'tl') {
      arrowPoints = [
        { x: tagWidth - side + xMin, y: tagHeight + yMin - 1 }, // 这个 1 是为了防止出现白边
        { x: tagWidth + xMin, y: tagHeight + yMin - 1 },
        { x: tagWidth + xMin, y: tagHeight + side + yMin }
      ];
      radius[2] = 0;
      x = x - tagWidth;
      y = y - side - tagHeight;
    } else if (direct === 'cl') {
      arrowPoints = [
        { x: tagWidth + xMin - 1, y: (tagHeight - side) / 2 + yMin },
        { x: tagWidth + xMin - 1, y: (tagHeight + side) / 2 + yMin },
        { x: tagWidth + side + xMin, y: tagHeight / 2 + yMin }
      ];

      x = x - tagWidth - side;
      y = y - tagHeight / 2;
    } else if (direct === 'bl') {
      arrowPoints = [
        { x: tagWidth + xMin, y: -side + yMin },
        { x: tagWidth - side + xMin, y: yMin + 1 },
        { x: tagWidth + xMin, y: yMin + 1 }
      ];
      radius[1] = 0;

      x = x - tagWidth;
      y = y + side;
    } else if (direct === 'bc') {
      arrowPoints = [
        { x: tagWidth / 2 + xMin, y: -side + yMin },
        { x: (tagWidth - side) / 2 + xMin, y: yMin + 1 },
        { x: (tagWidth + side) / 2 + xMin, y: yMin + 1 }
      ];
      x = x - tagWidth / 2;
      y = y + side;
    } else if (direct === 'br') {
      arrowPoints = [
        { x: xMin, y: -side + yMin },
        { x: xMin, y: yMin + 1 },
        { x: side + xMin, y: yMin + 1 }
      ];
      radius[0] = 0;
      y = y + side;
    } else if (direct === 'cr') {
      arrowPoints = [
        { x: -side + xMin, y: tagHeight / 2 + yMin },
        { x: xMin + 1, y: (tagHeight - side) / 2 + yMin },
        { x: xMin + 1, y: (tagHeight + side) / 2 + yMin }
      ];
      x = x + side;
      y = y - tagHeight / 2;
    } else if (direct === 'tr') {
      arrowPoints = [
        { x: 0 + xMin, y: tagHeight + side + yMin },
        { x: 0 + xMin, y: tagHeight + yMin - 1 },
        { x: side + xMin, y: tagHeight + yMin - 1 }
      ];
      radius[3] = 0;

      y = y - tagHeight - side;
    } else if (direct === 'tc') {
      arrowPoints = [
        { x: (tagWidth - side) / 2 + xMin, y: tagHeight + yMin - 1 },
        { x: (tagWidth + side) / 2 + xMin, y: tagHeight + yMin - 1 },
        { x: tagWidth / 2 + xMin, y: tagHeight + side + yMin }
      ];
      x = x - tagWidth / 2;
      y = y - tagHeight - side;
    }

    tagContainer.addShape('Polygon', {
      zIndex: 0,
      attrs: {
        points: arrowPoints,
        fill: background.fill
      }
    });

    tagBg.attr('radius', radius);
    tagContainer.moveTo(x - xMin, y - yMin);
    tagContainer.sort();

    this.element = wrapperContainer;
  }
}

GuideBase.Tag = Tag;
module.exports = Tag;
