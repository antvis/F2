function View(props) {
  const { coord, year } = props;
  const { left, top, width, height } = coord;
  const x = left + width / 2;
  const y = top + height / 2;
  return (
    <group>
      <text
        attrs={{
          x,
          y,
          text: year,
          textAlign: 'center',
          // textBaseline: 'bottom',
          fontSize: '80px',
          // fontWeight: 'bold',
          fill: '#ddd',
        }}
      />
    </group>
  );
}

export default View;
