import { jsx } from '../../jsx';
import { deepMix } from '@antv/util';
import { Smooth, BBox } from '@antv/f2-graphic';

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
            x: center.x,
            y: center.y,
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
              const { points, bottomPoints, color, shape } = child;
              if (isSmooth) {
                return (
                  <custom
                    attrs={{
                      points,
                      lineWidth: '2px',
                      fill: color,
                      ...shape,
                    }}
                    createPath={(context) => {
                      const constaint = [
                        [0, 0],
                        [1, 1],
                      ];
                      const bottomPointsLen = bottomPoints?.length || 0;
                      const topPoints = points.slice(0, points.length - bottomPointsLen);
                      const topSps = Smooth.smooth(topPoints, false, constaint);
                      context.beginPath();
                      context.moveTo(topPoints[0].x, topPoints[0].y);
                      for (let i = 0, n = topSps.length; i < n; i++) {
                        const sp = topSps[i];
                        context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
                      }

                      if (bottomPointsLen) {
                        const bottomSps = Smooth.smooth(bottomPoints, false, constaint);
                        context.lineTo(bottomPoints[0].x, bottomPoints[0].y);
                        for (let i = 0, n = bottomSps.length; i < n; i++) {
                          const sp = bottomSps[i];
                          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
                        }
                      }
                      context.closePath();
                    }}
                    calculateBox={() => BBox.getBBoxFromPoints(points)}
                  />
                );
              }
              return (
                <polygon
                  attrs={{
                    points,
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
