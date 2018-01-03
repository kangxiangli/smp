<template>
	<imp-panel>
		<div class="box-title people_form" slot="header" style="width: 100%; font-size:14px ;">
			<el-row style="width: 100%; margin-bottom: 0;">
				<el-col :span="15">
					<el-tooltip class="item" effect="light" :content='$t("button.add")' placement="top-end">
					<el-button size="small" type="success" @click="add"><i class="iconfont icon-zengjia"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.del")' placement="top-end">
					<el-button size="small" type="danger" @click="delMember()"><i class="iconfont icon-shanchu"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.enable")' placement="top-end">
					<el-button size="small" type="success" @click="handleEnabled"><i class="iconfont icon-qiyong"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.disable")' placement="top-end">
                    
					<el-button size="small" type="warning" @click="handleDisable()"><i class="iconfont icon-guanbi"></i>
					</el-button>
                  </el-tooltip> 
					<!--<el-button size="small" type="success" @click="add">{{$t("button.add")}}
					</el-button>
					<el-button size="small" type="danger" @click="delMember()">{{$t("button.del")}}
					</el-button>
					<el-button size="small" type="success" @click="handleEnabled">{{$t("button.enable")}}
					</el-button>
					<el-button size="small" type="warning" @click="handleDisable()">{{$t("button.disable")}}
					</el-button>-->
				</el-col>
				<el-col :span="6">
					<!--状态-->
					<span>{{$t("table.fstatus")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('table.fstatus')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="loadData()">{{$t("pubilc.4")}}
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-show="isShow" label="Id">
				</el-table-column>
				<el-table-column prop="fkey" label="KEY">
				</el-table-column>
				<el-table-column prop="fvalue" :label="$t('table.11')">
				</el-table-column>
				<el-table-column prop="fdesc" :label="$t('table.12')">
				</el-table-column>
				<!--<el-table-column prop="fstate" :formatter="fstate" :label="$t('table.fstatus')">
				</el-table-column>-->
				<el-table-column class-name="status-col" width="100" prop="fstate" :label="$t('table.fstatus')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fstate | statusFilter" >{{scope.row.fstate == 0?$t('button.enable') : $t('button.disable')}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column :label="$t('table.operate')">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content='$t("button.change")' placement="top-end">
						<el-button size="small" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
						</el-button>
	                  </el-tooltip>
						<!--<el-button size="small" type="info" @click="modify(scope.$index, scope.row)">{{$t("button.change")}}
						</el-button>-->
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog custom-class="dialog_content" :title="$t('dialog.title')" :visible.sync="dialogFormVisible" size="small">
				<add-systems ref="form"></add-systems>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible  = false">{{$t("button.cancel")}}</el-button>
            <el-button type="primary" @click="save()">{{$t("dialog.title")}}</el-button>
         
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
	import * as api from "../../api"
	import auth from "../../auth"
	import addSystems from "../../components/addSystems.vue";
	import syszh from "../../resources/sys/zh";
	import sysen from "../../resources/sys/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh'
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
			"addSystems": addSystems,
		},
		data() {
			return {
				isShow: false,
				forms: {},
				toptions: [{
						tlabel: this.$t('pubilc.1'),
						tvalue: ""
					},
					{
						tlabel: this.$t('pubilc.20'),
						tvalue: "1"
					}, {
						tlabel: this.$t('pubilc.21'),
						tvalue: "0"
					}
				],
				tvalue: '',
				currentRow: [],
				dialogFormVisible: false,
				dialogLoading: false,
				listLoading: false,
				
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

			delMember() { //删除会员
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
				this.$http.get(auth.getServerUrl() + api.SYS_SYSTEMS_DEL + "?ids=" + fids)
					.then(res => {
						if(res.data.success == true) {
							this.$message(res.data.msg);
							this.loadData();
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}

					})
					}
			},
			handleEnabled() { //启用fstate;//状态  0启用 1 禁用 2 删除
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
					this.$http.get(auth.getServerUrl() + api.SYS_SYSTEMS_STATES_SAVE + "?fid=" + fids + "&fstate=" + 0)
						.then(res => {
							if(res.data.success == true) {
								this.loadData();
								this.$message({
									type: 'success',
									message: res.data.msg
								});
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.4')
								});
							}

						})
				}
			},
			handleDisable() { //禁用 fstatu =1
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
					this.$http.get(auth.getServerUrl() + api.SYS_SYSTEMS_STATES_SAVE + "?fid=" + fids + "&fstate=" + 1)
						.then(res => {
							if(res.data.success == true) {
								this.loadData();
								this.$message({
									type: 'success',
									message: res.data.msg
								});
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.4')
								});
							}
						})
				}
			},
			modify(index, row) { //修改
				let _this = this;
				var fids = row.fid
				_this.dialogFormVisible = true;
				this.$http.get(auth.getServerUrl() + api.SYS_SYSTEMS_GET + "?fid=" + fids)
					.then(res => {
							if(res.data.success == true) {
								var d = res.data.data;
						_this.$refs.form.form.fid = d.fid;
						_this.$refs.form.form.fvalue = d.fvalue;
						_this.$refs.form.form.fdesc = d.fdesc;
						_this.$refs.form.form.fkey = d.fkey;
						this.$refs.form.form.fstate = d.fstate;
							}else{
								Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
							}
						
					})
			},
			save() { //保存
				let _this = this;
				var formData = new FormData();
				formData.append('filedata', this.$refs.form.filedata);
				formData.append('fid', this.$refs.form.form.fid);
				formData.append('fdesc', this.$refs.form.form.fdesc);
				formData.append('fvalue', this.$refs.form.form.fvalue);
				formData.append('fkey', this.$refs.form.form.fkey);
				formData.append('fstate', this.$refs.form.form.fstate);

				//		    	if(this.forms.fdesc==""||this.forms.fkey==""||this.forms.fseq==""||this.forms.file==""){
				//		      			 Element.MessageBox({type:"error",message:"请将信息填写完整",title:"温馨提示"});
				//		      	}else{
				this.$http.post(auth.getServerUrl() + api.SYS_SYSTEMS_SAVE, formData)
					.then(res => {
						if(res.data.success == true) {
							_this.dialogFormVisible = false; //关闭弹出层
							_this.$message(res.data.msg);
							_this.loadData();
						} else {

							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.4')
							});
						}
					})
				//		      	}
			},
			add() { //添加
				let _this = this;
				_this.dialogFormVisible = true;
				if(this.$refs.form == undefined) {
					
				} else {
					_this.$refs.form.form.fkey = "";
				_this.$refs.form.form.fvalue = "";
				_this.$refs.form.form.fdesc = "";
				_this.$refs.form.form.fstate = "";
				}
			},
			handleSelectionChange(val) { //取消选择触发
				this.currentRow = val.map(i => i.fid);
			},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				this.loadData();
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.loadData();
			},
			loadData() {
				this.listLoading = true;
				this.$http.get(auth.getServerUrl() + api.SYS_SYSTEMS_LIST+"?str=" + this.tvalue+"&rows="+this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
//			fstate: function(row, column) {
//				return row.fstate == 0 ? this.$t('button.enable') : this.$t('button.disable') //状态  0启用 1 禁用 2 删除
//			},
		},
		created() {
			this.loadData();
		}
	}
</script>