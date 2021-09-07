import { jsx } from "../../../src";
import { Polar, Rect } from "../../../src/coord";
import { Canvas, Chart } from "../../../src";
import { LineGuide, TextGuide, PointGuide, Interval, Line, Axis } from "../../../src/components";
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

describe("Guide", () => {
  it("TextGuide", () => {
    const context = createContext("TextGuide");
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // adjust="stack"
          />
          {data.map((item) => {
            const { sold } = item;
            return (
              <TextGuide
                records={[item]}
                content={sold + "个"}
                style={{
                  fill: "#000",
                  fontSize: "20px",
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("LineGuide", async () => {
    const context = createContext("LineGuide");
    const res = await fetch(
      "https://gw.alipayobjects.com/os/antfincdn/m6tXpvS56l/guide-line.json"
    );
    const data = await res.json();

    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="month" tickCount={2} />
          <Axis field="PM" />
          <Line x="month" y="PM" />
          {data.map((item) => {
            return (
              <LineGuide
                records={[
                  { month: "min", PM: 25 },
                  { month: "max", PM: 25 },
                ]}
                style={{
                  stroke: "#d0502d",
                  lineWidth: 2,
                  lineCap: "round",
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

  it("PointGuide", () => {
    const context = createContext("PointGuide");
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // adjust="stack"
          />
          {data.map((item) => {
            const { sold } = item;
            return (
              <PointGuide
                records={[item]}
                content={sold + "个"}
                style={{
                  r: 6
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

});
