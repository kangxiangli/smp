
<template>
  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%; margin-bottom: 0;">
        <el-col :span="12">
 
        </el-col>
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('table.1')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
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
        <el-table-column
          prop="floginName"
           :label="$t('table.1')">
        </el-table-column>
        <el-table-column
          prop="fnickName"
           :label="$t('table.14')">
        </el-table-column>
        <el-table-column
          prop="frealName"
           :label="$t('table.15')">
          </el-table-column>
        <el-table-column
          prop="ftotalRMB"
        :label="$t('table.16')">
        </el-table-column>
        <el-table-column
          prop="ffrozenRMB"
         :label="$t('table.17')">
        </el-table-column>
         <el-table-column
          prop="flastUpdateTime"
       :label="$t('table.8')">
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

    </div>
  </imp-panel>
</template>

<script>
  import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import  auth from '../../auth';
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
    },
    data(){
      return {
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
        roleTree: [],
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
     props:[],
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
      	this.listLoading=true
         str=(str==undefined)?"":str;  
         this.$http.get(auth.getServerUrl()+api.RMB_WALLET_LIST + "?floginName="+str+"&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
      }
    },
    created(){
      this.loadData();
    }
  }
</script>
<style scoped="scoped">

  .el-input__icon{
  	position: absolute;
  	right: 5px;
  }
</style>
