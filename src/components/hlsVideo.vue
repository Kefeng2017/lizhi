<template>
  <div class="video">
    <video
      @error="error"
      @pause="pause"
      @play="play"
      @seeked="seeked"
      @seeking="seeking"
      @waiting="waiting"
      controls
      height="100%"
      preload
      ref="video"
      width="100%"
    >
      <source :src="source" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import Hls from 'hls.js'
import { HLS_CONFIG } from './common/config'
export default {
    props: ['source'],
    data() {
        return {
            isPlaying: false
        }
    },
    mounted() {
        // 判断浏览器是否支持Hls
        // if (Hls.isSupported()) {
        //     console.log('hls.js supported!')
        //     let video = this.$refs.video
        //     let hls = new Hls(HLS_CONFIG)
        //     hls.loadSource(this.source)
        //     hls.attachMedia(video)
        //     hls.on(Hls.Events.MEDIA_ATTACHED, function() {
        //         video.pause()
        //     })
        // } else {
        //     alert('您的浏览器不支持此视频格式，请使用Chrome或者火狐')
        // }
        this.isPlaying = this.$refs.video.paused
    },
    methods: {
        play() {
            console.log('play')
            this.isPlaying = true
            this.$emit('control', 'play')
        },
        pause() {
            console.log('pause')
            this.isPlaying = false
            this.$emit('control', 'pause')
        },
        error() {
            console.log('error')
            this.isPlaying = false
            this.$emit('control', 'pause')
        },
        waiting() {
            console.log('watting')
            this.isPlaying = false
            this.$emit('control', 'pause')
        },
        seeked() {
            console.log('seeked')
            this.isPlaying = true
            this.$emit('control', 'play')
        },
        seeking() {
            console.log('seeking')
            this.isPlaying = false
            this.$emit('control', 'pause')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
