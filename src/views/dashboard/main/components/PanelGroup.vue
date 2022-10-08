<template>
  <el-row :gutter="40" class="panel-group">
    <!--回归用例数-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="goToregRessionChart">
        <div class="card-panel-icon-wrapper icon-return">
          <svg-icon icon-class="list" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            回归用例数
          </div>
          <count-to :start-val="0" :end-val="returnCase" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <!--提测bug数-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="goToBugsChart">
        <div class="card-panel-icon-wrapper icon-bugs">
          <svg-icon icon-class="bug" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            2021H2提测bug数
          </div>
          <count-to :start-val="0" :end-val="countBug" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <!--自动化case-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="goToAutoCase">
        <div class="card-panel-icon-wrapper icon-autocase">
          <svg-icon icon-class="guide" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            自动化测试用例
          </div>
          <count-to :start-val="0" :end-val="AutoCase" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <!--漏测率-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="goTomissedCase">
        <div class="card-panel-icon-wrapper icon-omission">
          <svg-icon icon-class="chart" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            漏测率
          </div>
          <count-to :start-val="0" :end-val="leakageData" :duration="3600" class="card-panel-num" />
          <span style="">%</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {
  jiraTestBugCount,
  leakage,
  selectCase,
  totalAutoCase
} from '@/api/dashboard/dashboard'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      returnCase: 0,
      countBug: 0,
      leakageData: 0,
      AutoCase: 0
    }
  },
  mounted() {
    this.selectCase()
    this.jiraTestBugCount()
    this.leakage()
    this.totalAutoCase()
  },
  methods: {
    goToregRessionChart() {
      this.$router.push({ path: '/regressionChart' })
    },
    goToBugsChart() {
      this.$router.push({ path: '/bugsChart' })
    },
    goToAutoCase() {
      this.$router.push({ path: '/autoCaseChart' })
    },
    goTomissedCase() {
      this.$router.push({ path: '/missedChart' })
    },
    async selectCase() {
      try {
        const res = await selectCase()
        this.returnCase = Number(res.data.recTotal || 0)
      } catch (e) {
        const res = await selectCase()
        this.returnCase = Number(res.data.recTotal || 0)
      }
    },
    async jiraTestBugCount() {
      try {
        const res = await jiraTestBugCount()
        this.countBug = Number(res.data.data || 0)
      } catch (e) {
        const res = await jiraTestBugCount()
        this.countBug = Number(res.data.data || 0)
      }
    },
    async leakage() {
      try {
        const res = await leakage()
        this.$nextTick(() => {
          this.leakageData = Number(res.data.data)
          // console.log(this.leakageData)
        })
      } catch (e) {
        const res = await leakage()
        this.$nextTick(() => {
          this.leakageData = Number(res.data.data)
          // console.log(this.leakageData)
        })
      }
    },
    async totalAutoCase() {
      try {
        const res = await totalAutoCase()
        this.AutoCase = Number(res.data.data || 0)
      } catch (e) {
        const res = await totalAutoCase()
        this.AutoCase = Number(res.data.data || 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buttonText{
  color: blue;
  text-decoration:underline
}
::v-deep .el-dialog__body {
  //background: #F8F3DB;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-return {
        background: #36a3f7;
      }

      .icon-bugs {
        background: #30b02a;
      }

      .icon-autocase {
        background: #faca38;
      }

      .icon-omission {
        background: #f4516c;
      }
    }

    .icon-return {
      color: #36a3f7;
    }

    .icon-bugs {
      color: #30b02a;
    }

    .icon-autocase {
      color: #faca38;
    }

    .icon-omission {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
