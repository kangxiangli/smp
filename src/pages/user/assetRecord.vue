
<template>
	<imp-panel>
		<p slot="header" style="width: 100%;">
<!--
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('table.12')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>-->
 
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
    </p>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="fid" v-if="isShow" :label="$t('table.26')">
				</el-table-column>
				<el-table-column prop="fuserId" :label="$t('table.26')">
				</el-table-column>
					<!--预估总资产-->
				<el-table-column prop="ftotal" :label="$t('table.11')">
				</el-table-column>
					<!--人民币-->
				<el-table-column :label="$t('table.56')">
					<el-table-column  :label="$t('table.57')" width="70">
						<el-table-column  :label="this.rmb" width="70">
						<!--冻结-->
						<el-table-column  :formatter="freeze" :label="$t('table.60')" width="70">
						</el-table-column>
						<!--可用-->
						<el-table-column  :formatter="usable" :label="$t('table.61')" width="70">
						</el-table-column>
						</el-table-column>
					</el-table-column>
					<!--数字资产-->
					<el-table-column :label="$t('table.59')">
						<!--数字资产1-->
						<el-table-column prop="fdetail" :label="this.fone" width="70">
						<!--冻结-->
						<el-table-column prop="fdetail" :formatter="freeze1" :label="$t('table.60')" width="70">
						</el-table-column>
						<!--可用-->
						<el-table-column prop="fdetail" :formatter="usable1" :label="$t('table.61')" width="70">
						</el-table-column>
						
						</el-table-column>
						<!--数字资产2-->
						<el-table-column prop="fdetail"  :label="this.ftow" width="70">
						<!--冻结-->
						<el-table-column prop="fdetail" :formatter="freeze2" :label="$t('table.60')" width="70">
						</el-table-column>
						<!--可用-->
						<el-table-column prop="fdetail" :formatter="usable2" :label="$t('table.61')" width="70">
						</el-table-column>
							
						</el-table-column>
						<!--数字资产3-->
						<el-table-column prop="fdetail"  :label="this.fthree">
						<!--冻结-->
						<el-table-column prop="fdetail" :formatter="freeze3" :label="$t('table.60')" width="70">
						</el-table-column>
						<!--可用-->
						<el-table-column prop="fdetail" :formatter="usable3" :label="$t('table.61')" width="70">
						</el-table-column>
							
						</el-table-column>
						
					</el-table-column>
				</el-table-column>
				<!--<el-table-column prop="fcreateTime" :label="$t('table.12')">
				</el-table-column>-->
				<el-table-column prop="flastUpdateTime" :label="$t('table.48')">
				</el-table-column>
				<el-table-column :label="$t('table.3')">
					<template scope="scope">
					<el-tooltip class="item" effect="light" :content='$t("buttonMember.checkDetail")' placement="top-end">
					<el-button size="small" @click="handleDetail(scope.$index, scope.row)"><i class="iconfont icon-chakan"></i>
					</el-button>
					</el-tooltip>
					<!--<el-button size="small" @click="handleDetail(scope.$index, scope.row)">{{$t("buttonMember.checkDetail")}}
					</el-button>-->
				</template>
				</el-table-column>
			</el-table>
			<el-pagination
				 @size-change="handleSizeChange" 
				 @current-change="handleCurrentChange"
				  :current-page="tableData.pagination.pageNo" 
				  :page-sizes="[5, 10, 20]" 
				  :page-size="tableData.pagination.pageSize" 
				  layout="total, sizes, prev, pager, next, jumper"
				   :total="tableData.pagination.total">
			</el-pagination>
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
	import detail from "../../components/detail/three.vue";
	import syszh from "../../resources/user/zh";
	import sysen from "../../resources/user/en";
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
			"detail": detail,
		},
		data() {
			return {
				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
				rmb:"",//人民币
				fone: "",//数字资产类型一
				ftow: "",
				fthree: "",
				currentRow: [],
				isShow: false,
				dialogVisible: false,
				dialogLoading: false,
				defaultProps: {
					children: 'children',
					label: 'name',
					id: "id",
				},
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
			handleDetail(index,row) {//产看详情
				var fids = row.fid;
				this.currentRow.push(fids)
				const h = this.$createElement;
				this.$msgbox({
					title: this.$t('title.6'),
					closeOnClickModal: true,
					customClass: "my_dalog_cent",
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
						message: 'action: ' + action
					});
				});
			},
			search(target) {
				this.loadData(this.searchKey);
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

			btnCheck() {//搜索
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				var timeStar = this.meFormat(this.pvalue1)
				var timeEnd = this.meFormat(this.pvalue2)
				this.loadData(this.searchKey, timeStar, timeEnd)
			},
			loadData(str, timeStar, timeEnd) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
			this.$http.get(auth.getServerUrl() + api.USER_ASSET + "?floginName=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd +"&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
							this.listLoading = false; //关闭loading
							var d = res.data;
							this.tableData.rows = d.data.content;
							this.tableData.pagination.total = d.data.totalElements;
							this.rmb=JSON.parse(res.data.data.content[0].fdetail)[0].fname;
							this.fone=JSON.parse(res.data.data.content[0].fdetail)[1].fname;
							this.ftow=JSON.parse(res.data.data.content[0].fdetail)[2].fname;
							this.fthree=JSON.parse(res.data.data.content[0].fdetail)[3].fname;
							
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
					});;
			},
			//人民币
			usable: function(row, column) {//可用
				return JSON.parse(row.fdetail)[0].total;
			},
			freeze: function(row, column) {//冻结
				return JSON.parse(row.fdetail)[0].frozen;
				
			},
			//数字资产1
			usable1: function(row, column) {//冻结
				return JSON.parse(row.fdetail)[1].total;
				
			},
			freeze1: function(row, column) {//可用
				return JSON.parse(row.fdetail)[1].frozen;
			},
			//数字资产2
			usable2: function(row, column) {//冻结
				return JSON.parse(row.fdetail)[2].total;
				
			},
			freeze2: function(row, column) {//可用
				return JSON.parse(row.fdetail)[2].frozen;
			},
			//数字资产3
			usable3: function(row, column) {//冻结
				return JSON.parse(row.fdetail)[3].total;
				
			},
			freeze3: function(row, column) {//可用
				return JSON.parse(row.fdetail)[3].frozen;
			},
			
		},
		created() {
			this.loadData();
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>