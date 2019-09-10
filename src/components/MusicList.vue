<template>
    <ul class="list-wrap">
        <li
          :key="index"
          @click="selectmusic(music.id)"
          class="list-item"
          v-for="(music, index) in musics"
        >
          <img :src="music.cover +''" @error.once="setDefault($event)" />
          <div class="infos">
            <h2 class="title">{{ music.title }}</h2>
            <p class="tag">{{music.tag}}</p>
            <p>更新于&nbsp;{{music.add_time}}</p>
            <div class="count">
              <span class="view">
                {{music.view}}<i class="iconfont icon-eye"></i>
              </span>
              <span class="hot">
                {{music.hot}}<i class="iconfont icon-fire1"></i>
              </span>
              <span class="comment">
                {{music.comment}}<i class="iconfont icon-comment"></i>
              </span>
            </div>
          </div>
        </li>

        <li class="empty-item"></li>
        <li class="empty-item"></li>
      </ul>
</template>

<script>
export default {
    props:['musics'],
    data(){
        return {
            music:[]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>