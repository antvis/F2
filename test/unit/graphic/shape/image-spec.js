import Canvas from '../../../../src/graphic/engine/canvas';
import F2 from '../../../../src/index';
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
        height: 50,
        sx: 0,
        sy: 0,
        swidth: 512,
        sheight: 512
      }
    });

    container.sort();
    canvas.sort(); // canvas 容器内的元素排序
    expect(imageShape.get('loading')).toBe(false);
    canvas.draw(); // 绘制
    expect(imageShape.get('loading')).toBe(true);
    expect(imageShape.get('image')).toBe(null);
  });


  it('chart add imageShape', function() {

    const data = [
      {
        year: '2001',
        sales: 1500
      },
      {
        year: '2002',
        sales: 5500
      },
      {
        year: '2003',
        sales: 1200
      },
      {
        year: '2004',
        sales: 2000
      }
    ];

    const chart = new F2.Chart({
      id: 'canvas',
      pixelRatio: window.devicePixelRatio,
      width: 400,
      height: 300
    });


    chart.source(data);

    chart.coord({
      transposed: true
    });

    chart.interval().position('year*sales').size(20);

    chart.on('beforerender', () => {
      const point = chart.getPosition({ year: '2002', sales: 5500 });
      const { x, y } = point;
      chart.get('canvas').addShape('image', {
        zIndex: 31,
        attrs: {
          x,
          y: y - 20,
          src: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          width: 20,
          height: 20
        }
      });
    });

    chart.animate(false);
    chart.render();


  });


});
