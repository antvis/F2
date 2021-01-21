
import * as F2 from '@antv/f2';
import { render, jsx } from '../src';

const { G } = F2;

const canvasEl = document.createElement('canvas');
canvasEl.style.width = '100%';
canvasEl.style.height = '400px';
document.body.appendChild(canvasEl);
const context = canvasEl.getContext('2d');

const canvas = new G.Canvas({
  context,
});

describe('render', () => {
  it('group', () => {
    const group = (
      <group>
        <rect attrs={{
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          fill: 'red'
        }}
        />
      </group>
    );
    const container = canvas.addGroup();
    const shape = render(group, container);
    canvas.draw();
    expect(!!shape).toBe(true);
    expect(shape.get('children').length).toBe(1);
    expect(shape.get('children')[0].get('type')).toBe('rect');

    container.remove(true);
  });

  it('group with background', () => {
    const group = (
      <group style={{ width: 100, height: 100 }} attrs={{
        fill: 'gray'
      }}>
        <rect attrs={{
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          fill: 'red'
        }}
        />
      </group>
    );
    const container = canvas.addGroup();
    const shape = render(group, container);
    canvas.draw();
    expect(shape.get('children').length).toBe(2);
    expect(shape.get('children')[0].get('type')).toBe('rect');

    const background = shape.get('children')[0].get('attrs');
    expect(background.fill).toBe('gray');
    expect(background.width).toBe(100);
    expect(background.height).toBe(100);

    container.remove(true);
  });

  it('group children empty', () => {
    const container = canvas.addGroup();
    const group1 = render(<group></group>, container);
    const group2 = render(<group />, container);
    canvas.draw();
    
    expect(group1.get('children').length).toBe(0);
    expect(group2.get('children').length).toBe(0);
  });

  it('shape', () => {
    const rect = (
      <rect attrs={{
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        fill: 'red'
      }}
      />
    );
    const container = canvas.addGroup();
    const shape = render(rect, container);
    canvas.draw();
    expect(shape.get('type')).toBe('rect');

    container.remove(true);
  });

  it('test ref', () => {
    const ref = { current: null };
    const rect = (
      <rect attrs={{
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        fill: 'red'
      }}
      ref={ ref }
      />
    );
    const container = canvas.addGroup();
    const shape = render(rect, container);
    canvas.draw();
    expect(ref.current).toBe(shape);

    container.remove(true);
  });

  it('test ref', () => {
    const ref = { current: null };
    const group = (
      <group ref={ ref }>
        <rect attrs={{
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          fill: 'red'
        }}
        />
      </group>
    );
    const container = canvas.addGroup();
    const shape = render(group, container);
    canvas.draw();
    expect(ref.current).toBe(shape);

    container.remove(true);
  });

  it('render null', () => {
    const container = canvas.addGroup();
    const shape = render(null, container);
    canvas.draw();
    expect(shape).toBeUndefined();

    container.remove(true);
  })
});
