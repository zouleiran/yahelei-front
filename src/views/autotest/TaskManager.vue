<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="测试任务列表">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" v-model="selectdes"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="类型">
            <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="selecttype">
              <el-option value="1" label="项目">项目</el-option>
              <el-option value="2" label="接口">接口</el-option>
              <el-option value="3" label="标签">标签</el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="创建者">
              <el-input placeholder="请输入创建者" v-model="selectcreator"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click=
                "handleEdit(-1,'','','','',-1,'-1',''
                ,'','','','','')">新增任务</el-button>
              <el-button style="margin-left: 8px" @click="reset()">重置</el-button>
            </span>
          </el-col>
        </el-row>

        <el-dialog
          title="新增/修改任务弹窗"
          :visible.sync="dialogVisible"
          width="70%"
          :before-close="handleClose">
      <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="描述">
            <b style="color:red">*</b>
            <el-input style="width: 200px" v-model="des"></el-input>
          </el-form-item>
          <el-form-item label="类型"><b style="color:red">*</b>
          <el-select class="form-control" v-model="type" @change="onChangetype">
            <el-option value=1 label="按照服务维度执行">按照项目维度执行</el-option>
            <el-option value=2 label="按照接口维度执行">按照接口维度执行</el-option>
            <el-option value=3 label="按照标签维度执行">按照标签维度执行</el-option>
          </el-select>
          </el-form-item>
      </el-form>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item v-if="type!=-1" label="服务"><b style="color:red">*</b>
            <el-select v-if="type!=-1" class="form-control" v-model="serverId" @change="onChangeserverId">
              <el-option v-for="item in serverList" :value="item.id" :label="item.description">{{ item.description }}</el-option>
            </el-select>
        </el-form-item>
            <el-form-item v-if="type==2||type==3" label="请选择你的参数"><b style="color:red">*</b>
          <el-select class="form-control" v-model="selectvaluelist" filterable multiple>
            <el-option v-for="item in valueList" :value="item.id" :label="item.description">{{ item.description }}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
        <el-form-item label="执行host">
          <b style="color:red">*</b>
          <el-input style="width: 200px" v-model="host"></el-input>
        </el-form-item>
          <div></div>
        <label class="layui-form-label">执行公共header：</label>
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
          <div></div>
          <label class="layui-form-label">执行公共参数：</label>
          <el-button @click="addNeweditparam()">
            <el-icon/> 添加公共参数</el-button>
          <el-form layout="inline" v-for="(item,index) in editparam" :key="index">
            <el-form-item style="width: 300px">
              <el-input style="width: 300px" placeholder="参数名" v-model.trim="item.name"></el-input>
            </el-form-item>
            <el-form-item style="width: 300px">
              <el-input style="width: 300px" placeholder="参数值" v-model.trim="item.value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="mini" @click="editparam.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-form>

          <p>邮箱</p>
          <el-input placeholder="邮箱地址list" v-model.trim="owneremail"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="确认执行标签弹窗"
          :visible.sync="modal4"
          width="70%">
          <p>为了降低多次点击，设计出来的弹窗～确认执行吗？</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modal4 = false">取 消</el-button>
            <el-button type="primary" @click="exec">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="确认可执行url弹窗"
          :visible.sync="modal3"
          width="70%">
          <p>https://atp.mokahr.com/java/yahelei/task/exec?task_id={{id}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modal3 = false">关闭</el-button>
          </span>
        </el-dialog>
      </el-form>
    <!-- 查询结果展示区域 -->
      <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <el-table-column property="id" label="id"></el-table-column>
        <el-table-column property="description" label="描述"></el-table-column>
        <el-table-column label="标签">
        <template slot-scope="scope">
          <span v-if="scope.row.type==2">服务</span>
          <span v-else-if="scope.row.type==1">模块</span>
          <span v-else>标签</span>
        </template>
        </el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="beforeexec(scope.row.id)" type="text" size="small">执行</el-button>
            <el-button @click="handleEdit(scope.row.id,scope.row.host,scope.row.description,
            scope.row.type,scope.row.value,scope.row.projectId,scope.row.email,scope.row.param,scope.row.common_header)" type="text" size="small">编辑</el-button>
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
      modal3:false,
      modal4:false,
      jenkinsString:'',
      envString:'',
      weixinurl:'',
      dialogVisible: false,
      data: [],
      addressList:[],
      serverList:[],
      serverId:10,
      sqlid:5,
      id: '',
      env: '',
      selectserverId:'',
      selectserverList:[],
      des: '',
      host: '',
      value:'',
      valueList:[],
      jenkins:'',
      selectenv:'',
      selectvaluelist:[],
      currentPage: 1,
      pageSize: 10,
      common_header:[],
      editparam:[],
      editcommon_headers:[],
      param:[],
      mark:'',
      type:'',
      selecttype: '',
      selectdes: '',
      selecthost: '',
      owneremail:'',
      selectcreator: '',
      create_date: '',
      size: 1
    }
  },
  methods: {
    addNeweditcommer_headers() {
      if (this.editcommon_headers == null) {
        this.editcommon_headers = []
      }
      this.editcommon_headers.push({
        name: '',
        value: ''
      })
    },
    addNeweditparam() {
      if (this.editparam == null) {
        this.editparam = []
      }
      this.editparam.push({
        name: '',
        value: ''
      })
    },
    onChangeserverId(){
      this.axios.get("/yahelei/task/getlist", {
        params: {
          project_id:this.serverId,
          type:this.type
        }
      }).then(res => {
        if (res.data.success) {
          this.valueList = res.data.result
        } else {
          ElementUI.Message.error('查询项目列表失败')
        }
      }).finally(() => {
        this.cardLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage=val
    },
    onChangetype(){
      this.value=''
      this.serverId=''
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
    handleEdit(id,host, description,type,value,projectId,email,param,common_header) {
      this.type = type
      this.serverId = Number.isNaN(projectId) ? projectId : Number(projectId)
        this.axios.get("/yahelei/project/list", {
          params: {
            projectId:projectId
          }
        }).then(res => {
            this.serverList = res.data.result
          }
          )
      this.axios.get("/yahelei/task/getlist", {
        params: {
          serverId:this.serverId,
          type:this.type
        }
      }).then(res => {
          this.valueList = res.data.result}
      )
      this.des = description
      this.id = id
      this.host = host
      this.selectvaluelist.splice(0, this.selectvaluelist.length)
      this.selectvaluelist = (value==null||value==0)?[]
        :value.split(',').map(Number)
      this.param = this.jsonToListTo(param)
      this.owneremail=email
      this.editparam.splice(0, this.editparam.length)
      for (var i = 0; i < this.param.length; i++) {
        this.editparam.push({
          name: this.param[i].name,
          value: this.param[i].value
        })
      }
      this.common_header = this.jsonToListTo(common_header)
      this.editcommon_headers.splice(0, this.editcommon_headers.length)
      for (var i = 0; i < this.common_header.length; i++) {
        this.editcommon_headers.push({
          name: this.common_header[i].name,
          value: this.common_header[i].value
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
        path: '/SceneManager?server_id=' + x
      })
    },
    showurl(x){
      this.id=x
      this.modal3=true
    },
    exec(){
      this.modal4=false
      this.axios.get("/yahelei/task/executebytaskid", {
        params: {
          taskId:this.id
        }
      }).then(res => {
        if (res.data.success) {
          ElementUI.Message.success('执行完成')
        } else {
          ElementUI.Message.error('执行失败')
        }
      }).finally(() => {
        this.cardLoading = false
      })
    },
    beforeexec(x){
      this.id=x
      this.modal4=true
    },
    cancel() {
      this.dialogVisible = false
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
    ok () {
      if (this.des.length==0||this.host.length==0) {
        ElementUI.Message.info('请填写必填项')
      } else {
        this.common_header.splice(0, this.common_header.length)
        for (var i = 0; i < this.editcommon_headers.length; i++) {
          this.common_header.push({
            name: this.editcommon_headers[i].name,
            value: this.editcommon_headers[i].value
          })
        }
        this.param.splice(0, this.param.length)
        for (var i = 0; i < this.editparam.length; i++) {
          this.param.push({
            name: this.editparam[i].name,
            value: this.editparam[i].value
          })
        }
        this.commonRequestThenetid(
          this.axios.get("/yahelei/task/addoretidtask", {
            params: {
              host:this.host,
              description: this.des,
              type: this.type,
              common_header:this.listToJsonNew2(this.common_header),
              param:this.listToJsonNew2(this.param),
              value: this.selectvaluelist.toString(),
              id:this.id,
              projectId:this.serverId,
              email:this.owneremail,
            }}))
      }
    },
    commonRequestThenetid(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info("添加修改任务成功")
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
    deleteserver (x) {
      this.commonRequestThendeleteproject(
        this.axios.get("/yahelei/server/deleteserver", {
          params: {
            server_id: x
          }}))
    },
    reset () {
      this.selectdes=''
      this.selectcreator=''
      this.selecttype=''
    },
    search () {
      this.commonRequestThen(
        this.axios.get("/yahelei/task/list", {
          params: {
            type: this.selecttype,
            description: this.selectdes,
            creator:this.selectcreator,
            serverId:this.selectserverId,
            host:this.selecthost
          }
        })
      )
    },
    commonRequestThendeleteproject(promise) {
      promise.then(res => {
        if (res.data.success) {
          console.info('success')
          this.search()
          ElementUI.Message.info('删除成功')
        } else {
          ElementUI.Message.info(res.data.result)
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    init () {
      this.commonRequestThen(
        this.axios.get("/yahelei/task/list", {
          params: {
          }
        }))
      this.commonRequestThenaddress(this.axios.get("/yahelei/address/list", {
        params:
          {
            type: 'sql',
            url: "",
            creator: "",
            description: "",
          }
      }))
    },
    commonRequestThenaddress(promise){
      promise.then(res => {
        this.addressList = res.data.result
      }).finally(() => {
        this.loading = false
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
