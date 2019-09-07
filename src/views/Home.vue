<template>
  <div class="home">
    <div class="banner">
      <h1 class="nav">
        <i class="iconfont icon-menu menu"></i>
        <p class="about">
          <a href="/about">关于本站</a>
          <a href="/git">git仓库</a>
          <a href="/award">赏杯奶茶</a>
        </p>
        <i @click="copyLink" class="iconfont icon-share share"></i>
      </h1>

      <div class="avatar">
        <img alt="南京市民李志" src="../assets/img/lizhi.png" />
        <p>
          南京市民李志
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
          @click="selectVideo(video.id)"
          class="list-item"
          v-for="(video, index) in videoList"
        >
          <img :src="video.cover +''" @error.once="setDefault($event)" />
          <div class="infos">
            <h2 class="title">{{ video.title }}</h2>
            <p class="tag">{{video.tag}}</p>
            <p>更新于&nbsp;{{video.add_time}}</p>
            <div class="count">
              <span class="view">
                {{video.view}}<i class="iconfont icon-eye"></i>
              </span>
              <span class="hot">
                {{video.hot}}<i class="iconfont icon-fire1"></i>
              </span>
              <span class="comment">
                {{video.comment}}<i class="iconfont icon-comment"></i>
              </span>
            </div>
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
      .get('/api/all')
      .then(res => {
        this.videoList = res.data.videos
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
    selectVideo (id) {
      this.$router.push({
        path: '/video/' + id
      })
    },
    setDefault (e) {
      e.target.src = 'http://kkboom.cn/cover/d1ef1410-ce51-11e9-9703-37d866b0de4d.jpg'
    },
    copyLink(){
      console.log(window.location.href);
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
      .about{
        position: absolute;
        left: 3em;
        top: 0;
        margin: 0;
        line-height: 35px;
        font-size: 16px;
        a{
          vertical-align: middle;
          margin: 0 10px;
          color: rgb(194, 151, 117);
          cursor: pointer;
        }
      }
      i {
        vertical-align: middle;
        font-size: $title-size;
        cursor: pointer;
        line-height: 35px;
      }
      .share {
        position: absolute;
        right: 1em;
        animation: 1s right-in;
      }
      .menu {
        position: absolute;
        left: 1em;
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
        box-shadow: 0 0 30px #212223;
        cursor: pointer;
        color: #242326;
        box-sizing: border-box;
        width: 320px;
        margin: 1em;
        background-color: #95969b;
        img {
          width: 100%;
        }
        .infos {
          padding: 0.5em;
          position: relative;
          .title {
            font-size: 16px;
            line-height: 32px;
          }
          .count{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            span{
              text-align: right;
              padding: 0 1em;
              i{
                margin-left: .3em;
              }
            }
          }
        }
      }
      .empty-item {
        width: 320px;
        height: 0;
        margin: 1em;
      }
    }
  }

  @media (max-width: 540px) {
    .content {
      padding: 0;
      .list-wrap {
        .list-item {
          width: 360px;
        }
      }
    }
  }
}
</style>
