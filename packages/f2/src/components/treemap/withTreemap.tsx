import { jsx, ClassComponent, Ref, Component } from '@antv/f-engine';
import { Category } from '../../attr';
import CoordController from '../../controller/coord';
import { hierarchy, treemap, treemapBinary } from '../../deps/d3-hierarchy/src';

export default (View): ClassComponent<any> => {
  return class Treemap extends Component {
    coord: CoordController;
    color: Category;
    triggerRef: Ref[];

    constructor(props, context) {
      super(props, context);
      const { color, data } = props;
      const { theme } = context;
      this.coord = new CoordController();
      this.color = new Category({
        range: theme.colors,
        ...color,
        data,
      });
    }

    willMount() {
      const { props, coord, style } = this;
      const { coord: coordOption } = props;
      coord.updateLayout(style);

      coord.create(coordOption);
    }

    treemapLayout() {
      const { props, coord, color: colorAttr } = this;
      const { data, value /* space = 0 */ } = props;

      const root = hierarchy({ children: data })
        .sum(function(d) {
          return d[value];
        })
        .sort((a, b) => b[value] - a[value]);

      const treemapLayout = treemap()
        // 默认treemapSquarify
        .tile(treemapBinary)
        // .size([1, 1])
        // @ts-ignore
        .round(false);
      // .padding(space)
      // .paddingInner(space);
      // .paddingOuter(options.paddingOuter)
      // .paddingTop(options.paddingTop)
      // .paddingRight(options.paddingRight)
      // .paddingBottom(options.paddingBottom)
      // .paddingLeft(options.paddingLeft);
      const nodes = treemapLayout(root);
      return nodes.children.map((item) => {
        const { data, x0, y0, x1, y1 } = item;
        const color = colorAttr.mapping(data[colorAttr.field]);
        const rect = coord.getCoord().convertRect({
          x: [x0, x1],
          y: [y0, y1],
        });
        return {
          key: data.key,
          origin: data,
          color,
          ...rect,
        };
      });
    }

    render() {
      const nodes = this.treemapLayout();
      const { props, coord } = this;
      return <View nodes={nodes} {...props} coord={coord.getCoord()} />;
    }
  };
};
