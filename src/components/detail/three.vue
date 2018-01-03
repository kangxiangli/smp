<style type="text/css" >
	.my_dalog_cent{
		overflow-x: hidden;
		width: 31% !important;
	}
</style>
<template>
	<imp-panel>

		<h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%; margin-bottom: 0;">
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('title.5')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>
		<div slot="body">
			<el-table  :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="fid"  v-if="isShow" label="Id">
				</el-table-column>
				<el-table-column prop="fname"  :label="$t('table.59')">
				</el-table-column>
				<el-table-column prop="total"  :label="$t('table.60')">
				</el-table-column>
				<el-table-column prop="frozen"  :label="$t('table.61')">
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
	import panel from "../panel.vue"
	import * as api from "../../api"
	import auth from "../../auth"
	import Element from "element-ui";
	import userzh from "../../resources/user/zh";
	import useren from "../../resources/user/en";
	import en from '../../resources/en';
	import zh from '../../resources/zh';
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
		},
		data() {
			return {
				isShow: false,
				currentRow: [],
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
				},

			}
		},
		i18n,
		props: ['fids'],
		computed: {},
		watch: {
			fids() {
				this.loadData();
			}
		},
		methods: {
			handleSelectionChange(val) { //取消选择触发
				var vals = val.map(i => i.fid);
				this.currentRow = vals.join(',')
			},
			search(target) {
				this.loadData(this.searchKey);
			},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				this.loadData(this.searchKey);
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.loadData(this.searchKey);
			},
			loadData(str) {
				this.listLoading = true;
				var parme_fid = this.fids;
				str = (str == undefined) ? "" : str;
				this.$http.get(auth.getServerUrl() + api.USER_ASSET_DETAILE + "?fid=" + parme_fid + "&str=" + str+ "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
						this.listLoading = false; //关闭loading
						var list=res.data.data.list
						this.tableData.rows = list.map(i => i);
						this.tableData.pagination.total = res.data.data.totalElenments;
						}else{
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
			}
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
	.el-icon-search{
		cursor: pointer;
		z-index: 999;
	}
</style>