<template>
  <div class="chart-box">
    <div class="title" />
    <div ref="mchart" class="box" />
  </div>
</template>

<script>
import echarts from '@/lib/echarts'

export default {
  name: 'ChartItem',
  components: {},
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartID: null,
      chart: null
    }
  },
  computed: {},
  watch: {
    option: {
      handler(v, o) {
        this.refresh(v)
      }
    }
  },
  created() {},
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      console.log('this.option', this.option)
      // let mc
      // if (_.isEmpty(this.chartID)) {
      //   mc = echarts.init(this.$refs.mchart, 'customed-jdl')
      //   ChartsModule.addCharts(mc)
      // } else {
      //   mc = ChartsModule.getChartsByID(this.chartID)
      // }
      // mc.setOption(_.extend(_.cloneDeep(this.option), ChartsModule.defaultChartsConfig))
      if (this.chart) {
        this.chart.clear()
      } else {
        this.chart = echarts.init(this.$refs.mchart, 'customed-jdl')
      }
      this.chart.setOption(_.cloneDeep(this.option))
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-box {
  z-index: 1;
  height: auto;
  margin: 16px 0 16px;
  position: relative;
  width: 100%;

  .title {
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    color: rgba(50, 50, 50, 1);
    .tips {
      margin-left: 4px;
      color: rgba(150, 150, 150, 1);
      .question {
        line-height: 12px;
        width: 12px;
        height: 12px;
        text-align: center;
      }
    }
  }
  .short {
    position: absolute;
    top: 3px;
    z-index: 200;
  }
  .box {
    margin-top: 16px;
    height: 240px;
    width: 100%;
  }
}
</style>
