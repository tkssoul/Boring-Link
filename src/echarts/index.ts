import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  type TitleComponentOption,
  type LegendComponentOption,
} from "echarts/components";
import {
  BarChart,
  LineChart,
  PieChart,
  type RadarSeriesOption,
} from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;

// 注册需要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer,
]);

export type { EChartsOption };
export default echarts;
