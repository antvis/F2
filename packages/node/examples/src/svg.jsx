import { Canvas, Chart, Axis, Interval } from '@antv/f2';
import { JSDOM } from 'jsdom';
import { XMLSerializer } from 'xmldom';
import C2S from 'f2-canvas2svg';

global.XMLSerializer = XMLSerializer;

const { window } = new JSDOM();
const { document } = window;

const ctx = new C2S({
  document,
});
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
const image = new window.Image();
image.src = 'https://gw.alipayobjects.com/zos/rmsportal/cNOctfQVgZmwaXeBITuD.jpg';

const { props } = (
  <Canvas
    context={ctx}
    pixelRatio={1}
    animate={false}
    createImage={() => {
      return new window.Image();
    }}
  >
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const fcanvas = new Canvas(props);
fcanvas.render();

const serializedSVG = ctx.getSerializedSvg();
console.log(serializedSVG);
