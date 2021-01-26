import { jsx } from '@ali/f2-jsx';

export default (props) => {
  const { points, color, smooth } = props;
  return (
    <polyline
      attrs={{
        points,
        smooth,
        fill: color,
        fillOpacity: 0.1
      }}
    />
  );
}
