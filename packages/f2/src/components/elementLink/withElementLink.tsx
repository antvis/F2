import { jsx, Component, Children } from '@antv/f-engine';
import { ChartChildProps } from '../../chart';
export interface DataRecord {
  origin: any;
  [k: string]: any;
}

export interface ElementLinkProps {
  [k: string]: any;
}
export interface ElementLinkState {
  selected: any[];
}

export default (View) => {
  return class ElementLink<IProps extends ElementLinkProps & ElementLinkProps> extends Component<
    IProps & ChartChildProps,
    ElementLinkState
  > {
    constructor(props: IProps & ChartChildProps) {
      super(props);
      this.state = {
        selected: [],
      };
    }

    findAllShapeNode(vNode, value) {
      if (!value) return [];

      const shapeNodes = [];
      Children.map(vNode, (node) => {
        if (!node) return;
        const { key, children } = node;
        if (key === value) {
          shapeNodes.push(...children);
        }
        if (children) {
          shapeNodes.push(...this.findAllShapeNode(children, value));
        }
      });
      return shapeNodes;
    }

    render() {
      const { props } = this;
      const { chart, field } = props;
      const { selected } = chart.state;
      const geometry = props.chart.getGeometrys()[0];

      if (!selected || !selected.length) return null;
      const value = selected[0][field];

      const elements = this.findAllShapeNode(geometry, value);

      const colorController = geometry.getAttr('color');
      const color = colorController.mapping(value);
      return <View color={color} elements={elements} {...props} />;
    }
  };
};
