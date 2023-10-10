import { jsx, Canvas, Chart, Axis, Interval, Tooltip } from '../../src';
import { delay } from '../util';
import { Renderer } from '@antv/g-mobile-svg';

const container = document.createElement('div');
container.style.width = '300px';
container.style.height = '200px';
document.body.appendChild(container);

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
];

const renderer = new Renderer();

describe('Chart', () => {
  it('Chart render', async () => {
    const { props } = (
      <Canvas container={container} animate={false} renderer={renderer} width={300} height={200}>
        <Chart data={data}>
          <Interval x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    const dataURL = await canvas.toDataURL();

    expect(dataURL).toBe(
      'data:image/svg+xml;charset=utf8,%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%20color-interpolation-filters%3D%22sRGB%22%20style%3D%22background%3A%20transparent%3B%22%3E%3Cdefs%2F%3E%3Cg%20id%3D%22g-svg-camera%22%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cg%20id%3D%22g-root%22%20fill%3D%22none%22%20stroke%3D%22none%22%20visibility%3D%22visible%22%20font-size%3D%2212px%22%20font-family%3D%22%26quot%3BHelvetica%20Neue%26quot%3B%2C%20Helvetica%2C%20%26quot%3BPingFang%20SC%26quot%3B%2C%20%26quot%3BHiragino%20Sans%20GB%26quot%3B%2C%20%26quot%3BMicrosoft%20YaHei%26quot%3B%2C%20Arial%2C%20sans-serif%22%20font-style%3D%22normal%22%20font-weight%3D%22normal%22%20font-variant%3D%22normal%22%20text-anchor%3D%22left%22%20stroke-dashoffset%3D%220px%22%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cg%20id%3D%22g-svg-1%22%20fill%3D%22none%22%20stroke%3D%22none%22%20width%3D%22300px%22%20height%3D%22200px%22%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-2%22%20fill%3D%22rgba(0%2C0%2C0%2C0)%22%20d%3D%22M%200%2C0%20l%20300%2C0%20l%200%2C200%20l-300%200%20z%22%20stroke%3D%22none%22%20width%3D%22300px%22%20height%3D%22200px%22%2F%3E%3Cg%20id%3D%22g-svg-3%22%20fill%3D%22none%22%20stroke%3D%22none%22%20width%3D%220px%22%20height%3D%220px%22%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cg%20id%3D%22g-svg-4%22%20fill%3D%22none%22%20stroke%3D%22none%22%20width%3D%220px%22%20height%3D%220px%22%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cg%20id%3D%22g-svg-5%22%20fill%3D%22none%22%20stroke%3D%22none%22%20width%3D%220px%22%20height%3D%220px%22%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-6%22%20fill%3D%22none%22%20d%3D%22M%200%2C0%20l%200%2C0%20l%200%2C0%20l0%200%20z%22%20stroke%3D%22none%22%2F%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-7%22%20fill%3D%22none%22%20d%3D%22M%200%2C0%20l%200%2C0%20l%200%2C0%20l0%200%20z%22%20stroke%3D%22none%22%2F%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C28.500000%2C163.750000)%22%3E%3Cpath%20id%3D%22g-svg-12%22%20fill%3D%22rgba(24%2C144%2C255%2C1)%22%20d%3D%22M%200%2C0%20l%2027.000000000000007%2C0%20l%200%2C21.25%20l-27.000000000000007%200%20z%22%20stroke%3D%22none%22%20width%3D%2227.000000000000007px%22%20height%3D%2221.25px%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-8%22%20fill%3D%22none%22%20d%3D%22M%200%2C0%20l%200%2C0%20l%200%2C0%20l0%200%20z%22%20stroke%3D%22none%22%2F%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C82.500000%2C142.500000)%22%3E%3Cpath%20id%3D%22g-svg-13%22%20fill%3D%22rgba(47%2C194%2C91%2C1)%22%20d%3D%22M%200%2C0%20l%2027%2C0%20l%200%2C42.5%20l-27%200%20z%22%20stroke%3D%22none%22%20width%3D%2227px%22%20height%3D%2242.5px%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-9%22%20fill%3D%22none%22%20d%3D%22M%200%2C0%20l%200%2C0%20l%200%2C0%20l0%200%20z%22%20stroke%3D%22none%22%2F%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C136.500000%2C100)%22%3E%3Cpath%20id%3D%22g-svg-14%22%20fill%3D%22rgba(250%2C204%2C20%2C1)%22%20d%3D%22M%200%2C0%20l%2027%2C0%20l%200%2C85%20l-27%200%20z%22%20stroke%3D%22none%22%20width%3D%2227px%22%20height%3D%2285px%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-10%22%20fill%3D%22none%22%20d%3D%22M%200%2C0%20l%200%2C0%20l%200%2C0%20l0%200%20z%22%20stroke%3D%22none%22%2F%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C190.500000%2C100)%22%3E%3Cpath%20id%3D%22g-svg-15%22%20fill%3D%22rgba(34%2C50%2C115%2C1)%22%20d%3D%22M%200%2C0%20l%2027.00000000000003%2C0%20l%200%2C85%20l-27.00000000000003%200%20z%22%20stroke%3D%22none%22%20width%3D%2227.00000000000003px%22%20height%3D%2285px%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C0%2C0)%22%3E%3Cpath%20id%3D%22g-svg-11%22%20fill%3D%22none%22%20d%3D%22M%200%2C0%20l%200%2C0%20l%200%2C0%20l0%200%20z%22%20stroke%3D%22none%22%2F%3E%3Cg%20transform%3D%22matrix(1%2C0%2C0%2C1%2C244.500000%2C15)%22%3E%3Cpath%20id%3D%22g-svg-16%22%20fill%3D%22rgba(133%2C67%2C224%2C1)%22%20d%3D%22M%200%2C0%20l%2027%2C0%20l%200%2C170%20l-27%200%20z%22%20stroke%3D%22none%22%20width%3D%2227px%22%20height%3D%22170px%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
    );
  });
});
