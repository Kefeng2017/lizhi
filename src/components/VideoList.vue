<template>
  <div class="content">
    <ul class="list-wrap">
      <li
        :key="index"
        @click="selectVideo(video.id)"
        class="list-item"
        v-for="(video, index) in videos"
      >
        <img :src="video.cover +''" @error.once="setDefault($event)" />
        <div class="infos">
          <h2 class="title">{{ video.title }}</h2>
          <p class="tag">{{video.tag}}</p>
          <p>更新于&nbsp;{{video.add_time}}</p>
          <div class="count">
            <span class="view">
              {{video.view}}
              <i class="iconfont icon-eye"></i>
            </span>
            <span class="hot">
              {{video.hot}}
              <i class="iconfont icon-fire1"></i>
            </span>
            <!-- <span class="comment">
              {{video.comment}}
              <i class="iconfont icon-comment"></i>
            </span> -->
          </div>
        </div>
      </li>

      <li class="empty-item"></li>
      <li class="empty-item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['videos'],
  data () {
    return {

    }
  },
  methods: {
    setDefault (e) {
      e.target.src = 'http://kkboom.cn/cover/d1ef1410-ce51-11e9-9703-37d866b0de4d.jpg'
    },
    selectVideo (id) {
      this.$router.push({
        path: '/video/' + id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 1em;
  max-width: 1080px;
  margin: 0 auto;
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
        .count {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          span {
            text-align: right;
            padding: 0 1em;
            i {
              margin-left: 0.3em;
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
</style>