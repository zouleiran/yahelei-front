<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="测试服务列表">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" v-model="selectdes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="域名">
              <el-input placeholder="请输入域名" v-model="selecthost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click="handleEdit(-1,'','','http','','')">新增服务</el-button>
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
            <el-input v-model="des"></el-input>
          </el-form-item>
          <el-form-item label="域名">
            <el-input  v-model="host"></el-input>
          </el-form-item>
          <el-form-item label="请求协议">
            <el-select v-model="http" placeholder="请求方式">
              <el-option label="http" value="http"></el-option>
              <el-option label="https" value="https"></el-option>
            </el-select>
          </el-form-item>
          <div></div>
          <label class="layui-form-label">公共body：</label>
          <el-button @click="addNeweditcommer_body()"><el-icon/> 添加公共body</el-button>
          <el-form :inline="true" v-for="(item,index) in editcommon_body" :key="index">
            <el-form-item>
              <el-input style="width: 300px" placeholder="参数名" v-model.trim="item.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input style="width: 300px" placeholder="参数值" v-model.trim="item.value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="mini" @click="editcommon_body.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-form>
          <div></div>
          <label class="layui-form-label">公共header：</label>
          <el-button @click="addNeweditcommer_headers()">
            <el-icon/> 添加公共header</el-button>
          <el-form layout="inline" v-for="(item,index) in editcommon_headers" :key="index">
            <el-form-item style="width: 300px">
              <el-input style="width: 300px" placeholder="参数名" v-model.trim="item.name"></el-input>
            </el-form-item>
            <el-form-item style="width: 300px">
              <el-input style="width: 300px" placeholder="参数值" v-model.trim="item.value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="mini" @click="editcommon_headers.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-form>

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
        <el-table-column property="host" label="域名"></el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="queryInterface(scope.row.id)" type="text" size="small">查看该服务的接口</el-button>
            <el-button @click="handleEdit(scope.row.id,scope.row.description,scope.row.host
            ,scope.row.http,scope.row.common_header,scope.row.common_body)" type="text" size="small">编辑</el-button>
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
      dialogVisible: false,
      data: [],
      id: '',
      http: '',
      host: '',
      env: '',
      des: '',
      currentPage: 1,
      pageSize: 10,
      common_header:[],
      editcommon_body:[],
      editcommon_headers:[],
      common_body:[],
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
    addNeweditcommer_body() {
      if (this.editcommon_body == null) {
        this.editcommon_body = []
      }
      this.editcommon_body.push({
        name: '',
        value: ''
      })
    },
    addNeweditcommer_headers() {
      if (this.editcommon_headers == null) {
        this.editcommon_headers = []
      }
      this.editcommon_headers.push({
        name: '',
        value: ''
      })
    },
    jsonToListTo(json) {
      var list = []
      if (json != null && json.length <= 1) { return list }
      var json2 = JSON.parse(json)
      for (var key in json2) {
        list.push({
          name: key,
          value: (typeof json2[key] === 'string') ? json2[key].replace(/\"/g, '\\"') : JSON.stringify(json2[key]).replace(/\"/g, '\\"')
        })
      }
      return list
    },
    handleEdit(id, description, host, http,common_header,common_body) {
      this.host = host
      this.http = http
      this.des = description
      this.id = id
      this.common_header = this.jsonToListTo(common_header)
      this.editcommon_headers.splice(0, this.editcommon_headers.length)
      for (var i = 0; i < this.common_header.length; i++) {
        this.editcommon_headers.push({
          name: this.common_header[i].name,
          value: this.common_header[i].value
        })
      }

      this.common_body = this.jsonToListTo(common_body)
      this.editcommon_body.splice(0, this.editcommon_body.length)
      for (var i = 0; i < this.common_body.length; i++) {
        this.editcommon_body.push({
          name: this.common_body[i].name,
          value: this.common_body[i].value
        })
      }
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
    cancel() {
      this.dialogVisible = false
    },
    ok () {
      if (this.host.length==0|| this.http.length==0 || this.des.length==0) { this.$message.warn('请填写必填项') } else {
        this.common_body.splice(0, this.common_body.length)
        for (var i = 0; i < this.editcommon_body.length; i++) {
          this.common_body.push({
            name: this.editcommon_body[i].name,
            value: this.editcommon_body[i].value
          })
        }
        this.common_header.splice(0, this.common_header.length)
        for (var i = 0; i < this.editcommon_headers.length; i++) {
          this.common_header.push({
            name: this.editcommon_headers[i].name,
            value: this.editcommon_headers[i].value
          })
        }
        this.commonRequestThenetid(
          this.axios.get("/yahelei/project/addoretidproject", {
            params: {
              host: this.host,
              http: this.http,
              description: this.des,
              projectId: this.id,
              common_header: this.listToJsonNew2(this.common_header),
              common_body: this.listToJsonNew2(this.common_body),
            }}))
      }
    },
    listToJsonNew2(params) {
      var obj = {}
      if (params == '' || params == null) {
        params = []
      }

      for (var i = 0; i < params.length; i++) {
        if (params[i].name.length > 0) {
          var params_value=params[i].value
          var params_name = params[i].name
          obj[params_name] = params_value
        }
      }
      var x = JSON.stringify(obj)
      return x
    },
    deleteproject (x) {
      this.id = x
      this.commonRequestThendeleteproject(
        this.axios.get("/yahelei/project/deleteproject", {
          params: {
            projectId: x
          }}))
    },
    reset () {
      this.selectdes=''
      this.selecthost=''
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
        this.axios.get("/yahelei/project/list", {
          params: {
            host: this.selecthost,
            description: this.selectdes,
          }
        })
      )
    },
    init () {
      this.commonRequestThen(
        this.axios.get("/yahelei/project/list", {
          params: {
          }
        }))
    },
    commonRequestThendeleteproject(promise) {
      promise.then(res => {
        if (res.success) {
          console.info('success')
          this.search()
          this.$message.info('删除成功')
        } else {
          this.$message.warn(res.result)
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
          ElementUI.Message.info("添加服务成功")
          this.dialogVisible = false
          this.search()
        } else {
          ElementUI.Message.info(res.data.message)
          if(res.code==-1)
          {
            this.dialogVisible=false
            this.selecthost=this.host
            this.search()
          }
        }
      }).finally(() => {
        this.loading = false
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
}
</script>
