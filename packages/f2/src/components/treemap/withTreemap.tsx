import { Category } from '../../attr';
import Component from '../../base/component';
import CoordController from '../../controller/coord';
import Coord from '../../coord';
import { hierarchy, treemap, treemapBinary } from '../../deps/d3-hierarchy/src';
import { jsx } from '../../jsx';
import { Ref } from '../../types';

export default (View) => {
  return class Treemap extends Component {
    coordController: CoordController;
    coord: Coord;
    color: Category;
    triggerRef: Ref[];

    constructor(props, context, updater?) {
      super(props, context, updater);
      const { coord, color, data } = props;
      const { width, height, theme } = context;
      this.coordController = new CoordController();
      const { coordController } = this;
      this.coord = coordController.create(coord, { width, height });
      this.color = new Category({
        range: theme.colors,
        ...color,
        data,
      });
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
        const rect = coord.convertRect({
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
      return <View nodes={nodes} {...props} coord={coord} />;
    }
  };
};
