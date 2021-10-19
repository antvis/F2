import { jsx } from '../../jsx';
import Component from '../../base/component';
import { Category } from '../../attr';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { applyMixins } from '../../mixins';
import CoordMixin from '../../mixins/coord';
import Coord from '../../coord';

export default (View): any => {
  class Treemap extends Component implements CoordMixin {
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
    treemapLayout() {
      const { props, coord, color: colorAttr } = this;
      const { data, value, space = 0 } = props;

      const root = hierarchy({ children: data })
        .sum(function(d) {
          return d[value];
        })
        .sort((a, b) => b[value] - a[value]);

      const treemapLayout = treemap()
        // 默认treemapSquarify
        .tile(treemapBinary)
        // .size([1, 1])
        .round(false);
      // .padding(space)
      // .paddingInner(space);
      // .paddingOuter(options.paddingOuter)
      // .paddingTop(options.paddingTop)
      // .paddingRight(options.paddingRight)
      // .paddingBottom(options.paddingBottom)
      // .paddingLeft(options.paddingLeft);
      const nodes = treemapLayout(root);
      return nodes.children.map(item => {
        const { data, x0, y0, x1, y1 } = item;
        const color = colorAttr.mapping(data[colorAttr.field]);
        const rect = coord.convertRect({
          xMin: x0,
          xMax: x1,
          yMin: y0,
          yMax: y1
        });
        return {
          data,
          color,
          ...rect
        };
      });
    }

    render() {
      const nodes = this.treemapLayout();
      const { props, coord } = this;
      return <View nodes={nodes} {...props} coord={coord} />;
    }
  }

  applyMixins(Treemap, [CoordMixin]);

  return Treemap;
};
