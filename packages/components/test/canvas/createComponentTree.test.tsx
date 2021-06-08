import { jsx, Fragment } from '@ali/f2-jsx';
import createComponentTree from '../../src/canvas/createComponentTree';
import Container from '../../src/component/container';
import Canvas, { Chart, Line, Interval } from '../../src';
import jsxTree from './createComponentTree/jsx';
import reactTree from './createComponentTree/react';

describe('createComponentTree', () => {
  it('react 生成的jsx树', () => {
    // @ts-ignore
    const result = createComponentTree(reactTree, null);
    expect(Object.keys(result).sort()).toEqual([ 'key', 'props', 'ref', 'type' ]);
    expect(Object.keys(result.props.children).sort()).toEqual([ 'key', 'props', 'ref', 'type' ]);
  });

  it('jsx 方法生成的', () => {
    const result = createComponentTree(
      // @ts-ignore
      <Canvas>
        <Chart>
          <Line />
          <Interval />
        </Chart>
      </Canvas>, null);
    expect(result.type).toBe(Canvas);
    expect(result.props.children.type).toBe(Chart);
  });

  it('fragment', () => {
    // @ts-ignore
    const result = createComponentTree((<Canvas>
      <>
        <Chart><Line /></Chart>
      </>
    </Canvas>), null);

    expect(result.props.children.type).toBe(Container);
  });

  it('function component', () => {
    const A = () => {
      return (
        <Chart><Line /></Chart>
      )
    }
    // @ts-ignore
    const result = createComponentTree((<Canvas>
      <A />
    </Canvas>), null);

    expect(result.type).toBe(Canvas);
    expect(result.props.children.type).toBe(Chart);
  });
});
