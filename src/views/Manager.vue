<template>
  <div class="manager">
    <h3>manager</h3>

    <div :class="{'active':showAlert}" class="alert alert-dismissible alert-success">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>通知：</strong>
      {{msg}}
    </div>

    <table class="table table-hover">
      <thead>
        <tr class="table-primary">
          <th scope="col">ID</th>
          <th scope="col">标题</th>
          <th scope="col">分类</th>
          <th scope="col">描述</th>
          <th scope="col">英文名</th>
          <th scope="col">封面</th>
          <th scope="col">播放地址</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(video,index) in videos" :key="index" class="table-light">
          <td scope="row">{{video.id}}</td>
          <td>
            <textarea v-model="video.title" rows="3" />
          </td>
          <td>
            <textarea type="text" v-model="video.tag" rows="3" />
          </td>
          <td>
            <textarea type="text" v-model="video.description" rows="3" />
          </td>
          <td>
            <textarea type="text" v-model="video.en_name" rows="3" />
          </td>
          <td>
            <textarea type="text" v-model="video.cover" rows="2" />
            <input type="file" name="cover" accept="image/png, image/gif, image/jpeg" />
            <button @click="upload(video.id,$event)" type="button" class="btn btn-primary btn-sm">上传</button>
          </td>
          <td>
            <textarea type="text" v-model="video.p_url" rows="3" />
          </td>
          <td>
            <button @click="editVideo(video.id)" type="button" class="btn btn-primary btn-sm">保存</button>
            <button @click="deleteVideo(video.id)" type="button" class="btn btn-danger btn-sm">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videos: '',
      currentVideoId: '',
      alertTimer: null,
      showAlert: false,
      msg: ''
    }
  },
  created () {
    this.axios.get('/api/all').then(res => {
      const data = res.data
      if (data.code === 0) {
        this.videos = data.videos
      }
    })
  },
  computed: {
    currentVideo () {
      return this.videos.filter(el => {
        if (el.id === this.currentVideoId) {
          return el
        }
      })[0]
    }
  },
  methods: {
    editVideo (id) {
      this.currentVideoId = id
      this.axios.post('/api/edit', this.currentVideo).then(res => {
        const data = res.data
        if (data.code === 0) {
          if (data.msg) {
            this.msg = data.msg
            this.showAlert = true
          }
        }
      })
    },
    upload (id, e) {

      this.currentVideoId = id
      const fileInput = e.target.previousSibling
      const file = fileInput.files[0]
      if (file) {
        const params = new FormData()
        params.append('cover', file)
        this.axios.post('/api/uploadcover', params).then(res => {
          if (res.data.code === 0) {
            this.currentVideo.cover = res.data.url
            fileInput.value = ''
          }
        })
      }
    },
    deleteVideo (id) {
      this.currentVideoId = id
      const confirm = window.confirm("确定要删除吗？")
      if (confirm) {
        this.axios.get('/api/delete?id=' + id).then(res => {
          if (res.data.code === 0) {
            this.msg = res.data.msg
            this.showAlert = true
            // 从列表中删除
            const index = this.videos.indexOf(this.currentVideo)
            this.videos.splice(index, 1)
          }
        })
      }
    }
  },
  watch: {
    showAlert (val) {
      if (val) {
        this.alertTimer = setTimeout(() => {
          this.showAlert = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/bootstrap.min.css';
.manager {
  .alert {
    position: fixed;
    right: -100%;
    transition: 0.5s right;
  }
  .active {
    right: 1em;
    transition: 0.5s right;
  }
  td {
    input {
      font-size: 12px;
    }
    textarea {
      font-size: 12px;
      background: none;
      outline: none;
      border: none;
      height: 100%;
      width: 100%;
      vertical-align: middle;
    }
    button {
      margin: 5px;
    }
  }
}
</style>