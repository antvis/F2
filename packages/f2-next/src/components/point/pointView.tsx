import { jsx } from '@jsx';

export default (props) => {
  const { x, y, color, size } = props;
  return (
    <circle attrs={{
      x,
      y,
      lineWidth: 0,
      fill: color,
      r: size || '6px',
    }} />
  );
}
