// @ts-nocheck

export default (props: any) => {
  const { items, records, active } = props;
  const len = items.length;
  const firstItem = items[0];

  return (
    <group style={{
      maxWidth: '800px',
      padding: [10, 0, 0, 0]
      // justifyContent: 'center',
    }} attrs={{
      radius: '8px',
      fill: active ? '#E7F1FF' : undefined,
    }}>
      <group style={{
        flexDirection: 'row',
        padding: ['4px', '60px'],
      }}>
        {
          items.map((item: any, index: number) => {
            const { name, value } = item;
            return (
              <group style={{
                flexDirection: 'row',
                justifyContent: index === 0 ? 'flex-start' : index === len - 1 ? 'flex-end' : 'center',
                flex: 1,
              }}>
                <group>
                  <group style={{
                    width: '100px',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <rect style={{
                      marginRight: '8px',
                      width: '24px',
                      height: '4px',
                    }} attrs={{
                      radius: '4px',
                      fill: item.color,
                    }}/>
                    <text attrs={{
                      textBaseline: 'middle',
                      fontSize: '24px',
                      fill: '#333333',
                      fontWeight: '500',
                      text: name,
                    }} />
                    {/* <text attrs={{
                      textBaseline: 'middle',
                      // marginLeft: '32px',
                      // marginTop: '8px',
                      fontSize: '24px',
                      fill: '#333333',
                      text: value,
                    }} /> */}
                  </group>
                </group>
              </group>
            );
          })
        }
      </group>
    </group>
  );
}
