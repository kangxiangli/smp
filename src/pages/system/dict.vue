<template>
	<imp-panel>

		<el-row slot="body" style="margin-bottom: 20px;" :gutter="24">
			<el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" style="margin-bottom: 20px;">
				<el-input :placeholder="$t('table.6')" v-model="filterText">
				</el-input>
				<el-tree :data="treeData" :props="defaultProps" node-key="id" :highlight-current="true" :expand-on-click-node="false" :render-content="renderContent" :filter-node-method="filterNode" :load="loadNode" ref="tree2" lazy @node-click="getNode">
				</el-tree>
			</el-col>
			<el-col :span="16" :xs="12" :sm="16" :md="16" :lg="16">
				<el-card class="box-card">
					<div class="text item">
						<h3 class="box-title" slot="header" style="width: 100%;">
				      <el-row style="width: 100%;">
				        <el-col :span="24">
				          <div class="el-input" style="width: 200px; float: right;">
				            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
				            <input type="text" :placeholder="$t('table.7')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				          </div>
				        </el-col>
				      </el-row>
				    </h3>
						<div slot="body">
							<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
								<el-table-column prop="fcode" :label="$t('table.9')">
								</el-table-column>
								<el-table-column prop="fparentId" :label="$t('table.10')">
								</el-table-column>
								<!--<el-table-column prop="fstate" :label="$t('table.fstatus')">
								</el-table-column>-->
								<el-table-column class-name="status-col" width="100" prop="fstate" :label="$t('table.fstatus')" >
									 <template scope="scope">
							          <el-tag :type="scope.row.fstate | statusFilter" >{{scope.row.fstate == 0 ?$t('pubilc.20'):$t('pubilc.21')}}</el-tag>
							        </template>
								</el-table-column>
								<el-table-column prop="fvalue" :label="$t('table.3')">
								</el-table-column>
							</el-table>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
							</el-pagination>
							<el-dialog :title="$t('dialog.title')" v-model="dialogVisible" size="small">
								<add-Dict ref="form"></add-Dict><span slot="footer" class="dialog-footer">
				          <el-button @click="dialogVisible = false">{{$t("button.cancel")}}</el-button>
				          <el-button type="primary" @click="save">{{$t("dialog.title")}}</el-button>
				        </span>
							</el-dialog>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</imp-panel>

</template>
<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import panel from "../../components/panel.vue";
	import Element from "element-ui";
	import addDict from "../../components/addDict";
	//import treeter from "../../components/treeter";
	import merge from "element-ui/src/utils/merge";
	import * as api from "../../api";
	import auth from "../../auth";
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
			"imp-panel": panel,
			"add-Dict": addDict
		},
		data() {
			return {
				fcodeD:[],
				sysAdd: false,
				sysModify: false,
				sysDel: false,
				filterText: "",
				treeData: [],
				defaultProps: {
					children: "children",
					label: "label"
				},
				forms: {},
				store: "",
				value: "",
				parentId: "",
				currentRow: [],
				dialogVisible: false,
				dialogLoading: false,
				roleTree: [],
				listLoading: false,
				searchKey: "",
				tableData: {
					pagination: {
						total: 0,
						pageNo: 1,
						pageSize: 10,
						parentId: 0
					},
					rows: []
				}
			};
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		i18n,
		methods: {

			save() {
				var _this = this;
				_this.forms = _this.$refs.form.form;
				this.$http
					.post(auth.getServerUrl() + api.SYS_DICT_SAVE, _this.forms)
					.then(res => {
						if(res.data.success == true) {
							this.loadData();
							this.$message(res.data.msg);
							this.dialogVisible = false; //关闭弹出层
						} else {
							this.dialogVisible = false; //关闭弹出层
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
					});
			},
			search(target) {
				this.loadData(this.searchKey);
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			handleCurrentChange() {},
			handleSelectionChange() {},
			handleSizeChange() {},
			loadNode(node, resolve) {
				let id = node.data.length == 0 ? "" : node.data.id;
				this.parentId = id;
				this.$http
					.get(auth.getServerUrl() + api.SYS_DICT_TREE_LIST + "?fparentId=" + id)
					.then(res => {
						var d = res.data.data;
						var data1 = [];
						for(let i = 0; i < d.length; i++) {
							let obj = {
								id: "",
								label: "",
								children: []
							};
							obj.id = d[i].fid;
							obj.label = d[i].fvalue;
							data1.push(obj);
						}
						return resolve(data1);
					});
			},
			append(store, data) {
				this.dialogVisible = true;
				let _this = this;
				_this.$refs.form.form.fid = "";
				_this.$refs.form.form.fcode = "";
				// _this.$refs.form.form.fparentId=d.fparentId;
				_this.$refs.form.form.fvalue = "";
				_this.$refs.form.form.fstate = "";
				this.$http
					.get(
						auth.getServerUrl() + api.SYS_DICT_PARENTNODE_GET + "?fid=" + data.id
					)
					.then(res => {
						if(res.data.success === true) {
							this.$message({
								type: "success",
								message: res.data.msg
							});

							var d = res.data;
							_this.$refs.form.form.fparentId = data.id;
							let arr = [];
							for(let i = 0; i < d.data.length; i++) {
								let arrC = {
									value: "",
									label: ""
								};
								arrC.value = d.data[i].fid;
								arrC.label = d.data[i].fvalue;
								arr.push(arrC);
							}

							_this.$refs.form.fparentIds = arr;
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: this.$t('script.6')
						});
					});
			},
			modify(store, data) {
				this.dialogVisible = true;
				let _this = this;

				this.$http
					.get(
						auth.getServerUrl() + api.SYS_DICT_PARENTNODE_GET + "?fid=" + data.id
					)
					.then(res => {
						if(res.data.success === true) {
							this.$message({
								type: "success",
								message: res.data.msg
							});

							var d = res.data;
							_this.$refs.form.form.fparentId = data.id;
							let arr = [];
							for(let i = 0; i < d.data.length; i++) {
								let arrC = {
									value: "",
									label: ""
								};
								arrC.value = d.data[i].fid;
								arrC.label = d.data[i].fvalue;
								arr.push(arrC);
							}

							_this.$refs.form.fparentIds = arr;
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: this.$t('script.6')
						});
					});
				this.$http
					.get(
						auth.getServerUrl() + api.SYS_DICT_GET + "?fid=" + data.id
					)
					.then(res => {
						if(res.data.success === true) {
							this.$message({
								type: "success",
								message: res.data.msg
							});

							var d = res.data.data;
							_this.$refs.form.form.fid = d.fid;
							_this.$refs.form.form.fcode = d.fcode;
							_this.$refs.form.form.fparentId = d.fparentId;
							_this.$refs.form.form.fvalue = d.fvalue;
							_this.$refs.form.form.fstate = d.fstate;
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: this.$t('script.6')
						});
					});
			},
			remove(store, data) {
				this.$confirm(this.$t('script.1'), this.$t('script.5'), {
					confirmButtonText: this.$t('script.7'),
					cancelButtonText: this.$t('script.9'),
					type: "warning"
				}).then(() => {
					this.$http
						.get(auth.getServerUrl() + api.SYS_DICT_DEL + "?fid=" + data.id)
						.then(res => {
							if(res.data.success === true) {
								this.$message({
									type: "success",
									message: res.data.msg
								});
								store.remove(data);
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.4')
								});
							}
						})
						.catch(() => {
							this.$message({
								type: "info",
								message: this.$t('script.6')
							});
						});
				});
			},

			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span>
	          <span>
	            <span> {node.label} </span>
	          </span>
	          <span style="float: right; margin-right: 20px">
	        <el-tooltip class="item" effect="light" content={this.$t("script.15")} placement="top-end">
	            <el-button size="mini" v-show={this.sysAdd} on-click={() => this.append(store, data)} type="success"> <i class="iconfont icon-zengjia"></i> </el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content={this.$t('button.modify')} placement="top-end">
	            <el-button size="mini" v-show={this.sysModify} on-click={() => this.modify(store, data)} type="info"> <i class="iconfont icon-xiugai"></i> </el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content={this.$t('button.del')} placement="top-end">
	            <el-button size="mini" v-show={this.sysDel} on-click={() => this.remove(store, data)} type="danger"> <i class="iconfont icon-shanchu"></i> </el-button>
				</el-tooltip>
	          
	          </span>
         </span>
				)
			},

			handleNodeClick(data) {
				// this.loadTreeData(data.id);
			},
			getNode(node) {
				this.parentId = node.id;
				let str = "";
				this.loadData(str);
			},
			loadData(str) {
				//初始化表格
				this.listLoading = true;
				str = str == undefined ? "" : str;
				this.$http
					.get(
						auth.getServerUrl() + api.SYS_DICT_TABLE_LIST + "?fparentId=" + this.parentId + "&fvalue=" + str + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
			}
		},
		created() {
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/system/dictionaries",this.fcodeD);
		}
	};
</script>

<style>
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both;
	}
</style>