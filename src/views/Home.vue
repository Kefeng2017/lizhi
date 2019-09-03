<template>
  <div class="home">
    <div class="banner">
      <h1 class="nav">
        <i class="iconfont icon-menu menu"></i>
        <i class="iconfont icon-share share"></i>
      </h1>

      <div class="avatar">
        <img alt="南京市民李先生" src="../assets/img/lizhi.png" />
        <p>
          南京市民李先生
          <span></span>
        </p>
      </div>

      <div class="mask"></div>
    </div>

    <div class="content">
      <h1 class="menu">
        <span
          :class="{'active-menu':activeMenu === 'video'}"
          @click="changeMenu('video')"
          class="video"
        >视频</span>&nbsp;/
        <span
          :class="{'active-menu':activeMenu === 'music'}"
          @click="changeMenu('music')"
          class="music"
        >音乐</span>
      </h1>
      <ul class="list-wrap">
        <li
          :key="index"
          @click="selectVideo(video)"
          class="list-item"
          v-for="(video, index) in videoList"
        >
          <img alt="定西" src="../assets/img/video.png" />
          <div class="infos">
            <h2 class="title">{{ video }}</h2>
            <p class="desc">
              《定西》为李志演唱的单曲，由李志本人作词作曲，收录于专辑《1701》。 [1]
              《定西》为李志演唱的单曲，由李志本人作词作曲，收录于专辑《1701》
            </p>
            <p>更新于2019.10.1</p>
          </div>
        </li>

        <li class="empty-item"></li>
        <li class="empty-item"></li>
      </ul>

      <ul></ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import hlsVideo from '@/components/hlsVideo'
export default {
  name: 'home',
  data () {
    return {
      activeMenu: 'video',
      videoList: ''
    }
  },
  created () {
    this.axios
      .get('/tx/video/list.txt')
      .then(res => {
        let list = res.data.split(/\s/)
        this.videoList = list
          .map(item => {
            return item.replace(/.*\//, '')
          })
          .filter(item => item)
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    changeMenu (menu) {
      switch (menu) {
        case 'video':
          if (this.activeMenu === 'video') {
            return
          } else {
            this.activeMenu = 'video'
          }
          break
        case 'music':
          if (this.activeMenu === 'music') {
            return
          } else {
            this.activeMenu = 'music'
          }
          break
      }
    },
    selectVideo (video) {
      this.$router.push({
        path: '/video/' + video
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss';

.home {
  .banner {
    position: relative;
    height: 560px;
    background-image: url('../assets/img/banner.png');
    background-size: cover;
    .mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 0;
    }
    .nav {
      top: 1em;
      width: 100%;
      position: absolute;
      z-index: 1;
      i {
        font-size: $title-size;
        cursor: pointer;
      }
      .share {
        position: absolute;
        right: 2em;
        animation: 1s right-in;
      }
      .menu {
        position: absolute;
        left: 2em;
        animation: 1s left-in;
      }
      @keyframes right-in {
        0% {
          right: -2em;
        }
        100% {
          right: 2em;
        }
      }
      @keyframes left-in {
        0% {
          left: -2em;
        }
        100% {
          left: 2em;
        }
      }
      color: rgb(194, 151, 117);
    }
    .avatar {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      margin-top: -90px;
      bottom: 0;
      padding: 1em;
      z-index: 1;
      img {
        width: 160px;
        height: 160px;
      }
      animation: 0.5s bottom-in;
      p {
        max-width: 760px;
        margin: 0 auto;
        padding: 2em;
        text-align: justify;
        word-spacing: 2em;
        span {
          width: 100%;
          display: inline-block;
        }
      }
    }
    @keyframes bottom-in {
      0% {
        margin-top: -50px;
      }
      100% {
        margin-top: -90px;
      }
    }
  }

  .content {
    padding: 1em;
    max-width: 1080px;
    margin: 0 auto;
    .menu {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      padding: 1em;
      .video,
      .music {
        cursor: pointer;
        transition: 0.3s border;
      }
      .active-menu {
        color: rgb(229, 108, 100);
        border-bottom: 2px solid rgb(229, 108, 100);
      }
    }
    .list-wrap {
      display: flex;
      width: 100%;
      align-items: flex-start;
      justify-content: space-around;
      align-content: flex-start;
      flex-wrap: wrap;
      .list-item {
        cursor: pointer;
        color: #242326;
        box-sizing: border-box;
        max-width: 320px;
        margin: 1em;
        background-color: #95969b;
        padding: 0.5em;
        img {
          width: 100%;
        }
      }
      .empty-item {
        width: 320px;
        height: 0;
        margin: 1em;
      }
    }
  }
}
</style>
