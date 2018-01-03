
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style="margin-bottom: 10px;">
				<!--虚拟币类型-->
				<el-col :span="7">
					<span>{{$t("title.17")}}</span>
					<el-select v-model="value" clearable filterable :placeholder="$t('title.1')">
						<el-option v-for="item in options" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<!--状态-->
				<el-col :span="7">
					<span>{{$t("popups.5")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('title.1')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<!--登录名-->
				<el-col :span="7">
					<span>{{$t("popups.32")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('title.18')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">

				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("title.11")}}
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="box-title" slot="header" style="width: 100%;margin-bottom: 0;">
			<el-row style="width: 100%;margin-bottom: 0;">
				<el-col :span="8">
				<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.addVirtual")' placement="top-start">
					<el-button size="small" type="success" v-show="saveManualRecharge" @click="add"><i class="iconfont icon-zengjia"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.audit")' placement="top-end">
					<el-button size="small" type="warning" v-show="auditManualRecharge" @click="handleCheck()"><i class="iconfont icon-shenhetongguo1"></i>
					</el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.freeze")' placement="top-end">
					<el-button size="small" type="success" v-show="releaseFreeze" @click="handleFreeze"><i class="iconfont icon-fabu"></i>
					</el-button>
				</el-tooltip>
					<!--<el-button size="small" type="success"   v-show="saveManualRecharge" @click="add">{{$t("buttonVirtual.addVirtual")}}
					</el-button>
					<el-button size="small" type="warning"   v-show="auditManualRecharge" @click="handleCheck()">{{$t("buttonVirtual.audit")}}
					</el-button>
					<el-button size="small" type="success"   v-show="releaseFreeze" @click="handleFreeze">{{$t("buttonVirtual.freeze")}}
					</el-button>-->
				</el-col>
				
			</el-row>
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				</el-table-column>
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-if="isShow" label="ID">
				</el-table-column>
				<el-table-column prop="fuserFid" :label="$t('table.11')">
				</el-table-column>
				<el-table-column prop="fviName" :label="$t('table.34')">
				</el-table-column>
				<el-table-column prop="ftradeUniqueNumber" width="110" :label="$t('table.20')">
				</el-table-column>
				<el-table-column prop="fstatus" :formatter="fstatus" :label="$t('table.2')">
				</el-table-column>
				<!--<el-table-column prop="ftype" :formatter="ftype" :label="$t('table.22')">
				</el-table-column>-->
				<el-table-column prop="floginName" width="110" :label="$t('table.17')">
				</el-table-column>
				<el-table-column prop="frealName" width="125" :label="$t('table.18')">
				</el-table-column>
				<el-table-column :title="$t('table.7')" width="100">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content="$t('buttonVirtual.checkDetail')" placement="top-end">
							<el-button size="small" @click="handleDetail( scope.row)"><i class="iconfont icon-chakan"></i>
						</el-button>
						</el-tooltip>
						<!--<el-button size="small" @click="handleDetail( scope.row)">{{$t("buttonVirtual.checkDetail")}}
						</el-button>-->

					</template>
				</el-table-column>

			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog custom-class="dialog_box_conten" :title="$t('table.10')" :visible.sync="dialogFormVisible" size="normal">
				<add-push ref="form"></add-push>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible  = false">{{$t("table.9")}}</el-button>
            <el-button type="primary" @click="save()">{{$t("table.8")}}</el-button>
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
	import auth from "../../auth"
	import Element from "element-ui";
	import addPush from "../../components/addPush.vue";
	import detail from "../../components/detail/tow.vue";
	import virtualzh from "../../resources/virtual/zh";
	import virtualen from "../../resources/virtual/en";
	//	import en from '../../resources/en';
	//	import zh from '../../resources/zh';
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
			"detail": detail,
			"addPush": addPush
		},
		data() {
			return {
				fcodeD:[],
				saveManualRecharge: false,
				auditManualRecharge: false,
				releaseFreeze: false,
				toptions: [{
						tvalue: "",
						tlabel: this.$t('title.1')
					},

				],
				tvalue: '', //类型
				isShow: false,
				options: [{
					value: '',
					label: this.$t('title.1')
				}],
				value: '',
				currentRow: [],
				dialogFormVisible: false,
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
		methods: {
			fstatus: function(row, column) { //0502 转入成功 0501待确认 0503正在处理
				return row.fstatus != "0502" ? (row.fstatus == "0503" ? this.$t('script.1') : this.$t('script.2')) : this.$t('script.3');
			},
			handleFreeze() { //发放冻结
				let fids = this.currentRow.join(',')

				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
					this.$confirm(this.$t('script.15'), this.$t('script.16'), {
						confirmButtonText: this.$t('script.7'),
						cancelButtonText: this.$t('script.9'),
						type: 'warning'
					}).then(() => {
						this.$http.get(auth.getServerUrl() + api.VIRTUAL_PUSH_OUT_FREEZE + "?ids=" + fids)
							.then(res => {
								if(res.data.success == true) {
									this.loadData(this.searchKey);
									this.$message({
										type: 'success',
										message: res.data.msg
									});
								} else {
									Element.MessageBox({
										type: "error",
										message: res.data.msg,
										title: this.$t('script.6')
									});
								}
							})

					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.data.msg
						});
					});

				}
			},
			handleCheck() { //审核 
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
					this.$confirm(this.$t('script.17'), this.$t('script.16'), {
						confirmButtonText: this.$t('script.7'),
						cancelButtonText: this.$t('script.9'),
						type: 'warning'
					}).then(() => {
						this.$http.get(auth.getServerUrl() + api.VIRTUAL_PUSH_CHECK + "?ids=" + fids)
							.then(res => {
								if(res.data.success == true) {

									this.loadData(this.searchKey);
									this.$message({
										type: 'success',
										message: res.data.msg
									});
								} else {
									Element.MessageBox({
										type: "error",
										message: res.data.msg,
										title: this.$t('script.6')
									});
								}
							})

					}).catch(() => {
						this.$message({
							type: 'info',
							message: "error"
						});
					});

				}
			},
			delMember() { //删除
				let fids = this.currentRow.join(',')
				this.$http.get(api.VIRTUAL_PUSH_DELECT + "?fid=" + fids)
					.then(res => {
						if(res.data.success == true) {
							this.$message(res.data.msg);
							this.loadData(this.searchKey);
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.6')
							});
						}

					})
			},

			add() { //添加
				let _this = this;
				_this.dialogFormVisible = true;

			},
			save() { //保存
				let _this = this;
				this.forms = {
					fuserFid: this.$refs.form.currentRow1,
					fviFid: this.$refs.form.currentRow2,
					famount: this.$refs.form.form.famount,
				};
				if(this.forms.fuserFid == "" || this.forms.famount == "" || this.forms.fviFid == "" || this.forms.fstatus == "") {
					Element.MessageBox({
						type: "error",
						message: this.$t('script.11'),
						title: this.$t('script.6')
					});
				} else {
					this.$http.post(auth.getServerUrl() + api.VIRTUAL_PUSH_ADD, this.forms)
						.then(res => {
							if(res.data.success == true) {
								_this.dialogFormVisible = false; //关闭弹出层
								_this.$message(res.data.msg);
								_this.loadData();
							} else {

								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.6')
								});
							}
						})
				}
			},
			handleDetail(row) { //查看详情
				var fids = row.fid;
				this.currentRow.push(fids)
				const h = this.$createElement;
				this.$msgbox({
					title: this.$t('script.18'),
					closeOnClickModal: true,
					customClass: "my_dalog_box",
					message: h('p', null, [
						h('detail', {
							props: {
								fids: fids
							}
						}, []),
					]),
					showCancelButton: true,
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					beforeClose: (action, instance, done) => {
						if(action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = this.$t('script.8');
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
								}, 300);
							}, 1500);
						} else {
							done();
						}
					},
					callback: (action, instance) => {

					},
				}).then(action => {
					this.$message({
						type: 'info',
						message: res.data.msg
					});
				});
			},

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
				this.loadData(this.searchKey,this.tvalue,this.value)
			},
			loadData(str, status, viName) {//viName,status,fuName
				this.listLoading = true;
				status = (status == undefined) ? "" : status;
				viName = (viName == undefined) ? "" : viName;
				str = (str == undefined) ? "" : str;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_PUSH_LIST + "?fuName=" + str + "&status=" + status + "&viName=" + viName + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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

			ftype: function(row, column) {
				return row.ftype == "05" ? this.$t('script.13') : (row.ftype == "06" ? this.$t('script.14') : (row.ftype == "0305" ? this.$t('script.19') : ""));
			}
		},
		created() {
			this.loadData();
			this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/virtual/pushMoneyList",this.fcodeD);
			this.handLink(auth.getServerUrl(),api.VIRTUAL_CAPTUAL_OPERATION_TYPE);
			this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"05",this.toptions);
			

		},
		mounted(){
			
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
	/* .dialog_content{
		min-width:900px;
	} */
</style>