import { canvas } from '../global';
import { jsx, render } from '../../src/index';

describe('Text', () => {
  it('text shape', async () => {
    const node = (
      <circle style={{
        left: 20,
        top: 20,
        color: 'red',
        r: 10,
      }} />
    );
    const shape = render(node, canvas);
    canvas.draw();

    const children = canvas.get('children');
    expect(children.length).toBe(1);
    expect(children[0]).toBe(shape);
    expect(children[0].get('type')).toBe('circle');
    expect(children[0].get('attrs').fill).toBe('red');
    expect(children[0].get('attrs').r).toBe(10);
  });
});
