// @ts-nocheck

export default (props) => {
  const { items } = props;
  // const len = items.length;
  return (
    <group style={{
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>
      {
        items.map((item: any, index: number) => {
          return (
            <group style={{
              flexDirection: 'row',
              padding: ['10px', '20px', '10px', 0],
              minWidth: '200px'
            }}>
              <group style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <rect style={{
                    marginRight: '12px',
                    width: '14px',
                    height: '14px',
                  }}
                  attrs={{
                    fill: item.color
                  }}
                />
                <text
                  attrs={{
                    textBaseline: 'middle',
                    text: item.name,
                    fontSize: '24px',
                    fill: '#333333',
                    fontWeight: '500'
                  }}
                />
              </group>
            </group>
          );
        })
      }
    </group>
  );
}
