import Canvas from '../../../../src/graphic/engine/canvas';
import F2 from '../../../../src/index';
import '../../../../src/graphic';

const dom = document.createElement('canvas');
dom.id = 'canvas';
document.body.appendChild(dom);

describe('imageShape', function() {
  const canvas = new Canvas({
    el: 'canvas',
    width: 300,
    height: 300,
    pixelRatio: 1
  }); // 创建 canvas 实例
  it('new imageShape', function() {
    const container = canvas.addGroup(); // canvas 添加一个 group

    const imageShape = container.addShape('image', {
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

    expect(imageShape.get('loading')).toBe(false);
    canvas.draw(); // 绘制
    expect(imageShape.get('loading')).toBe(true);
    expect(imageShape.get('image')).toBe(null);

    container.remove(true);
  });

  it('image radius', function(done) {
    const container = canvas.addGroup();

    const src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEXMzMz////r6+vf39/l5eX4+PjY2Njy8vLS0tJvPPLMAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMCOCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII=';

    container.addShape('image', {
      attrs: {
        x: 0,
        y: 0,
        src,
        width: 50,
        height: 50,
        radius: [ 20, 10, 20 ]
      }
    });

    container.addShape('image', {
      attrs: {
        x: 100,
        y: 0,
        src,
        width: 50,
        height: 50
      }
    });

    container.addShape('image', {
      attrs: {
        x: 200,
        y: 0,
        src,
        width: 50,
        height: 50,
        fillOpacity: 0
      }
    });

    canvas.draw();

    // 要异步获取
    setTimeout(() => {
      const context = dom.getContext('2d');

      // 第一个image圆角区域
      const imageData1 = context.getImageData(0, 0, 1, 1).data;
      // 第二个image圆角区域
      const imageData2 = context.getImageData(100, 0, 1, 1).data;
      expect(imageData1[0]).toBe(0);
      expect(imageData1[1]).toBe(0);
      expect(imageData1[2]).toBe(0);
      expect(imageData1[3]).toBe(0);

      expect(imageData2[0]).not.toBe(0);
      expect(imageData2[1]).not.toBe(0);
      expect(imageData2[2]).not.toBe(0);
      expect(imageData2[3]).not.toBe(0);

      // 第3个测试透明度
      const imageData3 = context.getImageData(200, 0, 1, 1).data;
      expect(imageData3[0]).toBe(0);
      expect(imageData3[1]).toBe(0);
      expect(imageData3[2]).toBe(0);
      expect(imageData3[3]).toBe(0);
      done();
    }, 100);
  });
});

describe('chart image shape', () => {
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
