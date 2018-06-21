<template>
  <video src="" controls autoplay ref="videoElement"></video>
</template>

<script>
export default {
  name: 'flv-player',
  props: {
    url: String
  },
  data () {
    return {
      flvPlayer: null
    }
  },
  watch: {
    url (val) {
      if (val) {
        this.InitFlv()
      }
    }
  },
  methods: {
    InitFlv () {
      if (this.$flvjs.isSupported()) {
        let videoElement = this.$refs.videoElement
        this.flvPlayer = this.$flvjs.createPlayer({
          type: 'flv',
          url: this.url
        })
        this.flvPlayer.attachMediaElement(videoElement)
        this.flvPlayer.load()
        this.flvPlayer.play()
      }
    }
  },
  destroyed () {
    this.flvPlayer.destroy()
  }
}
</script>

<style lang="scss" scoped>
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
