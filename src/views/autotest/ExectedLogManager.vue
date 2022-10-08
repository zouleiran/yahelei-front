<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="日志列表">
        <el-form :inline="true" class="demo-form-inline">
          <el-row :gutter="48">
            <el-col :md="8" :sm="24">
              <el-form-item label="标签名称">
                <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;"
                           v-model="selectlabel">
                  <el-Option v-for="item in Labellist" :value="item.id" :label="item.description">{{ item.description }}</el-Option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24">
              <el-form-item label="执行者">
                <el-input placeholder="请输入creator" v-model="selectcreator"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24">
              <el-form-item label="serialId">
                <el-input placeholder="请输入serialId" v-model="selectserialId"></el-input>
              </el-form-item>
            </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click="reset">重置</el-button>
            </span>
          </el-col>
        </el-row>
      </el-form>
        <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column property="serialId" label="serialId" style="width: 50px"></el-table-column>
          <el-table-column property="createTime" label="执行时间"></el-table-column>
          <el-table-column property="success" label="成功数量"></el-table-column>
          <el-table-column property="sum" label="执行用例总数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row.serialId)" type="text">查看详情</el-button>
              <el-button @click="send(scope.row.serialId)" type="text">发送邮件</el-button>
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
        <el-dialog
          title="日志弹窗"
          :visible.sync="modal2"
          width="70%"
          :before-close="handleClose">
          <el-table :data="datadetail.slice((currentPage2-1)*pageSize2,currentPage2*pageSize2)">
            <el-table-column fixed="left" property="update_time" label="开始执行时间" width="100px"></el-table-column>
            <el-table-column property="caseId" label="测试接口用例编号" width="50px"></el-table-column>
            <el-table-column property="path" label="接口路径" width="50px"></el-table-column>
            <el-table-column property="creator" label="执行者" width="100px"></el-table-column>
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
            :total="datadetail.length">
          </el-pagination>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="modal2 = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  data () {
    return {
      Labellist:[],
      modal1: false,
      modal2: false,
      modal3: false,
      data: [],
      tasklist:[],
      selectlabel:'',
      currentPage: 1,
      pageSize: 10,
      currentPage2: 1,
      pageSize2: 10,
      datadetail: [],
      sendlist: '',
      id: '',
      git: '',
      http: '',
      host: '',
      env: '',
      jdbc: '',
      des: '',
      projectid: '',
      interfaceid: '',
      caseid: '',
      selectserialId: -1,
      selecttaskid: '',
      serialId: -1,
      taskid: '',
      selectcreator:'',
      page: 1,
      pagecount: 10,
      pagetotal: 0,
      size: 1
    }
  },
  methods: {
    onChange(){
      this.commonRequestThen(
          listlog({
            taskid: this.selecttaskid,
            creator: this.selectcreator,
            serialId: this.selectserialId,
            pagecount: this.pagecount,
            page: this.page
          }))
    },
    handleCurrentChange2(val) {
      this.currentPage2=val
    },
    handleCurrentChange(val) {
      this.currentPage=val
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    reset () {
      this.selectcreator=''
      this.selectlabel=''
      this.selectserialId=''
    },
    qiujie(x) {
      var y = (x * 100).toFixed(2)
      return y + '%'
    },
    qiujie2(x){
      if(x==-1)
        return "jenkins调用任务";
      for(var i=0;i< this.tasklist.length;i++)
        if(this.tasklist[i].id==x)
          return this.tasklist[i].description;
    },
    to123(x,y,z){
      this.$router.push({
        path: '/qatool/httpautotest/Casedetail?caseid=' + x + '&Interface_id=' + y + '&project_id=' + z
      })
    },
    send(x) {
      alert("还没写好呢")
    },
    ok() {
      this.commonReques(
          sendmail({
            sendlist: this.sendlist,
            SerialId:this.serialId
          }))
    },
    commonReques(promise) {
      promise.then(res => {
        this.modal3 = false
        if (res.success) {
          this.$message.info('发送成功')
        } else {
          this.$message.warn(res.message)
          console.error('查询失败:', res)
        }
      })
    },
    cancel1() {
      this.modal3 = false
    },
    cancel() {
      this.modal2 = false
    },
    detail (x) {
      this.commonRequestThendetaillog(
        this.axios.get("/yahelei/caseExecuteLog/getdetail", {
          params: {
            serialId: x
          }
          }))
    },
    commonRequestThendetaillog(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.datadetail = res.data.result
          this.modal2 = true
        } else {
          ElementUI.Message.error(res.data.message)
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    search () {
      this.pagecount=10
      this.commonRequestThen(
        this.axios.get("/yahelei/caseExecuteLog/getlist", {
          params: {
            taskid: this.selecttaskid,
            creator: this.selectcreator,
            serialId: this.selectserialId,
            pagecount: this.pagecount,
            page: 1
          }}))
    },
    init () {
      this.commonRequestThengettask(
        this.axios.get("/yahelei/Label/getlist", {
          params: {
          }
        }))
      this.selectserialId = this.$route.query.serialId
      this.commonRequestThen(
        this.axios.get("/yahelei/caseExecuteLog/getlist", {
          params: {
            serialId: this.selectserialId,
            pagecount: 10,
            page: 1
          }
        })
      )
    },
    commonRequestThengettask(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.Labellist=res.data.result
        } else {
          this.$message.warn(res.message)
        }
      })
    },
    commonRequestThen(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.data = res.data.result
          this.pagetotal=res.data.result[0].id
        } else {
          ElementUI.Message.info(res.data.message)
          console.error('查询失败:', res)
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    }
  },
  mounted () {
    this.init()
    this.loading = false
  },
}
</script>
