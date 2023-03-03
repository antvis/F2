import { jsx, Ref, Component } from '@antv/f-engine';
import { partition, hierarchy } from '../../deps/d3-hierarchy/src';
import { Category } from '../../attr';
import CoordController from '../../controller/coord';
import { mix, isFunction } from '@antv/util';
import Theme from '../../theme';
import { Data, DataRecord } from '../../chart/Data';
import { CoordProps } from '../../chart/Coord';

function rootParent(data) {
  let d = data;
  while (d.depth > 1) {
    d = d.parent;
  }
  return d;
}
export interface ColorAttrObject {
  field: string;
  range?: any[];
  callback?: (value) => any;
}

export interface SunburstProps<TRecord extends DataRecord = DataRecord> {
  data: Data<TRecord>;
  coord?: CoordProps;
  color?: any[] | ColorAttrObject;
  value?: string;
  sort?: boolean;
  onClick?: (ev) => void;
}

export default (View) => {
  return class Sunburst<
    TRecord extends DataRecord = DataRecord,
    IProps extends SunburstProps<TRecord> = SunburstProps<TRecord>
  > extends Component<IProps> {
    coord: CoordController;
    color: Category;
    triggerRef: Ref[];

    constructor(props: IProps, context) {
      super(props, context);
      const { color, data } = props;

      this.coord = new CoordController();

      this.color = new Category({
        range: Theme.colors,
        ...color,
        data,
      });
    }

    willMount() {
      const { props, coord, layout } = this;
      const { coord: coordOption } = props;
      coord.updateLayout(layout);

      coord.create(coordOption);
    }

    didMount() {}

    _mapping(children) {
      const { color: colorAttr, coord } = this;
      for (let i = 0, len = children.length; i < len; i++) {
        const node = children[i];
        const root = rootParent(node);
        const color = colorAttr.mapping(root.data[colorAttr.field]);
        node.color = color;
        const { x0, x1, y0, y1 } = node;
        const rect = coord.getCoord().convertRect({
          x: [x0, x1],
          y: [y0, y1],
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
      return <View {...props} coord={coord.getCoord()} node={node} triggerRef={this.triggerRef} />;
    }
  };
};
