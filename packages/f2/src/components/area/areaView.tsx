import { jsx } from '../../index';
import { deepMix } from '@antv/util';
import { Smooth } from '@antv/f-engine';

export default (props) => {
  const { coord, records, shape, animation } = props;
  const isSmooth = shape === 'smooth';
  const { left, top, width, height, center, startAngle, endAngle, radius } = coord as any;

  const appear = coord.isPolar
    ? {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'sector',
          property: ['endAngle'],
          attrs: {
            x: center.x - left,
            y: center.y - top,
            startAngle,
            r: radius,
          },
          start: {
            endAngle: startAngle,
          },
          end: {
            endAngle,
          },
        },
      }
    : {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'rect',
          property: ['width'],
          attrs: {
            height: height,
          },
          start: {
            width: 0,
          },
          end: {
            width: width,
          },
        },
      };
  return (
    <group>
      {records.map((record) => {
        const { key, children } = record;
        return (
          <group key={key}>
            {children.map((child) => {
              const { points, bottomPoints, color, shape } = child;
              if (isSmooth) {
                const generatePath = () => {
                  const d = [];
                  const constaint = [
                    [0, 0],
                    [1, 1],
                  ];
                  const bottomPointsLen = bottomPoints?.length || 0;
                  const topPoints = points.slice(0, points.length - bottomPointsLen);
                  const topSps = Smooth.smooth(topPoints, false, constaint);
                  d.push(['M', topPoints[0].x, topPoints[0].y]);

                  for (let i = 0, n = topSps.length; i < n; i++) {
                    const sp = topSps[i];
                    d.push(['C', sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
                  }
                  if (bottomPointsLen) {
                    const bottomSps = Smooth.smooth(bottomPoints, false, constaint);
                    d.push(['L', bottomPoints[0].x, bottomPoints[0].y]);
                    for (let i = 0, n = bottomSps.length; i < n; i++) {
                      const sp = bottomSps[i];
                      d.push(['C', sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
                    }
                  }
                  return d;
                };
                return (
                  <path
                    style={{
                      path: generatePath(),
                      lineWidth: '2px',
                      fill: color,
                      ...shape,
                    }}
                  />
                );
              }
              return (
                <polygon
                  attrs={{
                    points: points.map((point) => {
                      return [point.x, point.y];
                    }),
                    lineWidth: '2px',
                    fill: color,
                    ...shape,
                  }}
                  animation={deepMix(
                    {
                      appear,
                      update: {
                        easing: 'linear',
                        duration: 450,
                        property: ['points'],
                      },
                    },
                    animation
                  )}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
