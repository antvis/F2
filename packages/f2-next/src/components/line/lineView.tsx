import { jsx } from "@jsx";

export default (props: any) => {
  const { mappedData, smooth, lineDash, isInCircle } = props;

  return (
    <group>
      {mappedData.map((cfg) => {
        const { points, color, size } = cfg;
        // 极坐标
        if (isInCircle) {
          points.push(points[0]);
        }
        return (
          <polyline
            attrs={{
              points,
              lineJoin: "round",
              lineCap: "round",
              lineWidth: size || "4px",
              strokeStyle: color,
              smooth,
              lineDash,
            }}
          />
        );
      })}
    </group>
  );
};
