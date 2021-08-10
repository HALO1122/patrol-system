<template>
  <div class="chinaMap">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe697;</i></span>
      <span class="ml10">考生分布热度统计</span>
    </div>
    <div class="city-list">
      列表数据
    </div>
    <div class="wrap-map">
      <div ref="chinaMap" class="chart-map" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
export default {
  name: 'ChinaMap',
  props: ['userJson'],
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chinaConfigure()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    chinaConfigure() {
      const chinaMap = echarts.init(this.$refs.chinaMap)
      window.onresize = chinaMap.resize
      chinaMap.setOption({
        backgroundColor: '#071846',
        visualMap: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1.20,
          label: {
            normal: {
              show: false, // 是否显示对应地名
              textStyle: {
                color: '#02F6F9'
              }
            },
            emphasis: { // 对应的鼠标悬浮效果
              show: true,
              textStyle: {
                color: '#02F6F9'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#091E64',
              borderColor: '#024DBA'
            },
            emphasis: {
              borderWidth: 1,
              areaColor: '#091E64',
              borderColor: '#024DBA'
            }
          }
        },
        series: [
          {
            type: 'map',
            coordinateSystem: 'geo',
            roam: true,
            aspectScale: 0.75,
            zoom: 1.2,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(12, 30, 99, 0.2)',
                color: '#fff'
              }
            },
            data: [{
              'name': '北京',
              'value': 120
            }, {
              'name': '上海',
              'value': 142
            }, {
              'name': '黑龙江',
              'value': 44
            }, {
              'name': '深圳',
              'value': 92
            }, {
              'name': '湖北',
              'value': 810
            }, {
              'name': '四川',
              'value': 453
            }]
          }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag-color: #3682FF;
.chinaMap{
  width: 100%;
  padding: 10px 20px 20px;
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  .city-list{
    float: left;
    border: 1px solid $tag-color;
    height: 400px;
  }
  .wrap-map{
    float: right;
    width: 60%;
    height: 400px;
    // border: 1px dashed #888888;
    .chart-map{
      width: 100%;
      height: 396px;
      div{
        width: 100%;
        height: 100%;
        canvas{
          width: 100%;
          height: 100%;
        }
      }
    }
  }

}
</style>
