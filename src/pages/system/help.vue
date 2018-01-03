
<template>
	<imp-panel>
		<div class="box-title" slot="header" style="width: 100%;font-size: 14px;line-height: 2;">
			<el-row style="margin-bottom: 0px;">
				<el-col :span="4">
					<el-tooltip class="item" effect="light" :content='$t("button.add")' placement="top-end">
					<el-button size="small"  v-show="faboutSave" type="success" @click="add()"><i class="iconfont icon-zengjia"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.del")' placement="top-end">
					<el-button size="small"  v-show="faboutDel" type="danger" @click="del()"><i class="iconfont icon-shanchu"></i> 
					</el-button>
                  </el-tooltip> 
					<!--<el-button size="small"  v-show="faboutSave" type="success" @click="add()">{{$t("button.add")}}
					</el-button>
					<el-button size="small"  v-show="faboutDel" type="danger" @click="del()">{{$t("button.del")}}
					</el-button>-->
				</el-col>
				<el-col :span="18">
					<el-col :span="9">
						<!--状态-->
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t("table.fstatus")}}</span>
						<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('table.fstatus')">
							<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
							</el-option>
						</el-select>
					</el-col>
					<!--标题-->
				<el-col :span="9">
					<span>{{$t("pubilc.2")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('pubilc.2')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				</el-col>
					<!--搜索-->
					<el-col :span="3">
						<el-button type="info" icon="search" @click="btnCheck()">{{$t("pubilc.4")}}
						</el-button>
					</el-col>
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :data="tableData.rows" :stripe="true" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="ftype" width="200" :label="$t('table.1')">
				</el-table-column>
				<el-table-column prop="ftitle" width="200" :label="$t('table.2')">
				</el-table-column>
				<el-table-column prop="fcontent" class="content" :label="$t('table.3')">
				</el-table-column>
				</el-table-column>
				<el-table-column :label="$t('table.4')" width="100">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content='$t("button.modify")' placement="top-end">
							<el-button size="small" v-show="halpSetting" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
						</el-button>
                  </el-tooltip>
					</template>
					<!--<template scope="scope">
						<el-button size="small" v-show="halpSetting" type="info" @click="modify(scope.$index, scope.row)">{{$t("button.modify")}}
						</el-button>
					</template>-->
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog :title="$t('dialog.title')" v-model="dialogVisible" size="normal">
				<add-Help ref="form"></add-Help>
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
	import panel from "../../components/panel.vue"
	import * as api from "../../api";
	import auth from '../../auth';
	import addHelp from "../../components/addHelp";
	import syszh from "../../resources/sys/zh";
	import sysen from "../../resources/sys/en";
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
			"add-Help": addHelp
		},
		data() {
			return {
				fcodeD:[],
				faboutSave: false,
				faboutDel: false,
				forms: {},
				
				toptions: [{
					tlabel: this.$t('pubilc.1'),
					tvalue: ""
				}],
				tvalue: '',
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
			modify(index, row) {
				let _this = this;
				this.dialogVisible = true;
				this.$http.get(auth.getServerUrl() + api.SYS_HELP_GET + "?fid=" + row.fid)
					.then(res => {
						if(res.data.success == true) {
							let d = res.data.data;
							_this.$refs.form.form.fid = d.fid;
							_this.$refs.form.form.ftitle = d.ftitle;
							_this.$refs.form.form.fcontent = d.fcontent;
							_this.$refs.form.form.ftype = d.ftype;
							_this.getType();
						} else {
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
				if(this.$refs.form == undefined) {
					
				} else {
					this.getType();
					this.$refs.form.form.fid = "";
					this.$refs.form.form.ftitle = "";
					this.$refs.form.form.fcontent = "";
					this.$refs.form.form.ftype = "";
				}
			},
			save() {
				var _this = this;
				_this.forms = _this.$refs.form.form;
				this.$http.post(auth.getServerUrl() + api.SYS_HELP_SAVE, _this.forms)
					.then(res => {
						if(res.data.success == true) {
							this.loadData();
							this.$message(res.data.msg);
							this.dialogVisible = false; //关闭弹出层
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
				if(fids == "") {
					this.$message(this.$t('script.10'));
					return false;
				}
				this.$confirm(this.$t('script.1'), this.$t('script.5'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: 'warning'
				}).then(() => {
					this.$http.get(auth.getServerUrl() + api.SYS_HELP_DEL + "?fids=" + fids)
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
									title: this.$t('script.1')
								});
							}
						}).catch(() => {
							this.$message({
								type: 'info',
								message: this.$t('script.6')
							});
						});
				})
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
				this.loadData( this.searchKey,this.tvalue);//标题searchKey
			},
			loadData(ftitle, ftype) { 
				this.listLoading = true;
				ftitle = (ftitle == undefined) ? "" : ftitle;
				ftype = (ftype == undefined) ? "" : ftype;
				let _this = this;
				this.$http.get(auth.getServerUrl() + api.SYS_HELP_LIST + "?ftitle="+ftitle+ "&ftype="+ ftype+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
							this.listLoading = false; //关闭loading
							var d = res.data;
							_this.tableData.rows = d.data.content;
							_this.tableData.pagination.total = d.data.totalElements;
						} else {
							this.listLoading = false; //关闭loading
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.1')
							});
						}

					});
			},
			getType() {
				let _this = this;
				this.$http.get(auth.getServerUrl() + api.SYS_HELP_TYPE_GET)
					.then(res => {
						if(res.data.success == true) {
							var d = res.data;
							_this.$refs.form.options = d.data;
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.1')
							});
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: this.$t('script.12')
						});
					});
			}
		},
		created() {
			this.loadData();
			this.handStatus(auth.getServerUrl(), api.USER_RBANK_TYPE, "0702", this.toptions); //帮助分类类型
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/system/help",this.fcodeD);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
	
	.content {
		text-overflow: clip;
	}
</style>