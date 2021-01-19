// @ts-nocheck

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
