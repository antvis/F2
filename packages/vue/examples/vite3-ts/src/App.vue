<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { shallowReactive, onMounted } from 'vue';
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis, Tooltip } from '@antv/f2';
import Grahpic from './components/Grahpic';
import Legend from './components/Legend';

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

const state = shallowReactive<{
  data: Record<string, string | number>[];
  year: number;
}>({
  data: data1,
  year: 2021,
});

onMounted(() => {
  setInterval(() => {
    if (state.year % 2 === 0) {
      state.year = 2021;
      state.data = data1;
    } else {
      state.year = 2022;
      state.data = data2;
    }
  }, 1000);
});
</script>
<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="container">
    <Canvas>
      <Chart :data="state.data">
        <Grahpic :year="state.year" />
        <Legend />
        <Axis field="genre" />
        <Axis field="sold" />
        <Tooltip :showTooltipMarker="true" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.container {
  width: 500px;
  height: 300px;
}
</style>
