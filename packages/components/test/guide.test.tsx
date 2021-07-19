// @ts-nocheck
import { jsx } from "@ali/f2-jsx";
import Canvas, { Chart, Axis, Line, withGuide } from "../src";
import { createContext } from "./util";
const context = createContext();
// import data from '../../fund-charts/test/data/managerData'

const data = [
  { genre: "Sports", sold: 275, type: "a" },
  { genre: "Strategy", sold: 115, type: "a" },
  { genre: "Action", sold: 120, type: "a" },
  { genre: "Shooter", sold: 350, type: "a" },
  { genre: "Other", sold: 150, type: "a" },
];

// 文字辅助
const GuideTextView = (props) => {
  const { points, triggerRef } = props;
  const baseAttrs = {
    textBaseline: "center",
  };
  return (
    <group ref={triggerRef}>
      {points.map((item) => {
        const { point, style, attrs, offsetX, offsetY, content } = item;
        const { x, y } = point;
        const posX = x + (offsetX || 0);
        const posY = y + (offsetY || 0);
        return (
          <group>
            <text
              attrs={{
                text: content,
                x: posX,
                y: posY,
                ...baseAttrs,
                ...attrs,
              }}
            />
          </group>
        );
      })}
    </group>
  );
};

const TextGuide = withGuide(GuideTextView);

describe("Guide ", () => {
  it("withGuide 正常case", () => {
    const { type, props } = (
      <Canvas height={500} width={500} context={context} animate={false}>
        <Chart data={data}>
          <TextGuide
            onClick={(ev) => {
              console.log('ev: ', ev.points);
            }}
            records={[
              {
                type: "text",
                position: ["Sports", 275],
                content: 275,
                attrs: { fill: "#000", fontSize: "24px" },
                style: { display: "flex" },
                offsetY: -10,
                // offsetX: 20,
              },
              {
                type: "text",
                position: ["Strategy", 115],
                content: 'hello world',
                attrs: { fill: "#000", fontSize: "24px" },
                offsetY: -10,
              },
            ]}
          />
          <Line position="genre*sold" color="type" />
        </Chart>
      </Canvas>
    );

    const chart = new type(props);
    chart.render();

    const container = chart.container;
    // console.log(container);

    expect(container.get('children')[0]._attrs.children[0]._attrs.children[0]._attrs.children[1]._attrs.children[0]._attrs.attrs.text).toBe('hello world');
  });
});
