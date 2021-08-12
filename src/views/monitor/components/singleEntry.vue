<template>
  <div class="single-entry">
    <video ref="entry_video" class="entry-video" src="" muted autoplay playsinline />
    <p class="entry-abnormal">有异常</p>
    <div class="entry-name">
      <span>{{ singleItem.full_name }}</span>
      <span class="pl10">{{ singleItem.permit }}</span>
    </div>
  </div>
</template>

<script>
const Peer = require('simple-peer')
export default {
  props: {
    singleItem: {
      type: Object,
      dafault: {}
    }
  },
  data() {
    return {
      isVideo: false,
      peers: {},
      to_peers: {}
    }
  },
  sockets: {
    message(data) {
      switch (data.type) {
        case 'signal_called':
          var peer = this.peers[data.to_peer]
          this.to_peers[data.to_peer] = data.from_peer
          if (peer !== null && peer !== undefined) {
            peer.signal(data.msg)
          }
          break
        case 'signal':
          var _peer = this.peers[data.to_peer]
          this.to_peers[data.to_peer] = data.from_peer
          if (_peer !== null && _peer !== undefined) {
            _peer.signal(data.msg)
          }
          break
      }
    }
  },
  mounted() {
    // monitor_photo_count
    this.connect(this.singleItem.socket_id, this.$refs)
  },
  methods: {
    connect(socket_id, refs) {
      const that = this; const peer = new Peer()
      that.peers[peer._id] = peer

      console.log(socket_id, 'socket_id')
      console.log(peer, 'peer_id')

      peer.on('signal', function(data) {
        var pkt = {
          type: 'signal',
          to: socket_id,
          from_peer: peer._id,
          to_peer: that.to_peers[peer._id],
          msg: data
        }
        that.$socket.emit('message', pkt)
      })

      peer.on('connect', function() {
        console.log('peer------------------connect')
      })

      peer.on('stream', function(stream) {
        console.log(refs, 'refs')
        console.log(refs.entry_video, 'refs.entry_video')
        refs.entry_video.srcObject = stream
        that.isVideo = true
        console.log('stream available: ')
      })
      peer.on('data', function(data) {
        console.log('data available')
      })
      peer.on('close', function() {
        that.isVideo = false
        console.log('peer------------------closed')
      })
      peer.on('error', function(error) {
        console.log('error: ', error)
      })
      // make the call
      var pkt = {
        type: 'call',
        to: socket_id,
        from_peer: peer._id,
        from: that.$socket.id,
        msg: 'proctor_call'
      }
      that.$socket.emit('message', pkt)
    }
  }
}
</script>

<style lang="scss" scoped>
.single-entry{
  position: relative;
  width: 100%;
  height: 100%;
  .entry-name{
    width: 100%;
    height: 38px;
    line-height: 38px;
    position: absolute;
    bottom: 0px;
    padding-left: 20px;
    background-color: rgba(55,69,101,0.5);
  }
  .entry-abnormal{
    position: absolute;
    top: -4px;
    right: 8px;
    font-size: 14px;
    padding: 3px 8px 3px 10px;
    background: linear-gradient(45deg , transparent 5px, rgba(237, 97, 90, 0.8) 0);
    background-repeat: no-repeat;
  }
  video{
    width: 100%;
    height: 100%;
  }
}
</style>
