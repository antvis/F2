import { jsx } from '@ali/f2-jsx';

export default (props: any) => {
  const { points, color, size } = props;
  return (
    <polyline attrs={{
        points,
        lineJoin: 'round',
        lineCap: 'round',
        lineWidth: size,
        strokeStyle: color,
      }}
    />
  );
}
