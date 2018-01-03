<template>
	<imp-panel>
		
				<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24" style="width: 100%;margin-bottom: 10px;">
				<el-col :span="7">
					<!--问题类型-->
					<span>{{$t("table.6")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('title.1')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<!--提问名-->
				<el-col :span="7">
					<span>&nbsp;&nbsp;&nbsp;{{$t("table.1")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('table.1')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				</el-col>
			</el-row>
			<el-row :gutter="24" style="width: 100%;margin-bottom: 0px;">
				<!--创建开始时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">{{$t("time.1")}}</span>
						<el-date-picker style="width: 210px;" v-model="pvalue1" type="date" :placeholder="$t('time.3')" :picker-options="pickerOptions0">
						</el-date-picker>
					</div>
				</el-col>
				<!--创建结束时间-->
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
				<el-table-column prop="fuserName" :label="$t('table.1')">
				</el-table-column>
				<el-table-column prop="fsolveName" :label="$t('table.2')">
				</el-table-column>
				<el-table-column prop="fname" :label="$t('table.3')">
				</el-table-column>
				<el-table-column prop="ftelephone" :label="$t('table.4')">
				</el-table-column>
				<!--<el-table-column prop="fstatus" :formatter="fstatus" :label="$t('table.5')">
				</el-table-column>-->
				<el-table-column prop="ftype" :formatter="ftype" :label="$t('table.6')">
				</el-table-column>
				<el-table-column prop="fdesc" :label="$t('table.7')">
				</el-table-column>
				<el-table-column prop="fanswer" :label="$t('table.8')">
				</el-table-column>
				<el-table-column prop="fcreateTime" :label="$t('table.9')">
				</el-table-column>
				<el-table-column prop="fsolveTime" :label="$t('table.10')">
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
	import auth from "../../auth";
	import questionzh from "../../resources/question/zh";
	import questionen from "../../resources/question/en";
	import en from '../../resources/en';
	import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(questionen)),
		zh: JSON.parse(JSON.stringify(questionzh))
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
				 toptions: [{
					tlabel: this.$t('title.1'),
					tvalue: ""
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
				currentRow: [],
				dialogVisible: false,
				dialogLoading: false,
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
			
   btnCheck() {
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				var timeStar = this.meFormat(this.pvalue1)
				var timeEnd = this.meFormat(this.pvalue2)
				this.loadData(this.searchKey, timeStar, timeEnd,  this.tvalue)
			},
			loadData(str, timeStar, timeEnd, ftype) { // ftype;//类型 fuserName;//登录名称
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				ftype = (ftype == undefined) ? "" : ftype;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_YES_ANSWER_LIST + "?fuserName="+str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&ftype=" + ftype+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
			ftype:function(row, column) {
			return this.getfType(row.ftype);//问题类型
			},
//			fstatus: function(row, column) {
//				return row.fstatus == 0 ? this.$t('script.1') : this.$t('script.2');
//			}
		},

		created() {
			this.loadData();
			 this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"10",this.toptions);//问题类型
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>