
<template>
	<imp-panel>
		<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24" style="width: 100%;">
				<el-col :span="7">
					<!--汇款方式-->
					<span>{{$t("table.18")}}</span>
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
			<el-row style="width: 100%;margin-bottom:0px;">
				<el-col :span="12">
					<el-tooltip class="item" effect="light" :content='$t("button.add")' placement="top-end">
					<el-button size="small"  v-show="memberAdd" type="success" @click="add"><i class="iconfont icon-zengjia"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.del")' placement="top-end">
					<el-button size="small"  v-show="	delOperationLog" type="danger" @click="del()"><i class="iconfont icon-shanchu"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.pass")' placement="top-end">
					<el-button size="small"  v-show="auditOperationLog" type="success" @click="pass()"><i class="iconfont icon-shenhetongguo1"></i> 
					</el-button>
                  </el-tooltip> 
					<!--<el-button size="small"  v-show="	memberAdd" type="success" @click="add">{{$t("button.add")}}
					</el-button>
					<el-button size="small"  v-show="	delOperationLog" type="danger" @click="del()">{{$t("button.del")}}
					</el-button>
					<el-button size="small"  v-show="auditOperationLog" type="success" @click="pass()">{{$t("button.pass")}}
					</el-button>-->
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :data="tableData.rows" :stripe="true" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="floginName" width="110" :label="$t('table.1')">
				</el-table-column>
				<el-table-column prop="ftype" :formatter="typeForma" :label="$t('table.18')">
				</el-table-column>
				<!--<el-table-column prop="fstatus" :formatter="statusForma" :label="$t('table.10')">
				</el-table-column>-->
					<el-table-column class-name="status-col" prop="fstatus" :label="$t('table.10')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fstatus | statusFilter" >{{scope.row.fstatus == 0 ? $t('script.21'):$t('script.20')}}</el-tag>
			        </template>
				</el-table-column>
				
				<el-table-column prop="famount" :label="$t('table.3')">
				</el-table-column>
				<el-table-column prop="fdescription" :label="$t('table.19')">
				</el-table-column>
				<el-table-column prop="fcreateTime" :label="$t('table.7')">
				</el-table-column>
				<el-table-column prop="flastUpdateTime" width="150" :label="$t('table.8')">
				</el-table-column>
				<el-table-column prop="fuserId" :label="$t('table.11')">
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog custom-class="dialog_content" :title="$t('title.2')" :visible.sync="dialogFormVisible" size="normal">
				<add-RMB ref="form"></add-RMB>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible  = false">{{$t("script.9")}}</el-button>
            <el-button type="primary" @click="save()">{{$t("script.19")}}</el-button>
         
          </span>
			</el-dialog>
		</div>
	</imp-panel>
</template>

<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import panel from "../../components/panel.vue"
	import * as api from "../../api"
	import auth from '../../auth';
	import addRMB from "../../components/addRMB.vue"
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
			"add-RMB": addRMB
		},
		data() {
			return {
				fcodeD:[],
				memberAdd: false,
				delOperationLog: false,
				auditOperationLog: false,
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
				dialogFormVisible: false,
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
				this.loadData(this.searchKey, timeStar, timeEnd,  this.tvalue)
			},
			loadData(str, timeStar, timeEnd, ftype) { // ftype;//类型 fstatus;//状态floginName;//登录名称
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				ftype = (ftype == undefined) ? "" : ftype;
				this.$http.get(auth.getServerUrl() + api.RMB_OPERAT_LOG_LIST + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&ftype=" + ftype+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
			statusForma: function(row, column) {
				let res = "";
				switch(row.fstatus) {
					case "1":
						res = this.$t('script.20');
						break;
					case "0":
						res = this.$t('script.21');
						break;
				}
				return res;
			},
			typeForma: function(row, column) {
				//  return row.ftype;
				return this.getfremittanceType(row.ftype);
			},
			save() {
				var _this = this;
				this.forms = {
					fuserId: this.$refs.form.currentRow1,
					famount: this.$refs.form.form.famount,
					ftype: this.$refs.form.form.ftype,
					fdescription: this.$refs.form.form.fdescription
				};
				this.$http.post(auth.getServerUrl() + api.RMB_OPERAT_LOG_LIST_SAVE, _this.forms)
					.then(res => {
						if(res.data.success == true) {

							_this.loadData();
							_this.$message(res.data.msg);
							_this.dialogFormVisible = false; //关闭弹出层
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.6')
							});
						}
					})

			},
			add() {
				let _this = this;
				_this.dialogFormVisible = true;
				_this.$refs.form.currentRow1 = "";
				_this.$refs.form.form.famount = "";
				_this.$refs.form.form.ftype = "";
				_this.$refs.form.loadData1();
			},
			del() {
				this.todo(api.RMB_OPERAT_LOG_LIST_DEL);
			},
			pass() {
				this.todo(api.RMB_OPERAT_LOG_LIST_PASS);
			},

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
					this.$http.get(auth.getServerUrl() + url + "?fids=" + fids)
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
			this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"03",this.toptions);//汇款方式
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/rmb/operationLogList",this.fcodeD);
		}
	}
</script>
<style scoped="scoped">
	.el-input__icon {
		position: absolute;
		right: 5px;
	}
</style>