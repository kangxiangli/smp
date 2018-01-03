
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;margin-bottom:0px;">
			<el-row :gutter="24" style="margin-bottom:10px;">
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
				<!--用户信息-->
				<el-col :span="7">
					<span>{{$t("table.68")}}</span>
					<input style="width: 210px;" type="text" :placeholder="$t('title.11')" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">

				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">{{$t("time.4")}}
					</el-button>
				</el-col>
			</el-row>
      <el-row style="width: 100%; margin-bottom:0px;">
        <el-col :span="12">
		        <el-tooltip class="item" effect="light" :content='$t("buttonAuditCard.passAuditCardAll")' placement="top-end">
			<el-button size="small" type="success" v-show="handlePass" @click="handlePassAll()"><i class="iconfont icon-shenhetongguo1"></i>
			</el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="light" :content='$t("buttonAuditCard.notPassAuditCardAll")' placement="top-end">
			<el-button size="small" type="danger" v-show="handleNot" @click="handleNotPassAll()"><i class="iconfont icon-shenhebutongguo"></i>
			</el-button>
		</el-tooltip>
          <!--<el-button
              size="small"
              type="success"
              v-show="handlePass"
              @click="handlePassAll()">{{$t("buttonAuditCard.passAuditCardAll")}} 
            </el-button>-->
            <!--<el-button
              size="small"
              type="danger"
              v-show="handleNot"
              @click="handleNotPassAll()">{{$t("buttonAuditCard.notPassAuditCardAll")}}
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
				<el-table-column prop="floginName" width="100" :label="$t('table.21')">
				</el-table-column>
				<el-table-column prop="frealName" width="100" :label="$t('table.22')">
				</el-table-column>
				<el-table-column prop="ftelephone" :label="$t('table.23')">
				</el-table-column>
				<el-table-column prop="fidentityNo"  :label="$t('table.24')">
				</el-table-column>
				<el-table-column prop="fpostRealValidateTime"  :label="$t('table.41')">
				</el-table-column>
				<el-table-column :label="$t('table.operation')">
					<template scope="scope">
						<el-tooltip class="item" effect="light" :content='$t("buttonAuditCard.passAuditCard")' placement="top-end">
						<el-button size="small"  v-show="handlePass1"  type="success" @click="handlePass(scope.$index, scope.row)"><i class="iconfont icon-shenhetongguo1"></i> 
						</el-button>
                  		</el-tooltip>
                  		<el-tooltip class="item" effect="light" :content='$t("buttonAuditCard.notPassAuditCard")' placement="top-end">
						<el-button size="small" v-show="handleNot2" type="warning" @click="handleNotPass(scope.$index, scope.row)"><i class="iconfont icon-shenhetongguo1"></i> 
						</el-button>
                  		</el-tooltip>
						<!--<el-button size="small"  v-show="handlePass1"  type="success" @click="handlePass(scope.$index, scope.row)">{{$t("buttonAuditCard.passAuditCard")}}
						</el-button>
						<el-button size="small" v-show="handleNot2" type="warning" @click="handleNotPass(scope.$index, scope.row)">{{$t("buttonAuditCard.notPassAuditCard")}}
						</el-button>-->

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
	import syszh from "../../resources/user/zh";
	import sysen from "../../resources/user/en";
//	import en from '../../resources/en';
//	import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(sysen)),
		zh: JSON.parse(JSON.stringify(syszh))
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
				fcodeD:[],
				handleNot: false,
				handlePass: false,
				handleNot2: false,
				handlePass2: false,
				isShow: false,
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

			handleSelectionChange(val) {
				this.currentRow = val.map(i => i.fid);
			},
			handlePassAll(index, row) { //批量审核未通过
				let fids = this.currentRow.join(',')
				if(!fids) {
					this.$message({
						message: this.$t('script.3'),
						type: 'warning'
					})}else{
							this.$http.get(auth.getServerUrl() + api.USER_PASSAUDITCARD + "?ids=" + fids)
					.then(res => {
						if(res.data.success == true) {
							this.loadData();
						this.$message(this.$t('script.15'));
						}else{
							
						}
						
					})
					}
			
			},
			handleNotPassAll() { //批量审核未通过
				let fids = this.currentRow.join(',')
					if(!fids) {
					this.$message({
						message: this.$t('script.3'),
						type: 'warning'
					})}else{
				this.$http.get(auth.getServerUrl() + api.USER_NOTPASSAUDITCARD + "?ids=" + fids)
					.then(res => {
							if(res.data.success == true) {
						this.loadData();
						this.$message(this.$t('script.16'));
						}else{
							
						}
						
					})
					}
			},
			handlePass(index, row) { //通过
				
				this.$http.get(auth.getServerUrl() + api.USER_PASSAUDITCARD + "?ids=" + row.fid).then(res => {
						if(res.data.success == true) {
					this.loadData();
						}else{
							
						}
					
				});
			},
			handleNotPass(index, row) { //未通过
				this.$http.get(auth.getServerUrl() + api.USER_NOTPASSAUDITCARD + "?ids=" + row.fid).then(res => {
					if(res.data.success == true) {
					this.loadData();
						}else{
							
						}
				});
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
				this.$http.get(auth.getServerUrl() + api.USER_AUDITCARD + "?fname=" + str + "&beginDate=" + timeStar + "&endDate=" + timeEnd + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
					.then(res => {
                  if(res.data.success == true) {
						this.listLoading = false; //关闭loading
						var d=res.data;    
		                this.tableData.rows = d.data.content;
		                this.tableData.pagination.total = d.data.totalElements;
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
			}
		},
		created() {
			this.loadData();
				this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/user/auditCard",this.fcodeD);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>