import { jsx } from '@ali/f2-jsx';

export default (props) => {
  const { x, y, color, size } = props;
  return (
    <circle attrs={{
      x,
      y,
      fill: color,
      r: size,
    }} />
  );
}
