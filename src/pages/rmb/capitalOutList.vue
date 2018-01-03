<template>
	<imp-panel>

		<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24" style="width: 100%;margin-bottom: 10px;">
				<el-col :span="7">
					<!--类型-->
					<span>{{$t("table.5")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tlabel" :placeholder="$t('title.1')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tlabel">
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

			<el-row style="width: 100%;margin-bottom: 0px;">
				<el-col :span="12">
					<el-tooltip class="item" effect="light" :content='$t("button.pass")' placement="top-end">
					<el-button size="small" type="success" v-show="capitalOutAudit1" @click="pass()"><i class="iconfont icon-shenhetongguo1"></i> 
					</el-button>
			      </el-tooltip> 
			      <el-tooltip class="item" effect="light" :content='$t("button.fail")' placement="top-end">
					<el-button size="small" type="danger" v-show="capitalOutAudit2" @click="fail()"><i class="iconfont icon-shenhebutongguo"></i> 
					</el-button>
			      </el-tooltip> 
			     <el-tooltip class="item" effect="light" :content='$t("button.locking")' placement="top-end">
					<el-button size="small" type="info"   v-show="capitalOutAudit3" @click="locking()"><i class="iconfont icon-suoding"></i> 
					</el-button>
			      </el-tooltip>
			         <el-tooltip class="item" effect="light" :content='$t("button.Cancellock")' placement="top-end">
					<el-button size="small" type="warning"   v-show="capitalOutAudit4" @click="cancellock()"><i class="iconfont icon-unlock"></i> 
					</el-button>
			      </el-tooltip>
			        <el-tooltip class="item" effect="light" :content='$t("button.lockingAll")' placement="top-end">
					<el-button size="small" type="warning"  v-show="capitalOutAudit5" @click="lockingAll()"><i class="iconfont icon-lock"></i> 
					</el-button>
			      </el-tooltip>
					<!--<el-button size="small" type="success"  v-show="capitalOutAudit1"  @click="pass()">{{$t("button.pass")}}
					</el-button>
					<el-button size="small" type="danger"   v-show="capitalOutAudit2" @click="fail()">{{$t("button.fail")}}
					</el-button>
					<el-button size="small" type="info"   v-show="capitalOutAudit3" @click="locking()">{{$t("button.locking")}}
					</el-button>
					<el-button size="small" type="warning"   v-show="capitalOutAudit4" @click="cancellock()">{{$t("button.Cancellock")}}
					</el-button>
					<el-button size="small"  v-show="capitalOutAudit5" @click="lockingAll()">{{$t("button.lockingAll")}}
					</el-button>-->
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :data="tableData.rows" :stripe="true" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-if="isShow" label="ID">
				</el-table-column>
				<el-table-column prop="floginName" width="100" :label="$t('table.1')">
				</el-table-column>
				<!--<el-table-column prop="ftype" :formatter="typeForma" :label="$t('table.9')">
				</el-table-column>-->
				<el-table-column class-name="status-col" prop="ftype" :label="$t('table.23')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.ftype | typeFilter">{{ scope.row.ftype == "0402" ? $t('script.14') : $t('script.13')}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column prop="fstatus" :formatter="statusForma" :label="$t('table.10')">
				</el-table-column>
				<el-table-column prop="famount" :label="$t('table.3')">
				</el-table-column>
				<el-table-column prop="ffees" :label="$t('table.4')">
				</el-table-column>
				<el-table-column prop="fbank" :label="$t('table.5')">
				</el-table-column>
				<el-table-column prop="faddress" :label="$t('table.6')">
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
		import Element from "element-ui";
	import panel from "../../components/panel.vue"
	import * as api from "../../api"
	import auth from '../../auth';
	import rmbzh from "../../resources/rmb/zh";
	import rmben from "../../resources/rmb/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(rmben)),
		zh: JSON.parse(JSON.stringify(rmbzh))
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
				capitalOutAudit1: false,
				capitalOutAudit2: false,
				capitalOutAudit3: false,
				capitalOutAudit4: false,
				capitalOutAudit5: false,
				toptions: [{
					tlabel: '',
					tvalue: this.$t('title.1')
				}],
				tlabel: '',
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
		props: [],
		methods: {

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
				this.loadData(this.searchKey, timeStar, timeEnd, this.tlabel)
			},
			loadData(str, timeStar, timeEnd, ftype) { // ftype;//类型 fstatus;//状态floginName;//登录名称
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				ftype = (ftype == undefined) ? "" : ftype;
				this.$http.get(auth.getServerUrl() + api.RMB_OUT_LIST + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&fbank=" + ftype + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
				this.todo(api.RMB_OUT_LIST_AUDIT + "?type=1");
			},
			fail() { //审核不通过
				this.todo(api.RMB_OUT_LIST_AUDIT + "?type=2");
			},
			locking() { //锁定
				this.todo(api.RMB_OUT_LIST_AUDIT + "?type=3");
			},
			cancellock() { //取消锁定
				this.todo(api.RMB_OUT_LIST_AUDIT + "?type=4");
			},
			lockingAll() { //取消锁定
				// this.todo(api.RMB_OUT_LIST_AUDIT+"?type=5");
				//审核
				this.$confirm(this.$t('script.18'), this.$t('script.16'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: 'warning'
				}).then(() => {
					this.$http.get(auth.getServerUrl() + api.RMB_OUT_LIST_AUDIT + "?type=5")
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
//			typeForma(row, column) {
//				return this.getType(row.ftype);
//			},
			todo(url) {
				let fids = this.currentRow.join(',');
				if(fids == "") {
					this.$message(this.$t('script.10'));
					return false;
				}
				//审核
				this.$confirm(this.$t('script.18'), this.$t('script.16'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: 'warning'
				}).then(() => {
					this.$http.get(auth.getServerUrl() + url + "&fids=" + fids)
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
			}
		},
		created() {
			this.loadData();
			 this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"08",this.toptions);//银行类型
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/rmb/capitalOutList",this.fcodeD);
		}
	}
</script>
<style scoped="scoped">
	.el-input__icon {
		position: absolute;
		right: 5px;
	}
</style>