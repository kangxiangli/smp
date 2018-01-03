<template>
	<imp-panel>
			<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24" style="width: 100%;margin-bottom: 10px;">
				<el-col :span="7">
					<!--充值方式-->
					<span>{{$t("table.12")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="svalue" :placeholder="$t('title.1')">
						<el-option v-for="item in soptions" :key="item.tvalue" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>

				<!--登录名-->
				<el-col :span="7">
					<span>{{$t("table.1")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('table.1')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				</el-col>
			</el-row>
			<el-row :gutter="24" style="width: 100%;margin-bottom: 10px;">
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
						<span class="demonstration">&nbsp;&nbsp;&nbsp;{{$t("time.2")}}</span>
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
	<el-row style="width: 100%; margin-bottom: 0;">
	<el-col :span="12">
		<el-tooltip class="item" effect="light" :content='$t("button.pass")' placement="top-end">
		<el-button size="small" type="success" v-show="capitalInAudit" @click="pass()"><i class="iconfont icon-shenhetongguo1"></i> 
		</el-button>
      </el-tooltip> 
      <el-tooltip class="item" effect="light" :content='$t("button.fail")' placement="top-end">
		<el-button size="small" type="danger" v-show="capitalInCancel" @click="fail()"><i class="iconfont icon-shenhebutongguo"></i> 
		</el-button>
      </el-tooltip> 
		<!--<el-button size="small" type="success" v-show="capitalInAudit" @click="pass()">{{$t("button.pass")}}
		</el-button>
		<el-button size="small" type="danger" v-show="capitalInCancel" @click="fail()">{{$t("button.fail")}}
		</el-button>-->
	</el-col>
</el-row>
    </div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="fid" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-if="isShow" label="ID">
				</el-table-column>
				<el-table-column prop="floginName" :label="$t('table.1')">
				</el-table-column>
				<el-table-column prop="fstatus" :formatter="statusForma" :label="$t('table.10')">
				</el-table-column>
				<el-table-column prop="fremittanceType" :formatter="fremittanceTypeForma" :label="$t('table.12')">
				</el-table-column>
				<el-table-column prop="famount" :label="$t('table.3')">
				</el-table-column>
				<el-table-column prop="ffees" :label="$t('table.4')">
				</el-table-column>
				<el-table-column prop="fbank" :label="$t('table.5')">
				</el-table-column>
				<el-table-column prop="fbankNumber" :label="$t('table.13')">
				</el-table-column>
				<el-table-column prop="fcreateTime" :label="$t('table.7')">
				</el-table-column>
				<el-table-column prop="flastUpdateTime" :label="$t('table.8')">
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
	import auth from '../../auth';
	import syszh from "../../resources/rmb/zh";
	import sysen from "../../resources/rmb/en";
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
			'imp-panel': panel,
		},
		data() {
			return {
				fcodeD:[],
				capitalInAudit: false,
				capitalInCancel: false,
				soptions: [{
					tlabel: this.$t('title.1'),
					tvalue:"" 
				}],
				svalue: '',
				
				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
				isShow: false,
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
		props: [],
		methods: {
			search(target) {
				this.loadData(this.searchKey);
			},
			handleSelectionChange(val) { //取消选择触发
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
				this.loadData(this.searchKey, timeStar, timeEnd, this.svalue)
			},
				loadData(str, timeStar, timeEnd, status) { // fbank;//类型 fremittanceType;//状态floginName;//登录名称
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				status = (status == undefined) ? "" : status;
				
				this.$http.get(auth.getServerUrl() + api.RMB_IN_LIST + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&fremittanceType=" + status + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
			pass() { //审核通过
				let fids = this.currentRow.join(',');
				if(fids == "") {
					this.$message(this.$t('script.10'));
					return false;
				}
				this.$confirm(this.$t('script.12'), this.$t('script.16'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: 'warning'
				}).then(() => {
					this.$http.get(auth.getServerUrl() + api.RMB_IN_LIST_AUDIT_PASS + "?fids=" + fids)
						.then(res => {
							if(res.data.success == true) {
								this.$message({
									type: 'success',
									message: res.data.msg
								});
								this.loadData();
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.6')
								});
							}
						}).catch(() => {
							this.$message({
								type: 'info',
								message: this.$t('script.15')
							});
						});
				})
			},
			fail() { //审核不通过
				let fids = this.currentRow.join(',');
				if(fids == "") {
					this.$message(this.$t('script.10'));
					return false;
				}
				this.$confirm(this.$t('script.17'), this.$t('script.16'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: 'warning'
				}).then(() => {
					this.$http.get(auth.getServerUrl() + api.RMB_IN_LIST_AUDIT_FAIL + "?fids=" + fids)
						.then(res => {
							if(res.data.success == true) {
								this.$message({
									type: 'success',
									message: res.data.msg
								});
								this.loadData();
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.6')
								});
							}
						}).catch(() => {
							this.$message({
								type: 'info',
								message: this.$t('script.15')
							});
						});
				})
			},
			statusForma(row, column) {
				return this.getStatus(row.fstatus);
			},
			typeForma(row, column) {
				return this.getType(row.ftype);
			},
			fremittanceTypeForma(row, column) {
				return this.getfremittanceType(row.fremittanceType);
			}
		},
		created() {
			this.loadData();
			this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"08",this.toptions);//银行类型
			this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"03",this.soptions);//充值方式
			this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/rmb/capitalInList",this.fcodeD);
		}
	}
</script>
<style scoped="scoped">
	.el-input__icon {
		position: absolute;
		right: 5px;
	}
</style>