<template>
  <div class="detail">
    <!-- 标题 -->
    <h1 class="title-wrap">
      <img
        :class="{'rotate-pause':!isPlaying}"
        class="disc"
        ref="disc"
        src="../assets/img/lizhi.png"
      />
      <span class="title">This is an detail page</span>

      <p class="options">
        <i class="icon-xihuandianjihou iconfont" style="font-size:22px;"></i> 喜欢
        <i class="icon-fire iconfont" style="font-size:18px;"></i> 热度
        <i class="icon-share iconfont" style="font-size:18px;"></i>
        分享
      </p>
    </h1>

    <div class="video-wrap">
      <hls-video :source="source" @control="controlEvent" ref="video"></hls-video>
    </div>

    <!-- 作品描述 -->
    <div class="desc-wrap">
      <p class="desc">
        李志，中国大陆男歌手，太合音乐集团旗下的麦田音乐厂牌音乐人，现居江苏省南京市。现由于不明原因自2019年4月起被中国大陆封禁。 维基百科
        生于： 1978 年 11 月 13 日（40 岁)，中华人民共和国常州市金坛区
        出道作品： 《被禁忌的游戏》
        音乐类型： 民谣（早期）、流行（部分）、摇滚、迷幻摇滚
        代表作品： 《天空之城》《关于郑州的记忆》《这个世界会好吗》
      </p>
    </div>

    <hr class="line" />

    <!-- 评论区 -->
    <div class="comment-wrap" ref="comment">
      <comment></comment>
    </div>

    <!-- 发言 -->
    <div :class="{'show-up':msgTop<clientHeight}" class="say">
      <div class="msg-wrap">
        <input class="msg-input" placeholder="说点什么..." type="text" />
        <button class="send-btn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import hlsVideo from '@/components/hlsVideo'
import Comment from '@/components/Comment'

export default {
  components: {
    hlsVideo,
    Comment
  },
  data () {
    return {
      source: '',
      isPlaying: false,
      msgTop: 0,
      clientHeight: document.documentElement.clientHeight
    }
  },
  created () {
    let id = this.$route.params.id
    this.source = '/kiwi/videos/' + id
  },
  mounted () {
    // let video = this.$refs['video']
    let msg = this.$refs.comment
    let that = this
    window.addEventListener(
      'scroll',
      function () {
        that.msgTop = msg.getBoundingClientRect().top
      },
      true
    )
  },
  methods: {
    controlEvent (type) {
      switch (type) {
        case 'pause':
          this.isPlaying = false
          break
        case 'play':
          this.isPlaying = true
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 0 1em;
  .title-wrap {
    text-align: left;
    max-width: 1080px;
    margin: 0 auto;
    padding: 2em 0;
    .disc {
      vertical-align: middle;
      width: 100px;
      height: 100px;
      border-radius: 55px;
      border: 5px solid #abc;
      animation-fill-mode: forwards;
      animation: 6s rotated linear infinite;
    }
    .rotate-pause {
      animation-play-state: paused;
    }
    @keyframes rotated {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .title {
      padding-left: 1em;
      vertical-align: middle;
    }

    .options {
      line-height: 110px;
      vertical-align: middle;
      float: right;
      font-size: 16px;
      i {
        margin-left: 1em;
      }
    }
  }
  .video-wrap {
    max-width: 1080px;
    margin: 0 auto;
  }
  .desc-wrap {
    max-width: 1080px;
    max-height: 360px;
    margin: 0 auto;
    padding: 2em 0;
    .desc {
      text-align: left;
      color: #cecbcb;
    }
  }
  .comment-wrap {
    max-width: 1080px;
    margin: 0 auto;
  }

  .say {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: -40px;
    height: 40px;
    background-color: #323135;
    transition: 0.5s all;

    .msg-wrap {
      max-width: 1080px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .msg-input {
        background-color: #cecbcb;
        border: none;
        padding-left: 1em;
        font-size: 16px;
        flex-grow: 1;
      }
      .send-btn {
        color: #ddd;
        border: none;
        font-size: 16px;
        background-color: #a99790;
        max-width: 200px;
        width: 120px;
      }
    }
  }

  .show-up {
    bottom: 0;
  }
}
</style>