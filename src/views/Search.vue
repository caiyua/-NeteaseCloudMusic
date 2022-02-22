<template>
  <div class="container" ref="container">
    <div class="nav">
      <i class="iconfont icon-zuojiantou" @click="$router.go(-1)"></i>
      <input type="text" v-model="keyWords" :placeholder="default_K_W.defaultKeyWord.realkeyword" ref="input"
        @keyup.enter="sendSearch(keyWords),sendSecond(keyWords)" @keyup="sendSuggest(keyWords)">
    </div>
    <!-- 搜索建议 -->
    <div class="suggest" ref="suggest" v-if="keyWords.trim()">
      <div class="suggest_row" v-for="(v,i) in suggest" :key="i" @click="sendSearch(v.keyword),sendSecond(v.keyword)">
        <i class="iconfont icon-sousuo"></i>
        <span>{{v.keyword}}</span>
      </div>
    </div>
    <!-- 搜索列表 -->
    <div class="resList" v-if="isResList">
      <div class="res_head">
        <h3>单曲</h3>
        <span><i class="iconfont icon-bofang1"></i>播放</span>
      </div>
      <div class="songLi_row" v-for="v in searchRes" :key="v.id">
        <div class="song_sort" @click="playSong(v.id),PLAY()">
          <div class="songName_jieshao">
            <span class="songName">{{v.name}}</span>
            <span class="jieshao">
              <span class="vip" v-if="v.fee === 1">VIP</span>
              <span class="aud_t" v-if="v.fee === 1">试听</span>
              <!-- <span class="SQ">SQ</span> -->
              <span class="jsB">{{v.artists[0].name}}-{{v.album.name}}</span>
            </span>
          </div>
        </div>
        <div class="operation">
          <i class="iconfont icon-liebiao_MV_40"></i>
          <i class="iconfont icon-sandian-copy"></i>
        </div>
      </div>
    </div>
    <!-- 加载中 -->
    <van-loading type="spinner" color="#aaa" v-if="isLoading"
      style="position:fixed;top:40%;left:50%;transform: translate(-50%,-50%);">加载中……</van-loading>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      keyWords: '', // 搜索关键字
      isResList: false, // 列表展示状态
      isLoading: false
    }
  },
  computed: {
    ...mapState('search', ['suggest', 'searchRes', 'default_K_W', 'isDefaSearch'])
  },
  watch: {
    keyWords () {
      this.isResList = false
      this.$refs.container.classList.remove('container_b')
      this.$refs.input.classList.remove('container_b')
      if (this.$refs.suggest !== undefined) {
        this.$refs.suggest.classList.remove('suggest_none')
      }
    },
    searchRes (newValue) {
      if (newValue !== []) {
        this.isResList = true
        this.isLoading = false
      }
    },
    isDefaSearch (newValue) {
      if (newValue) {
        if (newValue) {
          this.keyWords = this.default_K_W.defaultKeyWord.realkeyword
        }
      }
    }
  },
  created () {
    this.defaultKeyWord() // 默认关键字
    this.$nextTick(function () { // 自动获取焦点
      this.$refs.input.focus()
    })
  },
  methods: {
    ...mapActions('search', ['sendSearch', 'sendSuggest', 'defaultKeyWord']),
    ...mapActions('recSongMenu', ['playSong']),
    ...mapMutations('recSongMenu', ['PLAY']), // 这个方法的目的: 由于播放音乐是 watch侦听 url变化,要是刷新页面点击上一次的歌曲, 不会变化, 也就执行不了功能, 所以这个是候补的
    sendSecond (keyword) { // 改变页面背景颜色
      this.keyWords = keyword
      this.$nextTick(function () {
        this.$refs.container.classList.add('container_b')
        this.$refs.input.classList.add('container_b')
        this.$refs.suggest.classList.add('suggest_none')
        this.isResList = false
        this.isLoading = true
      })
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  padding: 5% !important;
  background-color: #fff;
  box-sizing: border-box;
  .nav {
    display: flex;
    justify-content: space-between;
    i {
      font-size: 2rem;
      color: #575757;
    }
    input {
      width: 87%;
      border: none;
      border-bottom: 0.1rem solid #b4b4b4;
      padding-bottom: 0.3rem;
      caret-color: #df3c4a;
    }
    input::-webkit-input-placeholde {
      color: #bdbdbd;
    }
  }
  .suggest {
    .suggest_row {
      display: flex;
      width: 100%;
      margin-top: 1.2rem;
      i {
        font-size: 1.3rem;
        color: rgb(139, 139, 139);
        margin-right: 0.5rem;
      }
      span {
        width: 100%;
        border-bottom: 1px solid #f7f7f7;
        padding-bottom: 1.2rem;
        margin-top: 0.1rem;
        color: #999;
        font-size: 1rem;
      }
    }
  }
  .resList {
    border-radius: 0.5rem;
    background-color: #fff;
    margin: 1rem 0;
    padding: 0.8rem;
    .res_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f6f6f6;
      padding-bottom: 0.5rem;
      h3 {
        color: #333;
        font-weight: normal;
      }
      span {
        font-size: 0.8rem;
        padding: 0.4rem 0.6rem;
        border: 1px solid #f1f1f1;
        border-radius: 1rem;
        i {
          font-size: 0.8rem;
          color: #313131;
          margin-right: 0.2rem;
        }
      }
    }
    .songLi_row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-bottom: 0.5rem;
      margin: 0.8rem 0;
      padding-bottom: 0.8rem;
      border-bottom: 1px solid #f6f6f6;
      .song_sort {
        display: flex;
        align-items: center;
        min-width: 0;
        .indexes {
          color: #b3b3b3;
          margin: 0 0.7rem;
          margin-right: 1.2rem;
        }
        .songName_jieshao {
          display: flex;
          flex-direction: column;
          min-width: 0;
          .songName {
            color: #4c7eb4;
            margin-bottom: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .jieshao {
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            color: #b3b3b3;
            .SQ {
              padding: 0.1rem 0.1rem;
              border: 0.1rem solid #fe2b1f;
              color: #fe2b1f;
              border-radius: 0.3rem;
              transform: scale(0.7);
            }
            .vip {
              margin-right: -3px;
              padding: 0.1rem 0.1rem;
              border: 0.1rem solid #fe2b1f;
              color: #fe2b1f;
              border-radius: 0.3rem;
              transform: scale(0.7);
            }
            .aud_t {
              padding: 0.1rem 0.1rem;
              color: #58bbf6;
              white-space: nowrap;
              text-align: center;
              line-height: 1rem;
              border: 0.1rem solid #58bbf6;
              border-radius: 0.3rem;
              transform: scale(0.7);
            }
            .jsB {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              letter-spacing: 0.5px;
            }
          }
        }
      }
      .operation {
        i {
          color: #b3b3b3;
          font-size: 1.5rem;
          margin-left: 0.5rem;
        }
      }
    }
    .songLi_row:first-child {
      margin-top: 1.3rem;
    }
  }
}
// 动态样式
.suggest_none {
  display: none;
}
.container_b {
  background: #f6f6f6;
}
.suggest_block {
  display: block;
}
.resList_none {
  display: none;
}
</style>