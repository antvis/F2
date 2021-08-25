import { jsx } from "@jsx";
import Component from "../component/index";
import { isString } from "@antv/util";

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
      // // 创建ref
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

    parsePoint(record) {
      const { chart } = this;
      const { coord } = chart;
      const xScale = chart.getXScale();
      // 只取第一个yScale
      const yScale = chart.getYScales()[0];

      // 解析record
      const xValue = this.parseReplaceStr(record[xScale.field], xScale);
      const yValue = this.parseReplaceStr(record[yScale.field], yScale);

      // 归一化
      const x = xScale.scale(xValue);
      const y = yScale.scale(yValue);

      return coord.convertPoint({ x, y });
    }
    render() {
      const { props } = this;
      const { records } = props;
      const points = records.map((record) => this.parsePoint(record));

      return <View ref={this.triggerRef} points={points} {...props} />;
    }
  };
};
