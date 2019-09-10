<template>
  <div class="detail">
    <!-- 标题 -->
    <h3 class="title-wrap">
      <img
        :class="{'rotate-pause':!isPlaying}"
        class="disc"
        ref="disc"
        src="../assets/img/lizhi.png"
      />
      <span class="title">{{video.title}}</span>

      <p class="options">
        <i class="icon-share iconfont" ></i>分享
         <i class="icon-fire-fill iconfont" ></i>{{video.hot}}
        <i class="icon-Dollar iconfont"></i>赏口饭
      </p>
    </h3>

    <div v-if="video" class="video-wrap">
      <player @control="controlEvent" :videoInfo=video />
    </div>
    <!-- 作品描述 -->
    <div class="desc-wrap">
      <p class="desc">{{video.description}}</p>
    </div>

    <!-- 切换视频 -->
    <div class="switch">
      <div class="prev">
        
      </div>

      <div class="next">

      </div>
    </div>
    <!-- 评论区 -->
    <div class="comment-wrap" ref="comment">
      <comment ref="comment" :comments=commentList></comment>
    </div>

    <!-- 发言 -->
    <div :class="{'show-up':msgTop<clientHeight}" class="say">
      <div class="msg-wrap">
        <input @keydown="enterSend($event)" v-model="comment" class="msg-input" placeholder="说点什么..." type="text" />
        <button @click="sentComment" class="send-btn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import Player from '@/components/player'
import Comment from '@/components/Comment'

export default {
  components: {
    Player,
    Comment
  },
  data () {
    return {
      isPlaying: false,
      msgTop: 0,
      clientHeight: document.documentElement.clientHeight,
      video: '',
      comment:'',
      video_id:this.$route.params.id,
      commentList:[]
    }
  },
  created () {
    let id = this.$route.params.id
    this.axios.get('/api/video?id=' + id).then(res => {
      if (res.data.code === 0) {
        this.video = res.data.video[0]
        this.video.source = '/kiwi/videos/' + this.video.en_name
      }
    })

    this.axios.get('/api/comments?id='+this.video_id).then(res=>{
      let data = res.data
      if(data.code === 0){
        this.commentList = data.comments
      }
    }).catch(e=>{
      console.log(e);
    })
  },
  mounted () {
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
    },
    sentComment(){
      let comment = this.comment.trim()
      if(comment){
        this.axios.post('/api/addComment',{
          comment,
          video_id:this.video_id
        }).then(res=>{
          if(res.data.code === 0){
            this.commentList.unshift(res.data.comment)
            this.$refs.comment.comments = this.commentList
            this.comment = ''
          }
        })
      }
    },
    enterSend(e){
      if(e.which == 13){
        this.sentComment()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 0 1em;

  .title-wrap {
    position: relative;
    text-align: left;
    max-width: 1080px;
    margin: 0 auto;
    padding: 1em 0;
    position: relative;
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
    .options{
      vertical-align: middle;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      right: 0;
      bottom: 0;
      position: absolute;
      i {
          vertical-align: middle;
          margin-left: 1em;
        }
    }
    @media (min-width: 540px) {
      .options {
        margin: 0;
        top: 0;
      }
    }
    @media (max-width: 540px) {
    .options{
      position: absolute;
      bottom: 0;
    }
    .disc {
      vertical-align: middle;
      width: 60px;
      height: 60px;
      border-radius: 35px;
      border: 5px solid #abc;
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
      text-align: justify;
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
        border-radius: 0;
        background-color: #cecbcb;
        border: none;
        padding-left: 1em;
        font-size: 16px;
        flex-grow: 1;
      }
      .send-btn {
        outline: none;
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