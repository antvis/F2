// @ts-nocheck
import { jsx } from "@ali/f2-jsx";
import Canvas, { Chart, Axis, Line, withGuide, Guide } from "../src";
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

describe("Guide ", () => {
  it("withGuide 正常case", () => {
    const { type, props } = (
      <Canvas height={500} width={500} context={context} animate={false}>
        <Chart data={data}>
          <Guide
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
                type: "image",
                position: ["Strategy", 115],
                src: 'https://gw.alipayobjects.com/zos/antfincdn/9EHLIAnxXj/bianzu.png',
                attrs: {
                   height: 24,
                   width: 24 
                  },
                offsetY: -4,
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
          
    expect(container._attrs.children[0]._attrs.children[0]._attrs.children[0]._attrs.children[1]._attrs.children[0]._attrs.attrs.src).toBe('https://gw.alipayobjects.com/zos/antfincdn/9EHLIAnxXj/bianzu.png');
    
  });
});
