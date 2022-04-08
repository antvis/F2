import { jsx } from '../../../jsx';
import { Vector2 } from '@antv/f2-graphic';
import { PolarProps } from '../types';
// const { Vector2 } = G;

// 相对圆心偏移量的点
function getOffsetPoint(center, point, offset) {
  const vectorX = point.x - center.x;
  const vectorY = point.y - center.y;
  const vector = [vectorX, vectorY];
  const vectorLength = Vector2.length(vector);
  const offsetLength = vectorLength + offset;

  const x = (vectorX / vectorLength) * offsetLength;
  const y = (vectorY / vectorLength) * offsetLength;
  return {
    x: center.x + x,
    y: center.y + y,
  };
}

// 获取文本的对齐方式
function getTextAlignInfo(center, point) {
  // 文本点向量
  const vector = [point.x - center.x, point.y - center.y];

  let align;
  let baseLine;
  // 水平对齐
  if (vector[0] > 0) {
    align = 'left';
  } else if (vector[0] < 0) {
    align = 'right';
  } else {
    align = 'center';
  }

  // 垂直对齐
  if (vector[1] > 0) {
    baseLine = 'top';
  } else if (vector[1] < 0) {
    baseLine = 'bottom';
  } else {
    baseLine = 'middle';
  }

  return {
    textAlign: align,
    textBaseline: baseLine,
  };
}

const Line = (props) => {
  const { line, gridType, center, radius, ticks } = props;
  if (!line) return null;
  if (gridType !== 'line') {
    return (
      <arc
        attrs={{
          x: center.x,
          y: center.y,
          r: radius,
          ...line,
        }}
      />
    );
  }
  const points = ticks.map((tick) => {
    const { points } = tick;
    return points[points.length - 1];
  });
  // 头尾相连
  points.push(points[0]);
  return (
    <polyline
      attrs={{
        points,
        ...line,
      }}
    />
  );
};

export default (props: PolarProps) => {
  const { ticks, coord, style, grid: gridType } = props;
  const { center } = coord;
  const { grid, tickLine, line, labelOffset, label } = style;

  const firstTicks = ticks[0];
  const { points } = firstTicks;
  const end = points[points.length - 1];
  const radius = Vector2.length([end.x - center.x, end.y - center.y]);

  return (
    <group>
      {grid
        ? ticks.map((tick) => {
            const { points, gridStyle } = tick;
            const end = points[points.length - 1];
            return (
              <line
                attrs={{
                  x1: center.x,
                  y1: center.y,
                  x2: end.x,
                  y2: end.y,
                  ...grid,
                  ...gridStyle,
                }}
              />
            );
          })
        : null}
      {tickLine && tickLine.length
        ? ticks.map((tick) => {
            const { points } = tick;
            const end = points[points.length - 1];
            const offsetPoint = getOffsetPoint(center, end, tickLine.length);
            return (
              <line
                attrs={{
                  x1: end.x,
                  y1: end.y,
                  x2: offsetPoint.x,
                  y2: offsetPoint.y,
                  ...tickLine,
                }}
              />
            );
          })
        : null}
      <Line line={line} gridType={gridType} center={center} radius={radius} ticks={ticks} />
      {label
        ? ticks.map((tick) => {
            const { points, text, labelStyle } = tick;
            const end = points[points.length - 1];
            const offsetPoint = getOffsetPoint(center, end, labelOffset);
            return (
              <text
                attrs={{
                  x: offsetPoint.x,
                  y: offsetPoint.y,
                  text,
                  ...getTextAlignInfo(center, end),
                  ...label,
                  ...labelStyle,
                }}
              />
            );
          })
        : null}
    </group>
  );
};
