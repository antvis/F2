import { jsx } from '@ali/f2-jsx';

export default (props: any) => {
  const { points, color, size, smooth, lineDash } = props;
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
}
