import { jsx } from '../../jsx';
import Component from '../../base/component';
import { partition, hierarchy } from 'd3-hierarchy';
import { Category } from '../../attr';
import { isInBBox, isFunction } from '../../util';
import { applyMixins } from '../../mixins';
import CoordMixin from '../../mixins/coord';
import { mix } from '@antv/util';
import Coord from '../../coord';

function rootParent(data) {
  let d = data;
  while (d.depth > 1) {
    d = d.parent;
  }
  return d;
}

export default (View): any => {
  class Sunburst extends Component implements CoordMixin {
    coord: Coord;
    color: Category;
    triggerRef: any[];

    createCoord: (coord, option) => Coord;
    updateCoord: (coord, option) => Coord;

    constructor(props, context) {
      super(props, context);
      const { coord, color, data } = props;
      const { width, height, theme } = context;
      this.coord = this.createCoord(coord, { width, height });
      this.color = new Category({
        range: theme.colors,
        ...color,
        data
      });
    }

    didMount() {
      const { props, container } = this;
      const { onClick } = props;
      const canvas = container.get('canvas');

      this.triggerRef = [];

      canvas.on('click', ev => {
        const { points } = ev;
        const shape = this.triggerRef.find(ref => {
          return isInBBox(ref.current.getBBox(), points[0]);
        });
        if (shape) {
          ev.shape = shape;
          ev.payload = shape.payload;
          onClick && onClick(ev);
        }
      });
    }

    _mapping(children) {
      const { color: colorAttr, coord } = this;
      for (let i = 0, len = children.length; i < len; i++) {
        const node = children[i];
        const root = rootParent(node);
        const color = colorAttr.mapping(root.data[colorAttr.field]);
        node.color = color;
        const rect = coord.convertRect({
          xMin: node.x0,
          xMax: node.x1,
          yMin: node.y0,
          yMax: node.y1
        });
        mix(node, rect);
        // 递归处理
        if (node.children && node.children.length) {
          this._mapping(node.children);
        }
      }
    }

    sunburst() {
      const { props } = this;
      const { data, value, sort = true } = props;

      const root = hierarchy({ children: data }).sum(function(d) {
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
      const node = this.sunburst();
      const { coord, props } = this;
      return (
        <View
          {...props}
          coord={coord}
          node={node}
          triggerRef={this.triggerRef}
        />
      );
    }
  }

  applyMixins(Sunburst, [CoordMixin]);

  return Sunburst;
};
