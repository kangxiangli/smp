
<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
          <el-button
              size="small"
              type="success"
              v-show="addLevel"
              @click="reMember">{{$t("title.13")}} 
            </el-button>
            <el-button
              size="small"
              type="danger"
              v-show="deRevel"
              @click="delMember()">{{$t("title.14")}}
            </el-button>
        </el-col>
        <!--<el-col :span="12">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('table.12')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>-->
      </el-row>
    </h3>
 <div slot="body">
	<el-table :data="tableData.rows" border :stripe="true" ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
		<el-table-column prop="id" type="selection" width="45">
		</el-table-column>
		<el-table-column prop="fid" :label="$t('table.1')">
		</el-table-column>
		<el-table-column prop="flevel" :label="$t('table.2')">
		</el-table-column>
		<el-table-column :label="$t('table.3')">
			<template scope="scope">
				 <el-tooltip class="item" effect="light" :content='$t("buttonMember.reviseMember")' placement="top-end">
					<el-button size="small" type="info" v-show="openAd" @click="openAdd(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
				</el-button>
                  </el-tooltip>
				<!--<el-button size="small" type="info" v-show="openAd" @click="openAdd(scope.$index, scope.row)">{{$t("buttonMember.reviseMember")}}
				</el-button>-->
			</template>
			
		</el-table-column>
	</el-table>
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
	</el-pagination>
	<el-dialog :title="$t('title.15')" :visible.sync="dialogFormVisible" size="small">
		<add-member ref="form"></add-member>
		<span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t("table.9")}}</el-button>
          <el-button type="primary" @click="addMember">{{$t("table.8")}}</el-button>
          </span>
	</el-dialog>
</div>
  </imp-panel>
</template>

<script>
  import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import auth from "../../auth"
  import Element from "element-ui";
  import addMember from "../../components/addMember";
  import userzh from "../../resources/user/zh";
  import useren from "../../resources/user/en";
//import en from '../../resources/en';
//import zh from '../../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(useren)),
  	zh:JSON.parse(JSON.stringify(userzh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'),
	  	messages
	})
	  export default {
	    components: {
      'imp-panel': panel,
      "addMember":addMember
    },
    data(){
      return {
      	fcodeD:[],
		deRevel: false,
		addLevel: false,
		openAd: false,
      	forms:{},
        value: '',
        currentRow: [],
        dialogFormVisible: false,
        dialogLoading: false,
      
        listLoading: false,
        tableData: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows: []
        }
      }
    },
     i18n,
     props:[],
    methods: {
   	 openAdd(index,row) {//修改
    	 this.dialogFormVisible = true;
          this.$http.get(auth.getServerUrl()+api.USER_VIP_RESET_GETBYDATA +"?fid="+row.fid)
          .then(res => {
          	 if(res.data.success==true){
          	 	 var d=res.data.data; 
           	this.$refs.form.form.fid=d.fid;
           	 this.$refs.form.form.flevel=d.flevel;
          	 }else{
          	 this.dialogFormVisible = false;//关闭弹出层
        	 Element.MessageBox({type:"error",message:res.data.msg,title:this.$t('script.14')});
          	 }
          	
          })
    	
      },
      addMember() {//保存
        var _this=this;
    	 _this.forms=_this.$refs.form.form
        this.$http.post(auth.getServerUrl()+api.USER_VIP_RESET_SAVE, _this.forms)
          .then(res => {
          if(res.data.success==true){
			this.loadData();
          	 this.$message(res.data.msg);
      		this.dialogFormVisible = false;//关闭弹出层
        	}else{
        		this.dialogFormVisible = false;//关闭弹出层
        	 Element.MessageBox({type:"error",message:res.data.msg,title:this.$t('script.14')});
        	}
          })
      },
      reMember(){//增加
      	 this.dialogFormVisible = true;
      	 this.$refs.form.form.flevel=""
      },
      handleSelectionChange(val){ //取消选择触发
      	this.currentRow = val.map(i=>i.fid);
      },
     	delMember(){//删除会员
       	let fids = this.currentRow.join(',')
          this.$http.get(auth.getServerUrl()+api.USER_VIP_RESET_DEL + "?fid="+fids)
          .then(res => {
          if(res.data.success==true){
 			this.loadData();
 			this.$message(res.data.msg);
        	}else{
        	 Element.MessageBox({type:"error",message:res.data.msg,title:this.$t('script.14')});
        	}
             
          })
      },
		handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.tableData.pagination.pageNo = val;
        this.loadData();
      },

      loadData(){//初始化表格
      	this.listLoading=true;
         this.$http.get(auth.getServerUrl()+api.USER_VIP_RESET_SEL +"?rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
           	 .then(res => {
                  if(res.data.success == true) {
						this.listLoading = false; //关闭loading
						var d=res.data;    
		                this.tableData.rows = d.data.content;
		                this.tableData.pagination.total = d.data.totalElements;
					} else {
							this.listLoading = false; //关闭loading
						Element.MessageBox({
							type: "error",
							message: res.data.msg,
							title: this.$t('script.6')
						});
					}
            }).catch((error) => {
            	this.listLoading = false; //关闭loading
           console.log(error)
        });;
      }
    },
    created(){
      this.loadData();
      	this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/user/memberLevel",this.fcodeD);
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
