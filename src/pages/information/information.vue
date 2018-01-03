
<template>
	<imp-panel>
		<div class="box-title" slot="header" style="width: 100%;font-size: 14px;">
			<el-row :gutter="24">
				<el-col :span="7">
					<!--是否置顶-->
					<span>{{$t("table.5")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="zvalue" :placeholder="$t('table.5')">
						<el-option v-for="item in zoptions" :key="item.tvalue" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7">
					<!--类型-->
					<span>{{$t("table.2")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('table.2')">
						<el-option v-for="item in toptions" :label="item.tlabel" :value="item.tvalue">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7">
					<!--文章标题-->
					<span>{{$t("table.3")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('table.3')" v-model="searchKey1"  class="el-input__inner">
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
				<!--创办人-->
				<el-col :span="7">
					<span>&nbsp;&nbsp;&nbsp;{{$t("table.1")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('input.2')" v-model="searchKey"  class="el-input__inner">
				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("time.4")}}
					</el-button>
				</el-col>
			</el-row>
			<el-row style="width: 100%;margin-bottom: 0;">
				<el-col :span="12">
					<el-tooltip class="item" effect="light" :content='$t("button.add")' placement="top-end">
					<el-button size="small"  v-show="farticleSave" type="success" @click="add()"><i class="iconfont icon-zengjia"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.del")' placement="top-end">
					<el-button size="small"  v-show="farticleDel" type="danger" @click="del()"><i class="iconfont icon-shanchu"></i> 
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.top")' placement="top-end">
					<el-button size="small"  v-show="memDingFarticle" type="info" @click="top()"><i class="iconfont icon-zhiding"></i>
					</el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" :content='$t("button.canceltop")' placement="top-end">
					<el-button size="small"  v-show="memDingFarticle2" type="warning" @click="canceltop()"><i class="iconfont icon-quxiaozhiding1"></i> 
					</el-button>
                  </el-tooltip> 
					<!--<el-button size="small"  v-show="farticleSave" type="success" @click="add()">{{$t("button.add")}}
					</el-button>
					<el-button size="small"  v-show="farticleDel" type="danger" @click="del()">{{$t("button.del")}}
					</el-button>
					<el-button size="small"  v-show="memDingFarticle" type="info" @click="top()">{{$t("button.top")}}
					</el-button>
					<el-button size="small"  v-show="memDingFarticle2" type="warning" @click="canceltop()">{{$t("button.canceltop")}}
					</el-button>-->
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fcreateAdmin" width="100" :label="$t('table.1')">
				</el-table-column>
				<el-table-column prop="fmodifyAdmin" width="100" :label="$t('table.11')">
				</el-table-column>
				<el-table-column prop="farticleType" :label="$t('table.2')">
				</el-table-column>
				<el-table-column prop="ftitle" :label="$t('table.3')">
				</el-table-column>
				<el-table-column prop="fcount" width="100" :label="$t('table.4')">
				</el-table-column>
				</el-table-column>
				<!--<el-table-column prop="fisTop" :formatter="fisTop" width="100" :label="$t('table.5')">
				</el-table-column>-->
				<el-table-column class-name="status-col" prop="fisTop" width="100" :label="$t('table.5')" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fisTop | statusFilter" >{{scope.row.fisTop==1?$t('script.2'):$t('script.3')}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column prop="flastModifyTime" width="200" :label="$t('table.6')">
				</el-table-column>
				<el-table-column :label="$t('table.7')" width="120">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content='$t("button.modify")' placement="top-end">
						<el-button size="small" v-show="memDingFarticle3" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i> 
						</el-button>
	                  </el-tooltip>
						<!--<el-button size="small" v-show="memDingFarticle3" type="success" @click="modify(scope.$index, scope.row)">{{$t("button.modify")}}
						</el-button>-->
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<el-dialog id="dialog_box_content1" :title="$t('table.8')" v-model="dialogVisible" size="small">
				<add-Information ref="form"></add-Information>
				<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t("table.9")}}</el-button>
          <el-button type="primary" @click="save">{{$t("table.10")}}</el-button>
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
	import addInformation from "../../components/addInformation";
	import informationzh from "../../resources/information/zh";
	import informationen from "../../resources/information/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(informationen)),
		zh: JSON.parse(JSON.stringify(informationzh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'), // 语言标识
		messages
	})
	export default {
		components: {
			'imp-panel': panel,
			"add-Information": addInformation
		},
		data() {
			return {
				fcodeD:[],
				farticleSave: false,
				farticleDel: false,
				memDingFarticle: false,
				memDingFarticle3: false,
				memDingFarticle2: false,
				forms: {},
				zoptions: [{//是否置顶
					tlabel:this.$t('time.5'),
					tvalue:""
				},{
					tlabel:this.$t('script.2'),//是
					tvalue:"1"
				},{
					tlabel:this.$t('script.3'),//否
					tvalue:"0"
				}],
				zvalue: '',
				toptions: [{//文章类型
					tlabel:this.$t('time.5'),
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
				dialogVisible: false,
				dialogLoading: false,
				listLoading: false,
				searchKey: '',
				searchKey1: '',
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
			modify(index, row) {
				this.dialogVisible = true;
				this.$http.get(auth.getServerUrl() + api.INFORMATION_GETONE + "?fid=" + row.fid)
					.then(res => {
						if(res.data.success == true) {
							let d = res.data.data;
							this.$refs.form.form.fid = d.fid;
//							this.$refs.form.form.fmodifyAdmin = d.fmodifyAdmin;
							this.$refs.form.form.fcreateAdmin = d.fcreateAdmin;
							this.$refs.form.form.farticleType = d.farticleType;
							this.$refs.form.form.ftitle = d.ftitle;
							this.$refs.form.form.fkeyword = d.fkeyword;
							this.$refs.form.form.fdescription = d.fdescription;
							this.$refs.form.form.fcontent = d.fcontent;
							this.$refs.form.form.fcreateTime = d.fcreateTime;
							this.$refs.form.form.flastModifyTime = d.flastModifyTime;
							this.$refs.form.form.furl = d.furl;
							this.$refs.form.form.fcount = d.fcount;
							this.$refs.form.form.fisout = d.fisout;
							this.$refs.form.form.foutUrl = d.foutUrl;
							this.$refs.form.form.fisTop = d.fisTop;
//							this.$refs.form.form.fversion = d.fversion;
						}

					})

			},
			save() {
				var _this = this;
				_this.forms = _this.$refs.form.form;
				this.$http.post(auth.getServerUrl() + api.INFORMATION_SAVE, _this.forms)
					.then(res => {
						if(res.data.success == true) {
							this.loadData();
							this.$message(res.data.msg);
							this.dialogVisible = false; //关闭弹出层
						} else {
//							Element.MessageBox({
//								type: "error",
//								message: res.data.msg,
//								title: this.$t('script.4')
//							});
						}
					})

			},
			add() {
				this.dialogVisible = true;
				if(this.$refs.form == undefined) {

				} else {
					this.$refs.form.form.fid = "";
//					this.$refs.form.form.fmodifyAdmin = "";
					this.$refs.form.form.fcreateAdmin = "";
					this.$refs.form.form.farticleType = "";
					this.$refs.form.form.ftitle = "";
					this.$refs.form.form.fkeyword = "";
					this.$refs.form.form.fdescription = "";
					this.$refs.form.form.fcontent = "";
					this.$refs.form.form.fcreateTime = "";
					this.$refs.form.form.flastModifyTime = "";
					this.$refs.form.form.furl = "";
					this.$refs.form.form.fcount = "";
					this.$refs.form.form.fisout = "";
					this.$refs.form.form.foutUrl = "";
					this.$refs.form.form.fisTop = "";
//					this.$refs.form.form.fversion = "";
				}

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
					this.$http.get(auth.getServerUrl() + api.INFORMATION_DEL + "?fids=" + fids)
						.then(res => {
							if(res.data.success == true) {
								this.$message({
									type: 'success',
									message: res.data.msg
								});
								this.loadData();
							} else {
//								Element.MessageBox({
//									type: "error",
//									message: res.data.msg,
//									title: this.$t('script.4')
//								});
							}
						}).catch(() => {
							this.$message({
								type: 'info',
								message: this.$t('script.6')
							});
						});
				})
			},
			top() { //删除会员
				let fids = this.currentRow.join(',')
				this.$http.get(auth.getServerUrl() + api.INFORMATION_TOP + "?fids=" + fids + "&type=0")
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
			},
			canceltop() {
				let fids = this.currentRow.join(',')
				this.$http.get(auth.getServerUrl() + api.INFORMATION_TOP + "?fids=" + fids + "&type=1")
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
				this.loadData(this.searchKey, timeStar, timeEnd, this.zvalue,this.tvalue,this.searchKey1)
			},
			loadData(str, timeStar, timeEnd, fisTop,farticleType, ftitle) { //fcreateAdmin;//创建人 farticleType;//文章类型  ftitle;//文章标题 fisTop;//是否置顶
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				fisTop = (fisTop == undefined) ? "" : fisTop;
				farticleType = (farticleType == undefined) ? "" : farticleType;
				ftitle = (ftitle == undefined) ? "" : ftitle;
				this.$http.get(auth.getServerUrl() + api.INFORMATION_GET + "?fcreateAdmin=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&fisTop=" + fisTop + "&farticleType=" + farticleType + "&ftitle=" + ftitle+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
							this.listLoading = false; //关闭loading
							var d = res.data;
							this.tableData.rows = d.data.content;
							this.tableData.pagination.total = d.data.totalElements;
						} else {
							this.listLoading = false; //关闭loading
//							Element.MessageBox({
//								type: "error",
//								message: res.data.msg,
//								title: this.$t('script.4')
//							});

						}
					}).catch((error) => {
						this.listLoading = false; //关闭loading
						console.log(error)
					});
			},
			fisTop(row, column) {
				
				 return row.fisTop==1?this.$t('script.2'):this.$t('script.3');
			},
		},
		created() {
			this.loadData();
			 this.handStatus(auth.getServerUrl(),api.USER_RBANK_TYPE,"12",this.toptions);//文章类型
			  this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/information",this.fcodeD);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>