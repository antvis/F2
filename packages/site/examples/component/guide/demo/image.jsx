/** @jsx jsx */
import { jsx, Canvas, Chart, Line, ImageGuide } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];
const image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABoCAMAAAAeu4SPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUdwTP/////////////////////////8/P///////////////////+YsO////+lJVvWssu1kb+c2RP3u7/GPl+94gvvg4vjBxfrS1U/80PwAAAANdFJOUwBGC9Z8lV/9HOkvrsI2xkzIAAADRklEQVRo3r2a7XarIBBFY0TRIPhtfP8nbZZVxERgBhnPj9612ruyOyrbI/XxCErxyeOuvFhVqk/Kir1uwCWVMlIlxLhCqK8I0kOblOonJeGQCVcn4cm9vA+R6Np5lsqSkuY8ZuZQ02SOm5Ec0P3zm1Z+0jb7dyhOo15//YJbkL1ej/F5uebVUqfWxDw6MN0+upVGxu27KdmAb3nIm2hEvSR4fQTW28VaPqMCmb5A5Vf0pcqiOptbBjRG5AXFmh/kTwaC1a8H7LtfYNfHH1E4BjRGFNE6xfaJkzzNtP38FVtq4zlwjCw4be1ZWjLHdfi51My0UQVnkxqV4Pb7fG0H1iqe4OxSoxGc1dpUDs9AAxojZoRSoxBc5pRafIdrqfkGNEa8JDjhkdqp4EQEqU0SkOm64Cqv1E4FV12W2ixBma8KzmrtN18yR3a43drb4ozrcIfUbMBrgnNY2wa85HBHFbUDr5RUl9SswAuCc1rbDgx3uLOK2oHBJdVdRR3A0JLqrqIuYFhJ9VRRFzCspHqqqBMYIjhfFXUCAwTnraJOYLeVVA4WnLeKuidEC85fRT1ArMP9VdQDRJZUQBX1AXGCA1RRHxDlcEgV9QIxJRVSRb1AREkFVVE/EF5SQVUUAISWVFgVBQChJTUFdW0IEOZwyAYCEAhyOPD5GgaECI4Bn69BQIDDXVU0AOgvqeDnaxjQKzjwBgIU6HO4AG8gzMDnYndJfSGer7sliKfwV8CuaEhcJTVBPl8jn8KTQKlhYxccUGro2AQH2hUNiLWkQqW2OmRcAvrdzgUHtfaadUH3oF/u1OEZakCp+Nh1I1cSNWIWIrUVOPx7BHYaTwQH3xVdBXL4B7+TitgVXSf8/yu3krgRteAEVmrLH57rXmEFJ77O4ARdXVzxYfh8gf7/6XgWGVpqY7NkRAuOHSw6S7JsDi8Pl0xLB9QjFoa2J0mYybhLMZRkAtMYJzHDLfqwDAaQ3Q3M7z6kt180ty+LfeF35AOWIXffK02KHe9O6l1T4GrNU8X3+2O8aSMf17pt9vfRxHfDIM7+vl1+DzA/fymPLJntNcA7eMZtnyj8Z2chSSl56dkTaU6GrHLLVk3BRFpGPpSpYIcthT+6BIQAhgqRYwAAAABJRU5ErkJggg==';

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Line x="genre" y="sold" />
      {data.map((item) => {
        const { sold } = item;
        return (
          <ImageGuide
            records={[item]}
            src={image}
            attrs={{
              height: 24,
              width: 24,
            }}
          />
        );
      })}
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
