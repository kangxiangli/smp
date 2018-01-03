<template>
	<imp-panel>
		<div class="components-container" style='height:100vh'>
			<el-row :gutter="20">
				<div style="height: 50px; display: flex;">
					<el-col :span="2"></el-col>
					<div class="block">
						<span class="demonstration">{{$t("time.1")}}</span>
						<el-date-picker v-model="value1" type="date" :placeholder="$t('time.3')" :picker-options="pickerOptions0">
						</el-date-picker>
					</div>
					<el-col :span="1"></el-col>
					<div class="block">
						<span class="demonstration">{{$t("time.2")}}</span>
						<el-date-picker v-model="value2" align="right" type="date" :placeholder="$t('time.3')" :picker-options="pickerOptions1">
						</el-date-picker>
					</div>
					<el-col :span="1"></el-col>
					<el-row style=" display: flex;">
						<el-select v-model="value" clearable filterable :placeholder="$t('time.5')">
							<el-option v-for="item in options" :key="item.fid" :label="item.fname" :value="item.fid">
							</el-option>
						</el-select>
						<el-col :span="1"></el-col>
						<el-col :span="12">
							<el-button type="info" @click="lineCheck()">{{$t("time.4")}}
							</el-button>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<div class='chart-container'>
				<line-marker :unit="this.unit" :title="this.title" :count="this.count" :sdata="this.sdata" :tdata="this.tdata" :ary="this.ary" height='100%' width='100%'></line-marker>
			</div>
		</div>
	</imp-panel>
</template>

<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import * as api from "../../api"
	import auth from "../../auth";
	import panel from "../../components/panel.vue"
	import lineMarker from '@/components/Charts/lineMarker'
	import reportzh from "../../resources/report/zh";
	import reporten from "../../resources/report/en";
	//	import en from '../../resources/en';
	//	import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(reporten)),
		zh: JSON.parse(JSON.stringify(reportzh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'), // 语言标识
		messages
	})
	var arr = [];
	var arrDate = [];
	export default {
		components: {
			lineMarker,
			'imp-panel': panel
		},
		data() {
			return {
				options: [{
					value: '',
					label: ''
				}],
				value: '',
				fviType: "",
				ary: [],
				sdata: [],
				tdata: [],
				title: this.$t('script.10'), //标题
				count: this.$t('script.6'), //区间数
				unit: this.$t('script.8'), //单位
				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				value1: '',
				value2: '',
			}
		},
		props: [],
		watch: {

		},
		created() {

		},
		mounted() {
			var _this = this;
			_this.lineReport(this.value1, this.value2, this.fviType)
		},
		i18n,
		methods: {
			Format(obj) {

				var date = new Date(obj);
				var y = 1900 + date.getYear();
				var m = "0" + (date.getMonth() + 1);
				var d = "0" + date.getDate();
				return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
			},
			lineCheck() {
				this.value1 = this.value1.valueOf()
				this.value2 = this.value2.valueOf()

				var timeStar = this.meFormat(this.value1)
				var timeEnd = this.meFormat(this.value2)
				var fviType = this.value
				console.log(this.value)
				this.lineReport(timeStar, timeEnd, fviType)
			},
			lineReport(item, val, fviType) {
				let _self = this
				var timeStar = item;
				var timeEnd = val;
				timeStar = (timeStar == "NaN-aN-aN") ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN") ? "" : timeEnd;
				fviType = (fviType == "undefined") ? "" : fviType;
				//type：type  05 转入  06 转出
				this.$http.get(auth.getServerUrl() + api.REPORT_VIP_LIQUIDITY + "?startDate=" + timeStar + "&endDate=" + timeEnd + "&fViType=" + fviType + "&type=" + 0 + "5")
					.then(res => {
						if(res.data.success = true) {
							_self.ary = res.data.data.list;
							var _data = res.data.data.list;
							arr = []
							arrDate = [];
							for(var i = 0; i < _data.length; i++) {
								arr.push(_data[i][0]);
								arrDate.push(_data[i][1])
							}
							_self.sdata = arr,
								_self.tdata = arrDate;
							var typeList = res.data.data.typeList;
							for(let i = 0; i < typeList.length; i++) {
								let obj = {
									fid: "",
									fname: "",
								};
								obj.fid = typeList[i].fid;
								obj.fname = typeList[i].fname;
								this.options.push(obj);

							}

						}

					}).catch((error) => {

						console.log(error)
					});;
			},
		}
	}
</script>

<style scoped>
	.chart-container {
		position: relative;
		width: 100%;
		height: 80%;
	}
</style>