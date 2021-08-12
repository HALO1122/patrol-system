<template>
  <div class="abnormal">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe694;</i></span>
      <span class="ml10">重点异常警报</span>
    </div>
    <div class="chart-title pt10">
      <span class="people">人数</span>
      <span class="frequency pl5">次数</span>
    </div>
    <div id="abnormal" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { abnormalType } from '@/utils/api'
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
      chart: null,
      type: {}
    }
  },
  mounted() {
    this.initChart()
    this.getAbnormalType()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getAbnormalType() {
      const res = await abnormalType()
      console.log(res, 'type---res')
    },
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
        grid: {
          left: '4%',
          top: '5%',
          right: '0%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['签到异常', '偏离监控', '佩戴耳机', '翻阅数据', '出现他人', '拍摄屏幕', '使用手机', '打电话'],
          axisLabel: {
            interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
            margin: 20,
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        itemStyle: {
          barBorderRadius: [10, 10, 10, 10],
          top: 10
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            data: [1, 0, 4, 6, 2, 1, 3, 0],
            barWidth: 6, // 柱子宽度
            itemStyle: {
              normal: {
                color: '#02F6F9',
                opacity: 1
              }
            },
            label: {
              show: true,
              position: 'right',
              trigger: 'axis',
              formatter: '{c}人'
            }
          },
          {
            name: '次数',
            type: 'bar',
            barWidth: 6, // 柱子宽度
            data: [2, 1, 3, 4, 2, 1, 6, 1],
            itemStyle: {
              normal: {
                color: '#3682FF',
                opacity: 1
              }
            },
            label: {
              show: true,
              position: 'right',
              trigger: 'axis',
              formatter: '{c}人'
            }
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
  // height: calc(100vh - 84px);
  height: 60%;
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  .chart-title{
    float: right;
    margin-right: 20px;
    .people{
      color: #02F6F9;
      &::before{
        width: 8px;
        height: 8px;
        background-color: #02F6F9;
      }
    }
    .frequency{
      color: $tag-color;
      &::before{
        width: 8px;
        height: 8px;
        background-color: $tag-color;
      }
    }
  }
}
</style>
