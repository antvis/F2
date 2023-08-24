import { Chart, Interval } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
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
    </Chart>
  );
};
