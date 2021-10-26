import { jsx } from '../../jsx';

export default (props: any) => {
  const { mappedArray, style } = props;
  return (
    <group>
      {mappedArray.map((item) => {
        const { color, dataArray, fillOpacity } = item;
        return (
          <group>
            {dataArray.map((data) => {
              return (
                <polygon
                  attrs={{
                    points: data,
                    lineWidth: 1,
                    fill: color,
                    fillOpacity,
                    ...style,
                  }}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};
