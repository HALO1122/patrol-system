<template>
  <div class="abnormal">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe694;</i></span>
      <span class="ml10">重点异常警报</span>
    </div>
    <div class="chart-title pt10">
      <div class="people"><p class="square" /><span>人数</span></div>
      <div class="frequency pl10"><p class="square" /><span>次数</span></div>
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
      default: '85%'
    }
  },
  data() {
    return {
      chart: null,
      type: [
        { type: '5', number: 0, count: 0 },
        { type: '2', number: 0, count: 0 },
        { type: '9', number: 0, count: 0 },
        { type: '8', number: 0, count: 0 },
        { type: '3', number: 0, count: 0 },
        { type: '13', number: 0, count: 0 },
        { type: '12', number: 0, count: 0 },
        { type: '4', number: 0, count: 0 }
      ],
      typeList: [],
      numberList: [],
      countList: []
    }
  },
  mounted() {
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
      let typeData = null
      const res = await abnormalType()
      if (res.result.length === 0) {
        typeData = this.type
      } else {
        typeData = res.result
      }
      this.initChart(typeData)
    },
    initChart(data) {
      this.chart = echarts.init(document.getElementById('abnormal'))
      this.handelTypeList(data)

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
          data: this.typeList,
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
            data: this.numberList,
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
            data: this.countList,
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
    },
    handelTypeList(data) {
      data.map(item => {
        this.typeList.push(this.monitorCode(item.type))
        this.numberList.push(item.number)
        this.countList.push(item.count)
      })
    },
    monitorCode(code) {
      switch (code) {
        case '-1':
          return '其他'
        case '0':
          return '正常'
        case '1':
          return '替考'
        case '2':
          return '偏离监控'
        case '3':
          return '出现他人'
        case '4':
          return '打电话'
        case '5':
          return '签到异常'
        case '6':
          return '与他人交谈'
        case '7':
          return '使用计算器'
        case '8':
          return '翻阅资料'
        case '9':
          return '佩戴耳机'
        case '10':
          return '戴口罩、墨镜、帽子等遮挡面部'
        case '11':
          return '视频通话异常截图'
        case '12':
          return '使用手机'
        case '13':
          return '拍摄屏幕'
        case '14':
          return '出现与考试相关的音频内容'
        case '15':
          return '离座'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag1-color: #3682FF;
$tag2-color: #02F6F9;
.abnormal{
  padding: 10px 20px;
  // height: calc(100vh - 84px);
  height: 60%;
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  .chart-title{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
    font-size: 12px;
    .square{
      margin: 5px 8px 0px;
      width: 8px;
      height: 8px;
    }
    div{ display: flex; }
    .people{
      color: $tag2-color;
      .square { background-color: $tag2-color; }
    }
    .frequency{
      color: $tag1-color;
      .square { background-color: $tag1-color; }
    }
  }
}
</style>
