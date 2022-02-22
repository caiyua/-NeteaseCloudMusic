<template>
  <!-- 发现页 -->
  <div class="container">
    <div class="card" :class="{'card_opacity':loadingIcon }">
      <div class="gradual" style="padding-top:5%;background-image: linear-gradient(#f2f2f2, #fff);">
        <!-- 导航栏 -->
        <div class="nav-row">
          <!-- 左侧图标 -->
          <div class="nav-col">
            <van-icon size="1.7rem" class-prefix="iconfont icon-ego-menu" @click="showPopup">
            </van-icon>
            <UserPanel :show="show" />
          </div>
          <!-- 搜索框 -->
          <div class="nav-search" @click="CLEAR_SEARCH()">
            <i class="iconfont icon-sousuo"></i>
            <span v-if="default_K_W">{{default_K_W.defaultKeyWord.realkeyword}}</span>
          </div>
          <!-- 右侧图标 -->
          <div class="nav-col">
            <van-icon size="1.7rem" class-prefix="iconfont icon-xiaoxi"></van-icon>
          </div>
        </div>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
          <van-swipe-item v-for="(v,i) in banner" :key="i">
            <a :href="v.url">
              <van-image :src="v.imageUrl + '?param=338y125'" radius="10" />
            </a>
          </van-swipe-item>
          <template #indicator>
          </template>
        </van-swipe>
      </div>
      <!-- 标签栏滚动 -->
      <div class="lable">
        <div class="lable_unit" v-for="v in scrollLabel" :key="v.id">
          <div class="lable_icon">
            <!-- 字体图标 --><i class="iconfont" :class="v.icon"></i>
          </div>
          <div class="lable_title">{{v.title}}</div>
        </div>
      </div>
      <hr>
      <!-- 推荐歌单 -->
      <!-- <van-skeleton title :row="5" :loading="loading" style="margin-bottom:1rem"> -->
      <div class="rec">
        <div class="rec_top">
          <div class="rec_song">推荐歌单</div>
          <div class="rec_more">
            <span>更多></span>
          </div>
        </div>
        <div class="rec_bottom">
          <div class="rec_row">
            <div class="rec_unit" v-for="v in recSongMenu_D" :key="v.id" @click="openThisSongMenu(v.id),LOADING_ICON()">
              <div class="rec_img">
                <div class="pc_poab">
                  <div class="pc_box">
                    <i class="iconfont icon-24gl-play"></i>
                    <!-- 字符串才能获取到length -->
                    <span class="play_count"
                      v-if="v.playCount.toString().length === 7">{{v.playCount.toString().substring(0,3)}}万</span>
                    <span class="play_count"
                      v-if="v.playCount.toString().length === 6">{{v.playCount.toString().substring(0,2)}}万</span>
                    <span class="play_count"
                      v-if="v.playCount.toString().length === 5">{{v.playCount.toString().substring(0,1)}}万</span>
                  </div>
                </div>
                <img :src="v.picUrl + '?param=96y96'">
              </div>
              <div class="rec_title">{{v.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rec" style="border-top:1rem solid #F5F5F5;height:auto;padding-bottom: 1rem;">
        <div class="rec_top" style="margin-top:1rem">
          <div class="rec_song">精选金曲</div>
          <div class="rec_more">
            <span>播放</span>
          </div>
        </div>
      <!-- 推荐歌曲 -->
        <div class="rec_xiam">
          <van-swipe class="SongRec" :loop="false" :show-indicators="false">
            <van-swipe-item style="height:auto">
              <div class="playRow" v-for="v in recSongs" :key="v.id">
                <div><img :src="v.al.picUrl + '?param=48y48'"></div>
                <div class="play-right">
                  <p class="play-one">{{v.name}} - <span class="singerName">{{v.ar[0].name}}</span> </p>
                  <p class="play-two">{{v.reason}}</p>
                </div>
              </div>
            </van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
      
    <van-loading type="spinner" color="#fe2b1f" v-if="loadingIcon !== false"
      style="position:fixed;top:50%;left:50%;transform: translate(-50%,-50%);" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import UserPanel from '../components/UserPanel.vue'
export default {
  name: 'Discover',
  components: {
    UserPanel
  },
  data () {
    return {
      // 骨架展示状态
      loading: true,
      // 滚动标签栏
      scrollLabel: [
        { id: '1', title: '每日推荐', icon: 'icon-xihuan', path: 'recdaily' },
        { id: '2', title: '私人FM', icon: 'icon-diantaiguangbo', path: 'privatefm' },
        { id: '3', title: '歌单®', icon: 'icon-gedan', path: 'songlist' },
        { id: '4', title: '排行榜', icon: 'icon-paixingbang', path: 'top' },
        { id: '5', title: '直播', icon: 'icon-yunzhibo', path: 'live' },
        { id: '6', title: '数字专辑', icon: 'icon-zhuanji', path: 'album' }
      ],
      // 展示状态发生改变
      show: 0
    }
  },
  computed: {
    ...mapState('recSongMenu', ['recSongMenu_D', 'loadingIcon', 'banner','recSongs']), // 推荐歌单
    ...mapState('search', ['default_K_W']),
  },
  created () {
    this.getBanner() // 获取轮播图
    setTimeout(() => { // 渲染骨架屏
      this.loading = false
    }, 500)
    this.getRecSongMenu() // 获取推荐歌单
    this.defaultKeyWord() // 获取搜索默认关键词
    this.getRecSongs() // 获取推荐歌曲
  },
  methods: {
    ...mapActions('recSongMenu', ['getRecSongMenu', 'openThisSongMenu', 'getBanner','getRecSongs']), // 获取推荐歌单 || 打开这个歌单（随即获取歌曲列表）
    ...mapActions('search', ['defaultKeyWord']),
    ...mapMutations('recSongMenu', ['LOADING_ICON']),
    ...mapMutations('search', ['CLEAR_SEARCH']),
    showPopup () { // 刷新用户面板的状态
      this.show = new Date().getTime()
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 84%;
  overflow: scroll;
  .card {
    padding: 0 0 0 0 !important;
    transition: ease-in-out 0.3s;
    opacity: 1;
    // 导航栏
    .nav-row {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin-bottom: 5%;
      .nav-search {
        width: 75%;
        height: 2.3rem;
        background-color: #fff;
        border-radius: 3rem;
        display: flex;
        align-items: center;
        padding-left: 4%;
        box-sizing: border-box;
        i {
          color: #a7a7a7;
          font-size: 1.2rem;
          margin-right: 0.2rem;
        }
        span {
          font-size: 0.8rem;
          color: #a7a7a7;
          letter-spacing: 0.02rem;
        }
      }
      .nav-col {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-ego-menu {
          color: #303030;
        }
        .icon-xiaoxi {
          color: #303030;
        }
      }
    }
    // 轮播图
    .my-swipe {
      margin: 0 !important;
      margin-bottom: 0.7rem !important;
      overflow: hidden;
      height: 0;
      padding-bottom: 8rem;
      .van-swipe-item {
        border-radius: 1rem;
        .van-image {
          margin: 0 5%;
        }
      }
    }
    hr {
      border: none;
      border-bottom: 1px solid #e7e7e7;
      margin: 1rem 0;
    }
    // 标签栏滚动
    .lable {
      display: flex;
      justify-content: space-between;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 0 3%;
      // margin: 0.6rem 0 1rem 0.1rem;
      box-sizing: border-box;
      .lable_unit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 0.1rem;
        .lable_icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: #fff1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            display: inline-block;
            font-size: 1.5rem;
            line-height: 2rem;
            // 背景渐变
            background: linear-gradient(40deg, #ff3b3b 30%, #fff1f1);
            color: transparent;
            -webkit-background-clip: text;
          }
        }
        .lable_title {
          width: 4rem;
          font-size: 0.8rem;
          color: #2d2d2d;
          text-align: center;
          margin-top: 0.4rem;
        }
      }
    }
    .lable::-webkit-scrollbar {
      display: none;
    }
    .van-skeleton__row:last-child {
      margin-bottom: 1.75rem;
    }
    // 推荐歌单
    .rec {
      display: flex;
      flex-direction: column;
      height: 0;
      overflow: hidden;
      padding-bottom: 12rem;
      .rec_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5%;
        .rec_song {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d2d2d;
        }
        .rec_more {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3.5rem;
          height: 1.5rem;
          font-size: 0.8rem;
          color: #2d2d2d;
          border: 1px solid #e7e7e7;
          border-radius: 2rem;
          letter-spacing: 0.1rem;
        }
      }
      .rec_row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow-y: scroll;
        overflow-y: hidden;
        padding: 0 5%;
        box-sizing: border-box;
        .rec_unit {
          margin: 1rem 1rem 0 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .rec_img {
            height: 100%;
            margin-bottom: 0.3rem;
            position: relative;
            img {
              width: 6rem;
              height: 6rem;
              border-radius: 0.5rem;
            }
            .pc_poab {
              position: absolute;
              top: 0.3rem;
              right: 0;
              .pc_box {
                background-color: rgba(0, 0, 0, 0.3);
                color: #fff;
                border-radius: 0.3rem;
                padding: 0.1rem 0.5rem;
                transform: scale(0.8);
                i {
                  font-size: 0.3rem;
                  margin-right: 0.2rem;
                }
                span {
                  font-size: 0.5rem;
                }
              }
            }
          }
          .rec_title {
            font-size: 0.7rem;
            letter-spacing: 0.1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .rec_unit:last-child {
          margin-right: 0;
        }
      }
      .rec_row::-webkit-scrollbar {
        display: none;
      }
      .rec_xiam {
        padding: 3% 5%;
        .SongRec {
          height: auto;
          .van-swipe-item {
            width: 200px;
            .playRow {
              display: flex;
              padding: .5rem 0;
              img {
                width: 3rem;
                border-radius: 5px;
                margin-right: .8rem;
              }
              .play-right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 90%;
                border-bottom: 1px solid #E6E6E6;
                .play-one {
                  font-size: 1rem;
                  color: #000;
                  .singerName {
                    font-size: 0.8rem;
                    color: #808080;
                  }
                }
                .play-two {
                  font-size: .7rem;
                  color: #808080;
                }
              }
            }
          }
        }
      }
    }
  }
  // 路由加载缓冲过渡
  .card_opacity {
    opacity: 0.3;
  }
}
</style>