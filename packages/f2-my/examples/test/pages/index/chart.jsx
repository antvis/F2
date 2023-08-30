import { Chart, Interval, Axis, Legend, Tooltip } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval
        x="genre"
        y="sold"
        color="genre"
        selection={{
          selectedStyle: {
            fillOpacity: 1,
          },
          unSelectedStyle: {
            fillOpacity: 0.4,
          },
        }}
      />
      <Legend />
      <Tooltip />
    </Chart>
  );
};
