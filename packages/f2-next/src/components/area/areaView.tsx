import { jsx } from '../../jsx';

export default (props: any) => {
  const { mappedArray } = props;
  return (
    <group>
      {mappedArray.map((item) => {
        const { color, dataArray, shape } = item;
        return (
          <group>
            {dataArray.map((data) => {
              return (
                <polygon
                  attrs={{
                    points: data,
                    lineWidth: 1,
                    fill: color,
                    ...shape,
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
