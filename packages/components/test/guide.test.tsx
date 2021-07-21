// @ts-nocheck
import { jsx } from "@ali/f2-jsx";
import Canvas, {
  Chart,
  Axis,
  Line,
  withGuide,
  ImageGuide,
  PointGuide,
  TextGuide,
  LineGuide,
} from "../src";
import { createContext } from "./util";
// import data from '../../fund-charts/test/data/managerData'

const data = [
  { genre: "Sports", sold: 275, type: "a" },
  { genre: "Strategy", sold: 115, type: "a" },
  { genre: "Action", sold: 120, type: "a" },
  { genre: "Shooter", sold: 350, type: "a" },
  { genre: "Other", sold: 150, type: "a" },
];

const renderChart = (Component) => {
  const context = createContext();
  const { type, props } = (
    <Canvas height={300} width={300} context={context} animate={false}>
      {Component}
    </Canvas>
  );

  const chart = new type(props);
  chart.render();

  const container = chart.container;
  return container;
};

describe("Guide ", () => {
  it("image & text", () => {
    const container = renderChart(
      <Chart data={data}>
        {/* 折线 */}
        <Line position="genre*sold" color="type" />

        {/* 文字Guide */}
        {data.map((item) => {
          const { sold } = item;
          return (
            <TextGuide
              records={[item]}
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
          return (
            <ImageGuide
              records={[item]}
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
    );

    // 10个图例 和1条线
    expect(container._attrs.children[0]._attrs.children.length).toBe(11);
  });

  it("point", () => {
    const container = renderChart(
      <Chart data={data}>
        {/* 折线 */}
        <Line position="genre*sold" color="type" />
        {data.map((item) => {
          return <PointGuide records={[item]} />;
        })}
      </Chart>
    );
    expect(container._attrs.children[0]._attrs.children.length).toBe(6);
  });
  it("line", () => {
    const container = renderChart(
      <Chart data={data}>
        {/* 折线 */}
        <Line position="genre*sold" color="type" />
        {data.map((item) => {
          return <LineGuide records={[{genre: item.genre, sold: 'min' }, {genre: item.genre, sold: 'max' }]} />;
        })}
      </Chart>
    );
    expect(container._attrs.children[0]._attrs.children.length).toBe(6);
  });
  it("tag", () => {});

  it("使用min、max、median", () => {
    const container = renderChart(
      <Chart data={data}>
        {/* 折线 */}
        <Line position="genre*sold" color="type" />
        {data.map((item) => {
          return (
            <PointGuide
              records={[{ genre: item.genre, sold: "min" }]}
              color="#262626"
            />
          );
        })}
        {data.map((item) => {
          return (
            <PointGuide
              records={[{ genre: item.genre, sold: "median" }]}
              color="#FF6797"
            />
          );
        })}
        {data.map((item) => {
          return (
            <PointGuide
              records={[{ genre: item.genre, sold: "max" }]}
              color="#82DC95"
            />
          );
        })}
      </Chart>
    );
        
    const GuideY1 = container._attrs.children[0]._attrs.children[1]._attrs.children[0]._attrs.children[0]._attrs.attrs.y
    expect(GuideY1).toBe(285)
    const GuideY2 = container._attrs.children[0]._attrs.children[6]._attrs.children[0]._attrs.children[0]._attrs.attrs.y
    expect(GuideY2).toBe(150)
    const GuideY3 = container._attrs.children[0]._attrs.children[11]._attrs.children[0]._attrs.children[0]._attrs.attrs.y
    expect(GuideY3).toBe(15)
  });

  it("使用百分比字符串代表位置", () => {
    const container = renderChart(
      <Chart data={data} theme={{ padding: [0,0,0,0]}}>
        {/* 折线 */}
        <Line position="genre*sold" color="type" />
        {data.map((item, index) => {
          return <PointGuide records={[{ genre: item.genre, sold: "100%" }]} color="green" />;
        })}
        {data.map((item, index) => {
          return <PointGuide records={[{ genre: item.genre, sold: "50%" }]} color="red" />;
        })}
        {data.map((item, index) => {
          return <PointGuide records={[{ genre: item.genre, sold: "0%" }]} color="blue" />;
        })}
      </Chart>
    );
    
    const GuideY1 = container._attrs.children[0]._attrs.children[1]._attrs.children[0]._attrs.children[0]._attrs.attrs.y
    expect(GuideY1).toBe(0)
    const GuideY2 = container._attrs.children[0]._attrs.children[6]._attrs.children[0]._attrs.children[0]._attrs.attrs.y
    expect(GuideY2).toBe(150)
    const GuideY3 = container._attrs.children[0]._attrs.children[11]._attrs.children[0]._attrs.children[0]._attrs.attrs.y
    expect(GuideY3).toBe(300)
  });
  
});
