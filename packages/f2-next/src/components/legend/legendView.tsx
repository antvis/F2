import { jsx } from '../../jsx';

export default (props) => {
  const { items, layout } = props;
  const { left, top, width } = layout;
  return (
    <group style={{
      left,
      top,
      width,
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: [0, '6px', '20px', 0],
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
              padding: ['6px', 0, 0, '6px'],
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
