<template>
  <div class="chinaMap">
    <div ref="chinaMap" :style="{height: '600px', width: '100%'}" />
  </div>
</template>

<script>
import echarts from 'echarts'
//   import '../../node_modules/echarts/map/js/world.js'
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
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
        toolbar: {},
        dataRange: {
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
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo'
          }, {
            name: '启动次数', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: [{
              'name': '北京',
              'value': 599
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
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chinaMap{
    margin: 150px auto;
}
</style>
