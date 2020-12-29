// @ts-nocheck

export default (props) => {
  const { items } = props;
  const len = items.length;
  return (
    <group style={{
      flexDirection: 'row',
      padding: ['4px', '60px'],
      height: '96px',
    }}>
      {
        items.map((item: any, index: number) => {
          return (
            <group style={{
              flexDirection: 'row',
              // justifyContent: index === 0 ? 'flex-start' : index === len - 1 ? 'flex-end' : 'center',
              flex: 1,
            }} >
              <group style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <rect style={{
                    marginRight: '4px',
                    width: '14px',
                    height: '14px',
                  }}
                  attrs={{
                    fill: item.color
                  }}
                />
                <text attrs={{
                  textBaseline: 'middle',
                  text: item.name,
                  fontSize: '24px',
                  fill: '#333333',
                  fontWeight: '500'
                }} />
              </group>
            </group>
          );
        })
      }
    </group>
  );
}
