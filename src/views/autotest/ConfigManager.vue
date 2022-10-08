<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="配置列表">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="类型">
              <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="selecttype">
                <el-option label='数据库' value='sql'>数据库</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="ip">
              <el-input placeholder="请输入链接" v-model="selecturl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" v-model="selectdes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click="handleEdit(-1,'sql','',
              '','','','')">新增配置</el-button>
              <el-button style="margin-left: 8px" @click="reset()">重置</el-button>
            </span>
          </el-col>
        </el-row>
        <el-dialog
          title="新增/修改配置弹窗"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form-item label="描述">
            <b style="color:red">*</b>
            <el-input style="width: 200px" v-model="des"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="type">
              <el-option label="数据库" value="sql">数据库</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <label v-if="type=='sql'" class="layui-form-label">数据库ip地址<b style="color:red">*</b>：</label>
            <label v-else-if="type=='redis'" class="layui-form-label">缓存ip地址<b style="color:red">*</b>：</label>
            <label v-else-if="type=='admock'" class="layui-form-label">admockip地址<b style="color:red">*</b>：</label>
            <label v-else-if="type=='WireMock'" class="layui-form-label">wiremockip地址<b style="color:red">*</b>：</label>
            <label v-else-if="type=='kafka'" class="layui-form-label">kafkaip地址<b style="color:red">*</b>：</label>
            <label v-else class="layui-form-label">esip地址<b style="color:red">*</b>：</label>
            <el-input placeholder="请输入" v-model="url"/>
          </el-form-item>
          <el-form-item>
            <label v-if="type=='sql'" class="layui-form-label">数据库端口<b style="color:red">*</b>：</label>
            <label v-else-if="type=='redis'" class="layui-form-label">缓存端口<b style="color:red">*</b>：</label>
            <label v-else-if="type=='admock'" class="layui-form-label">admock端口地址<b style="color:red">*</b>：</label>
            <label v-else-if="type=='WireMock'" class="layui-form-label">wiremock端口地址<b style="color:red">*</b>：</label>
            <label v-else-if="type=='kafka'" class="layui-form-label">kafka端口<b style="color:red">*</b>：</label>
            <label v-else class="layui-form-label">es端口<b style="color:red">*</b>：</label>
            <el-input placeholder="请输入" v-model="port"/>
          </el-form-item>
          <el-form-item v-if="type!='kafka'&&type!='admock'&&type!='WireMock'">
            <label v-if="type=='sql'" class="layui-form-label">数据库用户名<b style="color:red">*</b>：</label>
            <label v-else-if="type=='redis'" class="layui-form-label">redisIndex<b style="color:red">*</b>：</label>
            <label v-else class="layui-form-label">escluster<b style="color:red">*</b>：：</label>
            <el-input placeholder="请输入" v-model="username"/>
          </el-form-item>
          <el-form-item v-if="type!='kafka'&&type!='redis'&&type!='admock'&&type!='WireMock'">
            <label v-if="type=='sql'" class="layui-form-label">数据库密码<b style="color:red">*</b>：</label>
            <label v-else class="layui-form-label">sqlDb<b style="color:red">*</b>：</label>
            <el-input placeholder="请输入" v-model="password"/>
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
        <el-table-column property="type" label="类型"></el-table-column>
        <el-table-column property="url" label="ip"></el-table-column>
        <el-table-column property="port" label="端口"></el-table-column>
        <el-table-column property="username" label="用户名"></el-table-column>
        <el-table-column property="updateperson" label="最新更改者"></el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="deleteaddress(scope.row.id)" type="text">删除</el-button>
            <el-button @click="handleEdit(scope.row.id,scope.row.type,scope.row.description
            ,scope.row.url,scope.row.port,scope.row.username,scope.row.password)" type="text">编辑</el-button>
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
      port:'',
      url:'',
      username:'',
      password:'',
      type:'',
      des:'',
      selecttype:'sql',
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
    handleEdit(id, type,description, url,port,username,password) {
      this.url = url
      this.port = port
      this.des=description
      this.username = username
      this.password=password
      this.type = type
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
    cancel() {
      this.dialogVisible = false
    },
    ok () {
      if (this.url.length==0|| this.port.length==0 || this.des.length==0||this.username.length==0||this.password.length==0) {
        ElementUI.Message.info("保存失败，请检查必填项")
      } else {
        this.commonRequestThenetid(
          this.axios.get("/yahelei/address/addoretidaddress", {
            params: {
              url: this.url,
              port: this.port,
              description: this.des,
              addressId: this.id,
              type:this.type,
              username:this.username,
              password:this.password
            }}))
      }
    },
    deleteaddress (x) {
      this.commonRequestThendeleteproject(
        this.axios.get("/yahelei/address/deleteaddress", {
          params: {
            addressId: x
          }}))
    },
    reset () {
      this.selecttype=''
      this.selectdes=''
      this.selecturl=''
    },
    search () {
      this.commonRequestThen(
        this.axios.get("/yahelei/address/list", {
          params: {
            type: this.selecttype,
            description: this.selectdes,
            url:this.selecturl
          }
        })
      )
    },
    init () {
      this.commonRequestThen(
        this.axios.get("/yahelei/address/list", {
          params: {
          }
        }))
    },
    commonRequestThendeleteproject(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.search()
          ElementUI.Message.info("删除配置成功")
        } else {
          this.$message.warn(res.data.result)
          ElementUI.Message.info("删除失败")
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    commonRequestThenetid(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info("添加配置成功")
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
        this.cardLoading = false
      })
    },
    commonRequestThen(promise) {
      this.loading = true
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info("查询成功")
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
