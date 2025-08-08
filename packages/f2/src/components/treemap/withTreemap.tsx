import { jsx, Component, ComponentType, isEqual as equal, Ref, createRef } from '@antv/f-engine';
import { Category } from '../../attr';
import CoordController from '../../controller/coord';
import { hierarchy, treemap, treemapBinary } from '../../deps/d3-hierarchy/src';
import Theme from '../../theme';
import { Data, DataRecord, DataField } from '../../chart/Data';
import { CoordProps } from '../../chart/Coord';
import { deepMix, each, isFunction } from '@antv/util';

export interface ColorAttrObject {
  field: string;
  range?: string[] | number[];
  callback?: (value) => string | number;
}

export interface RecordNode<TRecord extends DataRecord = DataRecord> {
  key: string | number | null | undefined;
  color: DataField<TRecord> | string;
  origin: TRecord;
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
  style: any;
}

export interface TreemapProps<TRecord extends DataRecord = DataRecord> {
  data: Data<TRecord>;
  value: DataField<TRecord> | string;
  coord?: CoordProps;
  color?: ColorAttrObject;
  space?: number;
  theme?: Record<string, any>;
  nodes?: RecordNode<TRecord>[];
  selection?: any;
}

interface TreeLayout {
  (arg: any): any;
  tile?: (arg: any) => this;
  round?: (arg: boolean) => this;
  size?: (arg: [number, number]) => this;
  paddingInner?: (arg: number) => this;
}

const withTreemap = <IProps extends TreemapProps = TreemapProps>(View: ComponentType<IProps>) => {
  return class Treemap<
    TRecord extends DataRecord = DataRecord,
    P extends TreemapProps<TRecord> = TreemapProps<TRecord>
  > extends Component<P & IProps> {
    coord: CoordController;
    color: Category;
    coordRef: Ref;
    records: RecordNode<DataRecord>[];

    constructor(props: P & IProps, context) {
      super(props, context);
      const { color, data, theme, selection = {} } = props;

      const { px2hd } = context;
      context.theme = deepMix(px2hd(Theme), theme);

      this.coord = new CoordController();
      this.color = new Category({
        range: context.theme.colors,
        ...color,
        data,
      });

      const { defaultSelected = null } = selection;
      this.state.selected = defaultSelected;
      this.coordRef = createRef();
      this.records = [];
    }

    isSelected(record) {
      const { state } = this;
      const { selected } = state;
      if (!selected || !selected.length) {
        return false;
      }

      for (let i = 0, len = selected.length; i < len; i++) {
        const item = selected[i];
        if (equal(record, item)) {
          return true;
        }
      }
      return false;
    }

    generateSelectionStyle(record: Record<string, unknown>, isSelected: boolean) {
      if (!this.state.selected?.length) {
        return null;
      }

      const { selectedStyle, unSelectedStyle } = this.props.selection || {};
      const style = isSelected ? selectedStyle : unSelectedStyle;
      return isFunction(style) ? style(record) : style;
    }

    willMount() {
      const { props, coord, layout } = this;
      const { coord: coordOption } = props;
      coord.updateLayout(layout);

      coord.create(coordOption);
    }

    willReceiveProps(nextProps: P): void {
      const { selection: nextSelection } = nextProps;
      const { selection: lastSelection } = this.props;
      if (!nextSelection || !lastSelection) {
        return;
      }
      const { defaultSelected: nextDefaultSelected } = nextSelection;
      const { defaultSelected: lastDefaultSelected } = lastSelection;

      if (!equal(nextDefaultSelected, lastDefaultSelected)) {
        this.state.selected = nextDefaultSelected;
      }
    }

    treemapLayout(): RecordNode[] {
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

        const selected = this.isSelected(data);
        const style = this.generateSelectionStyle(data, selected);

        return {
          key: data.key,
          origin: data,
          color,
          ...rect,
          style,
          selected,
        };
      });
    }

    select(ev, trigger) {
      const { points, canvasX: x, canvasY: y } = ev;
      const { selection = {} } = this.props;
      const { triggerOn, type = 'single', cancelable = true } = selection;

      if (!triggerOn || trigger !== triggerOn) return;

      const point = triggerOn === 'click' ? { x, y } : points[0];

      const { selected } = this.state;
      const origin = [];
      each(this.records, (record) => {
        if (
          point.x >= record.xMin &&
          point.x <= record.xMax &&
          point.y >= record.yMin &&
          point.y <= record.yMax
        ) {
          origin.push(record?.origin);
        }
      });

      // 没选中元素
      if (!origin) {
        this.setState({
          selected: null,
        });
        return;
      }

      if (!selected) {
        this.setState({
          selected: origin,
        });
        return;
      }

      // 单选
      const newSelected = [];
      origin.forEach((record) => {
        if (!this.isSelected(record)) {
          newSelected.push(record);
        }
      });

      if (type === 'single') {
        this.setState({
          selected: cancelable ? newSelected : origin,
        });
        return;
      }

      this.setState({
        selected: [...newSelected, ...selected],
      });
    }
    render() {
      const nodes = this.treemapLayout();
      this.records = nodes;
      const { props, coord } = this;
      const { width, height } = coord.getCoord();

      return (
        <group
          style={{
            width,
            height,
            fill: 'transparent',
          }}
          onClick={(ev) => this.select(ev, 'click')}
          onPress={(ev) => this.select(ev, 'press')}
        >
          <View nodes={nodes} {...props} coord={coord.getCoord()} />
        </group>
      );
    }
  };
};

export default withTreemap;
