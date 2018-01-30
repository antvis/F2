/**
 * @fileOverview guide tag
 * @author 杍鱼 <yancheng.cyc@antfin.com>
 */

const Guide = require('./guide');
const G = require('../graphic/g');
const Global = require('../global');
const Util = require('../util');

/**
 * 文字提示Tag
 * {string} direct 两个字符长度，支持八个方向朝向. 例如 tl 表示左上角tag
 * direct第一个表示垂直方向 t - top, c - center, b - bottom
 * direct第二个表示水平方向 l - left, c - center, r - right
 * @class  Guide.Tag
 */
class Tag extends Guide {
  getDefaultCfg() {
    return {
      type: 'tag',
      point: [],
      top: true,
      text: '',
      defaultCfg: Global.guide.tag
    };
  }

  // override paint
  paint(coord, canvas) {
    const self = this;
    const { defaultCfg, text } = self;
    const cfg = Util.mix({}, defaultCfg, self.cfg);
    const point = self.parsePoint(coord, self.point);
    const { padding } = cfg;
    if (!cfg.font) {
      const fontCfg = {};
      Util.mix(fontCfg, defaultCfg, cfg);
      cfg.font = [
        fontCfg.fontStyle,
        fontCfg.fontVariant,
        fontCfg.fontWeight,
        fontCfg.fontSize + 'px',
        fontCfg.fontFamily
      ].join(' ');
    }
    const textSize = this.getTextSize(text, canvas, cfg.font);
    const paddingArray = this.getPadding(padding);
    const tagWidth = textSize.width + paddingArray[1] + paddingArray[3];
    const tagHeight = textSize.height + paddingArray[0] + paddingArray[2];
    // tag边界自适应计算
    this.selfAdaption(point, tagWidth, tagHeight, canvas, cfg);
    // 渲染tag
    this.renderTag(point, text, tagWidth, tagHeight, canvas, cfg);
  }

  /**
   * 渲染tag的主方法
   * tag由三部分组成 1.rect矩形 2.三角标 3.文字内容
   * @param {string} point - 标记点坐标.
   * @param {string} text - 文字内容.
   * @param {string} tagWidth - tag宽度，不包括三角标.
   * @param {string} tagHeight - tag高度，不包括三角标..
   * @param {string} canvas - 渲染的canvas.
   * @param {string} cfg - canvas渲染上下文
   */
  renderTag(point, text, tagWidth, tagHeight, canvas, cfg) {
    const { direct, side, offsetX, offsetY } = cfg;
    const x = point.x + offsetX;
    const y = point.y + offsetY;

    let rectPoints = [];
    let sidePoints = [];
    let textPosition = {};
    switch (direct) {
      case 'tl':
        rectPoints = [{ x: x - tagWidth, y: y - tagHeight - side }, { x, y: y - side }];
        sidePoints = [{ x, y: y - side }, { x: x - side, y: y - side }, { x, y }];
        textPosition = { x: x - tagWidth + tagWidth / 2, y: y - tagHeight - side + tagHeight / 2 };
        cfg.assignRadius = [ true, false, true, true ];
        break;
      case 'tc':
        rectPoints = [{ x: x - tagWidth / 2, y: y - tagHeight - side }, { x: x + tagWidth / 2, y: y - side }];
        sidePoints = [{ x, y }, { x: x + side, y: y - side }, { x: x - side, y: y - side }];
        textPosition = { x: x - tagWidth / 2 + tagWidth / 2, y: y - tagHeight - side + tagHeight / 2 };
        break;
      case 'tr':
        rectPoints = [{ x, y: y - tagHeight - side }, { x: x + tagWidth, y: y - side }];
        sidePoints = [{ x, y }, { x, y: y - side }, { x: x + side, y: y - side }];
        textPosition = { x: x + tagWidth / 2, y: y - tagHeight - side + tagHeight / 2 };
        cfg.assignRadius = [ true, true, false, true ];
        break;
      case 'cl':
        rectPoints = [{ x: x - side - tagWidth, y: y - tagHeight / 2 }, { x: x - side, y: y + tagHeight / 2 }];
        sidePoints = [{ x, y }, { x: x - side, y: y + side }, { x: x - side, y: y - side }];
        textPosition = { x: x - side - tagWidth + tagWidth / 2, y: y - tagHeight / 2 + tagHeight / 2 };
        break;
      case 'cr':
        rectPoints = [{ x: x + side, y: y - tagHeight / 2 }, { x: x + side + tagWidth, y: y + tagHeight / 2 }];
        sidePoints = [{ x, y }, { x: x + side, y: y + side }, { x: x + side, y: y - side }];
        textPosition = { x: x + side + tagWidth / 2, y: y - tagHeight / 2 + tagHeight / 2 };
        break;
      case 'bl':
        rectPoints = [{ x: x - tagWidth, y: y + side }, { x, y: y + side + tagHeight }];
        sidePoints = [{ x, y }, { x, y: y + side }, { x: x - side, y: y + side }];
        textPosition = { x: x - tagWidth + tagWidth / 2, y: y + side + tagHeight / 2 };
        cfg.assignRadius = [ false, true, true, true ];
        break;
      case 'bc':
        rectPoints = [{ x: x - tagWidth / 2, y: y + side }, { x: x + tagWidth / 2, y: y + side + tagHeight }];
        sidePoints = [{ x, y }, { x: x - side, y: y + side }, { x: x + side, y: y + side }];
        textPosition = { x: x - tagWidth / 2 + tagWidth / 2, y: y + side + tagHeight / 2 };
        break;
      case 'br':
        rectPoints = [{ x, y: y + side }, { x: x + tagWidth, y: y + side + tagHeight }];
        sidePoints = [{ x, y }, { x, y: y + side }, { x: x + side, y: y + side }];
        textPosition = { x: x + tagWidth / 2, y: y + side + tagHeight / 2 };
        cfg.assignRadius = [ true, true, true, false ];
        break;
      default:
        break;
    }
    this.paintRect(rectPoints, canvas, cfg); // 矩形
    this.paintSide(sidePoints, canvas, cfg); // 三角标
    this.paintText(text, textPosition, canvas, cfg); // 文字内容
  }

  paintRect(points, canvas, cfg) {
    G.drawRect(points, canvas, cfg);
  }

  paintText(text, position, canvas, cfg) {
    cfg.textBaseline = 'middle';
    cfg.textAlign = 'center';
    const style = {
      textBaseline: 'middle',
      textAlign: 'center',
      fill: cfg.color || '#ffffff'
    };
    G.drawText(text, position, canvas, Util.mix({}, cfg, style));
  }

  // 绘制三角形
  paintSide(points, canvas, cfg) {
    points.push(points[0]); // hack: 直接三个点三角形可能会有像素偏差
    G.drawLines(points, canvas, cfg);
  }

  /**
   * 自动计算如果tag超出画布边界改变方向
   * 改变朝向再对对应的偏移对称变化
   * @param {object} point - 标记点坐标.
   * @param {string} tagWidth - tag宽度，不包括三角标.
   * @param {string} tagHeight - tag高度，不包括三角标..
   * @param {object} canvas - 渲染的canvas.
   * @param {object} cfg - cfg上下文.
   */
  selfAdaption(point, tagWidth, tagHeight, canvas, cfg) {
    const { side, direct } = cfg;
    const { clientWidth, clientHeight } = canvas; // 屏幕上canvas实际尺寸
    const { x, y } = point;
    let offsetX = cfg.offsetX;
    let offsetY = cfg.offsetY;

    let vertical = direct.charAt(0);
    let horizontal = direct.charAt(1);
    if (vertical === 't') {
      if (y - side - tagHeight + offsetY < 0) {
        vertical = 'b';
        offsetY = -offsetY;
      }
    }
    if (vertical === 'b') {
      if (y + side + tagHeight + offsetY > clientHeight) {
        vertical = 't';
        offsetY = -offsetY;
      }
    }
    if (horizontal === 'l') {
      const diff = vertical === 'c' ? side : 0;
      if (x - diff - tagWidth + offsetX < 0) {
        horizontal = 'r';
        offsetX = -offsetX;
      }
    }
    if (horizontal === 'r') {
      const diff = vertical === 'c' ? side : 0;
      if (x + diff + tagWidth + offsetX > clientWidth) {
        horizontal = 'l';
        offsetX = -offsetX;
      }
    }
    cfg.offsetX = offsetX;
    cfg.offsetY = offsetY;
    cfg.direct = vertical + horizontal;
  }

  // 获取文字宽高
  getTextSize(text, canvas, font) {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.font = font;
    const width = parseInt(ctx.measureText(text).width);
    const height = parseInt(ctx.measureText('M').width); // 经验估算: canvas没有文本高度的api, 不同字体下M的宽度约等于高度
    ctx.restore();
    return { width, height };
  }

  // 解析padding 支持类css的写法
  getPadding(padding) {
    let top;
    let left;
    let right;
    let bottom;
    if (Util.isNumber(padding)) {
      top = bottom = padding;
      left = right = padding;
    } else if (Util.isArray(padding)) {
      top = padding[0];
      right = !Util.isNull(padding[1]) ? padding[1] : padding[0];
      bottom = !Util.isNull(padding[2]) ? padding[2] : padding[0];
      left = !Util.isNull(padding[3]) ? padding[3] : right;
    }
    return [ top, right, bottom, left ];
  }
}

module.exports = Tag;
