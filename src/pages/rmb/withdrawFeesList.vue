<style >
	.dialog_box_content1 .box .box-body,.dialog_box_content2 .box .box-body {
    height: 500px !important;
    overflow-x: hidden;
    overflow-y: scroll;
    }
    .my_dalog_box{
    width: 800px !important;
    }
	.my_dalog_box .box .box-body{
	 height: 500px !important;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table
        :data="tableData.rows"
        :stripe="true"
        border  
        ref="multipleTable"
        style="width: 100%"
        v-loading="listLoading">
        </el-table-column>
        <el-table-column
          prop="flevel"
          :label="$t('table.20')">
        </el-table-column>
        <el-table-column
          prop="ffee"
         :label="$t('table.21')">
        </el-table-column>
        <el-table-column   :label="$t('table.22')">
          <template scope="scope">
          	  <el-tooltip class="item" effect="light" :content='$t("button.modify")' placement="top-end">
					<el-button size="small" type="info" v-show="FeesBtn" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
					</el-button>
					 </el-tooltip>
					   <!--<el-button size="small" type="success" v-if="FeesBtn" @click="modify(scope.$index, scope.row)">{{$t("button.modify")}}
					</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.pagination.total">
      </el-pagination>
        <el-dialog :title="$t('title.2')" v-model="dialogVisible" size="small">
    	  <withdraw-Fee ref="form" ></withdraw-Fee>
       	 <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t("script.9")}}</el-button>
          <el-button type="primary" @click="save">{{$t("script.19")}}</el-button>
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
  import  auth from '../../auth';
  import testData from "../../../static/data/data.json"
  import withdrawFeeModify from "../../components/withdrawFeeModify";
  import rmbzh from "../../resources/rmb/zh";
  import rmben from "../../resources/rmb/en";
//import en from '../../resources/en';
//import zh from '../../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(rmben)),
  	zh:JSON.parse(JSON.stringify(rmbzh))
	}
	const i18n = new VueI18n({
		 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
	  	messages
	})
	  export default {
	    components: {
      'imp-panel': panel,
      "withdraw-Fee":withdrawFeeModify
    },
    data(){
      return {
      	fcodeD:[],
		FeesBtn: false,
      	forms:{},
        value: '',
        currentRow: [],
        dialogVisible: false,
        dialogLoading: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        listLoading: false,
        searchKey: '',
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
    methods: {
      search(target){
        this.loadData(this.searchKey);
      },
      handleSelectionChange(val){ //取消选择触发
      	this.currentRow = val.map(i=>i.fid);
      },
     	
	  	handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        this.loadData(this.searchKey);
      },
      handleCurrentChange(val) {
        this.tableData.pagination.pageNo = val;
        this.loadData(this.searchKey);
      },

      loadData(str){//初始化表格
      	this.listLoading=true;
         str=(str==undefined)?"":str;  
         this.$http.get(auth.getServerUrl()+api.RMB_WITHDRAW_FEE_LIST + "?floginName="+str+"&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
        });
      },
      save(){//初始化表格
        var _this=this;
    	   _this.forms=_this.$refs.form.form;
         this.$http.post(auth.getServerUrl()+api.RMB_WITHDRAW_FEE_SAVE,  _this.forms)
           	 .then(res => {
                this.loadData();
          	this.$message(res.data.msg);
      		  this.dialogVisible = false;//关闭弹出层
            });
      },
      modify(index,row) {
       this.dialogVisible = true;
       let _this=this;
          this.$http.get(auth.getServerUrl()+api.RMB_WITHDRAW_FEE_GET + "?fid="+row.fid)
          .then(res => {
            let d=res.data.data; 
           	_this.$refs.form.form.fid=d.fid;
            _this.$refs.form.form.ffee=d.ffee;
            _this.$refs.form.form.flevel=d.flevel;
            _this.$refs.form.form.fversion=d.fversion;
          })
      },
      
    },
    created(){
      this.loadData();
      this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/rmb/withdrawFeesList",this.fcodeD);
    }
  }
</script>
<style scoped="scoped">

  .el-input__icon{
  	position: absolute;
  	right: 5px;
  }
</style>
