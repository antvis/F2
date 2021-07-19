import { jsx } from '@ali/f2-jsx';
import Component from '../component';
import { partition, hierarchy } from 'd3-hierarchy';
import { Category } from '@ali/f2-attr';

function rootParent(data) {
  let d = data;
  while (d.depth > 1){
    d = d.parent;
  }
  return d;
}

export default View => {
  return class Sunburst extends Component {

    color: Category;

    mount() {
      const { props } = this;
      const { data, color } = props;
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

    sunburst() {
      const { props } = this;
      const { data, value } = props;

      const root = hierarchy({ children: data })
        .sum(function(d) { return d[value]; })
        .sort((a, b) => b[value] - a[value]);

      const nodes = partition()(root);
      const { children } = nodes;
      this._mapping(children);
      return nodes.children;
    }

    render() {
      const nodes = this.sunburst();
      const { props } = this;
      return <View
        nodes={ nodes }
        { ...props }
      />;
    }
  }
}
