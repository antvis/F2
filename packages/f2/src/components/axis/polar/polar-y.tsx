import { jsx } from '../../../jsx';
import { Vector2 } from '@antv/f2-graphic';

export default (props) => {
  const { ticks, coord, style } = props;
  const { center } = coord;
  const { grid, tickLine, line, labelOffset, label } = style;
  return (
    <group>
      {
        grid ?
          ticks.map(tick => {
            const { points } = tick;
            const end = points[points.length - 1];
            return (
              <arc attrs={{
                x: center.x,
                y: center.y,
                r: Vector2.length([end.x - center.x, end.y - center.y]),
                ...grid,
              }} />
            );
          })
        :
          null
      }
      {
        tickLine && tickLine.length ?
          ticks.map(tick => {
            const { points } = tick;
            const end = points[points.length - 1];
            return (
              <line attrs={{
                x1: end.x,
                y1: end.y,
                x2: end.x - tickLine.length,
                y2: end.y,
                ...tickLine,
              }} />
            );
          })
        :
          null
      }
      {
        line ?
          <line attrs={{
            x1: ticks[0].points[0].x,
            y1: ticks[0].points[0].y,
            x2: ticks[ticks.length - 1].points[0].x,
            y2: ticks[ticks.length - 1].points[0].y,
            ...line,
          }} />
        :
          null
      }
      {
        label ?
          ticks.map(tick => {
            const { points, text } = tick;
            const end = points[points.length - 1];
            return (
              <text attrs={{
                x: end.x - labelOffset,
                y: end.y,
                text,
                textAlign: 'right',
                textBaseline: 'middle',
                ...label,
              }} />
            );
          })
        :
          null
      }
    </group>
  );
}