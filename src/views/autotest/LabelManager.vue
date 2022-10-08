<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="标签列表">
    <!-- 查询区域 -->
      <el-form :inline="true" @keyup.enter.native="search">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="服务">
              <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="selectprojectId">
                <el-Option v-for="item in projectList" :value="item.id" :label="item.description">{{ item.description }}</el-Option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <el-form-item label="描述">
              <el-input placeholder="请输入描述" v-model="selectdescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons ">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button style="margin-left: 8px" @click="editoraddLabel(-1,'','','1','','','')">新增标签</el-button>
              <el-button style="margin-left: 8px" @click="reset()">重置</el-button>
            </span>
          </el-col>
        </el-row>
        <el-dialog
          title="新增/修改弹窗"
          :visible.sync="modal2"
          width="70%"
          :before-close="handleClose">
          <el-form-item label="描述">
            <el-input  v-model="description"></el-input>
          </el-form-item>
          <div></div>
          <el-form-item>
            <label class="layui-form-label">服务<b style="color:red">*</b>：</label>
            <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="projectId" @change="onChangeprojectId">
              <el-Option v-for="item in projectList" :value="item.id" :label="item.description">{{ item.description }}</el-Option>
            </el-select>
          </el-form-item>
          <div></div>
          <el-form-item>
            <label class="layui-form-label">关联的case</label>
            <el-select v-model="select1" multiple>
              <el-option
                v-for="item in select2"
                :key="item.id"
                :label="item.description"
                :value="item.id">{{ item.id }}{{ item.description }}
              </el-option>
            </el-select>
            <div></div>
            <el-form-item label="host">
              <el-input  v-model="host"></el-input>
            </el-form-item>
            <div></div>
            <div class="c-item">
              <el-button type="primary" size="mini" @click="addparamlabel()"><i class="el-icon-plus"></i>添加</el-button>
              <el-form :inline="true" v-for="(item,index) in editparamlabel2" :key="index">
                <el-form-item style="width: 300px">
                  <el-input style="width: 300px" placeholder="参数名" v-model.trim="item.name"></el-input>
                </el-form-item>
                <el-form-item style="width: 300px">
                  <el-input style="width: 300px" placeholder="参数值" v-model.trim="item.value"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="editparamlabel2.splice(index, 1)">删除</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-form-item>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modal2 = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="执行参数弹窗"
          :visible.sync="modal1"
          width="70%"
          :before-close="handleClose">
          <el-form-item label="host">
            <el-input  v-model="host"></el-input>
          </el-form-item>
          <div class="c-item">
            <el-button type="primary" size="mini" @click="paramlabel()"><i class="el-icon-plus"></i>添加</el-button>
            <el-form :inline="true" v-for="(item,index) in editparamlabel2" :key="index">
              <el-form-item style="width: 300px">
                <el-input style="width: 300px" placeholder="参数名" v-model.trim="item.name"></el-input>
              </el-form-item>
              <el-form-item style="width: 300px">
                <el-input style="width: 300px" placeholder="参数值" v-model.trim="item.value"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="editparamlabel2.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modal1 = false">取消</el-button>
            <el-button type="primary" @click="ok2">确定执行</el-button>
          </span>
        </el-dialog>

      </el-form>
        <el-table :data="data.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column property="id" label="id" style="width: 50px"></el-table-column>
          <el-table-column property="description" label="描述"></el-table-column>
          <el-table-column property="caseCount" label="标记case数量"></el-table-column>
          <el-table-column property="projectId" label="项目编号"></el-table-column>
          <el-table-column property="host" label="host"></el-table-column>
          <el-table-column property="paramlabel" label="配置变量"></el-table-column>
          <el-table-column property="update_time" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editoraddLabel(scope.row.id,scope.row.x,scope.row.caselist,
              scope.row.projectId,scope.row.description,scope.row.host,scope.row.paramlabel)" type="text">编辑</el-button>
              <el-button @click="exec(scope.row.id,scope.row.host,scope.row.paramlabel)" type="text">执行</el-button>
              <el-button @click="deleteLabel(scope.row.id,scope.row.caseCount)" type="text">删除</el-button>
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
      modal2: false,
      modal1: false,
      data: [],
      projectList:[],
      select1: [],
      select2: [],
      id: '',
      host:'',
      type: '',
      url: '',
      port: '',
      paramlabel:'',
      editparamlabel:'',
      editparamlabel2:[],
      username: '',
      password: '',
      projectId:'',
      userIdentity:'1',
      value: '',
      description: '',
      selectdescription: '',
      selectprojectId: '',
      size: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage=val
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
    addparamlabel() {
      if (this.editparamlabel2 == null) {
        this.editparamlabel2 = []
      }
      this.editparamlabel2.push({
        name: '',
        value: ''
      })
    },
    exec(id,host,paramlabel)
    {
      this.id=id
      this.host=host
      this.paramlabel=this.jsonToListTo(paramlabel)
      this.editparamlabel2.splice(0, this.editparamlabel2.length)
      for (var i = 0; i < this.paramlabel.length; i++) {
        this.editparamlabel2.push({
          name: this.paramlabel[i].name,
          value: this.paramlabel[i].value
        })
      }
      this.modal1=true
    },
    ok2() {
      this.modal1 = false
      this.editparamlabel=this.listToJsonNew2(this.editparamlabel2)
      this.paramlabel=this.editparamlabel
      this.axios.get("/yahelei/Label/executebylabelid",{
        params: {
          host: this.host,
          Labelid: this.id,
          parameter: this.paramlabel
        }
      }).then(res => {
        if (res.data.success) {
          ElementUI.Message.info('执行成功')
        } else {
          ElementUI.Message.error('执行失败')
        }
      })
    },
    editoraddLabel(id,x,caselist, projectId, description,host,paramlabel) {
      this.host=host
      this.paramlabel=this.jsonToListTo(paramlabel)
      this.editparamlabel2.splice(0, this.editparamlabel2.length)
      for (var i = 0; i < this.paramlabel.length; i++) {
        this.editparamlabel2.push({
          name: this.paramlabel[i].name,
          value: this.paramlabel[i].value
        })
      }
      this.id = id, this.select2 = x
      this.editparamlabel=paramlabel
      if (caselist.length == 0)
      {
        this.select1 = []
      }
      else
      {
        this.select1 = caselist.split(',').map(Number)
      }
      this.projectId = Number.isNaN(projectId) ? projectId : Number(projectId)
      this.description = description,
      this.modal2 = true
    },
    ok () {
      this.editparamlabel=this.listToJsonNew2(this.editparamlabel2)
      this.paramlabel=this.editparamlabel
      this.commonRequestThenetid(
        this.axios.get("/yahelei/Label/addoretidLabel",{
          params: {
            description: this.description,
            projectId: this.projectId,
            LabelId: this.id,
            caselist: this.select1.toString(),
            paramlabel: this.paramlabel,
            host: this.host
          }
        }))
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    reset () {
      this.selectdescription=''
      this.selectprojectId=''
    },
    cancel() {
      this.modal2 = false
    },
    deleteLabel (x,caseCount) {
      if(caseCount>0)
        ElementUI.Message.error('先删除该标签关联的用例吧')
      else {
        this.commonRequestThendeletelabel(
          this.axios.get("/yahelei/Label/deleteLabel",{
            params: {
              LabelId: x
            }
            }))
      }
    },
    search () {
      this.commonRequestThen(
        this.axios.get("/yahelei/Label/list",{
          params: {
            projectId: this.selectprojectId,
            description: this.selectdescription,
      }
          }))
    },
    init () {
      if(this.$route.query.project_id==undefined)
        this.selectprojectId =""
      else
        this.selectprojectId=Number(this.$route.query.project_id)
      this.commonRequestThen(
        this.axios.get("/yahelei/Label/list",{
        params: {
          projectId: this.selectprojectId,
        }
          })
      )
    },
    commonRequestThendeletelabel(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.search()
          ElementUI.Message.info('删除成功')
        } else {
          ElementUI.Message.info(res.data.message)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    commonRequestThenetid(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.modal2 = false
          ElementUI.Message.info('保存成功')
          this.search()
        } else {
          ElementUI.Message.error('保存失败')
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    commonRequestThen(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.commonRequestThen2(
            this.axios.get("/yahelei/project/list", {
              params: {
              }
            }))
          this.data = res.data.result
        } else {
          ElementUI.Message.error('查询标签列表失败')
          console.error('查询失败:', res)
        }
      }).finally(() => {
        this.cardLoading = false
      })
    },
    commonRequestThen2(promise) {
      promise.then(res => {
        if (res.data.success) {
          this.projectList = res.data.result
        } else {
          this.$message.warn(res.message)
          ElementUI.Message.error('查询项目列表失败')
        }
      }).finally(() => {
        this.cardLoading = false
      })
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val, oldval) {
        if (oldval==null||
          (val.name.length != 0 && oldval.name.length != 0 && oldval.name == val.name && val.query.project_id != oldval.query.project_id) ||
          (val.name == 'LabelManager' && oldval.name != 'LabelManager')) {
          this.init()
        }
      }
    }
  }
}
</script>
