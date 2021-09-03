// @ts-nocheck
import { jsx } from "../../../src";
import { Polar, Rect } from "../../../src/coord";
import { Canvas, Chart } from "../../../src";
import { Interval, Axis, Legend, Tooltip } from "../../../src/components";
import { createContext } from "../util";

const data = [
  { type: "a", genre: "Sports", sold: 5 },
  { type: "a", genre: "Strategy", sold: 10 },
  { type: "a", genre: "Action", sold: 20 },
  { type: "a", genre: "Shooter", sold: 20 },
  { type: "a", genre: "Other", sold: 40 },
  { type: "b", genre: "Sports", sold: 5 },
  { type: "b", genre: "Strategy", sold: 10 },
  { type: "b", genre: "Action", sold: 20 },
  { type: "b", genre: "Shooter", sold: 20 },
  { type: "b", genre: "Other", sold: 40 },
];

describe("Chart", () => {
  it("基础柱状图", () => {
    const context = createContext("基础柱状图");
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={
            {
              // type: Polar,
              // transposed: true,
              // left: 100,
              // top: 100,
              // right: 100,
              // bottom: 100,
            }
          }
          scale={{
            // genre: {},
            // sold: {},
          }}
        >
          <Axis field="genre"/>
          {/* <Axis field="genre" position="top"/> */}
          <Axis field="sold" />
          {/* <Axis field="sold" position="right" /> */}
          <Legend />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // adjust="stack"
          />
          <Tooltip />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("堆叠柱状图", () => {
    const chartRef = { current: null };
    const context = createContext("堆叠柱状图");
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart ref={chartRef} data={data} coord={} scale={}>
          <Interval x="genre" y="sold" color="type" adjust="stack" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("分组柱状图", () => {
    const chartRef = { current: null };
    const context = createContext("分组柱状图");
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart ref={chartRef} data={data} coord={} scale={}>
          <Interval x="genre" y="sold" color="type" adjust="dodge" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("基础条形图", () => {
    const chartRef = { current: null };
    const context = createContext("基础条形图");
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }} scale={}>
          <Interval x="genre" y="sold" color="type" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("分组条形图", () => {
    const chartRef = { current: null };
    const context = createContext("分组条形图");
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }} scale={}>
          <Interval x="genre" y="sold" color="type" adjust="dodge" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("堆叠条形图", () => {
    const chartRef = { current: null };
    const context = createContext("堆叠条形图");
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }} scale={}>
          <Interval x="genre" y="sold" color="type" adjust="stack" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("玫瑰图", () => {
    const chartRef = { current: null };
    const context = createContext("玫瑰图");
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart ref={chartRef} data={data} coord={{ type: Polar }} scale={}>
          <Interval x="genre" y="sold" color="type" adjust="stack" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
