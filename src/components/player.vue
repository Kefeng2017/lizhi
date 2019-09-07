<template>
  <div id="dplayer"></div>
</template>

<script>
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'

export default {
  props: ['videoInfo'],
  data () {
    return {
      isPlaying: false,
      Dplayer:null
    }
  },
  mounted () {
    const dp = new DPlayer({
      container: document.getElementById('dplayer'),
      screenshot: true,
      video: {
        url: this.videoInfo.source,
        pic: this.videoInfo.cover
      }
    })
    this.Dplayer = dp
    dp.on('play',()=>{
      console.log('play');
      this.isPlaying = true
    })
    dp.on('playing',()=>{
      console.log('play');
      this.isPlaying = true
    })
    dp.on('pause',()=>{
      console.log('pause');
      this.isPlaying = false
    }),
    dp.on('seeking',()=>{
      console.log('pause');
      this.isPlaying = false
    }),
    dp.on('ended',()=>{
      console.log('pause');
      this.isPlaying = false
    }),
    dp.on('error',()=>{
      console.log('pause');
      this.isPlaying = false
    }),
    dp.on('waiting',()=>{
      console.log('pause');
      this.isPlaying = false
    })
  },
  methods: {
    
  },
  watch:{
    isPlaying(val){
      if(val){
        this.$emit('control', 'play')
      }else{
        this.$emit('control', 'pause')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
