import { jsx, Ref, Component } from '@antv/f-engine';
import { Category } from '../../attr';
import CoordController from '../../controller/coord';
import { hierarchy, treemap, treemapBinary } from '../../deps/d3-hierarchy/src';
import Theme from '../../theme';
import { Data, DataRecord } from '../../chart/Data';
import { CoordProps } from '../../chart/Coord';
import { deepMix } from '@antv/util';

export interface ColorAttrObject {
  field: string;
  range?: string[] | number[];
  callback?: (value) => string | number;
}

export interface RecordNode<TRecord extends DataRecord = DataRecord> {
  color: string | number;
  origin: TRecord;
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}

export interface TreemapProps<TRecord extends DataRecord = DataRecord> {
  data: Data<TRecord>;
  value: string;
  coord?: CoordProps;
  color?: ColorAttrObject;
  space?: number;
  theme?: Record<string, any>;
  onClick?: (record: RecordNode<TRecord>) => void;
}

interface TreeLayout {
  (arg: any): any;
  tile?: (arg: any) => this;
  round?: (arg: boolean) => this;
  size?: (arg: [number, number]) => this;
  paddingInner?: (arg: number) => this;
}

export default (View) => {
  return class Treemap<
    TRecord extends DataRecord = DataRecord,
    IProps extends TreemapProps<TRecord> = TreemapProps<TRecord>
  > extends Component<IProps> {
    coord: CoordController;
    color: Category;
    triggerRef: Ref[];

    constructor(props: IProps, context) {
      super(props, context);
      const { color, data, theme } = props;

      const { px2hd } = context;
      context.theme = deepMix(px2hd(Theme), theme);

      this.coord = new CoordController();
      this.color = new Category({
        range: context.theme.colors,
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

    treemapLayout() {
      const { props, coord, color: colorAttr } = this;
      const { width, height } = coord.getCoord();
      const { data, value, space = 0 } = props;

      const root = hierarchy({ children: data })
        .sum(function(d) {
          return d[value];
        })
        .sort((a, b) => b[value] - a[value]);

      const treemapLayout = (treemap as () => TreeLayout)()
        // 默认treemapSquarify
        .tile(treemapBinary)
        .round(false)
        .size([width, height])
        // .padding(1);
        .paddingInner(space);
      // .paddingOuter(options.paddingOuter)
      // .paddingTop(options.paddingTop)
      // .paddingRight(options.paddingRight)
      // .paddingBottom(options.paddingBottom)
      // .paddingLeft(options.paddingLeft);
      const nodes = treemapLayout(root);
      return nodes.children.map((item) => {
        const { data, x0, y0, x1, y1 } = item;
        const color = colorAttr.mapping(data[colorAttr.field]);
        const rect = {
          xMin: x0,
          xMax: x1,
          yMin: y0,
          yMax: y1,
        };
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
