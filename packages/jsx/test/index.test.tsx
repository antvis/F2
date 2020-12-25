/** @jsxImportSource .. */
import { canvas } from './global';
import render from '../src/render';

describe('index', () => {
  it('render', async () => {
    canvas.clear();
    const profile = (
      <group style={{
        width: 200,
        height: 100,
        flexDirection: 'row',
      }}>
        <rect style={{
            width: 100,
            flex: 1,
          }}
          attrs={{
            fill: 'red',
          }}
        />
        <rect style={{
            flex: 1,
          }}
          attrs={{
            fill: 'green'
        }} />
        <text style={{
            flex: 1,
          }}
          attrs={{
            textBaseline: 'top',
            text: '111',
            fill: '#000'
        }} />
      </group>
    );
    render(profile, canvas);
    console.log(canvas);
    canvas.draw();
  });
});
