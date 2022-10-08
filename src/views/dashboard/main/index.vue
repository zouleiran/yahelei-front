<template>
  <div class="dashboard-editor-container">
    <!--  <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <panel-group />
    <!--第一个折线图-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!--  <line-chart-core-bugs chart-data /> -->
      <line-chart-core-bugs />
    </el-row>
    <!--第二个折线图-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!-- <line-chart-module-core-bugs chart-data /> -->
      <line-chart-module-core-bugs />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChartCoreBugs from './components/LineChartCoreBugs'
import LineChartModuleCoreBugs from './components/LineChartModuleCoreBugs'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChartCoreBugs,
    LineChartModuleCoreBugs
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
