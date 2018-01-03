
<template>
<imp-panel>
<div>
	<div style="display: flex;">
  		<div class="left">
  			<imp-panel>
  			 <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;margin-bottom: 0;">
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search1($event)"></i>
            <input type="text" :placeholder="$t('title.5')" v-model="searchKey1" @keyup.enter="search2($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table
        :data="tableData1.rows1"
        border  
        ref="multipleTable"
        style="width: 100%"
        v-loading="listLoading"
          @selection-change="handleSelectionChange1">
           <el-table-column
          prop="id"
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          prop="fid"
          v-if="isShow"
          label="Id">
        </el-table-column>
         <el-table-column
          prop="floginName"
         :label="$t('popups.32')">
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="tableData1.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData1.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData1.pagination.total">
      </el-pagination>

    </div>
  </imp-panel>
  		</div>
  		<div class="right">
  	<imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;margin-bottom: ;">
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search2($event)"></i>
            <input type="text" :placeholder="$t('title.5')" v-model="searchKey2" @keyup.enter="search2($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table
        :data="tableData2.rows2"
        border  
        ref="multipleTable"
        style="width: 100%"
        v-loading="listLoading"
          @selection-change="handleSelectionChange2">
           <el-table-column
          prop="id"
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          prop="fid"
           v-if="isShow"
          label="Id">
        </el-table-column>
         <el-table-column
          prop="fname"
         :label="$t('table.31')">
        </el-table-column>
          <el-table-column
          prop="fsymbol"
        :label="$t('table.32')">
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="tableData2.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData2.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData2.pagination.total">
      </el-pagination>
    </div>
  </imp-panel>
  		</div>
  	</div>

  <div>
  <imp-panel>

		<el-form :model="form" label-width="180px">
			<el-form-item :label="$t('table.33')">
				<el-input v-model="form.famount" style="width:300px"></el-input>
			</el-form-item>

		</el-form>
  </imp-panel>

</div>
  	
</div>
  	
  </imp-panel>

</template>

<script>
  import Vue from "vue";
  import VueI18n from 'vue-i18n'
  import panel from "./panel.vue"
  import * as api from "../api"
   import auth from "../auth"
import Element from "element-ui";
//import detail from "../pages/user/detail.vue";
  import virtualzh from "../resources/virtual/zh";
  import virtualen from "../resources/virtual/en";
//import en from '../resources/en';
//import zh from '../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(virtualen)),
  	zh:JSON.parse(JSON.stringify(virtualzh))
	}
	const i18n = new VueI18n({
		 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
	  	messages
	})

	  export default {
	    components: {
      'imp-panel': panel,
//    "detail":detail
    },
    data(){
      return {
      	   isShow:false,
      	   famount:"",
      	   form:{
      	   famount:"",
      	   },
      	 
				selectType: 0,
        currentRow1: [],
        currentRow2: [],
        floginName:"",
        dialogVisible: false,
        dialogLoading: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        roleTree: [],
        listLoading: false,
        searchKey1: '',
         searchKey2: '',
        tableData1: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows1: []
        },
        tableData2: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows2: []
        }
      }
    },
     i18n,
    methods: {
      handleSelectionChange1(val){ //取消选择触发
      	var vals=val.map(i=>i.fid);

      		this.currentRow1 =vals.join(',')
      },
      handleSelectionChange2(val){ //取消选择触发 货币
      	var vals=val.map(i=>i.fid);
      		this.currentRow2 =vals.join(',')
      },
      search1(target){
        this.loadData1(this.searchKey1);
      },
 		search2(target){
         this.loadData2(this.searchKey2);
      },

      handleSizeChange1(val) {
        this.tableData1.pagination.pageSize = val;
       this.loadData1(this.searchKey1);
      },
      handleCurrentChange1(val) {
        this.tableData1.pagination.pageNo = val;
       this.loadData1(this.searchKey1);
      },
      handleSizeChange2(val) {
        this.tableData2.pagination.pageSize = val;
       this.loadData2(this.searchKey2);
      },
      handleCurrentChange2(val) {
        this.tableData2.pagination.pageNo = val;
       this.loadData2(this.searchKey2);
      },
      loadData1(str){//会员
      	this.listLoading = true; 
    	str=(str==undefined)?"":str;
     		 this.$http.get(auth.getServerUrl()+api.VIRTUAL_SAVE_MANUAL_SEL + "?fname="+str+"&rows=" + this.tableData1.pagination.pageSize + "&page=" + this.tableData1.pagination.pageNo)
            .then(res => {
            		this.listLoading = false; //关闭loading
                 var d=res.data;     
                	this.tableData1.rows1 = d.data.content;
                    this.tableData1.pagination.total = d.data.totalElements;
            }).catch((error) => {
            	this.listLoading = false; //关闭loading
           console.log(error)
        });;
      },
        loadData2(str){//货币
        	this.listLoading = true; 
    str=(str==undefined)?"":str;
     		 this.$http.get(auth.getServerUrl()+api.VIRTUAL_SAVE_MANUAL_SEARCH + "?fname="+str+"&rows=" + this.tableData2.pagination.pageSize + "&page=" + this.tableData2.pagination.pageNo)
            .then(res => {
            	this.listLoading = false; //关闭loading
                 var d=res.data;     
                   this.tableData2.rows2 = d.data.content;
                    this.tableData2.pagination.total = d.data.totalElements;
            }).catch((error) => {
            	this.listLoading = false; //关闭loading
           console.log(error)
        });;
      }
    },
    created(){
      this.loadData1();
       this.loadData2();
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
