import { jsx, Smooth } from '@antv/f-engine';
import { deepMix } from '@antv/util';

export default (props) => {
  const { coord, records, baseY, shape, animation } = props;
  const isSmooth = shape === 'smooth';
  const { left, top, width, height, center, startAngle, endAngle, radius } = coord as any;

  const appear = coord.isPolar
    ? {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'sector',
          property: ['endAngle'],
          style: {
            cx: center.x,
            cy: center.y,
            startAngle: `${startAngle}rad`,
            r: radius,
          },
          start: {
            endAngle: `${startAngle}rad`,
          },
          end: {
            endAngle: `${endAngle}rad`,
          },
        },
      }
    : {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'rect',
          property: ['width'],
          style: {
            x: left,
            y: top,
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
              const { points, topPoints, bottomPoints, color, shape } = child;
              if (isSmooth) {
                const generatePath = () => {
                  const d = [];
                  const constaint = [
                    [0, 0],
                    [1, 1],
                  ];

                  const topSps = Smooth.smooth(topPoints, false, constaint);
                  d.push(['M', topPoints[0].x, topPoints[0].y]);

                  for (let i = 0, n = topSps.length; i < n; i++) {
                    const sp = topSps[i];
                    d.push(['C', sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
                  }

                  if (bottomPoints && bottomPoints.length) {
                    const bottomSps = Smooth.smooth(bottomPoints, false, constaint);
                    d.push(['L', bottomPoints[0].x, bottomPoints[0].y]);
                    for (let i = 0, n = bottomSps.length; i < n; i++) {
                      const sp = bottomSps[i];
                      d.push(['C', sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
                    }
                  } else {
                    d.push(['L', topPoints[topPoints.length - 1].x, baseY]);
                    d.push(['L', topPoints[0].x, baseY]);
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
                  style={{
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
