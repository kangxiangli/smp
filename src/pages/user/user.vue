<style >
	.dialog_box_content1 .box .box-body,
	.dialog_box_content2 .box .box-body {
		height: 500px !important;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.my_dalog_box {
		width: 800px !important;
	}
	
	.my_dalog_box .box .box-body {
		height: 500px !important;
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" >
				<el-col :span="7">
					<!--等级-->
					<span> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{{$t("table.flevel")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="pvalue" :placeholder="$t('title.8')">
						<el-option v-for="item in poptions" :key="item.fid" :label="item.flevel" :value="item.fid">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7">
					<!--状态-->
					<span>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{{$t("table.27")}}</span>
					<el-select  style="width: 210px;" clearable filterable v-model="svalue" :placeholder="$t('title.7')">
						<el-option v-for="item in soptions"  :label="item.slabel" :value="item.svalue">
						</el-option>
					</el-select>

				</el-col>
				<el-col :span="7">
					<!--类型-->
					<span> &nbsp; &nbsp;{{$t("table.67")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="rvalue" :placeholder="$t('title.9')">
						<el-option v-for="item in roptions" :key="item.rvalue" :label="item.rlabel" :value="item.rvalue">
						</el-option>
					</el-select>

				</el-col>
			</el-row>
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
						<input style="width: 210px;" type="text" :placeholder="$t('title.4')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
					
				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("time.4")}}
					</el-button>
				</el-col>
			</el-row>
		</div>
		<div slot="header" style="width: 100%;">
			<el-row style="width: 100%; margin-bottom:0px;">
				<el-col :span="16" >
					<el-tooltip class="item" effect="light" :content='$t("button.resetPhone")' placement="top-end">
                    <el-button size="small" v-show="menuReset3" type="danger" @click="handlePhone"><i class="iconfont icon-shouji"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.resetPassword")' placement="top-end">
                    <el-button size="small" v-show="memberReset1" type="danger" @click="handlePhone"><i class="iconfont icon-denglumima"></i> 
					</el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" :content='$t("button.tradePassword")' placement="top-end">
                    <el-button size="small" v-show="memberReset2" type="danger" @click="handlePhone"><i class="iconfont icon-jiaoyimima"></i> 
					</el-button>
					<el-tooltip class="item" effect="light" :content='$t("button.resetEmail")' placement="top-end">
                    <el-button size="small" v-show="memberReset4" type="danger" @click="handlePhone"><i class="iconfont icon-youxiang"></i> 
					</el-button>
                  </el-tooltip>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" :content='$t("button.able")' placement="top-end">
                    <el-button size="small" v-show="memberEnable" type="success" @click="handlePhone"><i class="iconfont icon-qiyong"></i> 
					</el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" :content='$t("button.disable")' placement="top-end">
                    <el-button size="small" v-show="memberDel" type="warning" @click="handlePhone"><i class="iconfont icon-guanbi"></i> 
					</el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" :content='$t("buttonMember.reviseMember")' placement="top-end">
                    <el-button size="small" v-show="menuUpUsersFscore" type="info" @click="modifyBatch"><i class="iconfont icon-xiugai"></i> 
					</el-button>
                  </el-tooltip>
                  
					<!--<el-button size="small" v-show="menuReset3" type="danger" @click="handlePhone">{{$t("button.resetPhone")}}
					</el-button>
					<el-button size="small" v-show="memberReset1"  type="danger" @click="handlePassword()">{{$t("button.resetPassword")}}
					</el-button>
					<el-button size="small" v-show="memberReset2" type="danger" @click="handleTradersPassword()">{{$t("button.tradePassword")}}
					</el-button>
					<el-button size="small" v-show="memberReset4" type="danger" @click="handleEmail()">{{$t("button.resetEmail")}}
					</el-button>
					<el-button size="small" v-show="memberEnable" type="success" @click="handleEnabled">{{$t("button.able")}}
					</el-button>
					<el-button size="small" v-show="memberDel" type="warning" @click="handleDisable()">{{$t("button.disable")}}
					</el-button>
					<el-button size="small" v-show="menuUpUsersFscore" type="info" @click="modifyBatch()">{{$t("buttonMember.reviseMember")}}
					</el-button>-->
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" width="100" v-if="isShow" label="Id">
				</el-table-column>
				<el-table-column prop="floginName" width="100" :label="$t('table.floginName')">
				</el-table-column>
				<el-table-column prop="frealName" width="100" :label="$t('table.frealName')">
				</el-table-column>
				<el-table-column prop="ftelephone" :label="$t('table.ftelephone')">
				</el-table-column>
				<el-table-column prop="fidentityNo" :label="$t('table.fidentityNo')">
				</el-table-column>
				<el-table-column prop="fregisterTime" :label="$t('table.fregisterTime')">
				</el-table-column>
				<el-table-column prop="fscoreId" :label="$t('table.flevel')">
				</el-table-column>
				<el-table-column prop="fregType" :formatter="fregTypemy" :label="$t('table.52')">
				</el-table-column>
				<!--<el-table-column prop="fstatus" :formatter="statusForma" :label="$t('table.27')">
				</el-table-column>-->
				<el-table-column class-name="status-col" prop="fstatus" :label="$t('table.27')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fstatus | statusFilter" >{{scope.row.fstatus == 0 ? $t('button.disable'):$t('button.able')}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column :label="$t('table.operation')">
					<template scope="scope">
 					<el-tooltip class="item" effect="light" :content='$t("button.checkDetail")' placement="top-end">
					<el-button size="small" :fids="this.currentRow" @click="handleDetail(scope.row)"><i class="iconfont icon-chakan"></i> 
					</el-button>
                  </el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog :title="$t('title.15')" :visible.sync="dialogFormVisibles" size="small">
				<add-level ref="form"></add-level>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibles = false">{{$t("table.9")}}</el-button>
          <el-button type="primary" @click="addMember">{{$t("table.8")}}</el-button>
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
	import detail from "../../components/detail/detail.vue";
	import addLevel from "../../components/addLevel";
	import Element from "element-ui";
	import userzh from "../../resources/user/zh";
	import useren from "../../resources/user/en";
	//	import en from '../../resources/en';
	//	import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(useren)),
		zh: JSON.parse(JSON.stringify(userzh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'), // 语言标识
		messages
	})
	export default {
		components: {
			'imp-panel': panel,
			"detail": detail,
			"addLevel": addLevel
		},
		data() {
			return {
				fcodeD:[],
				memberDel: false,
				memberEnable: false,
				menuReset3: false,
				menuUpUsersFscore: false,
				memberReset1: false,
				memberReset2: false,
				memberReset4: false,
				soptions: [{ //状态
					svalue: '1',
					slabel: this.$t('button.able')
				}, {
					svalue: '2',
					slabel: this.$t('button.disable')
				}],
				svalue: '',
				roptions: [{ //注册类型
					rvalue: '1',
					rlabel: this.$t('table.65')
				}, {
					rvalue: '2',
					rlabel: this.$t('table.66')
				}],
				rvalue: '',
				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
				poptions: [], //等级
				pvalue: '',
				isShow: false,
				currentRow: [],
				dialogFormVisibles: false,
				dialogLoading: false,
//				defaultProps: {
//					children: 'children',
//					label: 'name',
//					id: "id",
//				},
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
				
			modifyBatch() { //批量修改
				let _this = this;
				this.dialogFormVisibles = true;
				this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET_SEL)
					.then(res => {
						if(res.data.success == true) {
							_this.$refs.form.options = res.data.data.content;

						} else {
							this.dialogFormVisibles = false; //关闭弹出层
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.14')
							});
						}

					})
			},
			addMember() { //保存
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.3'),
						type: 'warning'
					});
				} else {
					let _this = this;
					var fscoreId = _this.$refs.form.form.fid
					this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET_UPSAVE + "?ids=" + fids + "&fscoreId=" + fscoreId)
						.then(res => {
							if(res.data.success == true) {
								this.loadData();
								this.$message(res.data.msg);
								this.dialogFormVisibles = false; //关闭弹出层
							} else {
								this.dialogFormVisibles = false; //关闭弹出层
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.14')
								});
							}
						})
				}
			},
			handleEnabled() { // 1代表启用
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.3'),
						type: 'warning'
					});
				} else {
					this.$http.get(auth.getServerUrl() + api.USER_FUSER_ENABLE + "?ids=" + fids)
						.then(res => {
							if(res.data.success == true) {
								this.loadData(this.searchKey);
								this.$message({
									type: 'success',
									message: this.$t('script.4')
								});
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.5')
								});
							}

						})
				}
			},
			handleDisable() { //0代表禁用
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.3'),
						type: 'warning'
					});
				} else {
					this.$http.get(auth.getServerUrl() + api.USER_FUSER_DEL + "?ids=" + fids)
						.then(res => {

							if(res.data.success == true) {
								this.loadData(this.searchKey);
								this.$message({
									type: 'success',
									message: this.$t('script.7')
								});
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: this.$t('script.5')
								});
							}
						})
				}
			},
			handleDetail(row) {
				var fids = row.fid;
//				console.log(fids)
				this.currentRow.push(fids)
				const h = this.$createElement;
				this.$msgbox({
					title: this.$t('title.6'),
					closeOnClickModal: true,
					customClass: "my_dalog_box",
					message: h('p', null, [
						h('detail', {
							props: {
								fids: fids
							}
						}, []),

					]),
//					showCancelButton: true,
//					confirmButtonText: this.$t('script.6'),
//					cancelButtonText: this.$t('script.9'),
//					beforeClose: (action, instance, done) => {
//						if(action === 'confirm') {
//							instance.confirmButtonLoading = true;
//							instance.confirmButtonText = this.$t('script.8');
//							setTimeout(() => {
//								done();
//								setTimeout(() => {
//									instance.confirmButtonLoading = false;
//								}, 300);
//							}, 1500);
//						} else {
//							done();
//						}
//					},
					callback: (action, instance) => {

					},
				}).then(action => {
					this.$message({
						type: 'info',
						message: 'message: ' + action
					});
				});
			},
//			search(target) {
//				this.loadData(this.searchKey);
//			},

			handleSelectionChange(val) {
				this.currentRow = val.map(i => i.fid);

			},

			handlePhone() { //重置手机号
				let fids = this.currentRow.join(',')
				this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET + "?type=" + 3 + "&fid=" + fids)
					.then(res => {
						this.loadData(this.searchKey);
						this.$message(this.$t('script.10'));

					})
			},
			handlePassword() { //重置登录密码
				let fids = this.currentRow.join(',')
				this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET + "?type=" + 1 + "&fid=" + fids)
					.then(res => {
						this.loadData(this.searchKey);
						this.$message(this.$t('script.11'));

					})
			},
			handleTradersPassword() { //重置交易密码
				let fids = this.currentRow.join(',')
				this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET + "?type=" + 2 + "&fid=" + fids)
					.then(res => {
						this.loadData(this.searchKey);
						this.$message(this.$t('script.12'));

					})
			},
			handleEmail() { //重置邮箱
				let fids = this.currentRow.join(',')
				this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET + "?type=" + 4 + "&fid=" + fids)
					.then(res => {
						this.loadData(this.searchKey);
						this.$message(this.$t('script.13'));
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
			handleDelete(index, row) {
				this.$http.get(auth.getServerUrl() + api.SYS_USER_DELETE + "?userIds=" + row.id).then(res => {
					this.loadData(this.searchKey);
				});
			},
			btnCheck() {
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				var timeStar = this.meFormat(this.pvalue1)
				var timeEnd = this.meFormat(this.pvalue2)
				var fregType = this.rvalue; //注册类型
				var fscoreId = this.pvalue; //等级
				this.loadData(this.searchKey, timeStar, timeEnd, fregType, fscoreId)
			},
			loadData(str, timeStar, timeEnd, fregType, fscoreId) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				var timeStar = timeStar;
				var timeEnd = timeEnd;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				fregType = (fregType == undefined) ? "" : fregType;
				fscoreId = (fscoreId == undefined) ? "" : fscoreId;
				this.$http.get(auth.getServerUrl() + api.USER_SMP_DATA + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&fregType=" + fregType + "&fscoreId=" + fscoreId + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
								title: this.$t('script.5')
							});
						}
					}).catch((error) => {
						this.listLoading = false; //关闭loading
						console.log(error)
					});;
			},
			handLevel(str) { //等级
				str = (str == undefined) ? "" : str;
				this.$http.get(auth.getServerUrl() + api.USER_VIP_RESET_SEL)
					.then(res => {
						if(res.data.success = true) {

							var ary = res.data.data.content;
							for(let i = 0; i < ary.length; i++) {
								let obj = {
									fid: "",
									flevel: "",
								};
								obj.fid = ary[i].fid;
								obj.flevel = ary[i].flevel;
								this.poptions.push(obj);
							}
						}
					}).catch((error) => {
						console.log(error)
					});
			},

			statusForma: function(row, column) {
				return row.fstatus == 0 ? this.$t('button.disable') : this.$t('button.able');
			},
			fregTypemy: function(row, column) {
				return row.fregType == 1 ? this.$t('table.65') : (row.fregType == 2 ? this.$t('table.66') : "");
			},
		},
		created() {
			this.loadData(this.searchKey);
			this.handLevel()
			this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/user/user",this.fcodeD);

		}
	}
</script>
