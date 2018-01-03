<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style=" margin-bottom:10px;">
				<el-col :span="7">
					<!--操作类型-->
					<span>{{$t("table.15")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('title.5')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<!--操作人-->
				<el-col :span="7">
					<span>&nbsp;&nbsp;&nbsp;{{$t("table.17")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('title.10')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
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
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="fapp" :label="$t('table.14')">
				</el-table-column>
				<el-table-column prop="ftype" :label="$t('table.15')">
				</el-table-column>
				<el-table-column prop="fmodule" :label="$t('table.16')">
				</el-table-column>
				<el-table-column prop="foperator" :label="$t('table.17')">
				</el-table-column>
				<el-table-column prop="ftime" :label="$t('table.18')">
				</el-table-column>
				<el-table-column prop="fip" :label="$t('table.19')">
				</el-table-column>
				<el-table-column prop="fdesc" :label="$t('table.20')">
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
	import auth from "../../auth"
	import syszh from "../../resources/user/zh";
	import sysen from "../../resources/user/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(sysen)),
		zh: JSON.parse(JSON.stringify(syszh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'), // 语言标识
		messages
	})
	export default {
		components: {
			'imp-panel': panel
		},
		data() {
			return {
				pickerOptions0: {
					disabledDate(time) {
//						          return time.getTime() < Date.now();
					},
				},
				pickerOptions1: {
					disabledDate(time) {
						
//						          return time.getTime() < Date.now() ;
					},
				},
				pvalue1: '',
				pvalue2: '',
				toptions: [{
				tvalue:"",
				tlabel:""
				}], //等级
				tvalue: '',
				currentRow: [],
				//      dialogVisible: false,
				dialogLoading: false,
//				defaultProps: {
//					children: 'children',
//					label: 'name',
//					id: "id",
//				},
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
				var ftype = this.tvalue; //操作类型
				this.loadData(this.searchKey, timeStar, timeEnd, ftype)
			},
			loadData(str, timeStar, timeEnd, ftype) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				ftype = (ftype == undefined) ? "" : ftype;
					this.$http.get(auth.getServerUrl() + api.USER_LOG + "?foperator=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&ftype=" + ftype + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
							this.listLoading = false; //关闭loading
							var d = res.data;
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
			},
//			handLink() { //操作类型
//				this.$http.get(auth.getServerUrl() + api.USER_LOG_TYPE + "?pid=" + "0" + 9)
//					.then(res => {
//						if(res.data.success = true) {
//							var ary = res.data.data;
//							for(let i = 0; i < ary.length; i++) {
//								let obj = {
//									tcode: "",
//									 tvalue: "",
//								};
//								obj.tvalue = ary[i].fvalue;
//								obj.tcode = ary[i].fcode;
//								this.toptions.push(obj);
//							}
//						}
//					}).catch((error) => {
//						console.log(error)
//					});
//			},
		},
		created() {
			this.loadData();
			this.handStatus(auth.getServerUrl(),api.USER_LOG_TYPE,"09",this.toptions);//操作类型
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>