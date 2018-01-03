<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style=" margin-bottom:10px;">
				<el-col :span="7">
					<!--虚拟币名称-->
					<span>{{$t("title.17")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="value" :placeholder="$t('title.1')">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<!--登录名-->
				<el-col :span="7">
					<span>{{$t("table.17")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('title.18')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				</el-col>
			</el-row>
			<el-row :gutter="24" style=" margin-bottom:0px;">
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
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('table.12')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>-->
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				</el-table-column>
				<el-table-column prop="fid" v-if="isShow" label="ID">
				</el-table-column>
				<el-table-column prop="fuserFid" :label="$t('table.11')">
				</el-table-column>
				<el-table-column prop="fviFid" :label="$t('table.13')">
				</el-table-column>
				<el-table-column prop="ftotal" :label="$t('table.14')">
				</el-table-column>
				<el-table-column prop="ffrozen" :label="$t('table.15')">
				</el-table-column>
				<el-table-column prop="flastUpdateTime" :label="$t('table.16')">
				</el-table-column>
				<el-table-column prop="floginName" :label="$t('table.17')">
				</el-table-column>
				<el-table-column prop="frealName" :label="$t('table.18')">
				</el-table-column>
				<el-table-column prop="fviName" :label="$t('table.19')">
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>

		</div>
	</imp-panel>
</template>

<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import panel from "../../components/panel.vue"
	import * as api from "../../api"
	import auth from "../../auth"
	import virtualzh from "../../resources/virtual/zh";
	import virtualen from "../../resources/virtual/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(virtualen)),
		zh: JSON.parse(JSON.stringify(virtualzh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'), // 语言标识
		messages
	})

	export default {
		components: {
			'imp-panel': panel,
		},
		data() {
			return {

				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
				isShow: false,
				options: [{
					value: '',
					label: this.$t('title.1')
				}],
				value: '',
				currentRow: [],
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
			handleSelectionChange(val) {
				this.currentRow = val.map(i => i.fid);
			},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				this.loadData(this.searchKey);
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.loadData(this.searchKey);
			},
			btnCheck() { //搜索
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				var timeStar = this.meFormat(this.pvalue1)
				var timeEnd = this.meFormat(this.pvalue2)
				var fType = this.value; //类型
				this.loadData(this.searchKey, timeStar, timeEnd, fType)
			},
			loadData(str, timeStar, timeEnd, ftype) {//String beginDate, String endDate,String fname,String ftype
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				ftype = (ftype == undefined) ? "" : ftype;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_WALLET_LIST+ "?fname="+str+ "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&ftype=" + ftype + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
							this.listLoading = false; //关闭loading
							var d = res.data;
							this.tableData.rows = d.data.content;
							this.tableData.pagination.total = d.data.totalElements;
						} else {
							this.listLoading = false; //关闭loading
							this.$message({
								type: 'error',
								message: res.data.msg
							});
						}

					}).catch((error) => {
						this.listLoading = false; //关闭loading
						console.log(error)
					});
			},
//			handLink() { //虚拟币名称
//				this.$http.get(auth.getServerUrl() + api.VIRTUAL_CAPTUAL_OPERATION_TYPE)
//					.then(res => {
//						if(res.data.success = true) {
//							var ary = res.data.data;
//							for(let i = 0; i < ary.length; i++) {
//								let obj = {
//									value: "",
//									label: "",
//								};
//								obj.value = ary[i].fname;
//								obj.label= ary[i].fname;
//								this.options.push(obj);
//							}
//						}
//					}).catch((error) => {
//						console.log(error)
//					});
//			},

		},
		created() {
			this.loadData();
			this.handLink(auth.getServerUrl(),api.VIRTUAL_CAPTUAL_OPERATION_TYPE);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>