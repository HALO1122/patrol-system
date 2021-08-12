<template>
  <div class="entry-monitor mt10">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe693;</i></span>
      <span class="ml10">实时考生监控画面</span>
    </div>
    <div class="wrap-content">
      <div v-if="monitorData.length == 0" class="wrap-tip">暂无考生在线！</div>
      <div v-for="(item, index) in monitorData" v-else :key="index" class="warp-video">
        <single-entry :single-item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { EntryMonitor } from '@/utils/api'
import singleEntry from './singleEntry.vue'

export default {
  components: { singleEntry },
  data() {
    return {
      monitorData: [],
      isVideo: false,
      peers: {}
    }
  },
  mounted() {
    this.getSingleEntry()
  },
  methods: {
    async getSingleEntry() {
      const res = await EntryMonitor()
      this.monitorData = res.result
      console.log(res, 'res')
      console.log(this.$socket, '**')
    }
  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag-color: #3682FF;
.entry-monitor{
  width: 100%;
  height: calc(100vh - 84px);
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  padding: 10px 20px;
  .wrap-content{
    .wrap-tip{
      margin: 0 auto;
      padding-top: 30px;
      color: #02F6F9;
    }
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .warp-video{
      width: 32%;
      height: 208px;
      // border: 1px solid #3169CC;
    }
  }
}
</style>
