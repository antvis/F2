/** @jsxImportSource .. */

import * as F2 from '@antv/f2';
import { render } from '../src';

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
    const shape = render(group, canvas.addGroup());
    canvas.draw();
    expect(!!shape).toBe(true);
    expect(shape.get('children').length).toBe(1);
    expect(shape.get('children')[0].get('type')).toBe('rect');
  })
});
