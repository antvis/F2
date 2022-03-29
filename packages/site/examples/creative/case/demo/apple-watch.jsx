import { Canvas, Timeline, Chart } from "@antv/f2";
import Base64 from "Base64";

const context = document.getElementById("container").getContext("2d");

const ArcGuideGroup = (props) => {
  const { data, attrs } = props;
  const { x, y, rUnit } = attrs;
  return (
    <group>
      {data.map((record, index) => {
        return (
          <arc
            key={"arc_" + index}
            attrs={{
              ...attrs,
              x,
              y,
              r: rUnit * (1 * index + 1),
              stroke: record.bgColor
            }}
          />
        );
      })}
    </group>
  );
};

const ImgGuideGroup = (props) => {
  const { data, attrs } = props;
  const { width, height, x, y, r, src } = attrs;
  return (
    <group>
      {data.map((record, index) => {
        return (
          <image
            cacheImage
            key={"img_" + index}
            attrs={{
              ...attrs,
              width,
              height,
              x: x - width / 2,
              y: y - (1 * index + 1) * r - height / 2,
              src: record.icon
            }}
          />
        );
      })}
    </group>
  );
};

const RoundArcGroup = (props) => {
  // console.log("RoundArcGroup props", props);
  const { data, attrs, animation } = props;
  const { rUnit } = attrs;
  return (
    <group>
      {data.map((record, index) => {
        return (
          <arc
            key={"record_" + index}
            attrs={{
              ...attrs,
              r: (1 * index + 1) * rUnit,
              stroke: record.color,
              startAngle: Math.PI / -2,
              endAngle: record.time * 2 * Math.PI - Math.PI / 2
            }}
            animation={{ ...animation }}
          />
        );
      })}
    </group>
  );
};

const icons = {
  imgRunBase64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdJJREFUeNpi/P//P8NgBkwMgxyMOnDUgQMOQLkYH6YC6AVZA8R/gLiRVLfQ2oGxUMchYz9SHEjrKDYmUmzA0uBxIsUGNA22APEHIH4LxBWkuoWRkCMYGRnpmmGpGcWK0JD5TwBfAuI6IOakdzGzlAjHIeO9QMxMr2ImDcnit0jshwQcOY0eDtQC4m9QC38CsTSSXAIRIdlFSweyAfFVJMsSkOSE0EITH94OxKK0cGAvnpCYgMdB1dAa5DOS2CsgzoEW3PzUcuAfqOEb0RK8BFK0o+PnSGq1oLkaXQ0oqahTw4FLoYUtG5p4BZ7Qq8OSTIrQiqgnoCinZWPhMA7H/YGGLtlFHrUc+AdP2UdRmUyNxgIzoQJ4oBus/HjS3x9olTigIchGIHSLBjoE5dBC7RhaefcNW6E8kCFYBsQTkfic0AJ5wEJQFy3NgRzMA60pkGsNHlqGID8eOXsk9k0g/gXEX4C4CUlcFK3epmoIlpLQ5juMFvW30ZpizLQIQScS/PsOiQ0KyRq0zBRFixBUB+JdRDSlQOkvBIsVZ9Ca/4Oq4w6LAWSPeAw2B4LAFiQHHhiMDjRAC0X1weZABmgLHJSO1+GqHsnquI+OD446kMYAIMAAxF4IMob2oEAAAAAASUVORK5CYII=",
  imgWalkBase64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe1JREFUeNrsmMFHBFEcx2eaLBFLdEjXJaLTEqUuERF76BIRJfoPYomIrv0DiU7RIVGWJTabDolOUZeyKRvZVUqUza7t+3jD8zMzb2Z2572R/fFh9s1b8/Gb997vZ8xms2nEObqMmEdH8N8LGmyTBCVADIJjUAMFMBTUIWrBHHu+wG1QQTPMMWOapt+pX6CXjA2AVyqoaw3ekd8voBqnNTgMSvz1VsBEUIfuCLI2ArJc7gHMgUfwqXsXp8ER2RSMOtgI69AOwTGQdxCjTOsQ3PUhZnOqQ1AUYK931kPwTafgFrAcDmbKqA7BurAWZa/5BiRUC37w6wMXqXuyu4sgqVKwzK+/XQRXQA+fZ489gSVVgiWeEdm6S4ELcu+arV2vZ7VSi+219O4xpyHUY1ZVJsE42OH/S/A5kVQStms3Qb9HBsutVrN2tVtJYbOIUeXtVUMmGHW7ZbmMs+xux6HlX5ScfxmdzQKLK4lg2aGzViaYJjJ5nrEaGV/XJbjncu4tkPEKP7CVCvaRClIkz84SyXnVgmtEYMrh+QXh/r5KQYs3Am7Zs2NVdnBHJTjjI3tOm0iZYM5H9gyHMqhEMMUbVVn27KiFFQxb6jJCeTsHZ5L5P6o/v13yRuAZLPuYfwJ+wWHgxqTzjbojqDn+BBgAWwpHIJykBIQAAAAASUVORK5CYII=",
  imgStandBase64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAAGnACU3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALlJREFUeNpiYEAAByQ2w38oZmBiwAPAKgACCIYCsMniNwOuHyCAmNEkQGZJAPEDmAAjLlvR5DAthwG8HgEBgADC6zm8usmXHAgAEECMRPqZkVjN/4m1jIlIFzHSNRz/E/IGRTZTpBkggPCh91BMln9BWIGqNpKSMBipEkAjQSMjMWUTNnWjoYoHAAQYudntPxJ+P6hdO2grGGLqDLLMZaKiAxkHdZyOHEsZSVSP3nr5Pxqno5aOrLIXAP8KH83YU1t+AAAAAElFTkSuQmCC"
};

/**
 * 测试数据
 */
let data = [];
const control = (n, threshold = 0.3) => {
  if (n < threshold) {
    return n + 0.15;
  }
  if (n > 1 - threshold) {
    return n - 0.15;
  }
  return n;
};
const produceData = (count) => {
  for (let i = 0; i < count; i++) {
    data[i] = [
      {
        cate: "stand",
        time: control(Math.random()).toFixed(1),
        color: "#e90b3a",
        bgColor: "#40131d",
        icon: icons.imgStandBase64
      },
      {
        cate: "walk",
        time: control(Math.random()).toFixed(1),
        color: "#a0ff03",
        bgColor: "#324214",
        icon: icons.imgWalkBase64
      },
      {
        cate: "run",
        time: control(Math.random()).toFixed(1),
        color: "#1ad5de",
        bgColor: "#183C3D",
        icon: icons.imgRunBase64
      }
    ];
  }
  return data;
};
data = produceData(8);

/**
 * 设置
 */
const center = { x: 150, y: 75 };
const rUnit = 20;
const gap = 1;
const bgArcWidth = rUnit - gap;
const arcWidth = bgArcWidth - gap;

/**
 * 图表
 */
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Timeline loop delay={0}>
      {Object.keys(data).map((iter) => {
        const records = data[iter];
        return (
          <Chart
            key={iter}
            data={records}
            coord={{
              type: "polar",
              transposed: true,
              innerRadius: 0.2,
              radius: 1.2
            }}
            scale={{
              time: { min: 0, max: 1 }
            }}
          >
            <ArcGuideGroup
              data={data}
              attrs={{
                x: center.x,
                y: center.y,
                rUnit: rUnit,
                lineWidth: bgArcWidth,
                opacity: 0.9
              }}
            />
            <RoundArcGroup
              data={records}
              attrs={{
                x: center.x,
                y: center.y,
                rUnit: rUnit,
                lineWidth: arcWidth,
                lineCap: "round",
                shadowColor: "rgba(0,0,0,0.8)",
                shadowOffsetX: -2,
                shadowOffsetY: -5,
                shadowBlur: 50
              }}
              animation={{
                appear: {
                  duration: 1500,
                  easing: "elasticOut",
                  property: ["endAngle"]
                },
                update: {
                  duration: 1500,
                  easing: "elasticOut",
                  property: ["endAngle"]
                }
              }}
            />
            <ImgGuideGroup
              data={data}
              attrs={{
                width: 16,
                height: 16,
                x: center.x,
                y: center.y,
                r: rUnit
              }}
            />
          </Chart>
        );
      })}
    </Timeline>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
