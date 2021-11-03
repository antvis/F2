import { jsx } from '../../jsx';
import Component from '../../base/component';

const getPoint = (cener, angle, r) => {
  const x = cener.x + Math.cos(angle) * r;
  const y = cener.y + Math.sin(angle) * r;
  return { x, y };
};

const getTicks = (start, end, tickCount) => {
  const ticks = [];
  const diff = end - start;
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(start + (diff * i) / tickCount);
  }
  return ticks;
};

class Guage extends Component {
  render() {
    const { center, startAngle, endAngle, r, percent, tickCount } = this.props;

    const diff = endAngle - startAngle;
    const { x, y } = center;
    const ticks = getTicks(startAngle, endAngle, tickCount);
    return (
      <group>
        <arc
          attrs={{
            x,
            y,
            r,
            startAngle,
            endAngle,
            lineWidth: '20px',
            lineCap: 'round',
            stroke: '#e7e7e7',
          }}
        />
        <arc
          attrs={{
            x,
            y,
            r,
            startAngle,
            endAngle: startAngle,
            lineWidth: '40px',
            lineCap: 'round',
            stroke: '#0075ff',
          }}
          animation={{
            appear: {
              easing: 'linear',
              duration: 500,
              property: ['endAngle'],
              start: {
                endAngle: startAngle,
              },
              end: {
                endAngle: startAngle + diff * percent,
              },
            },
          }}
        />
        {ticks.map((tick) => {
          const start = getPoint(center, tick, 65);
          const end = getPoint(center, tick, 75);
          return (
            <line
              attrs={{
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                lineWidth: '6px',
                lineCap: 'round',
                stroke: '#e7e7e7',
              }}
            />
          );
        })}
      </group>
    );
  }
}

export default Guage;
