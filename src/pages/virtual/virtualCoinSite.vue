
<template>
	<imp-panel>
		<h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="24">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search"  @click="search($event)"></i>
            <input type="text" :placeholder="$t('table.12')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="fname" :label="$t('table.19')">
				</el-table-column>
				<el-table-column prop="count" :label="$t('table.23')">
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
	import virtualzh from "../../resources/virtual/zh";
	import virtualen from "../../resources/virtual/en";
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(virtualen)),
		zh: JSON.parse(JSON.stringify(virtualzh))
	}
	const i18n = new VueI18n({
		 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
		messages
	})

	export default {
		components: {
			'imp-panel': panel,
		},
		data() {
			return {
				options: [],
				value: '',
				currentRow: [],
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
			search() {
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
			loadData(str) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				this.$http.get(auth.getServerUrl() + api.VIRTUAL_WALLE_LIST + "?str=" + str + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
						if(res.data.success == true) {
							this.listLoading = false; //关闭loading
							var d = res.data;
							this.tableData.pagination.total = d.data.totalElements;
							this.tableData.rows = res.data.data.list;
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
</style>