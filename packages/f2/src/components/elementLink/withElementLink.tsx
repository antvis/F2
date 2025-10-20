import { jsx, Component } from '@antv/f-engine';
import { each } from '@antv/util';
export interface DataRecord {
  origin: any;
  [k: string]: any;
}

export interface ElementLinkProps {
  [k: string]: any;
}

export default (View) => {
  return class ElementLink<IProps extends ElementLinkProps & ElementLinkProps> extends Component<
    IProps
  > {
    constructor(props: IProps) {
      super(props);
    }

    getHighlightData() {
      const { props } = this;
      const { chart } = props;
      const { highlights } = chart.state;
      const geometry = chart.getGeometrys()[0];
      const data = geometry.flatRecords();
      const elements = [];
      each(highlights, (condition, field) => {
        if (!condition) return;
        const highlightsData = data.filter((record) => {
          return condition(record[field], record);
        });
        if (!highlightsData.length) return;
        elements.push({
          highlightsData,
          field,
          color: highlightsData[0].color || 'transparent',
        });
      });

      return elements;
    }

    render() {
      const { props } = this;
      const elements = this.getHighlightData();
      if (!elements.length) return null;

      return <View elements={elements} {...props} />;
    }
  };
};
