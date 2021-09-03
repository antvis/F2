import { jsx } from '../../jsx';

export default (props) => {
  const { records, layout } = props;
  if (!records || !records.length) return null;
  const { width } = layout;
  return (
    <group
      style={{
        flexDirection: 'row',
        width,
      }}
    >
      <group
        style={{
          flexDirection: 'row',
          // paddingLeft: '10px',
          flexWrap: 'wrap',
          flex: 1,
        }}
        attrs={{
          radius: '2px',
          fill: 'rgba(0, 0, 0, 0.65)',
        }}
      >
        {
          records.map(record => {
            return (
              <group style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'center',
                padding: [ '6px', '10px', '6px', '10px' ],
              }}>
                <circle
                  attrs={{
                    fill: record.color,
                    r: '6px',
                    lineWidth: '2px',
                    stroke: '#fff'
                  }}
                />
                <text
                  style={{
                    marginLeft: '16px'
                  }}
                  attrs={{
                    fill: 'black',
                    text: record['genre']
                  }}
                />
              </group>
            );
          })
        }
      </group>
    </group>
  );
}
