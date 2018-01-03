
<template>
	<imp-panel>

		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style="margin-bottom: 0;">
				<!--虚拟币类型-->
				<el-col :span="7">
					<span>{{$t("title.17")}}</span>
					<el-select v-model="value" clearable filterable :placeholder="$t('title.1')">
						<el-option v-for="item in options" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<!--类型-->
				<el-col :span="7">
					<span>{{$t("popups.27")}}</span>
					<el-select style="width: 210px;" clearable filterable v-model="tvalue" :placeholder="$t('title.1')">
						<el-option v-for="item in toptions" :label="item.tvalue" :value="item.tcode">
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
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				</el-table-column>
				<el-table-column prop="fid" v-if="isShow" label="ID">
				</el-table-column>
				<el-table-column prop="fuserFid" v-if="isShow" :label="$t('table.11')">
				</el-table-column>
				<el-table-column prop="fviName" :label="$t('table.34')">
				</el-table-column>
				<el-table-column prop="ftradeUniqueNumber" :label="$t('table.20')">
				</el-table-column>
				<el-table-column prop="ffees" width="125" :label="$t('table.21')">
				</el-table-column>
				<el-table-column prop="ftype" :formatter="ftype" width="125" :label="$t('table.22')">
				</el-table-column>
				<el-table-column prop="floginName" width="125" :label="$t('table.17')">
				</el-table-column>
				<el-table-column prop="frealName" width="125" :label="$t('table.18')">
				</el-table-column>
				<el-table-column :label="$t('table.7')">
					<template scope="scope">
						<el-button size="small" @click="handleDetail( scope.row)">{{$t("buttonVirtual.checkDetail")}}
						</el-button>

					</template>
				</el-table-column>

			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
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
	import testData from "../../../static/data/data.json"
	import detail from "../../components/detail/one.vue";
	import virtualzh from "../../resources/virtual/zh";
	import virtualen from "../../resources/virtual/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh';
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
			"detail": detail
		},
		data() {
			return {
				toptions: [{
						tvalue:"",
						tcode:this.$t('title.1')
					},
					{
						tvalue:  this.$t('script.13'),
						tcode: "05"
					}, {
						tvalue: this.$t('script.14'),
						tcode: "06"
					},
					 {
						tvalue: this.$t('script.19'),
						tcode: "0305"
					}
				],
				tvalue: '', //类型
				isShow: false,
				options: [{
					value: '',
					label: this.$t('title.1')
				}],
				value: '',
				currentRow: [],
				dialogVisible: false,
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
							}, 3000);
						} else {
							done();
						}
					},
					callback: (action, instance) => {

					},
				}).then(action => {
					this.$message({
						type: 'info',
						message: 'action: ' + action
					});
				});
			},
			//    search(target){
			//      this.loadData(this.searchKey);
			//    },
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
				this.loadData(this.searchKey, this.value, this.tvalue)
			},
			loadData(str, ftype, type) {
				this.listLoading = true;
				type = (type == undefined) ? "" : type;
				ftype = (ftype == undefined) ? "" : ftype;
				str = (str == undefined) ? "" : str;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_CAPTUAL_OPERATION_LIST + "?fname=" + str + "&ftype=" + ftype+ "&type=" +type+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
			handLink() { //虚拟币名称
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_CAPTUAL_OPERATION_TYPE )
					.then(res => {
						if(res.data.success = true) {

							var ary = res.data.data;
							for(let i = 0; i < ary.length; i++) {
								let obj = {
									fname: "",
									
								};
								obj.value = ary[i].fname;
								this.options.push(obj);
							}
						}
					}).catch((error) => {
						console.log(error)
					});
			},
			ftype: function(row, column) {
				return row.ftype == "05" ? this.$t('script.13') : (row.ftype == "06"?this.$t('script.14'):(row.ftype == "0305"?this.$t('script.19'):""));
			}
		},
		created() {
			this.loadData();
				this.handLink();
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>