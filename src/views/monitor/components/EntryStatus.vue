<template>
  <div class="entry-count mt10">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe693;</i></span>
      <span class="ml10">考生状态统计</span>
    </div>
    <div id="countChart" :style="{height:height,width:width}" />
    <div class="enrty-status-count">
      <ul>
        <li class="ml20">
          <img src="../../../assets/images/status1.png" alt="status1" width="46px" height="52px">
          <div class="ml5 mt10 ">
            <p class="txt-18">{{ count.online_number }}</p>
            <p class="name">在线考生</p>
          </div>
        </li>
        <li>
          <img src="../../../assets/images/status2.png" alt="status1" width="46px" height="52px">
          <div class="ml5 mt10 ">
            <p class="txt-18">{{ count.no_login_number }}</p>
            <p class="name">未开考考生</p>
          </div>
        </li>
      </ul>
      <ul>
        <li class="ml20">
          <img src="../../../assets/images/status3.png" alt="status1" width="46px" height="52px">
          <div class="ml5 mt10 ">
            <p class="txt-18">{{ count.achieve_number }}</p>
            <p class="name">完成考生</p>
          </div>
        </li>
        <li>
          <img src="../../../assets/images/status4.png" alt="status1" width="46px" height="52px">
          <div class="ml5 mt10 ">
            <p class="txt-18">{{ openRate }}</p>
            <p class="name">参考率</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { EntryStatus } from '@/utils/api'
export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '280px'
    },
    height: {
      type: String,
      default: '150px'
    }
  },
  data() {
    return {
      chart: null,
      count: ''
    }
  },
  computed: {
    openRate() {
      return (this.count.login_percent * 100) + '%'
    },
    unopenRate() {
      return (this.count.no_login_percent * 100) + '%'
    }
  },
  mounted() {
    this.getEntryStatus()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
  },
  methods: {
    async getEntryStatus() {
      const res = await EntryStatus()
      this.initChart(res)
      this.count = res
    },
    initChart(res) {
      this.chart = echarts.init(document.getElementById('countChart'))
      this.chart.setOption({
        backgroundColor: '#061748',
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '考生状态统计',
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              alignTo: 'edge',
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15
            },
            data: [
              { value: res.online_number + res.achieve_number, name: '开考', itemStyle: { color: '#02F6F9' }},
              { value: res.no_login_number, name: '未开考', itemStyle: { color: '#3682FF' }}
            ]
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
.entry-count{
  width: 100%;
  height: calc(100vh - 84px);
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  padding: 10px 20px;
  .enrty-status-count{
    ul{
      display: flex;
      margin: 16px 0px;
      li {
        display: flex;
        flex: 1;
        padding: 5px 12px;
        p{ margin: 0; }
        .name{
          color: $tag-color;
          font-size: 12px;
        }
      }
    }
  }

}
#countChart{
  margin: 10px auto;
}
</style>
