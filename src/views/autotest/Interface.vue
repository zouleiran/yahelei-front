<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="接口列表">
        <el-form :inline="true" class="demo-form-inline">
          <el-row :gutter="48">
            <el-col :md="8" :sm="24">
              <el-form-item label="描述">
                <el-input placeholder="请输入描述" v-model="selectdes"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24">
              <el-form-item label="url">
                <el-input placeholder="请输入域名" v-model="selecturl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click="handleEdit(-1,'','','GET')">新增接口</el-button>
              <el-button style="margin-left: 8px" @click="reset()">重置</el-button>
            </span>
            </el-col>
          </el-row>
          <el-dialog
            title="新增/修改弹窗"
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose">
            <el-form-item label="描述">
              <el-input  v-model="des"></el-input>
            </el-form-item>
            <el-form-item label="url">
              <el-input style="width: 400px" v-model="url"></el-input>
            </el-form-item>
            <el-form-item label="请求协议">
              <el-select v-model="method" placeholder="请求协议">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="DELETE" value="DELETE"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
              </el-select>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>
          </el-dialog>
        </el-form>
        <!-- 查询结果展示区域 -->
        <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column property="id" label="id"></el-table-column>
          <el-table-column property="description" label="描述"></el-table-column>
          <el-table-column property="url" label="url"></el-table-column>
          <el-table-column property="method" label="请求方式"></el-table-column>
          <el-table-column property="num" label="接口用例数量"></el-table-column>
          <el-table-column property="update_time" label="更新时间"></el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button @click="querycase(scope.row.id)" type="text">查看该接口的用例</el-button>
              <el-button @click="handleEdit(scope.row.id,scope.row.description,scope.row.url
            ,scope.row.method)" type="text">编辑</el-button>
              <el-button @click="deleteInterface(scope.row.id,scope.row.num)" type="text">删除</el-button>
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
      project_id:'',
      dialogVisible: false,
      data: [],
      method:'GET',
      id: '',
      url: '',
      des: '',
      selectdes: '',
      selecturl: '',
      create_date: '',
      size: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage=val
    },
    handleEdit(id, description, url, method) {
      this.url = url
      this.method = method
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
    querycase(x) {
      this.$router.push({
        path: '/CaseManager?id=' + x + '&project_id=' + this.project_id
      })
    },
    to123(a){
      window.open("http://jenkins.yidian-inc.com:8080/job/"+this.git+"/"+a+"/");
    },
    cancel() {
      this.modal2 = false
    },
    ok () {
      if (this.method.length==0|| this.url.length==0 || this.des.length==0) { ElementUI.Message.info("请填写必填项目") } else {
        this.commonRequestThenetid(
          this.axios.get("/yahelei/Interface/addoretidInterface", {
            params: {
              url: this.url,
              method: this.method,
              description: this.des,
              projectId: this.project_id,
              InterfaceId: this.id,
            }}))
      }
    },
    deleteInterface (x,num) {
  if (num > 0)
    ElementUI.Message.error("必须删除所有接口用例才可以删除接口")
      else {
    this.commonRequestThendeleteproject(
      this.axios.get("/yahelei/Interface/deleteInterface", {
        params: {
          InterfaceId: x
        }
      }))
  }
    },
    reset () {
      this.selectdes=''
      this.selecturl=''
    },
    searchproject (x) {
      this.id = x
      this.commonRequestThenprojectbyid(
        getprojectbyid({
          projectId: x
        }))
    },
    search () {
      this.commonRequestThen(
        this.axios.get("/yahelei/Interface/list", {
          params: {
            url: this.selecturl,
            description: this.selectdes,
            project_id:this.project_id,
            page:this.page,
            pagecount:this.pagecount,
          }
        })
      )
    },
    init () {
      this.selectdes='',
        this.selecturl='',
      this.project_id = this.$route.query.projectId
      this.commonRequestThen(
        this.axios.get("/yahelei/Interface/list", {
          params: {
            project_id:this.project_id,
            page:this.page,
            pagecount:this.pagecount,
          }
        }))
    },
    commonRequestThendeleteproject(promise) {
      promise.then(res => {
        if (res.data.success) {
          console.info('success')
          this.search()
          ElementUI.Message.info("删除成功")
          // this.$message.info('删除成功')
        } else {
          // this.$message.warn(res.result)
          ElementUI.Message.info(res.dataresult)
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
          ElementUI.Message.info("添加接口成功")
          this.search()
        } else {
          ElementUI.Message.info(res.data.message)
          if(res.data.code==-1)
          {
            this.dialogVisible=false
            this.search()
          }
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
  watch: {
    $route: {
      immediate: true,
      handler(val, oldval) {
        if(oldval==undefined)
          console.info(123)
        else if (
          (val.name.length != 0 && oldval.name.length != 0 && oldval.name == val.name && val.query.projectId != oldval.query.projectId)
          ||
          (val.name == 'InterfaceManager' && oldval.name != 'InterfaceManager')
        ) {
          this.init()
        }
      }
    }
  }
}
</script>
