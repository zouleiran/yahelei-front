<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-card :closable="false" header="处理器列表">
      <el-form :inline="true" class="demo-form-inline">
        <el-row :gutter="48">
          <el-col :md="8" :sm="24">
            <el-form-item label="类型">
              <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="selecttype">
                <el-option value="sqldeleteorupdate" label="sql的update和delete">sql的update和delete</el-option>
                <el-option value="sqlselect" label="sql的select">sql的select</el-option>
                <el-option value="caseid">caseid</el-option>
                <el-option value="sleep">sleep</el-option>
                <el-option value="code">code</el-option>
              </el-select>
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
              <el-button style="margin-left: 8px" @click="addpre()">新增处理器</el-button>
              <el-button style="margin-left: 8px" @click="reset()">重置</el-button>
            </span>
          </el-col>
        </el-row>
        <el-dialog
          title="新增/修改弹窗"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form-item label="描述">
            <el-input  v-model="des"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="layui-form-label">类型<b style="color:red">*</b>：</label>
            <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="type"
                    @change="change1">
              <el-option value="sqldeleteorupdate" label="利用sqlupdate或delete">利用sqlupdate或delete</el-option>
              <el-option value="sqlselect" label="利用sql查询并把结果赋值到参数中">利用sql查询并把结果赋值到参数中</el-option>
<!--              <el-option value="admock">admock</el-option>-->
<!--              <el-option value="WireMock">WireMock</el-option>-->
              <el-option value="caseid">caseid</el-option>
<!--              <el-option value="redis">redis缓存</el-option>-->
<!--              <el-option value="kafka">kafka</el-option>-->
<!--              <el-option value="es">es</el-option>-->
              <el-option value="sleep">sleep</el-option>
              <el-option value="code">code</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="type!='sleep'&&type!='caseid'&&type!='code'">
            <label>选择你的配置：</label>
            <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="value">
              <el-Option v-for="item in addressList" :value="item.id" :label="item.description">{{ item.description }}</el-Option>
            </el-select>
          </el-form-item>

          <el-form-item v-if="type=='code'">
            <label class="layui-form-label">作为后置处理器，是否将返回结果传入：</label>
            <el-switch checkedChildren="是" unCheckedChildren="否" v-model="value"/>
          </el-form-item>
          <el-form-item v-if="type=='redis'||type=='kafka'||type=='es'">
            <label class="layui-form-label">你的动作<b style="color:red">*</b>：</label>
            <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="action" @change="change2">
              <el-option value="set" v-if="type=='redis'">set</el-option>
              <el-option value="sadd" v-if="type=='redis'">sadd</el-option>
              <el-option value="del" v-if="type=='redis'">del</el-option>
              <el-option value="hdel" v-if="type=='redis'">hdel</el-option>
              <el-option value="get" v-if="type=='redis'">get</el-option>
              <el-option value="getconsume" v-if="type=='kafka'">getconsume</el-option>
              <el-option value="delES" v-if="type=='es'">delES</el-option>
              <el-option value="syncES" v-if="type=='es'">syncES</el-option>
              <el-option value="clean" v-if="type=='admock'">clean</el-option>
              <el-option value="set" v-if="type=='admock'">set</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="type!='sqldeleteorupdate'&&type!=''">
            <label class="layui-form-label" v-if="type=='kafka'">topic：</label>
            <label class="layui-form-label" v-if="type=='caseid'">输入caseid：</label>
            <label class="layui-form-label" v-if="type=='sqlselect'">保存的参数名：</label>
            <label class="layui-form-label" v-if="type=='es'">参数值1：</label>
            <label class="layui-form-label" v-if="type=='admock'">key：</label>
            <label class="layui-form-label" v-if="type=='WireMock'">url：</label>
            <label class="layui-form-label" v-if="type=='redis'">key：</label>
            <label class="layui-form-label" v-if="type=='code'">path：</label>
            <label class="layui-form-label" v-if="type=='sleep'">毫秒数：</label>
            <el-input placeholder="请输入" v-model="value1"/>
          </el-form-item>
          <el-form-item v-if="type!='caseid'&&type!='es'&&type!='sleep'&&((type=='redis'&&action!='del')||type!='redis')">
            <label class="layui-form-label">参数值2：</label>
            <el-input autosize
              type="textarea" style="border:1px solid; font-size:13px;overflow:scroll;"
              placeholder="请输入内容"
              v-model="value2">
            </el-input>
          </el-form-item>
          <el-form-item v-if="type=='code'">
            <label class="layui-form-label">保存的参数名：</label>
            <el-input placeholder="请输入" v-model="value3"/>
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
        <el-table-column property="value1" label="参数一"></el-table-column>
        <el-table-column property="value2" label="参数二"></el-table-column>
        <el-table-column property="caselist" label="这些用例使用"></el-table-column>
        <el-table-column property="update_time" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.id,scope.row.description,scope.row.type
            ,scope.row.value,scope.row.value2,scope.row.value1,scope.row.value3,scope.row.action)" type="text">编辑</el-button>
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
import Qs from 'qs'
import ElementUI from "element-ui";
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      data: [],
      id: '',
      value2: '',
      value3:'',
      value1:'',
      value: '',
      addressList: [],
      action:'',
      des: '',
      type:'',
      selecttype:'',
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
    handleEdit(id, description, type, value, value2, value1,value3, action) {
      var a=type;
      if(a=="sqldeleteorupdate"|| a=="sqlselect")
        a="sql"
      if(value=="true"&&type=="code")
        this.value = true
      else if(value=="false"&&type=="code")
        this.value = false
      else
        this.value = value
        this.id = id,
        this.des = description,
        this.type = type,
        this.value2 = value2,
        this.value3 = value3,
        this.value1 = value1,
        this.action = action,
        this.commonRequestThen2(
          this.axios.get("/yahelei/address/list",{
            params:
              {
                type: a,
                url: "",
                description: "",
              }
          }))
    },
    addpre() {
      this.id = -1,
      this.des = null,
      this.type = '',
      this.value1 = null,
      this.value2 = null,
      this.value3 = null,
      this.value = '',
      this.commonRequestThen2(this.axios.get("/yahelei/address/list", {
        params:
          {
            type: this.type,
            url: "",
            description: "",
          }
      }))
    },
    commonRequestThen2(promise){
      promise.then(res => {
        this.dialogVisible = true
        this.addressList = res.data.result
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
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
    change1(){
      var a=this.type;
      if(a=="sqldeleteorupdate"|| a=="sqlselect")
        a="sql"
      this.commonRequestThen3(
        this.axios.get("/yahelei/address/list",{
          params:
            {
          type: a,
          url: "",
          description: "",
          }
        }))
    },
    commonRequestThen3(promise){
      promise.then(res => {
        this.action=''
        this.value=''
        if(this.type=="code")
          this.value=true
        this.value1=''
        this.value2=''
        this.value3=''
        this.addressList = res.data.result
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    ok () {
      // if (this.host.length==0|| this.http.length==0 || this.des.length==0) { this.$message.warn('请填写必填项') } else {
      this.commonRequestThenetid(
        this.axios.post("/yahelei/precondition/addoretidprecondition",

        Qs.stringify(
          {
            preId: this.id,
        type: this.type,
        value1: this.value1,
        action: this.action,
        value: this.value,
        value2: this.value2,
        value3: this.value3,
        description: this.des
          }
        )
          )
      )
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
    },
    search () {
      this.commonRequestThen(
        this.axios.get("/yahelei/precondition/list", {
          params: {
            type: this.selecttype,
            description: this.selectdes,
          }
        })
      )
    },
    init () {
      this.commonRequestThen(
        this.axios.get("/yahelei/precondition/list", {
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
          ElementUI.Message.info("删除失败")
        }
      }).finally(() => {
        this.loading = false
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
