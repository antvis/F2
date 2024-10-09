import { Component, jsx, computeLayout } from '@antv/f-engine';
import { isFunction, find } from '@antv/util';

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
  markerBackgroundStyle: {
    fill: '#CCD6EC',
    opacity: 0.3,
    padding: '6px',
  },
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
  const { records, coord, context, markerBackgroundStyle } = props;
  const point = coord.convertPoint({ x: 1, y: 1 });
  const padding = context.px2hd(markerBackgroundStyle.padding || '6px');
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
      style={{
        x,
        y,
        width,
        height,
        ...markerBackgroundStyle,
      }}
    />
  );
};

const RenderCrosshairs = (props) => {
  const {
    records,
    coord,
    chart,
    crosshairsType,
    crosshairsStyle,
    xPositionType,
    yPositionType,
  } = props;
  const { left: coordLeft, top: coordTop, right: coordRight, bottom: coordBottom, center } = coord;
  const firstRecord = records[0];
  const { x, y, origin, xField, coord: coordData } = firstRecord;
  if (coord.isPolar) {
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
        style={{
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
          style={{
            x1: coordLeft,
            y1: yPositionType === 'coord' ? coordData.y : y,
            x2: coordRight,
            y2: yPositionType === 'coord' ? coordData.y : y,
            ...crosshairsStyle,
          }}
        />
      ) : null}
      {directionEnabled(crosshairsType, 'y') ? (
        <line
          style={{
            x1: xPositionType === 'coord' ? coordData.x : x,
            y1: coordTop,
            x2: xPositionType === 'coord' ? coordData.x : x,
            y2: coordBottom,
            ...crosshairsStyle,
          }}
        />
      ) : null}
    </group>
  );
};

const RenderXTip = (props) => {
  const { records, coord, xTip, xPositionType, xTipTextStyle, xTipBackground } = props;

  const { bottom: coordBottom } = coord;

  const firstRecord = records[0];
  const { x, coord: coordData } = firstRecord;
  const { name: xFirstText } = firstRecord;

  return (
    <rect
      style={{
        display: 'flex',
        left: xPositionType === 'coord' ? coordData.x : x,
        top: coordBottom,
        ...xTipBackground,
      }}
    >
      <text
        style={{
          ...xTipTextStyle,
          text:
            xPositionType === 'coord'
              ? coordData.xText
              : isFunction(xTip)
              ? xTip(xFirstText, firstRecord)
              : xFirstText,
        }}
      />
    </rect>
  );
};

const RenderYTip = (props) => {
  const { records, coord, yTip, yPositionType, yTipTextStyle, yTipBackground } = props;

  const { left: coordLeft } = coord;

  const firstRecord = records[0];
  const { y, coord: coordData } = firstRecord;
  const { value: yFirstText } = firstRecord;
  return (
    <rect
      style={{
        display: 'flex',
        left: coordLeft,
        top: yPositionType === 'coord' ? coordData.y : y,
        ...yTipBackground,
      }}
    >
      <text
        style={{
          ...yTipTextStyle,
          text:
            yPositionType === 'coord'
              ? coordData.yText
              : isFunction(yTip)
              ? yTip(yFirstText, firstRecord)
              : yFirstText,
        }}
      />
    </rect>
  );
};

// tooltip 内容框
class RenderLabel extends Component {
  style = {};

  getMaxItemBox(node) {
    let maxItemWidth = 0;
    let maxItemHeight = 0;
    (node.children || []).forEach((child) => {
      const { layout } = child;
      const { width, height } = layout;

      maxItemWidth = Math.max(maxItemWidth, width);
      maxItemHeight = Math.max(maxItemHeight, height);
    });

    return {
      width: maxItemWidth,
      height: maxItemHeight,
    };
  }

  _getContainerLayout() {
    const { records, coord } = this.props;

    if (!records || !records.length) return;
    const { width } = coord;

    const node = computeLayout(this, this.render());
    const { width: itemMaxWidth } = this.getMaxItemBox(node?.children[0]);

    // 每行最多的个数
    const lineMaxCount = Math.max(1, Math.floor(width / itemMaxWidth));
    const itemCount = records.length;

    // 是否需要换行
    if (itemCount > lineMaxCount) {
      this.style = {
        width,
      };
    }
  }

  willMount(): void {
    this._getContainerLayout();
  }

  render() {
    const {
      records,
      background,
      showItemMarker,
      itemMarkerStyle,
      customText,
      nameStyle,
      valueStyle,
      joinString,
      arrowWidth,
      x,
      coord,
      itemWidth,
    } = this.props;

    // 显示内容
    const labelView = (left: number, top: number) => {
      return (
        <group style={{ display: 'flex' }}>
          <group
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: [0, 0, 0, '6px'],
              left,
              top,
              ...this.style,
              ...background,
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
                    width: itemWidth,
                  }}
                >
                  {showItemMarker ? (
                    <marker
                      style={{
                        width: itemMarkerStyle.width,
                        marginRight: '6px',
                        ...itemMarkerStyle,
                        fill: record.color,
                      }}
                    />
                  ) : null}
                  {customText && isFunction(customText) ? (
                    customText(record)
                  ) : (
                    <group
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <text
                        style={{
                          ...nameStyle,
                          text: value ? `${name}${joinString}` : name,
                        }}
                      />
                      <text
                        style={{
                          ...valueStyle,
                          text: value,
                        }}
                      />
                    </group>
                  )}
                </group>
              );
            })}
          </group>
          <group>
            <polygon
              style={{
                points: [
                  [x - arrowWidth, top],
                  [x + arrowWidth, top],
                  [x, top + arrowWidth],
                ],
                fill: background.fill,
              }}
            />
          </group>
        </group>
      );
    };

    // 计算显示位置
    const { layout } = computeLayout(this, labelView(0, 0)); // 获取内容区大小
    const { left: coordLeft, top: coordTop, right: coordRight } = coord;
    const { width, height } = layout;

    const halfWidth = width / 2;
    // 让 tooltip 限制在 coord 的显示范围内
    const advanceLeft = x - halfWidth;
    const advanceTop = coordTop - height;

    const left =
      advanceLeft < coordLeft
        ? coordLeft
        : advanceLeft > coordRight - width
        ? coordRight - width
        : advanceLeft;

    const top = advanceTop < 0 ? 0 : advanceTop;

    return labelView(left, top);
  }
}

export default class TooltipView extends Component {
  render() {
    const { props, context } = this;
    const { records, coord } = props;
    const firstRecord = records[0];
    const { x, coord: coordData } = firstRecord;
    const {
      chart,
      background: customBackground,
      showTooltipMarker = defaultStyle.showTooltipMarker,
      markerBackgroundStyle = defaultStyle.markerBackgroundStyle,
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
      xPositionType,
      showYTip,
      yPositionType,
      xTip,
      yTip,
      xTipTextStyle = defaultStyle.xTipTextStyle,
      yTipTextStyle = defaultStyle.yTipTextStyle,
      xTipBackground = defaultStyle.xTipBackground,
      yTipBackground = defaultStyle.yTipBackground,
      custom = false,
      customText,
      itemWidth,
    } = props;
    const itemMarkerStyle = {
      ...defaultStyle.itemMarkerStyle,
      ...customItemMarkerStyle,
    };

    const background = {
      ...defaultStyle.background,
      ...customBackground,
    };

    const arrowWidth = context.px2hd('6px');

    return (
      <group>
        {showTooltipMarker ? (
          <RenderItemMarker
            coord={coord}
            context={context}
            records={records}
            markerBackgroundStyle={markerBackgroundStyle}
          />
        ) : null}
        {/* 辅助线 */}
        {showCrosshairs ? (
          <RenderCrosshairs
            chart={chart}
            coord={coord}
            records={records}
            xPositionType={xPositionType}
            yPositionType={yPositionType}
            crosshairsType={crosshairsType}
            crosshairsStyle={{ ...defaultStyle.crosshairsStyle, ...crosshairsStyle }}
          />
        ) : null}
        {/* 辅助点 */}
        {snap
          ? records.map((item) => {
              const { x, y, color, shape } = item;
              return (
                <circle
                  style={{
                    cx: xPositionType === 'coord' ? coordData.x : x,
                    cy: yPositionType === 'coord' ? coordData.y : y,
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
        {/* X 轴辅助信息 */}
        {showXTip && (
          <RenderXTip
            records={records}
            coord={coord}
            xTip={xTip}
            xPositionType={xPositionType}
            xTipTextStyle={{ ...defaultStyle.xTipTextStyle, ...xTipTextStyle }}
            xTipBackground={{ ...defaultStyle.xTipBackground, ...xTipBackground }}
          />
        )}
        {/* Y 轴辅助信息 */}
        {showYTip && (
          <RenderYTip
            records={records}
            coord={coord}
            yTip={yTip}
            yPositionType={yPositionType}
            yTipTextStyle={{ ...defaultStyle.yTipTextStyle, ...yTipTextStyle }}
            yTipBackground={{ ...defaultStyle.yTipBackground, ...yTipBackground }}
          />
        )}
        {/* 非自定义模式时显示的文本信息 */}
        {!custom && (
          <RenderLabel
            records={records}
            coord={coord}
            itemMarkerStyle={itemMarkerStyle}
            customText={customText}
            showItemMarker={showItemMarker}
            x={x}
            arrowWidth={arrowWidth}
            background={background}
            nameStyle={{ ...defaultStyle.nameStyle, ...nameStyle }}
            valueStyle={{ ...defaultStyle.valueStyle, ...valueStyle }}
            joinString={joinString}
            itemWidth={itemWidth}
          />
        )}
      </group>
    );
  }
}
