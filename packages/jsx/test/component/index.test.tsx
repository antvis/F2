import { canvas } from '../global';
import { jsx, render } from '../../src/index';

function TestComponent(props) {
  const { text } = props;
  return <text style={{ color: 'red' }}>{ text }</text>
}

describe('index', () => {
  it('render', async () => {
    
    canvas.clear();
    const group = render(
      <view>
        <text style={{ color: '#000' }}>ss</text>
        <TestComponent text="testComponent" />
      </view>, canvas);
    canvas.draw();
    expect(group.get('children').length).toBe(2);
    expect(group.get('children')[1].get('attrs').x).toBe(0);
    expect(group.get('children')[1].get('attrs').y).toBe(12);
    expect(group.get('children')[1].get('attrs').fill).toBe('red');
    expect(group.get('children')[1].get('attrs').text).toBe('testComponent');
  });
});
