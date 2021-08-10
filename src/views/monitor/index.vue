<template>
  <div class="monitor">
    <h2>易考在线考试监控平台</h2>
    <div class="content mt10">
      <el-row>
        <el-col :span="6">
          <div class="wrap-content">
            <entry-online />
            <entry-count />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="wrap-content">
            <map-statistic />
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
import EntryCount from './components/EntryCount'
import Abnormal from './components/Abnormal'
import SigninStatistic from './components/SigninStatistic'
import MapStatistic from './components/MapStatistic'
export default {
  name: 'LineChart',
  components: { EntryOnline, EntryCount, Abnormal, SigninStatistic, MapStatistic }
}
</script>

<style lang="scss" scoped>
.monitor{
  height: 100%;
  background: url('../../assets/images/index-bg.jpg') no-repeat;
  background-size: cover;
  color: #fff;
  h2{
    margin: 0;
    text-align: center;
    padding-top: 30px;
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
