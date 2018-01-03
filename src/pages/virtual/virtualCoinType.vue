<style>
	.dialog_content1 .box .box-body,
	.dialog_content2 .box .box-body {
		height: 500px !important;
		overflow-x: hidden;
		overflow-y: scroll;
	}
</style>
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24">
				<el-col :span="7">
					<!--允许交易-->
					<span>&nbsp; &nbsp;{{$t("title.7")}}</span>
					<el-select style="width: 210px;" v-model="value1" :placeholder="$t('title.13')">
						<el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7">
					<!--充值提现-->
					<span>{{$t("title.8")}}</span>
					<el-select style="width: 210px;" v-model="value2" :placeholder="$t('title.14')">
						<el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.value2">
						</el-option>
					</el-select>

				</el-col>
				<el-col :span="7">
					<!--默认资产-->
					<span>&nbsp; &nbsp;{{$t("title.9")}}</span>
					<el-select style="width: 210px;" v-model="value3" :placeholder="$t('title.15')">
						<el-option v-for="item in options3" :key="item.value3" :label="item.label3" :value="item.value3">
						</el-option>
					</el-select>

				</el-col>
			</el-row>
			<el-row :gutter="24">
				<!--人民币充值-->
				<el-col :span="7">
					<span>{{$t("title.10")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="value4" :placeholder="$t('title.12')">
						<el-option v-for="item in options4" :key="item.value4" :label="item.label4" :value="item.value4">
						</el-option>
					</el-select>
				</el-col>
				<!--结束时间-->
				<el-col :span="7">
					<!--状态-->
					<span>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t("popups.5")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="value5" :placeholder="$t('popups.5')">
						<el-option v-for="item in options5" :key="item.value5" :label="item.label5" :value="item.value5">
						</el-option>
					</el-select>
				</el-col>
				<!--登录名-->
				<el-col :span="7">
					<span>{{$t("popups.7")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('title.16')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">

				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("title.11")}}
					</el-button>
				</el-col>
			</el-row>
		</div>
		<h3 class="box-title people_form" slot="header" style="width: 100%;">
			
    <el-row style="width: 100%; margin-bottom: 0;">
	<el-col :span="12">
		<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.addVirtual")' placement="top-end">
			<el-button size="small" type="success" v-show="fviSave" @click="add"><i class="iconfont icon-zengjia"></i>
			</el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.delectVirtual")' placement="top-end">
			<el-button size="small" type="danger" v-show="fviDel" @click="handleDisable()"><i class="iconfont icon-shanchu"></i>
			</el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.able")' placement="top-end">
			<el-button size="small" type="success" v-show="updateDefAsset" @click="handleEnabled"><i class="iconfont icon-qiyong"></i>
			</el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="light" :content='$t("buttonVirtual.disable")' placement="top-end">
			<el-button size="small" type="warning" v-show="updateDefAsset2" @click="handleDisable()"><i class="iconfont icon-guanbi"></i>
			</el-button>
		</el-tooltip>
         <!--<el-button size="small" type="success" v-show="fviSave" @click="add">{{$t("buttonVirtual.addVirtual")}}
		</el-button>
		<el-button size="small" type="danger" v-show="fviDel" @click="handleDisable()">{{$t("buttonVirtual.delectVirtual")}}
		</el-button>
		<el-button size="small" type="success" v-show="updateDefAsset" @click="handleEnabled">{{$t("buttonVirtual.able")}}
		</el-button>
		<el-button size="small" type="warning" v-show="updateDefAsset2" @click="handleDisable()">{{$t("buttonVirtual.disable")}}
		</el-button>-->
        </el-col>

      </el-row>
    </h3>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" width="100" v-if="isShow" label="Id">
				</el-table-column>
				<el-table-column prop="fshortName" :label="$t('table.1')">
				</el-table-column>
				<el-table-column prop="fname" :label="$t('popups.7')">
				</el-table-column>
				<!--<el-table-column width="80" prop="fstatus" :formatter="statusForma" :label="$t('table.2')">
				</el-table-column>-->
				<el-table-column class-name="status-col" prop="fstatus" :label="$t('table.2')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fstatus | statusFilter">{{ scope.row.fstatus == "" ? "" : (row.fstatus == 0 ? this.$t('buttonVirtual.disable') : (row.fstatus == 1 ? this.$t('buttonVirtual.able') : (row.fstatus == 2 ? this.$t('buttonVirtual.delectVirtual') : "")))}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column prop="fisShare" :formatter="fisShare" :label="$t('table.3')">
				</el-table-column>
				<!--<el-table-column width="120" prop="fIsWithDraw" :formatter="fIsWithDraw" :label="$t('table.4')">
				</el-table-column>-->
				<el-table-column prop="fisDefAsset" :formatter="fisDefAsset" :label="$t('table.5')">
				</el-table-column>
				<!--<el-table-column width="150" prop="fisRecharge" :formatter="fisRecharge" :label="$t('table.6')">
				</el-table-column>-->
				<el-table-column width="300" :label="$t('table.7')">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content="$t('buttonVirtual.checkDetail')" placement="top-end">
							<el-button size="small" v-show="memberGet" @click="handleDetail( scope.row)"><i class="iconfont icon-chakan"></i>
							</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="light" :content="$t('buttonVirtual.change')" placement="top-end">
							<el-button size="small" v-show="menberSaveFfees" type="info" @click="charge(scope.$index, scope.row)"><i class="iconfont icon-shouxufei"></i>
							</el-button>
						</el-tooltip>
						<el-button size="small" v-show="menberSaveFfees2" type="primary" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i>
						</el-button>
						<el-tooltip class="item" effect="light" :content="$t('buttonVirtual.ableInint')" placement="top-end">
							<el-button size="small" v-show="memberSetAble" type="warning" @click="handleOpen(scope.row)"><i class="iconfont icon-qiyong"></i>
							</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="light" :content="$t('buttonVirtual.makeSite')" placement="top-end">
							<el-button size="small" v-show="generaAddress" type="success" @click="handleBagAdss(scope.row)"><i class="iconfont icon-location"></i>
							</el-button>
						</el-tooltip>

						<!--<el-tooltip  effect="light" :content="$t('buttonVirtual.checkDetail')" placement="top-end">
							<el-button size="small" v-show="memberGet" @click="handleDetail( scope.row)">{{$t("buttonVirtual.3")}}
							</el-button>
						</el-tooltip>
						<el-tooltip  effect="light" :content="$t('buttonVirtual.change')" placement="top-end">
							<el-button size="small" v-show="menberSaveFfees" type="info" @click="charge(scope.$index, scope.row)">{{$t("buttonVirtual.changeV")}}
							</el-button>
						</el-tooltip>
						<el-button size="small" v-show="menberSaveFfees2" type="primary" @click="modify(scope.$index, scope.row)">{{$t("buttonVirtual.changeV")}}
						</el-button>
						<el-tooltip   effect="light":content="$t('buttonVirtual.ableInint')" placement="top-end">
							<el-button size="small" v-show="memberSetAble" type="warning" @click="handleOpen(scope.row)">{{$t("buttonVirtual.1")}}
							</el-button>
						</el-tooltip>
						<el-tooltip  effect="light" :content="$t('buttonVirtual.makeSite')" placement="top-end">
							<el-button size="small" v-show="generaAddress" type="success" @click="handleBagAdss(scope.row)">{{$t("buttonVirtual.2")}}
							</el-button>
						</el-tooltip>-->
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog custom-class="dialog_content1" :title="$t('table.10')" :visible.sync="dialogFormVisible" size="small">
				<add-virtual ref="form"></add-virtual>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible  = false">{{$t("table.9")}} </el-button>
            <el-button type="primary" @click="save()">{{$t("table.8")}}</el-button>
         
          </span>
			</el-dialog>
			<!--修改手续费-->
			<el-dialog custom-class="dialog_content2" :title="$t('table.11')" :visible.sync="dialogFormVisible1" size="small">
				<addService ref="formData"></addService>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1  = false">{{$t("table.9")}}</el-button>
            <el-button type="primary" @click="savefee()">{{$t("table.8")}}</el-button>
         
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
	import detail from "../../components/detail/etail.vue";
	import addVirtual from "../../components/addVirtual.vue";
	import addService from "../../components/addService.vue";
	import virtualzh from "../../resources/virtual/zh";
	import virtualen from "../../resources/virtual/en";
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
			"addVirtual": addVirtual,
			"detail": detail,
			"addService": addService
		},
		data() {
			return {
				fcodeD: [],
				fviDel: false,
				fviSave: false,
				updateDefAsset: false,
				updateDefAsset2: false,
				memberSetAble: false,
				memberSetAble2: false,
				generaAddress: false,
				memberGet: false,
				menberSaveFfees: false,
				menberSaveFfees2: false,
				options1: [{
					value1: '',
					label1: ""
				}, { //允许交易
					value1: '1',
					label1: this.$t('script.4')
				}, {
					value1: '0',
					label1: this.$t('script.5')
				}],
				value1: '',
				options2: [{ //充值提现
					value2: '',
					label2: ""
				}, { //充值提现
					value2: '1',
					label2: this.$t('script.4')
				}, {
					value2: '0',
					label2: this.$t('script.5')
				}],
				value2: '',
				options3: [{
					value3: '',
					label3: ""
				}, { //默认资产
					value3: '1',
					label3: this.$t('script.4')
				}, {
					value3: '0',
					label3: this.$t('script.5')
				}],
				value3: '',
				options4: [{
					value4: '',
					label4: ""
				}, { //人民币充值
					value4: '1',
					label4: this.$t('script.4')
				}, {
					value4: '0',
					label4: this.$t('script.5')
				}],
				value4: '',
				options5: [{
					value5: '',
					label5: ""
				}, { //状态
					value5: '1',
					label5: this.$t('buttonVirtual.able')
				}, {
					value5: '0',
					label5: this.$t('buttonVirtual.disable')
				}],
				value5: '',
				isShow: false,
				forms: {},
				value: '',
				currentRow: [],
				dialogFormVisible: false,
				dialogFormVisible1: false,
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
			charge(index, row) { //手续费修改
				let _this = this;
				var fids = row.fid
				_this.dialogFormVisible1 = true;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_GO_SAVE_FEES + "?fviId=" + fids)
					.then(res => {
						
						if(res.data.data.length==0){
							return
						}
						if(res.data.success == true) {
							var d = res.data.data;
						
						_this.$refs.formData.fid = d.fid;
						_this.$refs.formData.flevels = d;
						}else{
							
						}
						
					})

			},

			savefee() { //手续费保存
				let _this = this;
				this.forms = {
					feeList: this.$refs.formData.form
				};
				this.$http.post(auth.getServerUrl() + api.VIRTUAL_SAVE_FEES, this.forms)
					.then(res => {
						if(res.data.success == true) {
							_this.dialogFormVisible1 = false; //关闭弹出层
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

			},
			delMember() { //删除会员
				let fids = this.currentRow.join(',')
				this.$http.get(api.VIRTUAL_DEL + "?fid=" + fids)
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
			handleBagAdss(row) { //  分配钱包地址
				let fids = row.fid
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_GENERA_ADDRESS + "?fid=" + fids)
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

			},
			handleDetail(row) { //查看详情
				var fids = row.fid;
				this.currentRow.push(fids)
				const h = this.$createElement;
				this.$msgbox({
					title: this.$t('script.18'),
					closeOnClickModal: true,
					customClass: "my_dalog_box1",
					message: h('p', null, [
						h('detail', {
							props: {
								fids: fids
							}
						}, []),

					]),
//					showCancelButton: true,
//					confirmButtonText: this.$t('script.7'),
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
//							}, 3000);
//						} else {
//							done();
//						}
//					},
					callback: (action, instance) => {

					},
				}).then(action => {
					this.$message({
						type: 'info',
						message: 'action: ' + action
					});
				});
			},
			handleOpen(row) { //启用默认资产 fisDefAsse =true
				//  	   let fids = this.currentRow.join(',')
				let fids = row.fid
				let fisDefAsset = row.fisDefAsset;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_UPDATA_DEFASSET + "?fid=" + fids + "&fisDefAsse=" + fisDefAsset)
					.then(res => {
						if(res.data.success == true) {
							this.loadData(this.searchKey);
							this.$message({
								type: 'success',
								message: res.data.msg,
							});
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: this.$t('script.6')
							});
						}

					})

			},

			handleEnabled() { //启用 fstatus =1
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
					this.$http.get(auth.getServerUrl() + api.VIRTUAL_SETABLE + "?ids=" + fids + "&fstatus=" + 1)
						.then(res => {
							if(res.data.success == true) {
								this.loadData(this.searchKey);
								this.$message({
									type: 'success',
									message: res.data.msg,
								});
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
			handleDisable() { //禁用 fstatus =0
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.10'),
						type: 'warning'
					});
				} else {
					this.$http.get(auth.getServerUrl() + api.VIRTUAL_SETABLE + "?ids=" + fids + "&fstatus=" + 0)
						.then(res => {

							if(res.data.success == true) {
								this.loadData(this.searchKey);
								this.$message({
									type: 'success',
									message: res.data.msg,
								});
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
			modify(index, row) { //修改
				let _this = this;
				var fids = row.fid
				_this.dialogFormVisible = true;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_GENERA_DETAIL + "?fid=" + fids)
					.then(res => {
						var d = res.data.data;
						_this.$refs.form.form.fid = d.fid;
						_this.$refs.form.form.fshortName = d.fshortName;
						_this.$refs.form.form.fdescription = d.fdescription;
						_this.$refs.form.form.faddTime = d.faddTime;
						_this.$refs.form.form.fstatus = d.fstatus;
						_this.$refs.form.form.fsymbol = d.fsymbol;
						_this.$refs.form.form.fname = d.fname;
						_this.$refs.form.form.fIsWithDraw = d.fIsWithDraw;
						_this.$refs.form.form.furl = d.furl;
						_this.$refs.form.form.fcount = d.fcount;
						_this.$refs.form.form.ftradeTime = d.ftradeTime;
						_this.$refs.form.form.fprice = d.fprice;
						_this.$refs.form.form.fversion = d.fversion;
						_this.$refs.form.form.fisDefAsset = d.fisDefAsset;
						_this.$refs.form.form.fproportion = d.fproportion;
						_this.$refs.form.form.ftradeTime = d.ftradeTime;
						_this.$refs.form.form.fisRecharge = d.fisRecharge;
						_this.$refs.form.form.fisShare = d.fisShare

					})

			},
			save() { //保存
				let _this = this;
				this.forms = {
					fshortName: this.$refs.form.form.fshortName,
					fdescription: this.$refs.form.form.fdescription,
					faddTime: this.$refs.form.form.faddTime,
					fstatus: this.$refs.form.form.fstatus,
					fsymbol: this.$refs.form.form.fsymbol,
					fname: this.$refs.form.form.fname,
					fIsWithDraw: this.$refs.form.form.fIsWithDraw,
					furl: this.$refs.form.form.furl,
					fcount: this.$refs.form.form.fcount,
					ftradeTime: this.$refs.form.form.ftradeTime,
					fprice: this.$refs.form.form.fprice,
					fversion: this.$refs.form.form.fversion,
					fisDefAsset: this.$refs.form.form.fisDefAsset,
					fproportion: this.$refs.form.form.fproportion,
					fisRecharge: this.$refs.form.form.fisRecharge,
					fisShare: this.$refs.form.form.fisShare

				};
				if(this.forms.fshortName == "" || this.forms.fdescription == "" || this.forms.faddTime == "" || this.forms.fstatus == "" || this.forms.fsymbol == "" || this.forms.fname == "" || this.forms.fIsWithDraw == "" || this.forms.furl == "" || this.forms.fcount == "" || this.forms.ftradeTime == "" || this.forms.fprice == "" || this.forms.fversion == "" || this.forms.fisDefAsset == "" || this.forms.fproportion == "" || this.forms.fisRecharge == "" || this.forms.fisShare == "") {
					Element.MessageBox({
						type: "error",
						message: this.$t('script.11'),
						title: this.$t('script.6')
					});
				} else {
					this.$http.post(auth.getServerUrl() + api.VIRTUAL_SAVE, this.forms)
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

			add() { //添加
				let _this = this;
				_this.dialogFormVisible = true;
				_this.$refs.form.form.fshortName = "";
				_this.$refs.form.form.fdescription = "";
				_this.$refs.form.form.faddTime = "";
				_this.$refs.form.form.fstatus = "";
				_this.$refs.form.form.fsymbol = "";
				_this.$refs.form.form.fname = "";
				_this.$refs.form.form.fIsWithDraw = "";
				_this.$refs.form.form.furl = "";
				_this.$refs.form.form.fcount = "";
				_this.$refs.form.form.ftradeTime = "";
				_this.$refs.form.form.fprice = "";
				_this.$refs.form.form.fversion = "";
				_this.$refs.form.form.fisDefAsset = "";
				_this.$refs.form.form.fproportion = "";
				_this.$refs.form.form.ftradeTime = "";
				_this.$refs.form.form.fisRecharge = "";
				_this.$refs.form.form.fisShare = "";
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

				this.loadData(this.searchKey, this.value1, this.value2, this.value3, this.value4, this.value5)
			},
			loadData(str, search1, search2, search3, search4, search5) { //search1允许交易search2充值和提现search3默认资产search4人民币充值search5状态
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				search1 = (search1 == undefined) ? "" : search1;
				search2 = (search2 == undefined) ? "" : search2;
				search3 = (search3 == undefined) ? "" : search3;
				search4 = (search4 == undefined) ? "" : search4;
				search5 = (search5 == undefined) ? "" : search5;

				this.$http.get(auth.getServerUrl() + api.VIRTUALCOINTYPE + "?fshortName=" + str + "&FIsShare=" + search1 + "&fIsWithDraw=" + search2 + "&isDefAsset=" + search3 + "&isRecharge=" + search4 + "&fstatus=" + search5 + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
//			statusForma: function(row, column) {
//				return row.fstatus == "" ? "" : (row.fstatus == 0 ? this.$t('buttonVirtual.disable') : (row.fstatus == 1 ? this.$t('buttonVirtual.able') : (row.fstatus == 2 ? this.$t('buttonVirtual.delectVirtual') : "")));
//			},
			fisDefAsset: function(row, column) {
				return row.fisDefAsset == 0 ? this.$t('script.5') : this.$t('script.4');
			},
			fisRecharge: function(row, column) {
				return row.fisRecharge == 0 ? this.$t('script.5') : this.$t('script.4');
			},
			fisShare: function(row, column) {
				return row.fisShare == 0 ? this.$t('script.5') : this.$t('script.4');
			},
			fIsWithDraw: function(row, column) {
				return row.fIsWithDraw == 0 ? this.$t('script.5') : this.$t('script.4');
			},

		},
		created() {
			this.loadData(this.searchKey);
			this.handRoleBtn(auth.getServerUrl(), api.DICT_SMPALL_BTN, "/virtual/virtualCoinType", this.fcodeD);
		}
	}
</script>