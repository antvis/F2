import { jsx } from "../../../src";
import { Polar, Rect } from "../../../src/coord";
import { Canvas, Chart } from "../../../src";
import {
  Guide,
  Interval,
} from "../../../src/components";
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
              <Guide
                type="text"
                position={[item.genre, item.sold]}
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
});
