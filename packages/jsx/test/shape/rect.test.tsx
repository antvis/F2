import { canvas } from '../global';
import { jsx, render } from '../../src/index';

describe('Text', () => {
  it('text shape', async () => {
    const node = (
      <rect style={{
        color: 'red',
        width: 10,
        height: 10,
        radius: 4,
      }} />
    );
    const shape = render(node, canvas);
    canvas.draw();

    const children = canvas.get('children');
    expect(children.length).toBe(1);
    expect(children[0]).toBe(shape);
    expect(children[0].get('type')).toBe('rect');
    expect(children[0].get('attrs').fill).toBe('red');
    expect(children[0].get('attrs').width).toBe(10);
    expect(children[0].get('attrs').height).toBe(10);
    expect(children[0].get('attrs').radius).toBe(4);
  });
});
