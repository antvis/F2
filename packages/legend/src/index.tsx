// @ts-nocheck

import withLegend from './withLegend';

const View = (props) => {
  const { record } = props;
  return (
    <group style={{
      flexDirection: 'row',
      padding: 20
    }}>
      <text style={{
          flex: 1,
        }}
        attrs={{
          text: '11',
          fill: '#000'
        }}
      />
      <text style={{
          flex: 1,
        }}
        attrs={{
          text: JSON.stringify(record),
          fill: '#000'
        }}
      />
    </group>
  );
}

export { withLegend, View };
export default withLegend(View);