<template>
  <div class="entry-monitor mt10">
    <div class="warp-title">
      <span class="icon-border"><i class="ez-icon">&#xe693;</i></span>
      <span class="ml10">实时考生监控画面</span>
    </div>
    <div class="wrap-content">
      <div v-for="item in monitorData" :key="item.socket_id" class="warp-video" />
    </div>
  </div>
</template>

<script>
import { EntryMonitor } from '@/utils/api'
export default {
  data() {
    return {
      monitorData: []
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
    }
    // console.log('buzhdiaonizaiganshanembuzhdiaonadoa)
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
    display: flex;
    justify-content: space-between;
    height: 100%;
    .warp-video{
      width: 240px;
      height: 160px;
      border: 1px solid #fff;
    }
  }
}
</style>
