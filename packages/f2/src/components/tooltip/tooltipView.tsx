import { isFunction, find } from '@antv/util';
import createRef from '../../createRef';
import Component from '../../base/component';
import { jsx } from '../../jsx';
import { Ref } from '../../types';

// view 的默认配置
const defaultStyle = {
  showTitle: false,
  showCrosshairs: false,
  crosshairsType: 'y',
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: '2px',
  },
  showTooltipMarker: false,
  tooltipMarkerStyle: {
    fill: '#fff',
    lineWidth: '3px',
  },
  background: {
    radius: '4px',
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: ['6px', '10px'],
  },
  titleStyle: {
    fontSize: '24px',
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'top',
  },
  nameStyle: {
    fontSize: '24px',
    fill: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'start',
    textBaseline: 'middle',
  },
  valueStyle: {
    fontSize: '24px',
    fill: '#fff',
    textAlign: 'start',
    textBaseline: 'middle',
  },
  joinString: ': ',
  showItemMarker: true,
  itemMarkerStyle: {
    width: '12px',
    radius: '6px',
    symbol: 'circle',
    lineWidth: '2px',
    stroke: '#fff',
  },
  layout: 'horizontal',
  snap: false,
  xTipTextStyle: {
    fontSize: '24px',
    fill: '#fff',
  },
  yTipTextStyle: {
    fontSize: '24px',
    fill: '#fff',
  },
  xTipBackground: {
    radius: '4px',
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: ['6px', '10px'],
    marginLeft: '-50%',
    marginTop: '6px',
  },
  yTipBackground: {
    radius: '4px',
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: ['6px', '10px'],
    marginLeft: '-100%',
    marginTop: '-50%',
  },
};

function directionEnabled(mode: string, dir: string) {
  if (mode === undefined) {
    return true;
  } else if (typeof mode === 'string') {
    return mode.indexOf(dir) !== -1;
  }

  return false;
}

const RenderItemMarker = (props) => {
  const { records, coord, context } = props;
  const point = coord.convertPoint({ x: 1, y: 1 });
  const padding = context.px2hd('6px');
  const xPoints = [
    ...records.map((record) => record.xMin),
    ...records.map((record) => record.xMax),
  ];
  const yPoints = [
    ...records.map((record) => record.yMin),
    ...records.map((record) => record.yMax),
    // y 要到 coord 顶部
    // point.y,
  ];
  if (coord.transposed) {
    xPoints.push(point.x);
  } else {
    yPoints.push(point.y);
  }
  const xMin = Math.min.apply(null, xPoints);
  const xMax = Math.max.apply(null, xPoints);
  const yMin = Math.min.apply(null, yPoints);
  const yMax = Math.max.apply(null, yPoints);

  const x = coord.transposed ? xMin : xMin - padding;
  const y = coord.transposed ? yMin - padding : yMin;
  const width = coord.transposed ? xMax - xMin : xMax - xMin + 2 * padding;
  const height = coord.transposed ? yMax - yMin + 2 * padding : yMax - yMin;

  return (
    <rect
      attrs={{
        x,
        y,
        width,
        height,
        fill: '#CCD6EC',
        opacity: 0.3,
      }}
    />
  );
};

const RenderCrosshairs = (props) => {
  const { records, coord, chart, crosshairsType, crosshairsStyle } = props;
    const {
      left: coordLeft,
      top: coordTop,
      right: coordRight,
      bottom: coordBottom,
      center
    } = coord;  
  const firstRecord = records[0];
  const { x, y, origin, xField } = firstRecord;
  if(coord.isPolar) {
    // 极坐标下的辅助线
    const xScale = chart.getScale(xField);
    const ticks = xScale.getTicks();
    const tick = find<any>(ticks, (tick) => origin[xField] === tick.tickValue);      
    const end = coord.convertPoint({
      x: tick.value,
      y: 1,
    });
    return (
      <line
        attrs={{
          x1: center.x,
          y1: center.y,
          x2: end.x,
          y2: end.y,
          ...crosshairsStyle,
        }}
      />
    );
  }

  return (
    <group>
      {directionEnabled(crosshairsType, 'x') ? (
        <line
          attrs={{
            x1: coordLeft,
            y1: y,
            x2: coordRight,
            y2: y,
            ...crosshairsStyle,
          }}
        />
      ) : null}
      {directionEnabled(crosshairsType, 'y') ? (
        <line
          attrs={{
            x1: x,
            y1: coordTop,
            x2: x,
            y2: coordBottom,
            ...crosshairsStyle,
          }}
        />
      ) : null}
    </group>
  );
}

export default class TooltipView extends Component {
  rootRef: Ref;
  arrowRef: Ref;

  constructor(props) {
    super(props);
    this.rootRef = createRef();
    this.arrowRef = createRef();
  }
  // 调整 显示的位置
  _position() {
    const { props, context, rootRef, arrowRef } = this;
    const group = rootRef.current;
    if (!group) {
      return;
    }
    const { records, coord } = props;
    const arrowWidth = context.px2hd('6px');
    const record = records[0];
    // 中心点
    const { x } = record;
    const { left: coordLeft, width: coordWidth } = coord;
    const { y, width, height, radius } = group.get('attrs');
    const halfWidth = width / 2;
    // 让 tooltip 限制在 coord 的显示范围内
    const offsetX = Math.min(
      Math.max(x - coordLeft - halfWidth, -arrowWidth - radius),
      coordWidth - width + arrowWidth + radius
    );

    // 因为默认是从 coord 的范围内显示的，所以要往上移，移出 coord，避免挡住 geometry
    const offset = Math.min(y, height + arrowWidth); // 因为不能超出 canvas 画布区域，所以最大只能是 y
    group.moveTo(offsetX, -offset);
    arrowRef.current.moveTo(0, height - offset);
  }
  didMount() {
    this._position();
  }
  didUpdate() {
    this._position();
  }
  render() {
    const { props, context } = this;
    const { records, coord } = props;
    const {
      left: coordLeft,
      top: coordTop,
      bottom: coordBottom,
      // width: coordWidth,
    } = coord;
    const firstRecord = records[0];
    const { x, y } = firstRecord;
    const { name: xFirstText, value: yFirstText } = firstRecord;
    const {
      chart,
      background: customBackground,
      // showTitle,
      // titleStyle,
      showTooltipMarker = defaultStyle.showTooltipMarker,
      showItemMarker = defaultStyle.showItemMarker,
      itemMarkerStyle: customItemMarkerStyle,
      nameStyle,
      valueStyle,
      joinString = defaultStyle.joinString,
      showCrosshairs = defaultStyle.showCrosshairs,
      crosshairsStyle,
      crosshairsType = defaultStyle.crosshairsType,
      snap = defaultStyle.snap,
      tooltipMarkerStyle = defaultStyle.tooltipMarkerStyle,
      showXTip,
      showYTip,
      xTip,
      yTip,
      xTipTextStyle = defaultStyle.xTipTextStyle,
      yTipTextStyle = defaultStyle.yTipTextStyle,
      xTipBackground = defaultStyle.xTipBackground,
      yTipBackground = defaultStyle.yTipBackground,
      custom = false,
    } = props;
    const itemMarkerStyle = {
      ...customItemMarkerStyle,
      ...defaultStyle.itemMarkerStyle,
    };

    const background = {
      ...defaultStyle.background,
      ...customBackground,
    };

    const arrowWidth = context.px2hd('6px');

    return (
      <group>
        <group
          style={{
            left: coordLeft,
            top: coordTop,
          }}
        >
          {/* 非自定义模式时显示的文本信息 */}
          {!custom && (<group>
            <group ref={this.rootRef} style={background} attrs={background}>
              {/* {showTitle ? (
                <text
                  style={{
                    marginBottom: '6px',
                  }}
                  attrs={{
                    text: firstOrigin[xField],
                    fontSize: '24px',
                    fill: '#fff',
                    textAlign: 'start',
                    ...titleStyle,
                  }}
                />
              ) : null} */}
              <group
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: [0, 0, 0, '6px'],
                }}
              >
                {records.map((record) => {
                  const { name, value } = record;
                  return (
                    <group
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: [0, '6px', 0, 0],
                      }}
                    >
                      {showItemMarker ? (
                        <marker
                          style={{
                            width: itemMarkerStyle.width,
                            marginRight: '6px',
                          }}
                          attrs={{
                            ...itemMarkerStyle,
                            fill: record.color,
                          }}
                        />
                      ) : null}
                      <text
                        attrs={{
                          ...defaultStyle.nameStyle,
                          ...nameStyle,
                          text: value ? `${name}${joinString}` : name,
                        }}
                      />
                      <text
                        attrs={{
                          ...defaultStyle.valueStyle,
                          ...valueStyle,
                          text: value,
                        }}
                      />
                    </group>
                  );
                })}
              </group>
            </group>
            <polygon
              ref={this.arrowRef}
              attrs={{
                points: [
                  { x: x - arrowWidth, y: coordTop },
                  { x: x + arrowWidth, y: coordTop },
                  { x: x, y: coordTop + arrowWidth },
                ],
                fill: background.fill,
              }}
            />
          </group>)}
          {showTooltipMarker ? (
            <RenderItemMarker coord={coord} context={context} records={records} />
          ) : null}
          {/* 辅助线 */}
          {showCrosshairs ? (
            <RenderCrosshairs
              chart={chart}
              coord={coord}
              records={records}
              crosshairsType={crosshairsType}
              crosshairsStyle={{...defaultStyle.crosshairsStyle, ...crosshairsStyle}}
            />
          ) : null}
          {/* 辅助点 */}
          {snap
            ? records.map((item) => {
                const { x, y, color, shape } = item;
                return (
                  <circle
                    attrs={{
                      x,
                      y,
                      r: '6px',
                      stroke: color,
                      fill: color,
                      ...shape,
                      ...tooltipMarkerStyle,
                    }}
                  />
                );
              })
            : null}
        </group>
        {/* X 轴辅助信息 */}
        {showXTip && (
          <group
            style={{
              left: x,
              top: coordBottom,
              ...defaultStyle.xTipBackground,
              ...xTipBackground,
            }}
            attrs={{
              ...defaultStyle.xTipBackground,
              ...xTipBackground,
            }}
          >
            <text
              attrs={{
                ...defaultStyle.xTipTextStyle,
                ...xTipTextStyle,
                text: isFunction(xTip) ? xTip(xFirstText) : xFirstText,
              }}
            />
          </group>
        )}
        {/* Y 轴辅助信息 */}
        {showYTip && (
          <group
            style={{
              left: coordLeft,
              top: y,
              ...defaultStyle.yTipBackground,
              ...yTipBackground,
            }}
            attrs={{
              ...defaultStyle.yTipBackground,
              ...yTipBackground,
            }}
          >
            <text
              attrs={{
                ...defaultStyle.yTipTextStyle,
                ...yTipTextStyle,
                text: isFunction(yTip) ? yTip(yFirstText) : yFirstText,
              }}
            />
          </group>
        )}
      </group>
    );
  }
}
