
<template>
<imp-panel>
<div>
	<div style="display: flex;">
  		<div class="left">
  			<imp-panel>
  			 <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
      
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search1($event)"></i>
            <input type="text" :placeholder="$t('title.1')" v-model="searchKey1" @keyup.enter="search1($event)" class="el-input__inner">
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
          :label="$t('table.1')">
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="tableData1.pagination.pageNo"
        :page-sizes="[5]"
        :page-size="tableData1.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData1.pagination.total">
      </el-pagination>

    </div>
  </imp-panel>
  		</div>
  		<div class="right">
  			  <el-form :model="form" label-width="180px">
			
      <el-form-item  :label="$t('table.23')">
		<el-input v-model="form.famount" style="width:200px"></el-input>
		</el-form-item>
      <el-form-item :label="$t('table.18')">

      <el-select v-model="form.ftype" clearable filterable :placeholder="$t('title.1')">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  	</el-form-item>
    <el-form-item :label="$t('table.19')">
			<el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        :placeholder="$t('title.1')"
        v-model="form.fdescription">
      </el-input>
			</el-form-item>
		</el-form>
  		</div>
  	</div>
  <div>
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
  import rmbzh from "../resources/rmb/zh";
  import rmben from "../resources/rmb/en";
//import en from '../resources/en';
//import zh from '../resources/zh';
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
//    "detail":detail
    },
    data(){
      return {
           options:[
             {
                value: '0301',
                label: this.$t('script.1')
              }, {
                value: '0302',
                label: this.$t('script.4')
              }, {
                value: '0303',
                label: this.$t('script.3')
              }, {
                value: '0304',
                label: this.$t('script.3')
              }
           ],
      	   isShow:false,
      	      famount:"",
      	   form:{
              famount:"",
              ftype:"",
              fdescription:""
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
      search1(target){
        this.loadData1(this.searchKey1);
      },

      handleSizeChange1(val) {
        this.tableData1.pagination.pageSize = val;
       this.loadData1(this.searchKey1);
      },
      handleCurrentChange1(val) {
        this.tableData1.pagination.pageNo = val;
       this.loadData1(this.searchKey1);
      },
      loadData1(str){//会员
      		this.listLoading=true;
      str=(str==undefined)?"":str;
     		 this.$http.get(auth.getServerUrl()+api.VIRTUAL_SAVE_MANUAL_SEL + "?str="+str+"&rows=5"  + "&page=" + this.tableData1.pagination.pageNo)
            .then(res => {
                     if(res.data.success == true) {
					this.listLoading = false; //关闭loading
					 var d=res.data;     
                	this.tableData1.rows1 = d.data.content;
                    this.tableData1.pagination.total = d.data.totalElements;
					} else {
						this.listLoading = false; //关闭loading
						Element.MessageBox({
							type: "error",
							message: res.data.msg,
							title: this.$t('script.6')
						});
					}
            });
      }
        
    },
    created(){
      this.loadData1();
      //  this.loadData2();
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
