import { jsx } from '../../jsx';

export default (props) => {
  const { items } = props;
  return null;
  return (
    <group style={{
      left: 50,
      top: 50,
      width: 100,
      flexDirection: 'row'
    }}>
      {
        items.map(item => {
          const { color, name, value } = item;
          return (
            <group style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <circle
                style={{
                  width: '20px',
                  height: '20px',
                }}
                attrs={{
                  fill: color,
                  r: '6px'
                }}
              />
              <text
                attrs={{
                  fill: 'black',
                  text: item.name,
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
