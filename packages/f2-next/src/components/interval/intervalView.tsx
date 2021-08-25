import { jsx } from "@jsx";

export default (props) => {
  const { mappedArray, size, basePoint } = props;

  return (
    <group>
      {mappedArray.map((dataArray) => {
        return dataArray.map((item) => {
          const { color, x, y } = item;
          return (
            <rect
              attrs={{
                fill: color,
                // 数据点在柱子中间
                x: x - size / 2,
                y: basePoint.y,
                width: size,
                // y轴从底部开始画
                height: y - basePoint.y,
              }}
              animation={{
                appear: {
                  easing: "linear",
                  duration: 350,
                  property: ["y", "height"],
                  start: {
                    y: basePoint.y,
                    height: 0,
                  },
                  end: {
                    y: basePoint.y,
                    height: y - basePoint.y,
                  },
                },
              }}
            />
          );
        });
      })}
    </group>
  );
};
