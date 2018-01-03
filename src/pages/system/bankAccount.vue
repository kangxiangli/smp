
<template>
	<imp-panel>
		<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24" style="width: 100%;">
				<el-col :span="7">
					<!--银行名称-->
					<span>{{$t("table.fbankName")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="svalue" :placeholder="$t('table.fbankName')">
						<el-option v-for="item in soptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7">
					<!--状态-->
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t("table.fstatus")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('table.fstatus')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<!--开户姓名-->
				<el-col :span="7">
					<span>{{$t("table.fownerName")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('table.fownerName')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				</el-col>
			</el-row>
			<el-row :gutter="24" style="width: 100%;margin-bottom: 10px;">
				<!--开始时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">{{$t("pubilc.5")}}</span>
						<el-date-picker style="width: 210px;" v-model="pvalue1" type="date" :placeholder="$t('pubilc.3')" :picker-options="pickerOptions0">
						</el-date-picker>
					</div>
				</el-col>
				<!--结束时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">{{$t("pubilc.6")}}</span>
						<el-date-picker style="width: 210px;" v-model="pvalue2" align="right" type="date" :placeholder="$t('pubilc.3')" :picker-options="pickerOptions1">
						</el-date-picker>
					</div>
				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("pubilc.4")}}
					</el-button>
				</el-col>
			</el-row>

			<el-row style="width: 100%;margin-bottom: 0px;">
				<el-col :span="12">
					<el-tooltip class="item" effect="light" :content='$t("button.add")' placement="top-end">
					<el-button size="small"  v-show="memSave" type="success" @click="add()"><i class="iconfont icon-zengjia"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.del")' placement="top-end">
					<el-button size="small"  v-show="memDel" type="danger" @click="del()"><i class="iconfont icon-shanchu"></i> 
					</el-button> 
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.enable")' placement="top-end">
					<el-button size="small"  v-show="memberBankable" type="success" @click="enable()"><i class="iconfont icon-qiyong"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.disable")' placement="top-end">
					<el-button size="small"  v-show="memBankdisable" type="warning" @click="disable()"><i class="iconfont icon-guanbi"></i> 
					</el-button>
                  </el-tooltip> 
					<!--<el-button size="small"  v-show="memSave" type="success" @click="add()">{{$t("button.add")}}
					</el-button>
					<el-button size="small"  v-show="memDel" type="danger" @click="del()">{{$t("button.del")}}
					</el-button> 
					<el-button size="small"  v-show="memberBankable" type="success" @click="enable()">{{$t("button.enable")}}
					</el-button>
					<el-button size="small"  v-show="memBankdisable" type="warning" @click="disable()">{{$t("button.disable")}}
					</el-button>-->
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fbankName" :label="$t('table.fbankName')">
				</el-table-column>
				<el-table-column prop="fownerName" width="100" :label="$t('table.fownerName')">
				</el-table-column>
				<el-table-column prop="fbankNumber" :label="$t('table.fbankNumber')">
				</el-table-column>
				<!--<el-table-column prop="fstatus" width="100" :formatter="statusForma" :label="$t('table.fstatus')">
				</el-table-column>-->
				<el-table-column class-name="status-col" width="100" prop="fstatus" :label="$t('table.fstatus')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fstatus | statusFilter" >{{scope.row.fstatus == 0 ?$t('pubilc.20'):$t('pubilc.21')}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column prop="fbankAddress" :label="$t('table.fbankAddress')">
				</el-table-column>
				<el-table-column prop="fcreateTime" width="200" :label="$t('table.fcreateTime')">
				</el-table-column>
				<el-table-column :label="$t('table.operate')" width="100">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content='$t("button.modify")' placement="top-end">
					<el-button size="small" v-show="bankSetting" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
						</el-button>
                  </el-tooltip>
						<!--<el-button size="small" v-show="bankSetting" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
						</el-button>-->
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog :title="$t('dialog.title')" v-model="dialogVisible" size="small">
				<add-BankAccount ref="form"></add-BankAccount>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
          <el-button type="primary" @click="save">{{$t("dialog.title")}}</el-button>
        </span>
			</el-dialog>
		</div>
	</imp-panel>
</template>

<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import Element from "element-ui";
	import panel from "../../components/panel.vue"
	import * as api from "../../api";
	import auth from '../../auth';
	import addBankAccount from "../../components/addBankAccount";
	import syszh from "../../resources/sys/zh";
	import sysen from "../../resources/sys/en";
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
			"add-BankAccount": addBankAccount
		},
		data() {
			return {
				fcodeD:[],
				memSave: false,
				memDel: false,
				memberBankable: false,
				memBankdisable: false,
				bankSetting: false,
				soptions: [{
					tvalue: '',
					tlabel: this.$t('pubilc.1')
				}],
				svalue: '',
				toptions: [{
						tlabel: this.$t('pubilc.1'),
						tvalue: ""
					},
					{
						tlabel: this.$t('pubilc.20'),
						tvalue: "0"
					}, {
						tlabel: this.$t('pubilc.21'),
						tvalue: "1"
					}
				],
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
				forms:{},
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
			modify(index, row) {
				this.dialogVisible = true;
				this.$http.get(auth.getServerUrl() + api.SYS_BANK_GET + "?fid=" + row.fid)
					.then(res => {
						if(res.data.success == true) {
							let d = res.data.data;
						this.$refs.form.form.fid = d.fid;
						this.$refs.form.form.fbankName = d.fbankName;
						this.$refs.form.form.fownerName = d.fownerName;
						this.$refs.form.form.fbankNumber = d.fbankNumber;
						this.$refs.form.form.fbankAddress = d.fbankAddress;
						}else{
								Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
						
					})
			},
			add() {
				this.dialogVisible = true;
				if(this.$refs.form==undefined){
					
				}else{
				this.$refs.form.form.fid = "";
				this.$refs.form.form.fbankName = "";
				this.$refs.form.form.fownerName = "";
				this.$refs.form.form.fbankNumber = "";
				this.$refs.form.form.fbankAddress = "";
				}
				
			},
			save() {
				var _this = this;
				_this.forms.fid = _this.$refs.form.form.fid;
				_this.forms.fbankName = _this.$refs.form.svalue;
				_this.forms.fownerName = _this.$refs.form.form.fownerName;
				_this.forms.fbankNumber = _this.$refs.form.form.fbankNumber;
				_this.forms.fbankAddress = _this.$refs.form.form.fbankAddress;
				
				this.$http.post(auth.getServerUrl() + api.SYS_BANK_SAVE, _this.forms)
					.then(res => {
						if(res.data.success == true) {
							_this.loadData();
							_this.$message(res.data.msg);
							_this.dialogVisible = false; //关闭弹出层
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
					})

			},
			

			handleSelectionChange(val) { //取消选择触发
				this.currentRow = val.map(i => i.fid);
			},
			del() { //删除会员
				let fids = this.currentRow.join(',');
				this.todo(api.SYS_BANK_ENABLE + "?fids=", fids, this.$t('script.1'));
			},
			enable() { //启用会员
				let fids = this.currentRow.join(',');
				this.todo(api.SYS_BANK_ENABLE + "?fids=", fids, this.$t('script.2'));
			},
			disable() { //禁用会员
				let fids = this.currentRow.join(',')
				this.todo(api.SYS_BANK_DISABLE + "?fids=", fids, this.$t('script.3'));
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
				this.loadData(this.searchKey, timeStar, timeEnd, this.tvalue, this.svalue)
			},
			loadData(str, timeStar, timeEnd, status, ftype) { // fbankName;//银行名称 fstatus;//状态     fownerName;//开户姓名
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				status = (status == undefined) ? "" : status;
				ftype = (ftype == undefined) ? "" : ftype;
				this.$http.get(auth.getServerUrl() + api.SYS_BANK_LIST + "?fownerName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&fbankName=" + ftype + "&fstatus=" + status + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
								title: this.$t('script.4')
							});
						}
					}).catch((error) => {
						this.listLoading = false; //关闭loading
						console.log(error)
					});
			},
//			statusForma(row, column) {
//				return this.getType(row.fstatus);
//			},
			todo(url, param, message) {
				if(param == "") {
					this.$message(this.$t('script.10'));
					return false;
				}
				this.$confirm(message, this.$t('script.5'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: 'warning'
				}).then(() => {
					this.$http.get(auth.getServerUrl() + url + param)
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
									title: this.$t('script.4')
								});
							}
						}).catch(() => {
							this.$message({
								type: 'info',
								message: this.$t('script.6')
							});
						});
				})
			}
		},
		created() {
			this.loadData();
			this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"08",this.soptions);
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/system/bankAccount",this.fcodeD);
			
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>