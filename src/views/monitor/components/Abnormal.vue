<template>
  <div class="abnormal">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe694;</i></span>
      <span class="ml10">重点异常警报</span>
    </div>
    <div id="abnormal" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
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
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('abnormal'))
      this.chart.setOption({
        backgroundColor: '#061748',
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['签到异常', '偏离监控', '佩戴耳机', '翻阅数据', '出现他人', '拍摄屏幕', '使用手机', '打电话', '第九异常'],
          axisLine: {
            lineStyle: {
              color: '#E0E2E7'
            }
          }
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            color: 'rgb(2, 246, 249)',
            data: [20, 40, 60, 80, 18203, 23489, 29034, 104970, 131744]
          },
          {
            name: '人次',
            type: 'bar',
            color: 'rgb(54, 130, 255)',
            data: [100, 80, 60, 10, 19325, 23438, 31000, 121594, 134141]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag-color: #3682FF;
.abnormal{
  padding: 10px 20px;
  height: calc(100vh - 84px);
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
}
</style>
