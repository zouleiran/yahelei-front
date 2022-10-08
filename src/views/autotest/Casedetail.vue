<template>
  <div class="app-container" style="padding:30px;">
    <div style="padding:30px;">
      <el-row>
        <el-col :span="24" style="padding-right: 5px">
          <div class="case-edit-info">
            <h3 style="margin-top: 1rem;margin-bottom: 2rem;border-left: 3px solid #2395f1; padding-left: 8px;">接口用例详情</h3>
            <el-form ref="form" label-width="100px" :label-position="'left'">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="用例描述:">
                    <el-input placeholder="用例描述" v-model="description" @change="xiugai2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="调试用host:">
                    <el-input placeholder="调试用host" v-model="host" @change="xiugai2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <label class="layui-form-label">标签：</label>
                  <el-select v-model="select1" @change="xiugai3" multiple placeholder="请选择">
                    <el-option
                      v-for="item in select2"
                      :key="item.id"
                      :label="item.description"
                      :value="item.id">
                    </el-option>
                    <el-option :key="-1" :value="-1">添加新的标签</el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <div>
            <p v-if="isxiugai" style="color: #ff4000; font-size: 14px;font-weight: 700;padding-top: 10px">修改后一定要点击添加或更新后才能保存修改内容，别忘了啊！</p>
            <h3 style="margin-top: 2rem;margin-bottom: 1rem;border-left: 3px solid #2395f1; padding-left: 8px;">请求详情</h3>
            <el-dialog
              title="新增/修改前置处理弹窗"
              :visible.sync="model1"
              width="700px"
              :before-close="handleClose">
              <el-button type="primary" size="mini" @click="addNewPrePressing()"><i class="el-icon-plus"></i>添加</el-button>
              <el-form :inline="true" v-for="(item,index) in editprecondition" :key="index">
                <el-form-item>
                  <select class="form-control" style="width: 300px;height: 32px" v-model="item.value">
                    <Option v-for="item2 in preList" :value="item2.id">{{ item2.description }}</Option>
                  </select>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="editprecondition.splice(index, 1)">删除</el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="model1 = false">取 消</el-button>
                    <el-button type="primary" @click="ok1">确 定</el-button>
                  </span>
            </el-dialog>
            <el-dialog
              title="新增/修改签名弹窗"
              :visible.sync="model7"
              width="1300px"
              :before-close="handleClose">
              <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="signtype">
                <el-Option value="code">code</el-Option>
                <el-Option value="md5">md5</el-Option>
                <el-Option value="sha1">sha1</el-Option>
              </el-select>
              <el-button type="primary" size="mini" @click="addsigh()"><i class="el-icon-plus"></i>添加</el-button>
              <el-form :inline="true" v-for="(item,index) in editsign" :key="index">
                <el-form-item style="width: 300px">
                  <el-input style="width: 300px;display: inline" placeholder="参数值" v-model="item.value"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="editsign.splice(index, 1)">删除</el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="model7 = false">取 消</el-button>
                    <el-button type="primary" @click="ok7">确 定</el-button>
                  </span>
            </el-dialog>

            <el-dialog
              title="新增/修改header弹窗"
              :visible.sync="model2"
              width="1000px"
              :before-close="handleClose">
                <el-button type="primary" size="mini" @click="addNewHeader()"><i class="el-icon-plus"></i>添加</el-button>
                <el-form :inline="true" v-for="(item,index) in editheaders" :key="index">
                    <el-form-item style="width: 300px">
                      <el-input style="width: 300px;display: inline" placeholder="参数名" v-model="item.name"></el-input>
                    </el-form-item>
                  <el-form-item style="width: 300px">
                    <el-input style="width: 300px;display: inline" placeholder="参数值" v-model="item.value"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="editheaders.splice(index, 1)">删除</el-button>
                  </el-form-item>
                </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="model2 = false">取 消</el-button>
                    <el-button type="primary" @click="ok2">确 定</el-button>
                  </span>
            </el-dialog>
            <el-dialog
              title="新增/修改断言弹窗"
              :visible.sync="model4"
              width="1300px"
              :before-close="handleClose">
              <el-button type="primary" size="mini" @click="addNewRespect()"><i class="el-icon-plus"></i>添加</el-button>
              <el-form :inline="true" v-for="(item,index) in editexpect" :key="index">
                <el-form-item>
                  <el-input style="display: inline" placeholder="参数名" v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item style="width: 200px">
                  <el-select class="form-control" style="height: 32px" v-model="item.value1">
                    <el-option :label="'int='" value="(int)">int=</el-option>
                    <el-option :label="'int大于'" value="(int>)">int大于</el-option>
                    <el-option :label="'int小于'" value="(int<)">int小于</el-option>
                    <el-option :label="'int大于等于'" value="(int>=)">int大于等于</el-option>
                    <el-option :label="'int小于等于'" value="(int<=)">int小于等于</el-option>
                    <el-option :label="'int!='" value="(int!=)">int!=</el-option>
                    <el-option :label="'intinlist'" value="(intinlist)">intinlist</el-option>
                    <el-option :label="'boolean'" value="(boolean)">boolean</el-option>
                    <el-option :label="'isnull'" value="(isnull)">isnull</el-option>
                    <el-option :label="'isnotnull'" value="(isnotnull)">isnotnull</el-option>
                    <el-option :label="'float='" value="(float)">float=</el-option>
                    <el-option :label="'listlength'" value="(listlength)">listlength</el-option>
                    <el-option :label="'结果完全等于'" value="(==)">结果完全等于</el-option>
                    <el-option :label="'float!='" value="(floatnotequal)">float!=</el-option>
                    <el-option :label="'Stringequal'" value="(Stringequal)">Stringequal</el-option>
                    <el-option :label="'Stringinlist'" value="(Stringinlist)">Stringinlist</el-option>
                    <el-option :label="'Stringendwith'" value="(Stringendwith)">Stringendwith</el-option>
                    <el-option :label="'Stringstartwith'" value="(Stringstartwith)">Stringstartwith</el-option>
                    <el-option :label="'Stringcontains'" value="(Stringcontains)">Stringcontains</el-option>
                    <el-option :label="'Stringnotequal'" value="(Stringnotequal)">Stringnotequal</el-option>
                    <el-option :label="'Stringnotendwith'" value="(Stringnotendwith)">Stringnotendwith</el-option>
                    <el-option :label="'Stringnotstartwith'" value="(Stringnotstartwith)">Stringnotstartwith</el-option>
                    <el-option :label="'Stringnotcontains'" value="(Stringnotcontains)">Stringnotcontains</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width: 200px">
                  <el-input style="width: 300px;display: inline" placeholder="参数值" v-model="item.value"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="editexpect.splice(index, 1)">删除</el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="model4 = false">取 消</el-button>
                <el-button type="primary" @click="ok4">确 定</el-button>
              </span>
            </el-dialog>

            <el-dialog
              title="新增/修改后置处理弹窗"
              :visible.sync="model5"
              width="1300px"
              :before-close="handleClose">
              <el-button type="primary" size="mini" @click="addNewPostPressing()"><i class="el-icon-plus"></i>添加</el-button>
              <el-form :inline="true" v-for="(item,index) in editpostcondition" :key="index">
                <el-form-item>
                  <el-select class="form-control" style="height: 32px" v-model="item.type">
                    <el-option label="处理器" value="1">处理器</el-option>
                    <el-option label="根据返回抓取" value="2">根据返回抓取</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width: 300px" v-if="item.type==1">
                  <el-select class="form-control" style="width: 300px;height: 32px" v-model="item.name">
                    <el-Option :label= item2.description v-for="item2 in preList" :value="item2.id">{{ item2.description }}</el-Option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width: 300px" v-if="item.type==2">
                  <el-input style="width: 300px" placeholder="参数名" v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item style="width: 300px" v-if="item.type==2">
                  <el-input style="width: 300px" placeholder="路径" v-model="item.value"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="editpostcondition.splice(index, 1)">删除</el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="model5 = false">取 消</el-button>
                    <el-button type="primary" @click="ok5">确 定</el-button>
              </span>
            </el-dialog>

            <el-dialog
              title="新增/修改数据库校验弹窗"
              :visible.sync="model6"
              width="1300px"
              :before-close="handleClose">
              <label class="layui-form-label">请选择数据库<b style="color:red">*</b>：</label>
              <el-select class="form-control" style="width:30%;display: inline;height: 37px;border-radius: 3px;" v-model="sqlid">
                <el-Option :label= item.description v-for="item in addressList" :value="item.id">{{ item.description }}</el-Option>
              </el-select>
              <el-button type="primary" size="mini" @click="addNeweditexpect_sql()"><i class="el-icon-plus"></i>添加</el-button>
              <el-form :inline="true" v-for="(item,index) in editexpect_sql" :key="index">
                <el-form-item>
                  <el-input style="width: 300px" placeholder="sql" v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item style="width: 300px">
                  <el-input style="width: 300px" placeholder="预期值" v-model="item.value"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="editexpect_sql.splice(index, 1)">删除</el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="model6 = false">取 消</el-button>
                    <el-button type="primary" @click="ok6">确 定</el-button>
              </span>
            </el-dialog>

            <el-dialog
              title="新增/修改body弹窗"
              :visible.sync="model3"
              width="1300px"
              :before-close="handleClose">
              <div class="c-item">
                <el-select class="form-control" style="height: 32px" v-model="body_type2">
                  <el-option label="参数格式输入" value="0">参数格式输入</el-option>
                  <el-option label="全文输入" value="1">全文输入</el-option>
                </el-select>
              </div>
              <div></div>
              <div class="c-item">
                <el-select class="form-control" style="height: 32px" v-model="body_type" v-if="body_type2==0">
                  <el-option label="非json以&符号连接" value="0">非json以&符号连接</el-option>
                  <el-option label="json格式输入" value="1">json格式输入</el-option>
                  <el-option label="文件格式" value="2">文件格式</el-option>
                </el-select>
              </div>
              <div class="c-item" v-if="body_type2==1">
                <p style="font-size: 14px;  font-weight: 700;">请求body：</p>
                <el-input type="textarea"
                  v-model="editbody2"
                  placeholder="请贴上body" autosize
                />
              </div>
              <div class="c-item" v-else-if="body_type!=2">
                <el-button type="primary" @click="addNewParam()" style="margin-bottom: 30px;"><i class="el-icon-plus"></i>添加</el-button>
                <el-form :inline="true" v-for="(item,index) in editbody" :key="index">
                  <el-form-item style="width: 300px">
                    <el-input style="width: 300px" placeholder="参数名" v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 300px">
                    <el-input style="width: 300px" placeholder="参数值" v-model="item.value"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="editbody.splice(index, 1)">删除</el-button>
                  </el-form-item>
                </el-form>
              </div>

              <div class="c-item" v-else>
                <el-button type="primary" size="mini" @click="addNewParam()"><i class="el-icon-plus"></i>添加</el-button>
                <el-form :inline="true" v-for="(item,index) in editbody" :key="index">
                  <el-form-item style="width: 300px">
                    <el-input style="width: 300px" placeholder="参数名" v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 400px">
                    <el-upload
                      class="upload-demo"
                      :action="uploadAction"
                      :on-remove="handleRemove"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click="downfile(filename)">下载</el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="editbody.splice(index, 1)">删除</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="model3 = false">取 消</el-button>
                <el-button type="primary" @click="ok3">确 定</el-button>
              </span>
            </el-dialog>


            <el-dialog
              title="新增/修改httppost请求尾部弹窗"
              :visible.sync="model8"
              width="1300px"
              :before-close="handleClose">
              <div class="c-item">
                <el-select class="form-control" style="height: 32px" v-model="edithttpendtype" @change="onchangehttpendtype">
                  <el-option label="参数格式输入" value="0">参数格式输入</el-option>
                  <el-option label="全文输入" value="1">全文输入</el-option>
                </el-select>
              </div>
              <div></div>

              <div class="c-item" v-if="edithttpendtype==1">
                <p style="font-size: 14px;  font-weight: 700;">httppost请求尾部：</p>
                <el-input type="textarea"
                  v-model="edithttpend"
                  placeholder="请输入"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </div>
              <div class="c-item" v-else>
                <p style="font-size: 14px;  font-weight: 700;">httppost请求尾部：</p>
                <el-button type="primary" size="mini" @click="addedithttpend2()"><i class="el-icon-plus"></i>添加</el-button>
                <el-form :inline="true" v-for="(item,index) in edithttpend2" :key="index">
                  <el-form-item style="width: 300px">
                    <el-input style="width: 300px" placeholder="参数名" v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 300px">
                    <el-input style="width: 300px" placeholder="参数值" v-model="item.value"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="edithttpend2.splice(index, 1)">删除</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="model8 = false">取 消</el-button>
                <el-button type="primary" @click="ok8">确 定</el-button>
              </span>
            </el-dialog>
            <el-table :data="data2">
              <el-table-column property="des" label="描述"></el-table-column>
              <el-table-column property="value" label="value"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="etid(scope.row.des)" type="text">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div>
          </div>
          <div style="text-align:center;margin-top: 60px;position: sticky;bottom:0;width:90%;padding-bottom: 15px">
            <el-button type="primary" @click="addCase()"><i class="el-icon-plus"></i>添加</el-button>
            <el-button v-if="case_id!='-1'" type="success" @click="updateCase()"><i class="el-icon-refresh"></i>更新</el-button>
            <el-button type="warning"  @click="executeDebugCase()"><i class="el-icon-caret-right"></i>调试</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <p style="font-size: 14px;font-weight: 700;padding-top: 10px">返回：</p>
            <div>
              <el-input  autosize type="textarea" class="span12"
                         style="border:1px solid; font-size:13px;overflow:scroll;"
                         v-html="Responsebody">
              </el-input>
            </div>
            <h3 class="interface-title" style="margin-top: 1rem;margin-bottom: 1.5rem">请求</h3>
            <p style="font-size: 14px;  font-weight: 700;">请求Url：</p>
            <div class="el-textarea">
              <el-input autosize type="textarea" class="span12"
                        style="border:1px solid;font-size:13px" contenteditable="true" v-html="fullurl">
              </el-input>
            </div>
            <p style="font-size: 14px;font-weight: 700;padding-top: 10px">Headers：</p>
            <el-input autosize type="textarea"
                      style="border:1px solid;font-size:13px" contenteditable="true"
                      v-html="caseExecuteDebugList.header">
            </el-input>
            <p style="font-size: 14px;font-weight: 700;padding-top: 10px">body：</p>
            <el-input autosize type="textarea"
                      style="border:1px solid;font-size:13px" contenteditable="true"
                      v-html="caseExecuteDebugList.body">

            </el-input>
            <p style="font-size: 14px;font-weight: 700;padding-top: 10px">后置处理：</p>
            <el-input autosize type="textarea"
                      style="border:1px solid;font-size:13px" contenteditable="true" v-html="postcondition">
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Qs from 'qs'
import ElementUI from "element-ui";
function isIntNum(val) {

  if(val.charAt(0)=='0'&&val.length>=2&&val.charAt(1)!='.')
    return false
  var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true
  } else {
    return false
  }
}
export default {
  data() {
    return {
      isxiugai: false,
      label: '',
      data2: [],
      item: 1,
      type: 'add',
      deep: 2,
      caseExecuteDebugList: {
        status: '',
        body: '',
        header: '',
        result: '',
        json: {},
        url: '',
        secretKey: '',
        cookies: '',
        postProcessing: ''
      },
      id: '',
      url: '',
      description: '',
      host: '',
      fenzhi: '',
      addressList:[],
      preList:[],
      body: [],
      body2: '1',
      editheaders2:'',
      editbody: [],
      editbody2: '',
      filename:'选择文件',
      fileList: [],
      edithttpendtype:'1',
      edithttpend:'',
      edithttpend2:[],
      header_type:'0',
      httpend:'',
      body_type2: '1',
      body_type: '1',
      fullurl: '1',
      method: '',
      expectResult: [{ type: 'equalTo', key: '', value: '' }],
      expect: [],
      editexpect: [],
      project_id: '',
      Interface_id: '',
      case_id: '',
      parameters: [],
      publicParameters: [],
      editheaders: [],
      headers: [],
      precondition: [],
      editprecondition: [],
      expect_sql: [],
      editexpect_sql: [],
      sqlid: '',
      select1: [],
      select2: [],
      model1: false,
      model2: false,
      model3: false,
      model4: false,
      model5: false,
      model6: false,
      model7: false,
      model8: false,
      signtype:'',
      editsign:[],
      sign:[],
      editpostcondition: [],
      postcondition: [],
      Responsebody: '',
      uploadAction:''
    }
  },
  methods: {
    xiugai2(){
      this.isxiugai=true
    },
    xiugai3(value){
      if(value==-1)
        this.$router.push({
          path: '/LabelManager?project_id=' + this.project_id
        })
      else
        this.isxiugai=true
    },
    // 添加参数
    addNewParam() {
      if (this.editbody == null) {
        this.editbody = []
      }
      this.editbody.push({
        name: '',
        must: true,
        remark: '',
        type: 'string',
        value: ''
      })
    },
    // 添加header
    addNewHeader() {
      if (this.editheaders == null) {
        this.editheaders = []
      }
      this.editheaders.push({
        name: '',
        value: ''
      })
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    addNeweditexpect_sql() {
      if (this.editexpect_sql == null) {
        this.editexpect_sql = []
      }
      this.editexpect_sql.push({
        name: '',
        value: ''
      })
    },
    // 添加预期结果
    addNewRespect() {
      if (this.editexpect == null) {
        this.editexpect = []
      }
      this.editexpect.push({
        type: 'equalTo',
        key: '',
        value1: '',
        value2: ''
      })
    },
    addedithttpend2() {
      if (this.edithttpend2 == null) {
        this.edithttpend2 = []
      }
      this.edithttpend2.push({
        name: '',
        value: ''
      })
    },
    search(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) > -1
    },
    Stringtolist(url) {
      let arr = [] // 存储参数的数组
      let res = [] // 存储最终JSON结果对象
      arr = url.split('&') // arr=["a=1", "b=2", "c=test", "d"]

      for (let i = 0, len = arr.length; i < len; i++) {
        // 如果有等号，则执行赋值操作
        if (arr[i].indexOf('=') != -1&&arr[i].length>=3&&arr[i].charAt(0)!='='&&arr[i].charAt(arr[i].length-1)!='=') {
          let str = arr[i].split('=')
          res.push({
            name: str[0],
            value: str[1]
          })
        }
      }
      return res
    },
    Stringtojson(url) {
      let arr = [] // 存储参数的数组
      let res = {} // 存储最终JSON结果对象
      arr = url.split('&') // arr=["a=1", "b=2", "c=test", "d"]

      for (let i = 0, len = arr.length; i < len; i++) {
        // 如果有等号，则执行赋值操作
        if (arr[i].indexOf('=') != -1) {
          let str = arr[i].split('=')
          // str=[a,1];
          res[str[0]] = str[1]
        } else { // 没有等号，则赋予空值
          res[arr[i]] = ''
        }
      }
      res = JSON.stringify(res)// 转化为JSON字符串
      return res
    },
    onchangg1() {
      if (this.body_type2 == 1) {
        // a=1&b=2转为json
        if (this.body_type == 1) {
          this.editbody2 = this.Stringtojson(this.editbody2)
        } else {
          var x = ''
          var jsonObj = (eval('(' + this.editbody2 + ')'))
          for (var key in jsonObj)
          { x = x + key + '=' + jsonObj[key] + '&' }
          this.editbody2 = x.substring(0, x.length - 1)
        }
      }
    },
    onchangehttpendtype(){
      if(this.edithttpendtype==0)
        this.edithttpend2=this.Stringtolist(this.edithttpend)
      if(this.edithttpendtype==1)
        this.edithttpend=this.listToString(this.edithttpend2)
    },
    customRequest (data) {
      debugger
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('id', this.case_id)
      this.saveFile(formData)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    saveFile (formData) {
      this.axios(
          {
            method: 'post',
            url: 'https://localhost:8080/yahelei/case/add',
            data: formData
          })
          .then((response) => {
            this.filename=response.data.message
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    downfile(a){
      debugger
      window.open(hostlocalfile+'/jeecg-boot/yahelei/case/downloadRisk?' +
          'fileurl='+this.filename)
    },
    onchangg2() {
      if (this.body_type2 == 1) {
        // 把editbody复制到editbody2
        if (this.body_type == 0) {
          var x = ''
          for (let i = 0, len = this.editbody.length; i < len; i++) {
            if (this.editbody[i].name.length > 0) { x = x + this.editbody[i].name + '=' + this.editbody[i].value + '&' }
          }
          this.editbody2 = x.substring(0, x.length - 1)
        } else { this.editbody2 = this.listToJsonNew(this.editbody) }
      } else {
        this.editbody.splice(0, this.editbody.length)
        // 把editbody2复制到editbody
        if (this.body_type == 1) {
          var jsonObj = (eval('(' + this.editbody2 + ')'))
          for (var key in jsonObj)
              // var jsonObj = eval("("+this.editbody2+")");
          {
            this.editbody.push({
              name: key,
              value: (typeof jsonObj[key] === 'string') ? jsonObj[key].replace(/\"/g, '\\"') : JSON.stringify(jsonObj[key]).replace(/\"/g, '\\"')
            })
          }
        } else {
          var list3 = this.editbody2.split('&')
          for (let i = 0, len = list3.length; i < len; i++) {
            var x = list3[i]
            this.editbody.push({
              name: x.split('=')[0],
              value: x.split('=')[1]
            })
          }
        }
      }
    },
    // 添加前置处理
    addNewPrePressing() {
      if (this.editprecondition == null) {
        this.editprecondition = []
      }
      // this.editprecondition.push({ name: '', value: '' })
      this.editprecondition.push({value: '' })
    },
    addsigh() {
      if (this.editsign == null) {
        this.editsign = []
      }
      this.editsign.push({value: '' })
    },
    // 添加后置处理
    addNewPostPressing() {
      if (this.editpostcondition == null) {
        this.editpostcondition = []
      }
      this.editpostcondition.push({
        type: '',
        name: '',
        value: ''
      })
    },
    // list转json
    listToJson(params) {
      var param_str = ''
      if (params == '' || params == null) {
        params = []
      }
      for (var i = 0; i < params.length; i++) {
        // 循环LIST
        if (i == params.length - 1) {
          param_str += '"' + params[i].name + '":"' + params[i].value + '"'
        } else {
          param_str += '"' + params[i].name + '":"' + params[i].value + '",'
        }
      }
      if (param_str != '') {
        param_str = '{' + param_str + '}'
      }
      return param_str
    },
    listToString(params) {
      var param_str = ''
      var obj = {}
      if ( params == null||params=='[]'||params.length==0) {
        return param_str
      }
      var x = params[0].name + '=' + params[0].value
      for (var i = 1; i < params.length; i++) {
        var params_key = params[i].name
        var params_value = params[i].value
        x = x + '&' + params_key + '=' + params_value
      }
      return x
    },
    // list转json  单key获取的时候使用
    listToJsonNewsingle(params) {
      var obj = []
      if (params == '' || params == null) {
        params = []
      }
      for (var i = 0; i < params.length; i++) {
        if (isIntNum(params[i].value))
          obj.push(parseInt(params[i].value))
        else
          obj.push(params[i].value)
      }
      var x = JSON.stringify(obj)
      return x
    },
    // list转json  单key获取的时候使用
    listToJsonNewsingle2(params) {
      var obj = []
      if (params == '' || params == null) {
        params = []
      }
      for (var i = 0; i < params.length; i++) {
        obj.push(params[i].value)
      }
      var x = JSON.stringify(obj)
      return x
    },
    // list转json  获取的时候使用
    listToJsonNew(params) {
      var param_str = ''
      var obj = {}
      if (params == '' || params == null) {
        params = []
      }
      for (var i = 0; i < params.length; i++) {
        if (params[i].name.length > 0) {
          var params_value
          if (isIntNum(params[i].value)) {
            var params_value = parseInt(params[i].value)
          } else {
            var params_value = params[i].value
          }
          var params_name = params[i].name
          obj[params_name] = params_value
        }
      }
      var x = JSON.stringify(obj)
      return x
    },
    // head中一点均是字符串，不支持其他格式，特殊处理转json
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
    // 将json的key的value赋值给list的值
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

    // list中只保留name，must，value值
    listToJsonDelete(params) {
      var param_str = JSON.parse(JSON.stringify(params))
      if (param_str == '' || param_str == null) {
        param_str = []
      }
      for (var i = 0; i < param_str.length; i++) {
        // 循环LIST
        delete param_str[i].remark
        delete param_str[i].type
      }
      return param_str
    },
    Delete(param_str) {
      for (var i = 0; i < param_str.length; i++) {
        // 循环LIST
        delete param_str[i].name
        delete param_str[i].value
      }
      return param_str
    },
    onchangehead(){
      if(this.header_type==0)//自全文切换为不是全文
      {
        this.editheaders.splice(0, this.editheaders.length)
        var x = this.editheaders2
        while (x.indexOf("'") >= 0) {
          x=x.substring(x.indexOf("'")+1, x.length)
          var y = x.substring(0, x.indexOf("'"))
          var y1=y.charAt(y.length-1)
          var y2=y.charAt(0)
          if(y.length>=3&&y.charAt(0)!=':'&&y.charAt(y.length-1)!=':'&&y.indexOf(":")!=-1){
            this.editheaders.push({
              name: y.substring(0, y.indexOf(":")),
              value: y.substring(y.indexOf(":")+1,y.length)
            })
          }
          x=x.substring(x.indexOf("'")+1,x.length)
        }
      }
      else//自不是全文切换为是全文
      {
        this.editheaders2="";
        for(var i=0;i<this.editheaders.length;i++)
          this.editheaders2=this.editheaders2+"'"+this.editheaders[i].name+":"+this.editheaders[i].value+"'\n"
      }
    },
    commonRequestThen3(promise){
      promise.then(res => {
        this.preList = res.data.result
        this.model1 = true
        this.editprecondition.splice(0, this.editprecondition.length)
        for (var i = 0; i < this.precondition.length; i++) {
          this.editprecondition.push({
            value: this.precondition[i].value
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
    etid(x) {
      if (x == '前置处理器') {
        this.commonRequestThen3(
          this.axios.get("/yahelei/precondition/list", {
              params: {}
            }
            )
        )
      }
      else if (x == '签名') {
        this.model7 = true
        this.editsign.splice(0, this.editsign.length)
        for (var i = 0; i < this.sign.length; i++) {
          this.editsign.push({
            value: this.sign[i].value
          })
        }
      }
      else if (x == '请求header') {
        this.header_type='0'
        this.model2 = true
        this.editheaders2="";
        this.editheaders.splice(0, this.editheaders.length)
        for (var i = 0; i < this.headers.length; i++) {
          this.editheaders2=this.editheaders2+"'"+this.headers[i].name+":"+this.headers[i].value+"'\n"
          this.editheaders.push({
            name: this.headers[i].name,
            value: this.headers[i].value
          })
        }
      }
      else if (x == '请求url后续部分') {
        this.model8 = true
        this.edithttpend2=[];
        this.edithttpendtype='1';
        this.edithttpend=this.httpend
      }
      else if (x == '请求body') {
        this.model3 = true
        this.editbody2 = this.body2
        this.editbody.splice(0, this.editbody.length)
        if(this.body_type==2) {
          this.editbody.push({
            name: this.body[0].name,
            value: this.body[0].value
          })
          this.filename=this.body[0].value;
        }
        else {
          for (var i = 0; i < this.body.length; i++) {
            this.editbody.push({
              name: this.body[i].name,
              value: this.body[i].value
            })
          }
        }
      } else if (x == '期望返回') {
        this.model4 = true
        this.editexpect.splice(0, this.editexpect.length)
        for (var i = 0; i < this.expect.length; i++) {
          var name1=this.expect[i].name;
          var value1=this.expect[i].value;
          this.editexpect.push({
            name: name1,
            value1: value1.substring(0,value1.indexOf(")")+1),
            value: value1.substring(value1.indexOf(")")+1)
          })
        }
      } else if (x == '后置处理器') {
          this.axios.get("/yahelei/precondition/list", {
              params: {}
            }
          ).then(res => {
          this.preList = res.data.result
          this.model5 = true
          this.editpostcondition.splice(0, this.editpostcondition.length)
          for (var i = 0; i < this.postcondition.length; i++) {
            var name1 = this.postcondition[i].name;
            var u = name1.substring(1, name1.indexOf(")"))
            var y = name1.substring(name1.indexOf(")") + 1)
            this.editpostcondition.push({
              type: u,
              name: y,
              value: this.postcondition[i].value
            })
          }
        }).finally(() => {
          this.loading = false
          this.cardLoading = false
        })
      }
      else if (x == '数据库校验') {
        this.commonRequestThen2(
          this.axios.get("/yahelei/address/list", {
            params: {
              type: "sql",
              url: "",
              description: ""
            }
          }
          )
        )
      }
    },
    commonRequestThen2(promise){
      promise.then(res => {
        this.model6 = true
        this.addressList = res.data.result
        this.editexpect_sql.splice(0, this.editexpect_sql.length)
        for (var i = 0; i < this.expect_sql.length; i++) {
          this.editexpect_sql.push({
            name: this.expect_sql[i].name,
            value: this.expect_sql[i].value
          })
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    ok7() {
      this.sign.splice(0, this.sign.length)
      for (var i = 0; i < this.editsign.length; i++) {
        this.sign.push({
          value: this.editsign[i].value
        })
      }
      this.data2[6].value = this.listToJsonNewsingle2(this.sign)
      this.model7 = false
      this.isxiugai=true
    },
    ok1() {
      this.precondition.splice(0, this.precondition.length)
      for (var i = 0; i < this.editprecondition.length; i++) {
        this.precondition.push({
          // name: this.editprecondition[i].name,
          value: this.editprecondition[i].value
        })
      }
      this.data2[0].value = this.listToJsonNewsingle(this.precondition)
      this.model1 = false
      this.isxiugai=true
    },
    ok2() {
      this.headers.splice(0, this.headers.length)
      if(this.header_type==1) {
        this.editheaders.splice(0, this.editheaders.length)
        var x = this.editheaders2
        while (x.indexOf("'") >= 0) {
          x=x.substring(x.indexOf("'")+1, x.length)
          var y = x.substring(0, x.indexOf("'"))
          if(y.length>=3&&y.charAt(0)!=':'&&y.charAt(y.length-1)!=':'&&y.indexOf(":")!=-1){
            this.editheaders.push({
              name: y.substring(0, y.indexOf(":")),
              value: y.substring(y.indexOf(":")+1,y.length)
            })
          }
          x=x.substring(x.indexOf("'")+1,x.length)
        }
      }
      for (var i = 0; i < this.editheaders.length; i++) {
        this.headers.push({
          name: this.editheaders[i].name,
          value: this.editheaders[i].value
        })
      }
      this.data2[1].value = this.listToJsonNew2(this.headers)
      this.model2 = false
      this.isxiugai=true
    },
    ok6() {
      this.expect_sql.splice(0, this.expect_sql.length)
      for (var i = 0; i < this.editexpect_sql.length; i++) {
        this.expect_sql.push({
          name: this.editexpect_sql[i].name,
          value: this.editexpect_sql[i].value
        })
      }
      this.data2[4].value = this.listToJsonNew(this.expect_sql)
      this.model6 = false
      this.isxiugai=true
    },
    ok8() {
      if(this.edithttpendtype==0)
      {
        this.edithttpend=this.listToString(this.edithttpend2)
      }
      this.httpend=this.edithttpend
      this.data2[7].value = this.httpend
      this.model8 = false
      this.isxiugai=true
    },
    ok5() {
      this.postcondition.splice(0, this.postcondition.length)
      for (var i = 0; i < this.editpostcondition.length; i++) {
        this.postcondition.push({
          name: '('+this.editpostcondition[i].type+')'+this.editpostcondition[i].name,
          value: this.editpostcondition[i].value
        })
      }
      var u=this.listToJsonNew(this.postcondition)
      this.data2[5].value = u
      this.model5 = false
      this.isxiugai=true
    },
    ok3() {
      this.body2=this.editbody2
      if(this.body_type==2){
        this.body.splice(0, this.body.length)
        this.body.push({
          name: this.editbody[0].name,
          value:this.filename
        })
        this.data2[2].value=this.listToJsonNew(this.body)
        this.model3 = false
      }
      else {
        this.body.splice(0, this.body.length)
        for (var i = 0; i < this.editbody.length; i++) {
          this.body.push({
            name: this.editbody[i].name,
            value: this.editbody[i].value
          })
        }
        if (this.body_type2 == 0) {
          this.data2[2].value = this.listToJsonNew(this.editbody)
        } else
          this.data2[2].value = this.body2;
        this.model3 = false
        this.isxiugai=true
      }
    },
    ok4() {
      this.expect.splice(0, this.expect.length)
      for (var i = 0; i < this.editexpect.length; i++) {
        this.expect.push({
          name: this.editexpect[i].name,
          value: this.editexpect[i].value1+this.editexpect[i].value
        })
      }
      this.data2[3].value = this.listToJsonNew(this.expect)
      this.model4 = false
      this.isxiugai=true
    },
    updateCase() {
        this.updatecasethen(
          this.axios.post("/yahelei/case/updateoraddcase",Qs.stringify({
                  httpend: this.httpend,
                  Interface_id: this.Interface_id,
                  case_id: this.case_id,
                  project_id: this.project_id,
                  description: this.description,
                  header: this.listToJsonNew2(this.headers),
                  url: this.url,
                  body: this.listToJsonNew(this.body),
                  sqlid: this.sqlid,
                  labellist: this.select1.toString(),
                  expect_sql: this.listToJsonNew(this.expect_sql),
                  body_type: this.body_type,
                  body2: this.body2,
                  body_type2: this.body_type2,
                  expect: this.listToJsonNew(this.expect),
                  postcondition: this.listToJsonNew(this.postcondition),
                  precondition: this.listToJsonNewsingle(this.precondition),
                  signtype: this.signtype,
                  sign:this.listToJsonNewsingle2(this.sign),
                })
            )
        )
    },
    addCase() {
        localStorage.setItem("casedetailid",-2)
        this.case_id = -1
        this.addcasethen(
          this.axios.post("/yahelei/case/updateoraddcase",Qs.stringify({
                  httpend: this.httpend,
                  Interface_id: this.Interface_id,
                  case_id: this.case_id,
                  project_id: this.$route.query.project_id,
                  description: this.description,
                  header: this.listToJsonNew2(this.headers),
                  sqlid: this.sqlid,
                  labellist: this.select1.toString(),
                  expect_sql: this.listToJsonNew(this.expect_sql),
                  url: this.url,
                  body_type2: this.body_type2,
                  body: this.listToJsonNew(this.body),
                  body2: this.body2,
                  body_type: this.body_type,
                  expect: this.listToJsonNew(this.expect),
                  postcondition: this.listToJsonNew(this.postcondition),
                  precondition: this.listToJsonNewsingle(this.precondition),
                  signtype: this.signtype,
                  sign:this.listToJsonNewsingle2(this.sign),
                })
            )
        )
    },
    updatecasethen(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info("修改成功")
          this.isxiugai=false
        } else {
          ElementUI.Message.error(res.data.message)
        }
      })
    },
    addcasethen(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info("新增成功")
          history.pushState("","接口详情","#/Casedetail?caseid="+res.data.result+"&Interface_id="+
              this.Interface_id+"&project_id="+this.$route.query.project_id);
          this.case_id = res.data.result
          this.isxiugai=false
        } else {
          ElementUI.Message.error(res.data.message)
        }
      })
    },
    // 用例调试
    executeDebugCase() {
      this.casedebugthen(
      this.axios.post("/yahelei/case/executedebug",
        Qs.stringify({
                http: this.http,
                host: this.host,
                project_id : this.$route.query.project_id,
                httpend: this.httpend,
                header: this.listToJsonNew2(this.headers),
                url: this.url,
                body2: this.body2==null?"":this.body2,
                body: this.listToJsonNew(this.body),
                body_type: this.body_type,
                body_type2: this.body_type2,
                expect: this.listToJsonNew(this.expect),
                postcondition: this.listToJsonNew(this.postcondition),
                precondition: this.listToJsonNewsingle(this.precondition),
                method: this.method,
                signtype: this.signtype,
                sign: this.listToJsonNewsingle2(this.sign),
                sqlid: this.sqlid,
                expect_sql: this.listToJsonNew(this.expect_sql)
              })
          )
      )
    },
    casedebugthen(promise) {
      promise.then(res => {
        if (res.data.success) {
          ElementUI.Message.info("执行完成")
          this.caseExecuteDebugList.body = res.data.result.body
          this.caseExecuteDebugList.header = res.data.result.header
          this.fullurl = res.data.result.url
          this.Responsebody = (res.data.result.result) + ('         ' + res.data.result.responseResult)
          this.caseExecuteDebugList.header = res.result.data.header
        } else {
          ElementUI.Message.info("执行失败")
        }
      })
    },
    commonRequestThen(promise) {
      this.loading = true
      promise.then(res => {
        if (res.data.success) {
          this.loading = false
          this.http = res.data.result.http
          this.url = res.data.result.url
          this.host = res.data.result.host
          this.fenzhi = (this.$route.query.caseid == -1) ? 'master' :res.data.result.fenzhi
          this.body_type = (this.$route.query.caseid == -1) ? '0' :res.data.result.body_type
          this.body_type2 = (this.$route.query.caseid == -1) ? '1' :res.data.result.body_type2
          this.expect_sql = this.jsonToListTo(res.data.result.expect_sql)
          this.sqlid = res.data.result.sqlid
          this.Interface_id = res.data.result.interface_id
          this.filename="选择文件"
          this.method = res.data.result.method
          this.select1 = (res.data.result.labellist==null||res.data.result.labellist.length==0)?[]
            :res.data.result.labellist.split(',').map(Number)
          this.select2 = res.data.result.x
          var x=this.select1
          var y=this.select2
          this.data2.splice(0, this.data2.length)
          this.data2.push({ key: '1', 'des': '前置处理器', 'value': (this.$route.query.caseid == -1) ? '[]' : res.data.result.precondition })
          this.data2.push({ key: '2', 'des': '请求header', 'value': (this.$route.query.caseid == -1) ? '{}' : res.data.result.header })
          if (this.body_type2 == 0) {
            this.data2.push({ key: '3', 'des': '请求body', 'value': (this.$route.query.caseid == -1) ? '{}' : res.data.result.body })
          }
          else
            this.data2.push({ key: '3', 'des': '请求body', 'value': (this.$route.query.caseid == -1) ? '{}' : res.data.result.body2 })
          this.data2.push({ key: '4', 'des': '期望返回', 'value': (this.$route.query.caseid == -1) ? '{}' : res.data.result.expect })
          this.data2.push({ key: '5', 'des': '数据库校验', 'value': (this.$route.query.caseid == -1) ? '{}' : res.data.result.expect_sql })
          this.data2.push({ key: '6', 'des': '后置处理器', 'value': (this.$route.query.caseid == -1) ? '{}' : res.data.result.postcondition })
          this.data2.push({ key: '7', 'des': '签名', 'value': (this.$route.query.caseid == -1) ? '[]' : res.data.result.sign })
          if(this.method=="POST")
            this.data2.push({ key: '8', 'des': '请求url后续部分', 'value': (this.$route.query.caseid == -1) ? '' : res.data.result.httpend })
          this.expect = this.jsonToListTo(res.data.result.expect)
          this.body = this.jsonToListTo(res.data.result.body)
          this.body2 = res.data.result.body2
          this.httpend = res.data.result.httpend
          this.signtype = res.data.result.signtype
          this.sign = this.jsonToListTo(res.data.result.sign)
          this.headers = this.jsonToListTo(res.data.result.header)
          this.precondition = this.jsonToListTo(res.data.result.precondition)
          this.postcondition = this.jsonToListTo(res.data.result.postcondition)
          this.project_id = res.data.result.project_id
          this.id = res.data.result.id
          this.description = res.data.result.description
          this.fullurl = this.http + '://' + this.host + this.url + '      ' + this.method
          ElementUI.Message.info('查询成功')
        } else {
          // this.$message.warn(res.message)
          ElementUI.Message.info('查询失败')
          // console.error('查询失败:', res)
        }
      }).finally(() => {
        this.loading = false
        this.cardLoading = false
      })
    },
    geturl() {
      return this.http + '://' + this.host + this.url + '      ' + this.method
    },
    initcase() {
      this.isxiugai=false
      this.project_id = this.$route.query.project_id,
        this.Interface_id = this.$route.query.Interface_id,
        this.case_id = this.$route.query.caseid,
      this.uploadAction="http://localhost:8080/yahelei/case/add?id=" + this.case_id
      var c=localStorage.getItem("casedetailid")
      var d=localStorage.getItem("casedetailselect1")
      if(c==this.case_id&&c==-1&&localStorage.getItem("casedetailInterface_id")==this.Interface_id)
      {
        this.axios.get("/yahelei/case/getdetailbyid",{
          params: {
            project_id: this.project_id,
            Interface_id: this.Interface_id,
            caseid: this.$route.query.caseid
          }
            }
        ).then(res => {
          this.http = localStorage.getItem("casedetailhttp")
          this.url = localStorage.getItem("casedetailurl")
          this.host = localStorage.getItem("casedetailhost")
          this.fenzhi = localStorage.getItem("casedetailfenzhi")
          this.body_type = localStorage.getItem("casedetailbody_type")
          this.body_type2 = localStorage.getItem("casedetailbody_type2")
          this.expect_sql = this.jsonToListTo(localStorage.getItem("casedetailexpect_sql"))
          this.sqlid = localStorage.getItem("casedetailsqlid")
          this.Interface_id = localStorage.getItem("casedetailInterface_id")
          this.filename = localStorage.getItem("casedetailfilename")
          this.method = localStorage.getItem("casedetailmethod")
          this.select1 = (d == null || d.length == 0) ? [] : d.split(',').map(Number)
          this.select2 = res.data.result.x
          this.data2.splice(0, this.data2.length)
          this.data2.push({ key: '1', 'des': '前置处理器', 'value': localStorage.getItem("casedetaildata21") })
          this.data2.push({ key: '2', 'des': '请求header', 'value': localStorage.getItem("casedetaildata22") })
          this.data2.push({ key: '3', 'des': '请求body', 'value': localStorage.getItem("casedetaildata23") })
          this.data2.push({ key: '4', 'des': '期望返回', 'value': localStorage.getItem("casedetaildata24") })
          this.data2.push({ key: '5', 'des': '数据库校验', 'value': localStorage.getItem("casedetaildata25") })
          this.data2.push({ key: '6', 'des': '后置处理器', 'value': localStorage.getItem("casedetaildata26") })
          this.data2.push({ key: '7', 'des': '签名', 'value': localStorage.getItem("casedetaildata27") })
          if (this.method == "POST")
            this.data2.push({ key: '8', 'des': '请求url后续部分', 'value': localStorage.getItem("casedetaildata28") })
          this.expect = this.jsonToListTo(localStorage.getItem("casedetailexpect"))
          this.body = this.jsonToListTo(localStorage.getItem("casedetailbody"))
          this.body2 = localStorage.getItem("casedetailbody2")
          this.httpend = localStorage.getItem("casedetailhttpend")
          this.signtype = localStorage.getItem("casedetailsigntype")
          this.sign = this.jsonToListTo(localStorage.getItem("casedetailsign"))
          this.headers = this.jsonToListTo(localStorage.getItem("casedetailheaders"))
          this.precondition = this.jsonToListTo(localStorage.getItem("casedetailprecondition"))
          this.postcondition = this.jsonToListTo(localStorage.getItem("casedetailpostcondition"))
          this.fullurl = localStorage.getItem("casedetailfullurl")
          this.description = localStorage.getItem("casedetaildescription")
        })
      }
      else {
        this.commonRequestThen(
          this.axios.get("/yahelei/case/getdetailbyid", {
              params:
                {
                  project_id: this.project_id,
                  Interface_id: this.Interface_id,
                  caseid: this.$route.query.caseid
                }
            }
          )
        )
      }
    },
    savecanshu() {
      // localStorage.setItem("casedetailproject_id",this.project_id)
      localStorage.setItem("casedetailInterface_id",this.Interface_id)
      localStorage.setItem("casedetailid",this.case_id)
      localStorage.setItem("casedetailhttp",this.http)
      localStorage.setItem("casedetailurl",this.url)
      localStorage.setItem("casedetailhost",this.host)
      localStorage.setItem("casedetailfenzhi",this.fenzhi)
      localStorage.setItem("casedetailbody_type",this.body_type)
      localStorage.setItem("casedetailbody_type2",this.body_type2)
      localStorage.setItem("casedetailexpect_sql",this.listToJsonNew(this.expect_sql))
      localStorage.setItem("casedetailsqlid",this.sqlid)
      localStorage.setItem("casedetailInterface_id",this.Interface_id)
      localStorage.setItem("casedetailfilename",this.filename)
      localStorage.setItem("casedetailmethod",this.method)
      localStorage.setItem("casedetailselect1",this.select1.toString())
      localStorage.setItem("casedetailselect2",this.select2.toString())
      localStorage.setItem("casedetaildata2",this.data2)
      localStorage.setItem("casedetailexpect",this.listToJsonNew(this.expect))
      localStorage.setItem("casedetailbody",this.listToJsonNew(this.body))
      localStorage.setItem("casedetailbody2",this.body2)
      localStorage.setItem("casedetaildata21",this.data2[0].value)
      localStorage.setItem("casedetaildata22",this.data2[1].value)
      localStorage.setItem("casedetaildata23",this.data2[2].value)
      localStorage.setItem("casedetaildata24",this.data2[3].value)
      localStorage.setItem("casedetaildata25",this.data2[4].value)
      localStorage.setItem("casedetaildata26",this.data2[5].value)
      localStorage.setItem("casedetaildata27",this.data2[6].value)
      if(this.method=="POST")
        localStorage.setItem("casedetaildata28",this.data2[7].value)
      localStorage.setItem("casedetailhttpend",this.httpend)
      localStorage.setItem("casedetailsigntype",this.signtype)
      localStorage.setItem("casedetailsign",this.listToJsonNewsingle2(this.sign))
      localStorage.setItem("casedetailheaders",this.listToJsonNew2(this.headers))
      localStorage.setItem("casedetailprecondition",this.listToJsonNewsingle(this.precondition))
      localStorage.setItem("casedetailpostcondition",this.listToJsonNew(this.postcondition))
      localStorage.setItem("casedetailfullurl",this.fullurl)
      localStorage.setItem("casedetaildescription",this.description)
    }
  },
  // mounted() {
  //   this.initcase()
  //   this.loading = false
  // },
  beforeDestroy () {
    if(this.case_id==-1){
      this.savecanshu()
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val, oldval) {
        if (oldval==null||
          (val.name.length != 0 && oldval.name.length != 0 && oldval.name == val.name && val.query.caseid != oldval.query.caseid) ||
          (val.name == 'Casedetail' && oldval.name != 'Casedetail')) {
          this.initcase()
        }
      }
    }
  }
}
</script>
<style>
.c-item {
  margin: 30px 0;
}
</style>
