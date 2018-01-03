<template>
	<imp-panel>
		<div class="box-title" slot="header" style="width: 100%; font-size: 14px;">
			<!--<el-row style="width: 100%;">
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('table.12')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>-->
			<el-row :gutter="24">
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
				<!--登录名-->
				<el-col :span="7">
					<span>{{$t("title.4")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('title.10')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">

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
				<el-table-column prop="fuserId" :label="$t('table.26')">
				</el-table-column>
				<el-table-column prop="ftitle" :label="$t('table.64')">
				</el-table-column>
				<el-table-column prop="fqty" :label="$t('table.63')">
				</el-table-column>
				<el-table-column prop="fcreateTime" :label="$t('table.12')">
				</el-table-column>
				<!--<el-table-column prop="fiscny" :label="$t('table.62')" :formatter="isCny">
				</el-table-column>-->
				<el-table-column class-name="status-col" prop="fiscny" :label="$t('table.62')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fiscny | statusFilter">{{ scope.row.fiscny == 1 ? $t('script.1') : $t('script.2')}}</el-tag>
			        </template>
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
		import Element from "element-ui";
	import syszh from "../../resources/user/zh";
	import sysen from "../../resources/user/en";
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
				this.loadData(this.searchKey, timeStar, timeEnd)
			},
			loadData(str, timeStar, timeEnd) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				this.$http.get(auth.getServerUrl() + api.USER_FINTROLINFO + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
					});
			},
			isCny(row, column) {
				return row.fiscny == 1 ? this.$t('script.1') : this.$t('script.2');
			}
		},
		created() {
			this.loadData();
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>