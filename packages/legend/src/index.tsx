// @ts-nocheck
/** @jsxImportSource ../../jsx */

function model(View) {
  return class LegendModel {
    render() {
      return <View />
    }
  }
}


export default model((props) => {
  return (
    <group style={{
      flexDirection: 'row',
      padding: 20
    }}>
      <text style={{
        x: 10,
        y: 10,
        text: `aa `,
        fill: '#000'
      }} />
      <text style={{
        x: 60,
        y: 10,
        text: 'sold',
        fill: '#000'
      }} />
    </group>
  );
})