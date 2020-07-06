import Canvas from '../../../../src/graphic/canvas';
import '../../../../src/graphic';

const dom = document.createElement('canvas');
dom.id = 'canvas';
document.body.appendChild(dom);

describe('imageShape', function() {
  it('new imageShape', function() {
    const canvas = new Canvas({
      el: 'canvas',
      width: 200,
      height: 100
    }); // 创建 canvas 实例

    const container = canvas.addGroup({
      zIndex: 2
    }); // canvas 添加一个 group

    const imageShape = container.addShape('image', {
      zIndex: 31,
      attrs: {
        x: 0,
        y: 0,
        src: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        width: 50,
        height: 50
      }
    });

    container.sort();
    canvas.sort(); // canvas 容器内的元素排序
    expect(imageShape.get('loading')).toBe(false);
    canvas.draw(); // 绘制
    expect(imageShape.get('loading')).toBe(true);
    expect(imageShape.get('image')).toBe(null);

  });
});
