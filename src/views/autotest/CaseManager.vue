<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
  <el-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" v-model="selectdescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="searchparam">查询</el-button>
              <el-button style="margin-left: 8px" @click="editoraddcase(-1,project_id,Interface_id)">新增接口用例</el-button>
              <el-button style="margin-left: 8px" @click="reset">重置</el-button>
            </span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      title="日志弹窗"
      :visible.sync="modal2"
      width="70%"
      :before-close="handleClose">
    <el-table :data="dataparam2.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)">
      <el-table-column fixed="left" property="createTime" label="开始执行时间" width="100px"></el-table-column>
      <el-table-column property="execTime" label="执行时间长度(毫秒)" width="50px"></el-table-column>
      <el-table-column property="precondition" label="前置处理器" width="100px"></el-table-column>
      <el-table-column property="url" label="执行url" width="100px"></el-table-column>
      <el-table-column property="header" label="header" width="200px"></el-table-column>
      <el-table-column property="parameters" label="请求参数" width="300px"></el-table-column>
      <el-table-column property="expectedResult" label="期望结果" width="200px"></el-table-column>
      <el-table-column property="responseResult" label="实际结果" width="300px"></el-table-column>
      <el-table-column property="description" label="执行日志" width="150px"></el-table-column>
      <el-table-column property="result" fixed="right" label="成功与否" width="50px">
        <template slot-scope="scope">
          <span>
            <span v-if="scope.row.result==true" style="color: #722ed1">成功</span>
            <span v-else style="color: #ff4000">失败</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
        style="margin-top: 10px"
        align="center"
        @current-change="handleCurrentChange2"
        :current-page="currentPage2"
        :page-sizes="[10]"
        :page-size="pageSize2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataparam2.length">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="modal2 = false">确 定</el-button>
          </span>
    </el-dialog>

    <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)">
      <el-table-column fixed="left" property="id" label="id" width="50px"></el-table-column>
      <el-table-column property="description" label="描述" width="100px"></el-table-column>
      <el-table-column property="labellist" label="标签" width="100px"></el-table-column>
      <el-table-column property="precondition" label="前置处理器" width="100px"></el-table-column>
      <el-table-column property="header" label="header" width="200px"></el-table-column>
      <el-table-column property="body" label="body" width="300px"></el-table-column>
      <el-table-column property="expect" label="断言" width="200px"></el-table-column>
      <el-table-column property="postcondition" label="后置处理器" width="100px"></el-table-column>
      <el-table-column property="update_time" label="更新时间" width="100px"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button @click="editoraddcase(scope.row.id,project_id,Interface_id)" type="text" >编辑</el-button>
          <el-button @click="deletecase(scope.row.id)" type="text">删除</el-button>
          <el-button @click="exe(scope.row.id)" type="text">执行</el-button>
          <el-button @click="copy(scope.row.id)" type="text">复制</el-button>
          <el-button @click="searchlog(scope.row.id)" type="text">查看执行日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      align="center"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length">
    </el-pagination>
  </el-card>
    </div>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      currentPage2: 1,
      pageSize2: 10,
      data: [],
      dataparam2: [],
      modal2: false,
      url: this.$route.query.url,
      projectdescription: '',
      project_id: '',
      Interface_id: '',
      fenzhi: '',
      name: '',
      value: '',
      description: '',
      postcondition: '',
      selectdescription: '',
      expect: '',
      body_type: '',
      body: '',
      header: '',
      precondition: '',
      numberkey:'',
    }
  },
  methods: {
    handleCurrentChange2(val) {
      this.currentPage2=val
    },
    handleCurrentChange(val) {
      this.currentPage=val
    },
    reset () {
      this.selectdescription=''
    },
    cancel() {
      this.modal2 = false
    },
    editoraddcase (case_id, project_id, Interface_id) {
      this.$router.push({
        path: '/Casedetail?caseid=' + case_id + '&Interface_id=' + Interface_id + '&project_id=' + project_id
      })
    },
    searchlog (x) {
      this.commonRequestThensearchlog(
        this.axios.get("/yahelei/caseExecuteLog/list", {
          params: {
            caseid: x
          }
          }
        )
      )
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    commonRequestThensearchlog(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.dataparam2 = res.data.result
          this.modal2 = true
          ElementUI.Message.info('查询成功')
        } else {
          ElementUI.Message.error('失败')
        }
      }).finally(() => {
        this.cardLoading = false
      })
    },
    exe (x) {
      this.commonRequestThenexecase(
        this.axios.get("/yahelei/case/executecasebycaseid", {
            params: {
              caseid: x,
            }
          }
        )
      )
    },
    copy (x) {
      this.commonRequestThendeletecase(
        this.axios.get("/yahelei/case/copy", {
          params: {
            id: x,
          }
      }
        )
      )
      this.numberkey++;
    },
    commonRequestThenexecase(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info('执行成功')
        } else {
          ElementUI.Message.error('执行成功，运行失败')
        }
      }).finally(() => {
        this.cardLoading = false
      })
    },
    deletecase (x) {
      this.commonRequestThendeletecase(
        this.axios.get("/yahelei/case/deletecase", {
          params: {
            id: x
          }
          }
        )
      )
    },
    commonRequestThendeletecase(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.init()
          ElementUI.Message.info('操作成功')
        } else {
          ElementUI.Message.info('操作失败')
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    searchparam () {
      this.commonRequestThen(
        this.axios.get("/yahelei/case/getcaselistbydescription",{
          params: {
            description: this.selectdescription,
            Interface_id: this.Interface_id,
            project_id: this.project_id
          }
          }
        )
      )
    },
    init() {
      this.project_id = this.$route.query.project_id,
        this.Interface_id = this.$route.query.id,
        this.selectdescription='',
      this.commonRequestThen(
        this.axios.get("/yahelei/case/getcaselistbyInterface_id", {
          params: {
            Interface_id: this.Interface_id,
            project_id: this.project_id
            }
          }
        )
      )
    },
    commonRequestThen(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info('查询成功')
          this.data = res.data.result
        } else {
          ElementUI.Message.info('查询失败')
          console.error('查询失败:', res)
        }
      }).finally(() => {
        this.cardLoading = false
      })
    }
  },
  mounted () {
    this.init()
    this.loading = false
  },
  watch: {
    $route: {
      immediate: true,
      handler(val, oldval) {
        if(oldval==undefined)
          console.info(123)
        else if (
          (val.name.length != 0 && oldval.name.length != 0 && oldval.name == val.name &&
            (val.query.project_id != oldval.query.project_id||val.query.id != oldval.query.id))
          ||
          (val.name == 'CaseManager' && oldval.name != 'CaseManager')
        ) {
          this.init()
        }
      }
    }
  }
}
</script>
<style>
</style>
