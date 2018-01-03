
<template>
  <imp-panel>
  	
  			<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24" style="width: 100%;margin-bottom: 10px;">
				<el-col :span="7">
					<!--类型-->
					<span>{{$t("table.5")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('title.1')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<!--登录名-->
				<el-col :span="7">
					<span>{{$t("table.1")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('table.1')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				</el-col>
			</el-row>
			<el-row :gutter="24" style="width: 100%;margin-bottom: 0px;">
				<!--开始时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">{{$t("time.1")}}</span>
						<el-date-picker style="width: 210px;" v-model="pvalue1" type="date" :placeholder="$t('time.3')" :picker-options="pickerOptions0">
						</el-date-picker>
					</div>
				</el-col>
				<!--结束时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">{{$t("time.2")}}</span>
						<el-date-picker style="width: 210px;" v-model="pvalue2" align="right" type="date" :placeholder="$t('time.3')" :picker-options="pickerOptions1">
						</el-date-picker>
					</div>
				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("time.4")}}
					</el-button>
				</el-col>
			</el-row>
		</div>
    <!--<h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
        </el-col>
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('title.1')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>-->
    <div slot="body">
      <el-table
        :data="tableData.rows"
        :stripe="true"
        border  
        ref="multipleTable"
        style="width: 100%"
        v-loading="listLoading">
         <el-table-column
          prop="fid"
          v-if="isShow"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="floginName"
        :label="$t('table.1')">
        </el-table-column>
        <el-table-column
          prop="faccount"
         :label="$t('table.2')">
        </el-table-column>
       <el-table-column
          prop="famount"
       :label="$t('table.3')">
        </el-table-column>
         <el-table-column
          prop="ffees"
         :label="$t('table.4')">
        </el-table-column>
         <el-table-column
          prop="fbank"
         :label="$t('table.5')">
        </el-table-column>
         <el-table-column
          prop="faddress"
        :label="$t('table.6')">
        </el-table-column>
         <el-table-column
          prop="fcreateTime"
        :label="$t('table.7')">
        </el-table-column>
         <el-table-column
          prop="flastUpdateTime"
           width="150"
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
      toptions: [{
					tlabel: '',
					tvalue: this.$t('title.1')
				}],
				tvalue: '',
				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
      	 isShow:false,
        currentRow: [],
        dialogVisible: false,
        dialogLoading: false,
//      defaultProps: {
//        children: 'children',
//        label: 'name',
//        id: "id",
//      },
//      roleTree: [],
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
     	btnCheck() {
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				var timeStar = this.meFormat(this.pvalue1)
				var timeEnd = this.meFormat(this.pvalue2)
				this.loadData(this.searchKey, timeStar, timeEnd,  this.tvalue)
			},
			loadData(str, timeStar, timeEnd, ftype) { // ftype;//类型 fstatus;//状态floginName;//登录名称
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				ftype = (ftype == undefined) ? "" : ftype;
				this.$http.get(auth.getServerUrl() + api.RMB_OUTSUC_LIST + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&ftype=" + ftype+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
      typeForma(row, column){
          return this.getType(row.ftype);
      },
      statusForma(row, column){
         return this.getStatus(row.fstatus);
      }
    },
    created(){
      this.loadData();
      this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"08",this.toptions);//银行类型
    }
  }
</script>
<style scoped="scoped">

  .el-input__icon{
  	position: absolute;
  	right: 5px;
  }
</style>
