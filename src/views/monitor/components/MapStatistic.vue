<template>
  <div class="chinaMap">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe697;</i></span>
      <span class="ml10">考生分布热度统计</span>
    </div>
    <div class="city-list">
      <el-table
        :data="tableData"
        :cell-style="tableCellStyle"
        :header-cell-style="{background:'#0C2056',color:'#357FFA',border:'none'}"
      >
        <el-table-column
          type="index"
          label="排名"
          align="center"
          width="80"
        />
        <el-table-column
          prop="name"
          label="地区"
          align="center"
          width="80"
        />
        <el-table-column
          prop="num"
          align="center"
          label="开考人数"
        />
      </el-table>
    </div>
    <div class="wrap-map">
      <div ref="chinaMap" class="chart-map" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import { EntryArea } from '@/utils/api'

export default {
  name: 'ChinaMap',
  props: ['userJson'],
  data() {
    return {
      chart: null,
      tableData: [],
      mapData: []
    }
  },
  mounted() {
    this.getEntryArea()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getEntryArea() {
      const res = await EntryArea()
      if (res.result.length !== 0) {
        this.handelAreaData(res.result)
        this.mapData = res.result
      }
      this.chinaConfigure(res.result)
    },
    handelAreaData(item) {
      for (let i = 0, len = item.length; i < len; i++) {
        this.tableData.push({ name: item[i].name, num: item[i].value[2] })
      }
      this.tableData.sort(this.compare('num'))
    },
    // 数组排序
    compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value2 - value1
      }
    },
    // table表格样式设置
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        return { background: '#061746', color: '#E7E9EF', borderBottom: '#061746' }
      } else {
        return { background: '#0C2056', color: '#E7E9EF', borderBottom: '#0C2056' }
      }
    },
    chinaConfigure(mapData) {
      const chinaMap = echarts.init(this.$refs.chinaMap)
      window.onresize = chinaMap.resize

      console.log(mapData, 'this.mapData')
      chinaMap.setOption({
        backgroundColor: '#071846',
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 1000,
        //   text: ['High', 'Low'],
        //   realtime: true,
        //   calculable: true,
        //   color: ['#02F6F9', '#02F6F9', '#02F6F9']
        // },
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
        visualMap: {
          type: 'piecewise',
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#02F6F9', '#02F6F9', '#02F6F9']
          },
          pieces: [{
            min: 0,
            max: 100000,
            label: ' ',
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(3, 232, 239, 0.5)' // 0% 处的颜色
              }, {
                offset: 0.6,
                color: 'rgba(22,159,156,0)'
              }, {
                offset: 1,
                color: 'rgba(3, 232, 239, 1)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }],
          show: false,
          textStyle: {
            color: '#ffffff',
            fontSize: 16
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            symbolSize: function(val) {
              return val[2] / 10
            },
            label: {
              normal: {
                show: true,
                color: '#fff',
                fontWeight: 'normal',
                position: 'inside',
                formatter: function(para) {
                  if (para.data.value[2] > 1000) {
                    return '{txtFontsize|' + para.data.name + '}' + '{cnNum|' + para.data.value[2] + '}'
                  } else {
                    return ''
                  }
                },
                rich: {
                  cnNum: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#fff'
                  },
                  txtFontsize: {
                    fontSize: 14,
                    color: '#02F6F9'
                  }
                }
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
            data: mapData
          }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag-color: #3682FF;
.el-table::before {
  height: 0px;
}
.chinaMap{
  width: 100%;
  padding: 10px 20px 20px;
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  .city-list{
    width: 30%;
    margin: 20px 0px;
    float: left;
    border: 1px solid #183473;
    height: 500px;
    overflow-y: auto;
  }
  .wrap-map{
    float: right;
    width: 70%;
    height: 500px;
    // border: 1px dashed #888888;
    .chart-map{
      width: 100%;
      height: 496px;
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
