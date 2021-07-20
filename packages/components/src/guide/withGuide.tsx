import { jsx } from "@ali/f2-jsx";
import Component from "../component/index";
import { isArray, isFunction } from "@ali/f2x-util";

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
    parsePoint() {
      const { position: originPosition } = this.props;
      const { chart } = this;
      const { coord } = chart;
      const xScale = chart.getXScale();

      let position = [];
      if (isFunction(originPosition)) {
        position = originPosition();
      } else if (isArray(originPosition) && originPosition.length === 2) {
        position = originPosition;
      }

      // 只取第一个yScale
      const yScale = chart.getYScales()[0];
      const x = xScale.scale(position[0]);
      const y = yScale.scale(position[1]);
      return coord.convertPoint({ x, y });
    }
    render() {
      const { props } = this;
      const point = this.parsePoint();

      return <View triggerRef={this.triggerRef} point={point} {...props} />;
    }
  };
};
