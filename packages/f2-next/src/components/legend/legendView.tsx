import { jsx } from '../../jsx';

export default (props) => {
  const { items, layout } = props;
  const { width } = layout;
  return (
    <group style={{
      width,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingBottom: '20px'
    }}>
      {
        items.map(item => {
          const { color, name, value } = item;
          return (
            <group style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: [0, 0, '10px', '10px']
            }}>
              <circle
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '6px'
                }}
                attrs={{
                  fill: color,
                  r: '6px'
                }}
              />
              <text
                attrs={{
                  fill: 'black',
                  text: name,
                }}
              />
              {
                value ?
                  <text
                    attrs={{
                      fill: 'black',
                      text: `: ${value}`,
                    }}
                  />
                :
                  null
              }
            </group>
          )
        })
      }
    </group>
  );
}
