import { canvas } from '../global';
import { jsx, render } from '../../src/index';

describe('Text', () => {
  it('text shape', async () => {
    const node = (
      <text style={{
        color: 'red',
        fontSize: 22,
      }}>aaa</text>
    );
    const shape = render(node, canvas);
    canvas.draw();

    const children = canvas.get('children');
    expect(children.length).toBe(1);
    expect(children[0]).toBe(shape);
    expect(children[0].get('type')).toBe('text');
    expect(children[0].get('attrs').fill).toBe('red');
    expect(children[0].get('attrs').fontSize).toBe(22);
  });
});
