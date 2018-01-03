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
  watch: {
			sdata() {
				this.initChart()
			}
		},
  mounted() {
    this.initChart()
    this.chart = null
  },
  beforeDestroy() {
    if (!this.chart) {
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
//      backgroundColor: '#344b58',
    title: {
      text: this.$t('script.1'),
      subtext:this.$t('script.2'),
      left:'center',
    },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '15%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: [this.$t('script.3')]
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: this.tdata
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name:this.$t('script.3'),
          type: 'bar',
          stack: this.$t('script.4'),
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.sdata
        },

       
        ]
      })
    }
  }
}
</script>

