<template>
  <!-- 这是底部的播放器 -->
  <div class="play_out">
    <audio ref="audio" @ended="overAudio" @pause="onPause"></audio>
    <div class="play" v-if="isSongDetails">
      <div class="content">
        <div class="play_l">
          <div class="song_img" ref="Music_CD">
            <img :src="songDetails.al.picUrl + '?param=32y32'" />
          </div>
          <div class="song_info">
            <span class="song_name">{{songDetails.name}}</span>
            <span class="song_line"> - </span>
            <span class="song_ar">{{songDetails.ar[0].name}}</span>
          </div>
        </div>
        <div class="play_r">
          <i class="iconfont" :class="[playingState ? 'icon-zanting' : 'icon-bofang']" @click="switch_state"></i>
          <i class="iconfont icon-asfff-232"></i>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'playMusic',
  computed: {
    ...mapState('recSongMenu', ['songUrl', 'songDetails', 'songUrl_New']), // songUrl：歌曲Url || songDetails:歌曲详情 || songUrl_New:值为时间戳
  },
  watch: {
    songUrl (newValue) { // 侦听播放歌曲Url
      this.$refs.audio.src = newValue
      this.playingState = true
      let playPromise = this.$refs.audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.$refs.audio.play()
          this.$refs.Music_CD.classList.add('song_img_s')
        }).catch(() => { })
      }
    },
    songUrl_New () {
      this.$refs.audio.src = this.songUrl
      this.playingState = true
      let playPromise = this.$refs.audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.$refs.audio.play()
          this.$refs.Music_CD.classList.add('song_img_s')
        }).catch(() => { })
      }
    },
    playingState (newValue) { // 侦听播放状态
      if (newValue) {
        let playPromise = this.$refs.audio.play()
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.$refs.audio.play()
            this.$refs.Music_CD.classList.add('song_img_s')
          }).catch(() => { // 音乐url在一段时间后会失效，需重新请求（虽仍有报错，但功能已无碍）
            this.playSong(this.songDetails.id)
          })
        }
      } else {
        this.$refs.audio.pause() //如果播放状态为false，就暂停
        this.$refs.Music_CD.classList.remove('song_img_s')
      }
    },

    songDetails (newValue) { // 关于页面数据渲染
      if (newValue.name) this.isSongDetails = true
      if (newValue.al.picUrl) this.isPicUrl = true
      if (newValue.name) this.isSongName = true
      if (newValue.ar[0].name) this.isArName = true
    }
  },
  mounted () {
    if (this.songDetails.name) this.isSongDetails = true
  },
  data () {
    return {
      // 正在播放状态
      playingState: false,
      // 是否播放完毕
      ended: false,
      // 歌曲详情信息是否已经获取
      isSongDetails: false,
      isPicUrl: false,
      isSongName: false,
      isArName: false,
    }
  },
  methods: {
    ...mapActions('recSongMenu', ['playSong']),
    switch_state () { // 点击播放/暂停按钮
      if (!this.$refs.audio.src) {
        this.$refs.audio.src = this.songUrl
      }
      this.playingState = !this.playingState
    },
    overAudio () {
      console.log('播完了您嘞!')
      this.playingState = false
    },
    onPause () {
      console.log('暂停播放声音')
    },
  }
}
</script>
 
<style lang="less" scoped>
.play_out {
  position: fixed;
  left: 0;
  width: 100%;
  height: 8%;
  .play {
    width: 100%;
    height: 100%;
    border-top: 0.06rem solid #f3f3f3;
    background-color: rgb(255, 255, 255);
    .content {
      width: 100%;
      height: 100%;
      padding: 0 5%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .play_l {
        display: flex;
        align-items: center;
        letter-spacing: 0.05rem;
        margin-bottom: 0.5rem;
        position: relative;
        .song_info {
          width: 10rem;
          margin-left: 3.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .song_name {
            font-size: 0.9rem;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .song_line {
            color: #666666;
          }
          .song_ar {
            font-size: 0.5rem;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .song_img {
          position: absolute;
          top: -0.3rem;
          margin-right: 0.3rem;
          padding: 0.5rem;
          background: url("../assets/MusicCD.png") no-repeat;
          background-size: 100%;
          animation: loading 20s linear infinite;
          animation-play-state: paused;
          // paused
          // running
          img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }
        }
        .song_img_s {
          animation-play-state: running !important;
        }

        /*通过@keyframes规则,能够创建动画 , que 定义动画的名称 可自己定义*/
        @keyframes loading {
          /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
          0% {
            /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }

      .play_r {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        i {
          font-size: 2rem;
          color: #666;
        }
        i:first-child {
          font-size: 2.4rem;
          color: #333;
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>