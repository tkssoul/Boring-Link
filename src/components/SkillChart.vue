<template>
  <div id="main" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import {
  TitleComponent,
  type TitleComponentOption,
  LegendComponent,
  type LegendComponentOption,
} from "echarts/components";
import { RadarChart, type RadarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;
onMounted(() => {
  var chartDom = document.getElementById("main")!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  // Schema:
  // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
  const Engine_Data = [[90, 90, 70, 80, 90, 70]];

  const Music_Data = [[26, 37, 27, 1.163, 27, 13, 1]];

  const lineStyle = {
    width: 1,
    opacity: 0.5,
  };

  option = {
    backgroundColor: "#161627",
    title: {
      text: "雷达图使用 Echarts 制作",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    legend: {
      bottom: 1,
      data: ["工程"],
      itemGap: 20,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      selectedMode: "single",
    },
    radar: {
      indicator: [
        { name: "JavaScript", max: 100 },
        { name: "Vue.js", max: 100 },
        { name: "Axios", max: 100 },
        { name: "Vuetify", max: 100 },
        { name: "Arco Design", max: 100 },
        { name: "GSAP", max: 100 },
      ],
      shape: "circle",
      splitNumber: 5,
      axisName: {
        color: "rgb(238, 197, 102)",
      },
      splitLine: {
        lineStyle: {
          color: [
            "rgba(238, 197, 102, 0.1)",
            "rgba(238, 197, 102, 0.2)",
            "rgba(238, 197, 102, 0.4)",
            "rgba(238, 197, 102, 0.6)",
            "rgba(238, 197, 102, 0.8)",
            "rgba(238, 197, 102, 1)",
          ].reverse(),
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(238, 197, 102, 0.5)",
        },
      },
    },
    series: [
      {
        name: "工程",
        type: "radar",
        lineStyle: lineStyle,
        data: Engine_Data,
        symbol: "none",
        itemStyle: {
          color: "#F9713C",
        },
        areaStyle: {
          opacity: 0.1,
        },
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
