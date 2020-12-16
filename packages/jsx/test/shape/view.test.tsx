import { canvas } from '../global';
import { jsx, render } from '../../src/index';

describe('view', () => {
  it('view shape', async () => {
    const view = (
      <view style={{
        width: 50,
        height: 50,
        backgroundColor: 'gray',
        radius: 4,
      }} />
    );
    canvas.clear();
    const shape = render(view);
    canvas.add(shape);
    canvas.draw();

    const children = shape.get('children');
    expect(shape.get('isGroup')).toBe(true);
    expect(children.length).toBe(1);
    expect(children[0].get('attrs').fill).toBe('gray');
    expect(children[0].get('attrs').width).toBe(50);
    expect(children[0].get('attrs').height).toBe(50);
    expect(children[0].get('attrs').height).toBe(50);
    expect(children[0].get('attrs').radius).toBe(4);
  });

  it('view children', async () => {
    const width = canvas.get('width');
    const view = (
      <view style={{
        padding: 10,
        width,
        height: 90,
        flexDirection: 'row',
      }}>
        <view style={{
          padding: '20px',
          radius: 4,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'gray',
        }}>
          <text style={{
            fontSize: 13,
            color: '#333333',
          }}
          >本基金</text>
          <text style={{
            color: '#F93A4A',
          }}
          >+10.00%</text>
        </view>
        <view style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#ccc',
        }}>
          <text style={{
            fontSize: 13,
            color: '#333333',
          }}
          >同类</text>
          <text style={{
            color: '#F93A4A',
          }}
          >+10.00%</text>
        </view>
        <view style={{
          padding: 10,
          radius: 20,
          flex: 1,
          flexDirection: 'column',
          // justifyContent: 'flex-end',
          backgroundColor: '#ddd'
        }}>
          <text style={{
            fontSize: 13,
            color: '#333333',
          }}
          >沪深300</text>
          <text style={{
            color: '#F93A4A',
          }}
          >+10.00%</text>
        </view>
      </view>
    );
    canvas.clear();
    const group = render(view, canvas);
    canvas.draw();

    const children = group.get('children');
    expect(children.length).toBe(4);
    expect(children[0].get('attrs').width).toBe(width);
    expect(children[0].get('attrs').height).toBe(90);
    expect(children[3].get('children')[2].get('attrs').x).toBe(246);
    expect(children[3].get('children')[2].get('attrs').y).toBe(33);
    expect(children[3].get('children')[2].get('attrs').text).toBe('+10.00%');
  });

  it('view map', async () => {
    const width = canvas.get('width');
    const list = [
      { text: '本基金' },
      { text: '同类均值' },
      { text: '沪深300' },
    ]
    const view = (
      <view style={{
        padding: 10,
        width,
        height: 90,
        flexDirection: 'row',
      }}>
        {
          list.map(item => {
            return (
              <view style={{
                padding: 10,
                radius: 4,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'gray',
              }}>
                <text style={{
                  fontSize: 13,
                  color: '#333333',
                }}
              >{ item.text }</text>
                <text style={{
                  color: '#F93A4A',
                }}
                >+10.00%</text>
              </view>
            )
          })
        }
      </view>
    );
    canvas.clear();
    const group = render(view, canvas);
    canvas.draw();

    const children = group.get('children');
    expect(children.length).toBe(4);
    expect(children[0].get('attrs').width).toBe(width);
    expect(children[0].get('attrs').height).toBe(90);
    expect(children[2].get('children')[1].get('attrs').text).toBe('同类均值');
  });

  it('view if', async () => {
    const width = canvas.get('width');
    const list = [
      { text: '本基金', show: true},
      { text: '同类均值', show: false },
      { text: '沪深300', show: true},
    ]
    const view = (
      <view style={{
        padding: 10,
        width,
        height: 90,
        flexDirection: 'row',
      }}>
        {
          list.map(item => {
            return (
              <view style={{
                padding: 10,
                radius: 4,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'gray',
              }}>
                <text style={{
                    fontSize: 13,
                    color: '#333333',
                  }}
                >
                  { item.text }
                </text>
                {
                  item.show ?
                    <text style={{
                      color: '#F93A4A',
                    }}
                    >+10.00%</text>
                  :
                    null
                }
              </view>
            )
          })
        }
      </view>
    );
    canvas.clear();
    const group = render(view, canvas);
    canvas.draw();

    const children = group.get('children');
    expect(children.length).toBe(4);
    expect(children[0].get('attrs').width).toBe(width);
    expect(children[0].get('attrs').height).toBe(90);
    expect(children[2].get('children')[1].get('attrs').text).toBe('同类均值');
  });
});
