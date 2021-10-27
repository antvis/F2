import { jsx } from '../../jsx';

export default (props: any) => {
  const { mappedArray } = props;
  return (
    <group>
      {mappedArray.map((item) => {
        const { color, dataArray, size, shape } = item;
        return (
          <group>
            {dataArray.map((data) => (
              <polyline
                attrs={{
                  points: data,
                  stroke:  color,
                  lineWidth:size,
                  ...shape
                }}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
};
