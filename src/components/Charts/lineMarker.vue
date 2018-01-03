<template>
	<div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	import Vue from "vue";
	import VueI18n from 'vue-i18n'
	import reportzh from "../../resources/report/zh";
  import reporten from "../../resources/report/en";
//import en from '../../resources/en';
//import zh from '../../resources/zh';
  Vue.use(VueI18n)
	const messages={
	en:JSON.parse(JSON.stringify(reporten)),
  	zh:JSON.parse(JSON.stringify(reportzh))
	}
	const i18n = new VueI18n({
	 locale:"zh",    // 语言标识
	  	messages
	})
	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart'
			},
			title: {
				type: String,
				default: ''
			},
			count:{
				type: String,
				default: ''
			},
			unit:{
					type: String,
				default: ''
			},
			width: {
				type: String,
				default: '200px'
			},
			height: {
				type: String,
				default: '200px'
			},
			sdata: {
				type: Array
			},
			tdata: {
				type: Array
			},
			ary: {
				type: Array
			}
		},
		data() {
			return {
				chart: null
			}
		},
		created() {

		},
		watch: {
			sdata() {
				this.initChart()
			}
		},
		mounted() {
			this.initChart()
		},
		beforeDestroy() {
			if(!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		i18n,
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id))
				this.chart.setOption({
					backgroundColor: '#fff',
					title: {
						text: this.title,
						subtext:this.count,
						left: 'center',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 16,
							color: '#000'
						},

					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							lineStyle: {
								color: '#57617B'
							}
						}
					},
					legend: {
						icon: 'rect',
						itemWidth: 14,
						itemHeight: 5,
						itemGap: 13,
						data: [this.title],
						right: '0%',
						textStyle: {
							fontSize: 12,
							color: '#000'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						//        data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
						data: this.tdata
					}],
					yAxis: [{
						type: 'value',
						name: this.unit,
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#57617B'
							}
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								fontSize: 14
							}
						},
						splitLine: {
							lineStyle: {
								color: '#57617B'
							}
						}
					}],
					series: [{
						name: this.title,
						type: 'line',
						smooth: false,
						symbol: 'circle',
						symbolSize: 5,
						showSymbol: false,
						lineStyle: {
							normal: {
								width: 1
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(137, 189, 27, 0.3)'
								}, {
									offset: 0.8,
									color: 'rgba(137, 189, 27, 0)'
								}], false),
								shadowColor: 'rgba(0, 0, 0, 0.1)',
								shadowBlur: 10
							}
						},
						itemStyle: {
							normal: {
								color: 'rgb(137,189,27)',
								borderColor: 'rgba(137,189,2,0.27)',
								borderWidth: 12

							}
						},
						//        data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
						data: this.sdata
					}]
				})
			}
		}
	}
</script>