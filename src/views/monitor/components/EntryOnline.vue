<template>
  <div class="entry-online">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe696;</i></span>
      <span class="ml10">在线人数分析</span>
    </div>
    <div :id="id" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { EntryOnline } from '@/utils/api'
import { parseTime } from '@/utils/index'
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '98%'
    },
    height: {
      type: String,
      default: '90%'
    }
  },
  data() {
    return {
      chart: null,
      online: '',
      timeList: [],
      numList: []
    }
  },
  mounted() {
    this.getEntryOnline()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getEntryOnline() {
      const res = await EntryOnline()
      this.initChart(res)
      this.online = res
    },
    initChart(res) {
      this.handelOnlineList(res.online_list)
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: '#061748',
        title: {
          top: 20,
          text: '当前已开考' + res.login_number + '人',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            color: '#3682FF'
          },
          left: '20%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#1A418E'
            }
          },
          data: this.timeList
        }],
        yAxis: [{
          type: 'value',
          name: '在线量（人）',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#1A418E'
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
              color: '#1A418E'
            }
          }
        }],
        series: [{
          name: 'online',
          type: 'line',
          smooth: true,
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
                color: 'rgba(2, 246, 249, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(2, 246, 249, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(2, 246, 249)',
              borderColor: 'rgba(2, 246, 249,0.2)',
              borderWidth: 8
            }
          },
          data: this.numList
        }]
      })
    },
    handelOnlineList(data) {
      data.map(item => {
        this.timeList.push(parseTime(item.time, '{h}:{i}'))
        this.numList.push(item.online)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag-color: #3682FF;
.entry-online{
  width: 100%;
  padding: 10px 20px;
  height: calc(100vh - 84px);
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
}
</style>

