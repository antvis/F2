// @ts-nocheck
import { jsx } from "@ali/f2-jsx";
import Canvas, { Chart, Axis, Line, withGuide, Guides } from "../src";
import { createContext } from "./util";
const context = createContext();
// import data from '../../fund-charts/test/data/managerData'

const { ImageGuide, TextGuide } = Guides;
const data = [
  { genre: "Sports", sold: 275, type: "a" },
  { genre: "Strategy", sold: 115, type: "a" },
  { genre: "Action", sold: 120, type: "a" },
  { genre: "Shooter", sold: 350, type: "a" },
  { genre: "Other", sold: 150, type: "a" },
];

describe("Guide ", () => {
  it("withGuide 正常case", () => {
    const { type, props } = (
      <Canvas height={500} width={500} context={context} animate={false}>
        <Chart data={data}>

          {/* 折线 */}
          <Line position="genre*sold" color="type" />

          {/* 文字Guide */}
          {data.map((item) => {
            const { sold, genre } = item;
            return (
              <TextGuide
                position={[genre, sold]}
                onClick={(ev) => {
                  console.log("ev: ", ev.points);
                }}
                content={sold + "个"}
                attrs={{
                  fill: "#000",
                  fontSize: "24px",
                }}
                offsetY={-20}
                offsetX={-15}
              />
            );
          })}

          {/* 图片Guide */}
          {data.map((item) => {
            const { sold, genre } = item;
            return (
              <ImageGuide
                position={[genre, sold]}
                onClick={(ev) => {
                  console.log("ev: ", ev.points);
                }}
                src="https://gw.alipayobjects.com/zos/antfincdn/9EHLIAnxXj/bianzu.png"
                attrs={{
                  height: 24,
                  width: 24,
                }}
                offsetY={-4}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const chart = new type(props);
    chart.render();

    const container = chart.container;
    // console.log(container);

    // 10个图例 和1条线
    expect(
      container._attrs.children[0]._attrs.children.length
    ).toBe(11);
  });
});
