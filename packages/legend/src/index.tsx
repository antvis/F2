// @ts-nocheck

import model from './model';

const View = (props) => {
  return (
    <group style={{
      flexDirection: 'row',
      width: 100,
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
          fill: 1,
        }}
        attrs={{
          text: '11',
          fill: '#000'
        }}
      />
    </group>
  );
}

export { model, View };
export default model(View);