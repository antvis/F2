/** @jsxImportSource .. */
import { canvas } from './global';
import render from '../src/render';

describe('index', () => {
  it('render', async () => {
    canvas.clear();
    const profile = (
      <group style={{
        flexDirection: 'row',
        padding: 20
      }}>
        <rect style={{
          width: 20,
          height: 20,
          fill: 'red'
        }} />
        <rect style={{
          width: 20,
          height: 20,
          fill: 'green'
        }} />
        <text style={{
          text: '111',
          fill: '#000'
        }} />
      </group>
    );
    console.log(profile);
    render(profile, canvas);

    canvas.draw();

    // const group = render(
    //   <view>
    //     <text style={{ color: '#000' }}>ss</text>
    //     <text style={{ color: 'red' }}>aaa</text>
    //   </view>, canvas);
    // canvas.draw();
    // expect(group.get('children').length).toBe(2);
    // expect(group.get('children')[1].get('attrs').x).toBe(0);
    // expect(group.get('children')[1].get('attrs').y).toBe(18);
  });
});
