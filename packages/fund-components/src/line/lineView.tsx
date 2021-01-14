// @ts-nocheck

export default (props: any) => {
  const { points, color } = props;
  return (
    <polyline attrs={{
        points,
        lineWidth: '3px',
        strokeStyle: color,
        lineJoin: 'round',
        lineCap: 'round',
      }}
    />
  );
}
