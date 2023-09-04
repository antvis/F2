<script lang='jsx'>
import { toRaw } from 'vue';
import Canvas from '@antv/f-vue';
import { Chart, Interval, Axis } from '@antv/f2';
import Grahpic from './graphic';

const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const data2 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 50 },
  { genre: 'Other', sold: 50 },
];

export default {
  name: 'App',
  data() {
    return {
      year: '2021',
      chartData: data1,
    }
  },
  mounted() {
    setTimeout(() => {
      this.year = '2022';
      this.chartData = data2;
    }, 1000);
  },
  render() {
    const { year, chartData } = this;
    return (
      <div className="container">
        <Canvas pixelRatio={ window.devicePixelRatio }>
          <Chart data={ toRaw(chartData) }>
            <Grahpic year={ year } />
            <Axis field="genre"/>
            <Axis field="sold"/>
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      </div>
    );
  },
};
</script>

<style>
.container {
  width: 500px;
  height: 300px;
}
</style>

