// @ts-nocheck

export default (props: any) => {
  return (
    <group style={{
      padding: "40px"
    }}>
      <rect style={{
          width: '8px',
          height: '8px',
        }}
        attrs={{
          fill: '#F93A4A'
        }}
      />
      <text style={{
          marginLeft: '20px',
          width: '100px',
          height: '24px',
        }}
          attrs={{
          textBaseline: 'middle',
          text: '本基金',
          fill: '#333333',
          fontSize: '24px',
        }}
      />
    </group>
  );
}
