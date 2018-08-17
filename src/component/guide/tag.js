const Util = require('../../util/common');
const GuideBase = require('./base');

class Tag extends GuideBase {
  _initDefaultCfg() {
    this.type = 'tag';
    this.position = null;
    this.content = null;
    this.direct = 'tl';
    this.autoAdjust = true;
    this.offsetX = 0;
    this.offsetY = 0;
    this.side = 4;
    this.background = {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
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
    const side = this.side;
    const canvas = container.get('canvas');
    const clientWidth = canvas.get('width');
    const clientHeight = canvas.get('height');
    const { x, y } = point;

    let vertical = direct[0];
    let horizontal = direct[1];

    // adjust for vertical direction
    if (vertical === 't' && (y - side - tagHeight) < 0) {
      vertical = 'b';
    } else if (vertical === 'b' && (y + side + tagHeight) > clientHeight) {
      vertical = 't';
    }
    // adjust for horizontal direction
    const diff = vertical === 'c' ? side : 0;
    if (horizontal === 'l' && (x - diff - tagWidth) < 0) {
      horizontal = 'r';
    } else if (horizontal === 'r' && (x + diff + tagWidth) > clientWidth) {
      horizontal = 'l';
    } else if (horizontal === 'c') {
      if (tagWidth / 2 + x + diff > clientWidth) {
        horizontal = 'l';
      } else if (x - (tagWidth / 2) - diff < 0) {
        horizontal = 'r';
      }
    }

    direct = vertical + horizontal;
    return direct;
  }

  render(coord, container) {
    const position = this.parsePoint(coord, this.position);
    if (!position) {
      return;
    }
    const { content, background, textStyle } = this;
    const shapes = [];

    const wrapperContainer = container.addGroup({
      className: 'guide-tag'
    });

    if (this.withPoint) {
      const pointShape = wrapperContainer.addShape('Circle', {
        className: 'guide-tag-point',
        attrs: Util.mix({
          x: position.x,
          y: position.y
        }, this.pointStyle)
      });
      shapes.push(pointShape);
    }

    const tagContainer = wrapperContainer.addGroup();
    // create a text shape
    const tagText = tagContainer.addShape('text', {
      className: 'guide-tag-text',
      zIndex: 1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        text: content
      }, textStyle)
    });
    shapes.push(tagText);

    // create background box
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
    shapes.push(tagBg);
    const direct = this.autoAdjust ? this._getDirect(container, position, tagWidth, tagHeight) : this.direct;
    const side = this.side;
    let x = position.x + this.offsetX;
    let y = position.y + this.offsetY;
    let arrowPoints;
    const radius = Util.parsePadding(background.radius);
    if (direct === 'tl') {
      arrowPoints = [
        { x: tagWidth + xMin - side - 1, y: tagHeight + yMin - 1 }, // 这个 1 是为了防止出现白边
        { x: tagWidth + xMin, y: tagHeight + yMin - 1 },
        { x: tagWidth + xMin, y: tagHeight + side + yMin }
      ];
      radius[2] = 0;
      x = x - tagWidth;
      y = y - side - tagHeight;
    } else if (direct === 'cl') {
      arrowPoints = [
        { x: tagWidth + xMin - 1, y: (tagHeight - side) / 2 + yMin - 1 },
        { x: tagWidth + xMin - 1, y: (tagHeight + side) / 2 + yMin + 1 },
        { x: tagWidth + side + xMin, y: tagHeight / 2 + yMin }
      ];

      x = x - tagWidth - side;
      y = y - tagHeight / 2;
    } else if (direct === 'bl') {
      arrowPoints = [
        { x: tagWidth + xMin, y: -side + yMin },
        { x: tagWidth + xMin - side - 1, y: yMin + 1 },
        { x: tagWidth + xMin, y: yMin + 1 }
      ];
      radius[1] = 0;

      x = x - tagWidth;
      y = y + side;
    } else if (direct === 'bc') {
      arrowPoints = [
        { x: tagWidth / 2 + xMin, y: -side + yMin },
        { x: (tagWidth - side) / 2 + xMin - 1, y: yMin + 1 },
        { x: (tagWidth + side) / 2 + xMin + 1, y: yMin + 1 }
      ];
      x = x - tagWidth / 2;
      y = y + side;
    } else if (direct === 'br') {
      arrowPoints = [
        { x: xMin, y: yMin - side },
        { x: xMin, y: yMin + 1 },
        { x: xMin + side + 1, y: yMin + 1 }
      ];
      radius[0] = 0;
      y = y + side;
    } else if (direct === 'cr') {
      arrowPoints = [
        { x: xMin - side, y: tagHeight / 2 + yMin },
        { x: xMin + 1, y: (tagHeight - side) / 2 + yMin - 1 },
        { x: xMin + 1, y: (tagHeight + side) / 2 + yMin + 1 }
      ];
      x = x + side;
      y = y - tagHeight / 2;
    } else if (direct === 'tr') {
      arrowPoints = [
        { x: xMin, y: tagHeight + side + yMin },
        { x: xMin, y: tagHeight + yMin - 1 },
        { x: side + xMin + 1, y: tagHeight + yMin - 1 }
      ];
      radius[3] = 0;

      y = y - tagHeight - side;
    } else if (direct === 'tc') {
      arrowPoints = [
        { x: (tagWidth - side) / 2 + xMin - 1, y: tagHeight + yMin - 1 },
        { x: (tagWidth + side) / 2 + xMin + 1, y: tagHeight + yMin - 1 },
        { x: tagWidth / 2 + xMin, y: tagHeight + side + yMin }
      ];
      x = x - tagWidth / 2;
      y = y - tagHeight - side;
    }

    const sideShape = tagContainer.addShape('Polygon', {
      className: 'guide-tag-side',
      zIndex: 0,
      attrs: {
        points: arrowPoints,
        fill: background.fill
      }
    });
    shapes.push(sideShape);

    tagBg.attr('radius', radius);
    tagContainer.moveTo(x - xMin, y - yMin);
    tagContainer.sort();

    this.element = wrapperContainer;
    return shapes;
  }
}

GuideBase.Tag = Tag;
module.exports = Tag;
