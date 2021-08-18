import { jsx } from "@ali/f2-jsx";
import Component from "../component";
import { partition, hierarchy } from "d3-hierarchy";
import { Category } from "@ali/f2-attr";
import { isFunction, isInBBox } from "@ali/f2x-util";

function rootParent(data) {
  let d = data;
  while (d.depth > 1) {
    d = d.parent;
  }
  return d;
}

export default (View) => {
  return class Sunburst extends Component {
    color: Category;
    triggerRef: any;

    mount() {
      const { props, container } = this;
      const canvas = container.get("canvas");
      const { data, color, onClick } = props;

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

      this.color = new Category({
        ...color,
        data,
      });
    }

    _mapping(children) {
      const { color: colorAttr } = this;
      for (let i = 0, len = children.length; i < len; i++) {
        const node = children[i];
        const root = rootParent(node);
        const color = colorAttr.mapping(root.data[colorAttr.field]);
        node.color = color;
        // 递归处理
        if (node.children && node.children.length) {
          this._mapping(node.children);
        }
      }
    }

    _computeText = (text, attrs) => {
      const { container } = this;
      const group = container.addGroup();
      const shape = group.addShape("text", {
        attrs: {
          ...attrs,
          x: 0,
          y: 0,
          text: text,
        },
      });
      const bbox = shape.getBBox();
      shape.remove();
      return { width: bbox.width, height: bbox.height };
    };

    sunburst() {
      const { props } = this;
      const { data, value, sort = true } = props;

      const root = hierarchy({ children: data }).sum(function (d) {
        return d[value];
      });

      // 内置按value大小顺序排序，支持传入sort函数
      if (sort === true || isFunction(sort)) {
        const sortFn = isFunction(sort) ? sort : (a, b) => b[value] - a[value];
        root.sort(sortFn);
      }

      const nodes = partition()(root);
      const { children } = nodes;
      this._mapping(children);
      return nodes;
    }

    render() {
      const nodes = this.sunburst();
      const { props, _computeText } = this;
      return (
        <View
          {...props}
          ref={this.triggerRef}
          nodes={nodes}
          computeText={_computeText}
        />
      );
    }
  };
};
