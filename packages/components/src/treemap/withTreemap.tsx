import { jsx } from '@ali/f2-jsx';
import Component from '../component';
import { hierarchy, treemap, treemapBinary } from 'd3-hierarchy';
import { Category } from '@ali/f2-attr';


export default View => {
  return class Treemap extends Component {

    treemapLayout() {
      const { props, layout } = this;
      const { width, height } = layout;
      const { data, value, color, space = 0 } = props;

      const colorAttr = new Category({
        ...color,
        data,
      });

      const root = hierarchy({ children: data })
        .sum(function(d) { return d[value]; })
        .sort((a, b) => b[value] - a[value]);
  
      const treemapLayout = treemap()
        // 默认treemapSquarify
        .tile(treemapBinary)
        .size([width, height])
        .round(false)
        // .padding(space)
        .paddingInner(space)
        // .paddingOuter(options.paddingOuter)
        // .paddingTop(options.paddingTop)
        // .paddingRight(options.paddingRight)
        // .paddingBottom(options.paddingBottom)
        // .paddingLeft(options.paddingLeft);
      const nodes = treemapLayout(root);
  
      return nodes.children.map(item => {
        const { data, x0, y0, x1, y1 } = item;
        const color = colorAttr.mapping(data[colorAttr.field]);
        return {
          data,
          x0,
          y0,
          x1,
          y1,
          color,
        }
      });
    }

    render() {
      const nodes = this.treemapLayout();
      const { props } = this;
      return <View
        nodes={ nodes }
        { ...props }
      />;
    }
  }
}
