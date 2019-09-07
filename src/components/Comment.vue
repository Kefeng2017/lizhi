<template>
  <div class="comment">
    <h3 class="title">这个世界会好吗</h3>
    <h4 v-if="!comments.length">暂无评论信息</h4>
    <div v-else class="my-container">
      <ul class="list-wrap">
        <li class="list-item" v-for="(comment,index) in comments" :key="index">
          <img alt class="avatar" @error.once="setDefaultAvatar($event)" :src="comment.avatar" />
          <p class="text">
            <strong>{{comment.username}}&nbsp;</strong>说：
            <br />{{comment.text}}
          </p>
          <span class="reply">回复</span>
          <span class="vote">牛逼&nbsp;{{(comment.vote)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DEFAULT_AVATAR from '../assets/img/avatar.jpg'
export default {
  data () {
    return {

    }
  },
  props:['comments'],
  methods:{
    setDefaultAvatar(e){
      console.log(e.target)
      e.target.src = DEFAULT_AVATAR
      e.target.onerror = null
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  .title {
    text-align: left;
    border-left: 5px solid rgb(229, 108, 100);
    padding-left: 1em;
    margin: 2em 0 1em 0;
  }
  .my-container {
    .list-wrap {
      .list-item {
        border-bottom: 1px solid rgba(255,255,255,.1);
        margin: 20px 0;
        max-height: 120px;
        padding: 1em 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 5px;
          @media (min-width: 540px) {
          .avatar{
            width: 60px;
            height: 60px;
            border-radius: 30px;
            margin-right: 1em;
            font-size: 14px;
          }
          .vote, .reply{
            margin: 0 1em;
          }
        }
        }
        .text {
          font-size: 12px;
          flex-grow: 1;
          strong {
            color: rgb(229, 108, 100);
          }
          margin: 0;
        }
        .reply,
        .vote {
          color: rgb(229, 108, 100);
          margin: 0 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>