
<template>
	<imp-panel>
		<h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
        	<el-tooltip class="item" effect="light" :content='$t("buttonMember.shotOff")' placement="top-end">
			 <el-button size="small" type="danger" v-show="handleLogout" @click="handleLogoutAll()"><i class="iconfont icon-tichuxiezuozuoxi"></i>
				</el-button>
			</el-tooltip>
         <!--<el-button size="small" type="danger" v-show="handleLogout" @click="handleLogoutAll()">{{$t("buttonMember.shotOff")}}
		</el-button>-->
            
        </el-col>
        <el-col :span="12">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
            <input type="text" :placeholder="$t('title.12')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-if="isShow" width="100" label="会员UId">
				</el-table-column>
				<el-table-column prop="floginName" width="100" :label="$t('table.floginName')">
				</el-table-column>
				<el-table-column prop="frealName" width="100" :label="$t('table.frealName')">
				</el-table-column>
				<el-table-column prop="ftelephone" width="120" :label="$t('table.ftelephone')">
				</el-table-column>
				<el-table-column prop="fidentityNo" :label="$t('table.7')">
				</el-table-column>
				<el-table-column prop="fregisterTime" :label="$t('table.fregisterTime')">
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
	import syszh from "../../resources/user/zh";
	import sysen from "../../resources/user/en";
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
			'imp-panel': panel
		},
		data() {
			return {
				fcodeD:[],
				handleLogout: false,
				isShow: false,
				options: [],
				value: '',
				currentRow: [],
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
		methods: {
			search(target) {
				this.loadData(this.searchKey);
			},
			handleSelectionChange(val) {
				this.currentRow = val.map(i => i.floginName);
			},
			handleLogoutAll(index, row) { //批量踢出
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.3'),
						type: 'warning'
					});
				} else {
				this.$http.get(auth.getServerUrl() + api.USER_ONLINE_LOGOUT + "?fids=" + fids)
					.then(res => {
						if(res.data.success == true) {
							this.loadData();
						this.$message(this.$t('script.17'));
						}else{
							
						}
						
					})
				}
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
				this.$http.get(auth.getServerUrl() + api.USER_ONLINE_LIST + "?str=" + str + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
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
//								title: this.$t('script.6')
//							});
						}
					}).catch((error) => {
						this.listLoading = false; //关闭loading
						console.log(error)
					});;
			}
		},
		created() {
			this.loadData();
				this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/user/userOnline",this.fcodeD);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>