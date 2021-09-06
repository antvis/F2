import { jsx } from "../../jsx";
import Component from "../../base/component";
import { isString, isArray } from "@antv/util";
import { deepMix } from "@antv/util";
import * as guideViews from "./views";

function isInBBox(bbox, point) {
  const { minX, maxX, minY, maxY } = bbox;
  const { x, y } = point;
  return minX <= x && maxX >= x && minY <= y && maxY >= y;
}

export default (View) => {
  return class Guide extends Component {
    chart: any;
    triggerRef: any;

    mount() {
      const { container, props } = this;
      const { onClick } = props;
      const canvas = container.get("canvas");
      // 创建ref
      this.triggerRef = {};

      canvas.on("click", (ev) => {
        const { points } = ev;
        const shape = this.triggerRef.current;
        if (!shape) return;
        const bbox = shape.getBBox();
        if (isInBBox(bbox, points[0])) {
          ev.shape = shape;
          onClick && onClick(ev);
        }
      });
    }

    // 解析record里的模板字符串，如min、max、50%...
    parseReplaceStr(value, scale) {
      const { min, max } = scale;
      const absRange = Math.abs(min) + Math.abs(max);
      const replaceMap = { min, max, median: absRange / 2 };

      // 传入的是 min、max、median 的
      if (replaceMap[value]) {
        return replaceMap[value];
      }

      // 传入的是 xx%
      if (
        isString(value) &&
        value.indexOf("%") != -1 &&
        !isNaN(Number(value.slice(0, -1)))
      ) {
        const rateValue = Number(value.slice(0, -1));
        const percent = (rateValue / 100) * absRange;
        if (percent <= min) {
          return min;
        }
        if (percent >= max) {
          return max;
        }
        return percent;
      }

      return value;
    }

    getPosition(): any[] {
      const { start, end, position } = this.props;

      if (isArray(position)) {
        return [position];
      }

      if (isArray(start) && isArray(end)) {
        return [start, end];
      }
      return [];
    }

    parsePoint(position) {
      const { chart } = this;
      const { coord } = chart;

      // 默认只取第一个Scale
      const xScale = chart.getXScales()[0];
      const yScale = chart.getYScales()[0];

      // 解析record
      const xValue = this.parseReplaceStr(position[0], xScale);
      const yValue = this.parseReplaceStr(position[1], yScale);

      // 归一化
      const x = xScale.scale(xValue);
      const y = yScale.scale(yValue);

      return coord.convertPoint({ x, y });
    }

    getGuideView() {
      const { type } = this.props;
      const InnerGuideView = guideViews[type];
      if (InnerGuideView) {
        return InnerGuideView;
      }
      if (View) {
        return View;
      }
      return null;
    }

    getDefaultAttrs() {
      const { type } = this.props;
      const { theme } = this.chart;
      return theme["guide"][type] || {};
    }

    render() {
      const { props } = this;
      const { style } = props;

      // 获取guide的视图
      const GuideView = this.getGuideView();

      // 将guide里的源数据映射为坐标点
      const positions = this.getPosition();
      const points = positions.map((position) => this.parsePoint(position));

      // 获取guide图形属性
      const defaultAttrs = this.getDefaultAttrs();
      const guideAttrs = deepMix({ ...defaultAttrs.style }, style);

      return (
        <GuideView
          ref={this.triggerRef}
          {...props}
          points={points}
          style={guideAttrs}
        />
      );
    }
  };
};
