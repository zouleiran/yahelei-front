<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="公共参数列表">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" v-model="selectdes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="参数名">
              <el-input placeholder="请输入参数名" v-model="selectname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click="handleEdit(-1,'','','')">新增参数</el-button>
              <el-button style="margin-left: 8px" @click="reset()">重置</el-button>
            </span>
          </el-col>
        </el-row>
        <el-dialog
          title="新增/修改参数弹窗"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form-item label="描述">
            <b style="color:red">*</b>
            <el-input style="width: 200px" v-model="des"></el-input>
          </el-form-item>
          <el-form-item label="参数名">
            <b style="color:red">*</b>
            <el-input style="width: 200px" v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="参数值">
            <el-input  v-model="value"></el-input>
          </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    <!-- 查询结果展示区域 -->
      <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <el-table-column width="50px" property="id" label="id" style="width: 50px"></el-table-column>
        <el-table-column property="description" label="描述"></el-table-column>
        <el-table-column property="name" label="参数名"></el-table-column>
        <el-table-column property="value" label="参数值"></el-table-column>
        <el-table-column property="updateperson" label="最新更改者"></el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.id,scope.row.description,scope.row.name
            ,scope.row.value,scope.row.project_id)" type="text">编辑</el-button>
            <el-button @click="deleteinfo(scope.row.id)" type="text" size="small">删除</el-button>
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
      dialogVisible: false,
      data: [],
      id: '',
      http: '',
      host: '',
      env: '',
      des: '',
      name:'',
      value:'',
      selectprojectId:'',
      projectId:'',
      projectList:[],
      selectname:'',
      selectdes: '',
      selecthost: '',
      create_date: '',
      size: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage=val
    },
    handleEdit(id, description, name, value) {
      this.name = name
      this.value = value
      this.des = description
      this.id = id
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    queryInterface(x) {
      this.$router.push({
        path: '/InterfaceManager?projectId=' + x
      })
    },
    ok () {
      if ( this.name.length==0 || this.des.length==0) { ElementUI.Message.info("请填写必填项目") } else {
        this.commonRequestThenetid(
          this.axios.get("/yahelei/parameter/addoretidparameter", {
            params: {
              name: this.name,
              value: this.value,
              description: this.des,
              parameterId: this.id,
            }}))
      }
    },
    deleteinfo (x) {
      this.commonRequestThendeleteproject(
        this.axios.get("/yahelei/parameter/deleteparameter", {
          params: {
            parameterId: x
          }}))
    },
    reset () {
      this.selectdes=''
      this.selectname=''
      this.selectprojectId=''
    },
    search () {
      this.commonRequestThen(
        this.axios.get("/yahelei/parameter/list", {
          params: {
            name: this.selectname,
            projectId: this.selectprojectId,
            description: this.selectdes,
          }
        })
      )
    },
    init () {
      this.commonRequestThen(
        this.axios.get("/yahelei/parameter/list", {
          params: {
          }
        }))
    },
    commonRequestThendeleteproject(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.search()
          ElementUI.Message.info('删除成功')
        } else {
          ElementUI.Message.info('删除失败')
          console.error('删除失败:', res)
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    commonRequestThenetid(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.dialogVisible = false
          ElementUI.Message.info('操作成功')
          this.search()
        } else {
          ElementUI.Message.info(res.data.message)
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    commonRequestThenprojectbyid(promise) {
      promise.then(res => {
        if (res.success) {
          this.host = res.result.host
          this.env = res.result.env
          this.http = res.result.http
          this.git = res.result.git
          this.des = res.result.description
        } else {
          this.$message.warn(res.message)
          console.error('查询失败:', res)
        }
      }).finally(() => {
        this.cardLoading = false
      })
    },
    commonRequestThen(promise) {
      this.loading = true
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info('查询成功')
          this.loading = false
          this.data = res.data.result
        } else {
          ElementUI.Message.info(res.data.data)
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
