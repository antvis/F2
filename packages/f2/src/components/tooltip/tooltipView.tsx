import { isFunction } from '@antv/util';
import Component from '../../base/component';
import { jsx } from '../../jsx';

// view 的默认配置
const defaultStyle = {
  showTitle: false,
  showCrosshairs: false,
  crosshairsType: 'y',
  crosshairsStyle: {
    stroke: 'rgba(0, 0, 0, 0.25)',
    lineWidth: '2px',
  },
  showTooltipMarker: true,
  tooltipMarkerStyle: {
    fill: '#fff',
    lineWidth: '3px',
  },
  background: {
    radius: '2px',
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
    fontSize: 12,
    fill: '#fff'
  },
  yTipTextStyle: {
    fontSize: 12,
    fill: '#fff'
  },
  xTipBackground: {
    radius: '2px' as `${number}px`,
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: ['6px', '10px'],
    marginLeft: "-50%",
  },
  yTipBackground: {
    radius: '2px' as `${number}px`,
    fill: 'rgba(0, 0, 0, 0.65)',
    padding: ['6px', '10px'],
    marginLeft: "-100%",
    marginTop: "-50%",
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

export default class TooltipView extends Component {
  rootRef: any;
  itemsRef: any;

  constructor(props) {
    super(props);
    this.rootRef = { current: null };
    this.itemsRef = { current: null };
  }
  didUpdate() {
    const { props, rootRef, itemsRef } = this;
    const group = rootRef.current;
    if (!group) {
      return;
    }
    const { records, coord } = props;
    if (!records || !records.length) return null;
    if (itemsRef.current) {
      const firstRecord = records[0];
      const { x } = firstRecord;
      const { left: coordLeft, width: coordWidth } = coord;
      const { width } = group.get('attrs');
      const halfWidth = width / 2;
      const moveX = Math.min(Math.max(x - coordLeft - halfWidth, 0), coordWidth - halfWidth);
      itemsRef.current.moveTo(moveX, 0);
    }
  }
  render() {
    const { props } = this;
    const { records, chart, coord, layout } = props;
    const { top: layoutTop } = layout;
    if (!records || !records.length) return null;
    const {
      left: coordLeft,
      top: coordTop,
      right: coordRight,
      bottom: coordBottom,
      // width: coordWidth,
    } = coord;
    const firstRecord = records[0];
    const { x, y, xField, yField, origin: firstOrigin } = firstRecord;
    const yScale = chart.getScale(yField);
    const xScale = chart.getScale(xField);
    const {
      background,
      showTitle,
      titleStyle,
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

    const xTipText = xScale.getText(records[0].origin[xField]);
    const yTipText = yScale.getText(records[0].origin[yField]);

    return (
      <group>
        {/* 辅助点 */}
        {snap
          ? records.map((item) => {
              const { x, y, color, shape } = item;
              return (
                <circle
                  attrs={{
                    x,
                    y,
                    r: 3,
                    stroke: color,
                    ...shape,
                    ...tooltipMarkerStyle,
                  }}
                />
              );
            })
          : null}
        <group
          ref={this.rootRef}
          style={{
            left: coordLeft,
            top: layoutTop,
          }}
        >
          {/* 非自定义模式时显示的文本信息 */}
          {!custom &&
            <group
            ref={this.itemsRef}
            style={{
              ...defaultStyle.background,
              ...background,
            }}
            attrs={{
              ...defaultStyle.background,
              ...background,
            }}
          >
            {showTitle ? (
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
            ) : null}
            <group
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {records.map((record) => {
                const yValue = yScale.getText(record[yField]);
                const xValue = xScale.getText(record[xField]);
                return (
                  <group
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: [0, '10px', 0, 0],
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
                        text: yValue ? `${xValue}${joinString}` : xValue,
                      }}
                    />
                    <text
                      attrs={{
                        ...defaultStyle.valueStyle,
                        ...valueStyle,
                        text: yValue,
                      }}
                    />
                  </group>
                );
              })}
            </group>
          </group>
          }
          {/* 辅助线 */}
          {showCrosshairs ? (
            <group>
              {directionEnabled(crosshairsType, 'x') ? (
                <line
                  attrs={{
                    x1: coordLeft,
                    y1: y,
                    x2: coordRight,
                    y2: y,
                    ...defaultStyle.crosshairsStyle,
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
                    ...defaultStyle.crosshairsStyle,
                    ...crosshairsStyle,
                  }}
                />
              ) : null}
            </group>
          ) : null}
          {/* <polygon
            attrs={{
              ...background,
              // points
            }}
          /> */}
        </group>
        {/* X 轴辅助信息 */}
        {showXTip &&
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
                  text: isFunction(xTip) ? xTip(xTipText) : xTipText,
                }}
              />
          </group>
        }
        {/* Y 轴辅助信息 */}
        {showYTip &&
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
                text: isFunction(yTip) ? yTip(yTipText) : yTipText,
              }}
            />
          </group>
        }
      </group>
    );
  }
}
