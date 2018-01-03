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
					<el-row>
						<el-col :span="12">
							<el-button type="info" icon="search" @click="BarCheck()">{{$t("time.4")}}
							</el-button>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<div class='chart-container'>
				<mix-chart :sdata="this.sdata" :tdata="this.tdata" :ary="this.ary" height='100%' width='100%'></mix-chart>
			</div>
		</div>
	</imp-panel>
</template>

<script>
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import panel from "../../components/panel.vue"
	import * as api from "../../api"
	import auth from "../../auth";
	import mixChart from '@/components/Charts/mixChart'
	import reportzh from "../../resources/report/zh";
	import reporten from "../../resources/report/en";
	//import en from '../../resources/en';
	//import zh from '../../resources/zh';
	Vue.use(VueI18n)
	const messages = {
		en: JSON.parse(JSON.stringify(reporten)),
		zh: JSON.parse(JSON.stringify(reportzh))
	}
	const i18n = new VueI18n({
		locale: window.localStorage.getItem('ELEMENT_LANGUAGE'), // 语言标识
		messages
	})
	export default {
		components: {
			mixChart,
			'imp-panel': panel
		},
		data() {
			return {
				ary: [],
				sdata: [],
				tdata: [],
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

		mounted() {
			var _this = this;
			_this.barsReport(this.value1, this.value2)
		},
		i18n,
		methods: {
			Format(obj) { //格式化时间
				var date = new Date(obj);
				var y = 1900 + date.getYear();
				var m = "0" + (date.getMonth() + 1);
				var d = "0" + date.getDate();
				return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
			},
			BarCheck() {
				this.value1 = this.value1.valueOf()
				this.value2 = this.value2.valueOf()
				var timeStar = this.meFormat(this.value1)
				var timeEnd = this.meFormat(this.value2)
				timeStar = (timeStar == "NaN-aN-aN") ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN") ? "" : timeEnd;
				this.barsReport(timeStar, timeEnd)
			},
			barsReport(item, val) {
				let _self = this
				var timeStar = item;
				var timeEnd = val;
				timeStar = (timeStar == "NaN-aN-aN") ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN") ? "" : timeEnd;
				this.$http.get(auth.getServerUrl() + api.REPORT_VIP_REGISTRATION + "?startDate=" + timeStar + "&endDate=" + timeEnd)
					.then(res => {
						if(res.data.success = true) {
							_self.ary = res.data.data;
							var _data = res.data.data;
							_self.sdata = _data.map(i => i[0]);
							_self.tdata = _data.map(i => i[1]);

						}

					}).catch((error) => {
						console.log(error)
					});
			},
		}
	}
</script>

<style scoped>
	.chart-container {
		position: relative;
		width: 100%;
		height: 90%;
		padding-bottom: 40px;
	}
</style>