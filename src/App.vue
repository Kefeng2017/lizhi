<template>
  <div id="app" ref="main">
    <div v-if="isShowToast" class="my-toast" :class="{'fixed':fixedToast}">
      <span>{{toastMsg}}</span>
      <span class="m-join">加入讨论</span>
      <span @click="closeToast" class="m-close">不再显示</span>
    </div>
    <div @click="backToTop" v-if="backTop" class="top">
      <i class="iconfont icon-huidaodingbu"></i>
    </div>
    <router-view />
  </div>
</template>

<script>
import io from 'socket.io-client'
import { clearTimeout } from 'timers';
export default {
  data () {
    return {
      clientHeight: '',
      scrollTop: 0,
      toastMsg: '',
      isShowToast:false,
      toastTimer:null,
      fixedToast:false
    }
  },
  mounted () {
    this.clientHeight = document.documentElement.clientHeight
    window.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop
      if (this.scrollTop > 50) {
        this.fixedToast = true
      } else {
        this.fixedToast = false
      }
    })
    // web socket
    var socket = io('http://localhost:8080')
    socket.emit('enter', {
      ip: '0.0.0.0',
      name: '小可爱'
    })
    socket.on('toast', msg => {
      this.toastMsg = msg
      this.isShowToast = true
      if(this.toastTimer){
          clearTimeout(this.toastTimer)
      }
      this.toastTimer = setTimeout(() => {
          this.isShowToast = false
      }, 5000);
    })
  },
  watch: {
    $route () {
      document.documentElement.scrollTop = 0
    }
  },
  computed: {
    backTop () {
      return this.scrollTop > 100
    }
  },
  methods: {
    backToTop () {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 0) {
        document.documentElement.scrollTop = 0
      }
    },
    closeToast(){
        this.isShowToast = false
    }
  }
}
</script>

<style lang="scss">
@import '//at.alicdn.com/t/font_1345347_re4tw41hru.css';

* {
  padding: 0;
  margin: 0;
  list-style: none;
  outline: none;
  text-decoration: none;
}
html {
  font-size: 10px;
}
#app {
  padding-bottom: 120px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #cecbcb;
  background-color: rgb(35, 36, 42);

  .line {
    margin: 1rem 0;
    border-bottom: none;
    border-color: #91959b;
  }

  .my-toast {
    top: 0;
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    z-index: 1;
    line-height: 30px;
    span {
      margin: 0 2em;
    }
    span:hover{
        color: rgb(229, 108, 100);
    }
    .m-join, .m-close{
        cursor: pointer;
    }
  }
  .fixed {
    position: fixed;
  }

  .top {
    position: fixed;
    bottom: 50px;
    right: 1rem;
    background: rgba(255, 255, 255, 0.1);
    color: #cecbcb;
    padding: 5px;
  }
}
</style>
