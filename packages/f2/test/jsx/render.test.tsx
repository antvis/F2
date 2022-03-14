// import * as F2 from '@antv/f2';
import { render, renderJSXElement, jsx, Fragment, compareRenderTree } from '../../src/jsx';
import { ELEMENT_DELETE } from '../../src/jsx/elementStatus';
import { Canvas } from '@antv/f2-graphic';
import { createContext } from '../util';

const canvasEl = document.createElement('canvas');
canvasEl.style.width = '359px';
canvasEl.style.height = '400px';
document.body.appendChild(canvasEl);
const context = canvasEl.getContext('2d');

const canvas = new Canvas({
  context,
});

describe('render', () => {
  it('group', () => {
    const container = canvas.addGroup();
    const group = render(
      <group>
        <rect
          attrs={{
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            fill: 'red',
          }}
        />
      </group>,
      container
    );
    canvas.draw();
    expect(!!group).toBe(true);
    expect(group.get('children').length).toBe(1);
    expect(group.get('children')[0].get('type')).toBe('rect');

    container.remove(true);
  });

  it('group with background', () => {
    const container = canvas.addGroup();
    const shape = render(
      <group
        style={{ width: 100, height: 100 }}
        attrs={{
          fill: 'gray',
        }}
      >
        <rect
          attrs={{
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            fill: 'red',
          }}
        />
      </group>,
      container
    );
    canvas.draw();

    const background = shape.get('attrs');
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
    const container = canvas.addGroup();
    const shape = render(
      <rect
        attrs={{
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          fill: 'red',
        }}
      />,
      container
    );
    canvas.draw();
    expect(shape.get('type')).toBe('rect');

    container.remove(true);
  });

  it('test shape ref', () => {
    const ref = { current: null };
    const container = canvas.addGroup();
    const shape = render(
      <rect
        attrs={{
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          fill: 'red',
        }}
        ref={ref}
      />,
      container
    );
    canvas.draw();
    expect(ref.current).toBe(shape);

    container.remove(true);
  });

  it('test group ref', () => {
    const groupRef = { current: null };
    const rectRef = { current: null };
    const container = canvas.addGroup();
    const group = render(
      <group ref={groupRef}>
        <rect
          ref={rectRef}
          attrs={{
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            fill: 'red',
          }}
        />
      </group>,
      container
    );
    canvas.draw();
    expect(groupRef.current).toBe(group);
    expect(rectRef.current.get('type')).toBe('rect');

    container.remove(true);
  });

  it('render null', () => {
    const container = canvas.addGroup();
    const shape = render(null, container);
    canvas.draw();
    expect(shape).toBeUndefined();

    container.remove(true);
  });
});

describe('render style alias', () => {
  it('group', () => {
    const container = canvas.addGroup();
    const group = render(
      <group>
        <rect
          style={{
            left: 0,
            top: 0,
            width: 10,
            height: 10,
            backgroundColor: 'red',
          }}
        />
      </group>,
      container
    );
    canvas.draw();
    expect(!!group).toBe(true);
    expect(group.get('children').length).toBe(1);
    expect(group.get('children')[0].get('type')).toBe('rect');
    container.remove(true);
  });
});

describe('layout', () => {
  it('flex direction default column', () => {
    const container = canvas.addGroup();
    const group = render(
      <group
        style={{
          width: '200px',
          height: '200px',
        }}
      >
        <rect
          style={{
            flex: 1,
          }}
          attrs={{
            fill: 'gray',
          }}
        />
        <rect
          style={{
            flex: 1,
          }}
          attrs={{
            fill: 'red',
          }}
        />
      </group>,
      container
    );
    canvas.draw();

    const children = group.get('children');
    expect(children[0].get('attrs').x).toBe(0);
    expect(children[0].get('attrs').y).toBe(0);
    expect(children[0].get('attrs').width).toBe(100);
    expect(children[0].get('attrs').height).toBe(50);
    expect(children[0].get('attrs').fill).toBe('gray');

    expect(children[1].get('attrs').x).toBe(0);
    expect(children[1].get('attrs').y).toBe(50);
    expect(children[1].get('attrs').width).toBe(100);
    expect(children[1].get('attrs').height).toBe(50);
    expect(children[1].get('attrs').fill).toBe('red');
    container.remove(true);
  });

  it('flex direction row', () => {
    const container = canvas.addGroup();
    const group = render(
      <group
        style={{
          flexDirection: 'row',
          padding: ['20px', '40px'],
          width: '380px',
          height: '200px',
        }}
      >
        <rect
          style={{
            flex: 1,
          }}
          attrs={{
            fill: 'gray',
          }}
        />
        <rect
          style={{
            flex: 1,
          }}
          attrs={{
            fill: 'red',
          }}
        />
        <group
          style={{
            flex: 1,
          }}
        >
          <text
            attrs={{
              fill: '#000',
              text: '123',
            }}
          />
        </group>
      </group>,
      container
    );
    canvas.draw();

    const children = group.get('children');
    expect(children[0].get('attrs').x).toBe(20);
    expect(children[0].get('attrs').y).toBe(10);
    expect(children[0].get('attrs').width).toBe(50);
    expect(children[0].get('attrs').height).toBe(80);
    expect(children[0].get('attrs').fill).toBe('gray');

    expect(children[1].get('attrs').x).toBe(70);
    expect(children[1].get('attrs').y).toBe(10);
    expect(children[1].get('attrs').width).toBe(50);
    expect(children[1].get('attrs').height).toBe(80);
    expect(children[1].get('attrs').fill).toBe('red');

    expect(children[2].get('children')[0].get('type')).toBe('text');
    expect(children[2].get('children')[0].get('attrs').x).toBe(120);
    expect(children[2].get('children')[0].get('attrs').y).toBe(16);
    container.remove(true);
  });

  it('text render', () => {
    const container = canvas.addGroup();
    const group = render(
      <group
        style={{
          flexDirection: 'row',
          width: '20px',
          height: '200px',
          flexWrap: 'wrap',
        }}
      >
        <text
          style={
            {
              // flex: 1,
            }
          }
          attrs={{
            fill: '#000',
            text: '111',
          }}
        />
        <text
          style={
            {
              // flex: 1,
            }
          }
          attrs={{
            fill: '#000',
            text: '222',
          }}
        />
      </group>,
      container
    );
    canvas.draw();

    const children = group.get('children');
    expect(children[0].get('attrs').x).toBe(0);
    expect(children[0].get('attrs').y).toBe(6);
    expect(children[0].get('attrs').textBaseline).toBe('middle');

    expect(children[1].get('attrs').x).toBe(0);
    expect(children[1].get('attrs').y).toBe(18);
    expect(children[1].get('attrs').textBaseline).toBe('middle');

    container.remove(true);
  });

  it('margin percent', () => {
    const container = canvas.addGroup();
    const group = render(
      <group
        style={{
          // padding: '20px',
          marginLeft: '-50%',
          // marginTop: '-50%',
        }}
      >
        <text
          style={
            {
              // flex: 1,
            }
          }
          attrs={{
            fill: '#000',
            text: '111',
          }}
        />
      </group>,
      container
    );
    canvas.draw();

    const children = group.get('children');
    const textShape = children[0];

    const left = -(textShape.getBBox().width / 2);
    expect(textShape.get('attrs').x).toBeCloseTo(left, 3);
    // expect(children[0].get('attrs').x).toBe(0);
    // expect(children[0].get('attrs').y).toBe(6);
    // expect(children[0].get('attrs').textBaseline).toBe('middle');

    // expect(children[1].get('attrs').x).toBe(0);
    // expect(children[1].get('attrs').y).toBe(18);
    // expect(children[1].get('attrs').textBaseline).toBe('middle');

    // container.remove(true);
  });

  describe('delete element', () => {
    it('删除元素不参布局计算', () => {
      const container = canvas.addGroup();
      const groupJSXElement = (
        <group
          style={{
            flexDirection: 'row',
            width: 200,
            height: 200,
            flexWrap: 'wrap',
          }}
        >
          <rect
            style={{
              flex: 1,
            }}
            attrs={{
              fill: '#f00',
            }}
          />
          <rect
            style={{
              flex: 1,
            }}
            attrs={{
              fill: '#0f0',
            }}
          />
          <group
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <rect
              style={{
                flex: 1,
              }}
              attrs={{
                fill: '#00f',
              }}
            />
            <rect
              style={{
                flex: 1,
              }}
              attrs={{
                fill: '#0f0',
              }}
            />
          </group>
        </group>
      );
      // 新增和变化的元素不保留上次的attrs
      groupJSXElement.props.children[0]._cache = {
        attrs: { x: 100, y: 200, width: 10, height: 10 },
      };
      // 把中间的元素标记为删除
      groupJSXElement.props.children[1].status = ELEMENT_DELETE;
      // 删除的元素保留attrs
      groupJSXElement.props.children[1]._cache = {
        attrs: { x: 0, y: 200, width: 10, height: 10 },
      };
      groupJSXElement.props.children[2].props.children[1].status = ELEMENT_DELETE;
      const group = render(groupJSXElement, container);
      canvas.draw();

      const children = group.get('children');
      expect(children[0].get('attrs').x).toBe(0);
      expect(children[0].get('attrs').y).toBe(0);
      expect(children[0].get('attrs').width).toBe(100);
      expect(children[0].get('attrs').height).toBe(200);

      expect(children[1].get('attrs').x).toBe(0);
      expect(children[1].get('attrs').y).toBe(200);
      expect(children[1].get('attrs').width).toBe(10);
      expect(children[1].get('attrs').height).toBe(10);

      expect(children[2].get('attrs').x).toBe(100);
      expect(children[2].get('attrs').y).toBe(0);
      expect(children[2].get('attrs').width).toBe(100);
      expect(children[2].get('attrs').height).toBe(200);

      const subChildren = children[2].get('children');
      expect(subChildren[0].get('attrs').x).toBe(100);
      expect(subChildren[0].get('attrs').y).toBe(0);
      expect(subChildren[0].get('attrs').width).toBe(100);
      expect(subChildren[0].get('attrs').height).toBe(200);

      expect(subChildren[1].get('attrs').x).toBe(0);
      expect(subChildren[1].get('attrs').y).toBe(0);
      expect(subChildren[1].get('attrs').width).toBe(0);
      expect(subChildren[1].get('attrs').height).toBe(0);
    });

    it('删除元素不参布局计算-根元素', () => {
      const container = canvas.addGroup();
      const groupJSXElement = (
        <group
          style={{
            flexDirection: 'row',
            width: 200,
            height: 200,
            flexWrap: 'wrap',
          }}
        >
          <rect
            style={{
              flex: 1,
            }}
            attrs={{
              fill: '#f00',
            }}
          />
          <rect
            style={{
              flex: 1,
            }}
            attrs={{
              fill: '#0f0',
            }}
          />
        </group>
      );
      // 把中间的元素标记为删除
      groupJSXElement.status = ELEMENT_DELETE;
      const group = render(groupJSXElement, container);
      canvas.draw();

      const children = group.get('children');
      expect(children.length).toBe(2);
      expect(children[0].get('attrs').x).toBe(0);
      expect(children[0].get('attrs').y).toBe(0);
      expect(children[0].get('attrs').width).toBe(0);
      expect(children[0].get('attrs').height).toBe(0);

      expect(children[1].get('attrs').x).toBe(0);
      expect(children[1].get('attrs').y).toBe(0);
      expect(children[1].get('attrs').width).toBe(0);
      expect(children[1].get('attrs').height).toBe(0);
    });
  });
});

describe('clip', () => {
  it('rect', () => {
    const context = createContext();
    const canvas = new Canvas({
      context,
      pixelRatio: 1,
    });
    render(
      <group>
        <rect
          attrs={{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: 'red',
            clip: {
              type: 'circle',
              attrs: {
                x: 50,
                y: 50,
                r: 40,
              },
            },
          }}
        />
      </group>,
      canvas
    );

    canvas.draw();
    expect(context).toMatchImageSnapshot();
  });

  it('group', () => {
    const context = createContext();
    const canvas = new Canvas({
      context,
      pixelRatio: 1,
    });
    render(
      <group
        attrs={{
          clip: {
            type: 'circle',
            attrs: {
              x: 50,
              y: 50,
              r: 40,
            },
          },
        }}
      >
        <rect
          attrs={{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: 'red',
          }}
        />
      </group>,
      canvas
    );
    canvas.draw();

    expect(context).toMatchImageSnapshot();
  });
});
