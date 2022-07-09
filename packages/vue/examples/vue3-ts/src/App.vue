<template>
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

<script lang="ts" setup>
import { shallowReactive, onMounted } from "vue"
import Canvas from "@antv/f2-vue"
import { Chart, Interval, Axis, Tooltip } from "@antv/f2"
import Grahpic from "@/components/Grahpic"
import Legend from "@/components/Legend"

const data1 = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
]

const data2 = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 20 },
  { genre: "Shooter", sold: 50 },
  { genre: "Other", sold: 50 },
]

const state = shallowReactive<{
  data: Record<string, string | number>[]
  year: number
}>({
  data: data1,
  year: 2021,
})

onMounted(() => {
  setInterval(() => {
    if (state.year % 2 === 0) {
      state.year = 2021
      state.data = data1
    } else {
      state.year = 2022
      state.data = data2
    }
  }, 1000)
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 500px;
  height: 300px;
}
</style>
