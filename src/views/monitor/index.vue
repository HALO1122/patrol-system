<template>
  <div class="monitor">
    <div class="header">
      <p class="header-menu" />
      <h2>易考在线考试监控平台</h2>
      <p class="header-time" @click="refreshMonitor()">{{ formatTime(curTime) }}</p>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="6">
          <div class="wrap-content">
            <entry-online />
            <entry-status />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="wrap-content">
            <map-statistic />
            <entry-monitor />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="wrap-content">
            <abnormal />
            <signin-statistic />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import EntryOnline from './components/EntryOnline'
import EntryStatus from './components/EntryStatus'
import EntryMonitor from './components/EntryMonitor'
import Abnormal from './components/Abnormal'
import SigninStatistic from './components/SigninStatistic'
import MapStatistic from './components/MapStatistic'
import { openSocket } from '@/utils/connecSocket'
import { parseTime } from '@/utils/index'

export default {
  name: 'LineChart',
  components: { EntryOnline, EntryStatus, Abnormal,
    SigninStatistic, MapStatistic, EntryMonitor },
  data() {
    return {
      curTime: new Date()
    }
  },
  mounted() {
    openSocket()
  },
  methods: {
    formatTime(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}')
    },
    refreshMonitor() {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor{
  height: 100%;
  overflow: hidden;
  background: url('../../assets/images/index-bg.jpg') no-repeat;
  background-size: cover;
  color: #fff;
  .header{
    display: flex;
    justify-content: space-between;
    margin: 0;
    text-align: center;
    padding: 10px 40px 0px;
    h2 { padding-left: 8%; }
    .header-time{
      background: url('../../assets/images/refresh.png') no-repeat 0px -2px;
      background-size: 24px 24px;
      padding-left: 50px;
      cursor: pointer;
    }
    .header-menu{
      width: 24px;
      height: 24px;
      cursor: pointer;
      background: url('../../assets/images/menu.png') no-repeat 0px -2px;
      background-size: 24px 24px;
    }
  }
  .content{
    height: 92%;
    padding: 30px;
    .el-row{
      height: 100%;
      .el-col{
        height: 100%;
        padding: 0 10px;
        .wrap-content{
          height: 100%;
          display: flex;
          flex-direction: column;
          .entry-count, .entry-online{ flex: 1; }
        }
      }
    }
  }

}
</style>
