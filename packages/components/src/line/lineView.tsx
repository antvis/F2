import { jsx } from '@ali/f2-jsx';

export default (props: any) => {
  const { mappedData, smooth, lineDash } = props;

  // // 极坐标
  // if (isInCircle) {
  //   points.push(points[0]);
  // }
  return (
    <group>
      {
        mappedData.map(cfg => {
          const { points, color, size } = cfg;
          return (
            <polyline attrs={{
              points,
              lineJoin: 'round',
              lineCap: 'round',
              lineWidth: size || '4px',
              strokeStyle: color,
              smooth,
              lineDash,
            }}
          />
          );
        })
      }
    </group>
  );
}
