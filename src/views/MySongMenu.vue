<template>
  <div class="container">
    <div class="out">
      <div class="songParticulars">
        <!-- 导航栏 -->
        <div class="nav_fixed" ref="nav" :style="opacityStyle">
          <div class="nav_top">
            <div class="nav_l">
              <i class="iconfont icon-zuojiantou" @click="back"></i>
              <span>Mix</span>
            </div>
            <div class="nav_r">
              <i class="iconfont icon-sousuo" @click="$router.push('/search')"></i>
              <i class="iconfont icon-sandian"></i>
            </div>
          </div>
        </div>
        <div class="bg_circle">
          <div class="bg_df">
            <!-- 歌单信息 -->
            <div class="songDetails">
              <div class="songLiImg">
                <img :src="MenuDetails.coverImgUrl + '?param=128y128'" v-if="MenuDetails">
              </div>
              <div class="songLiRi">
                <div class="songLi_title">{{MenuDetails.name}}</div>
                <div class="creator_info">
                  <div class="creator_img">
                    <img :src="MenuDetails.creator.avatarUrl + '?param=29y29'" v-if="MenuDetails.creator">
                  </div>
                  <div class="creator_nick" v-if="MenuDetails.creator">{{MenuDetails.creator.nickname}}</div>
                </div>
                <div class="creator_tale" v-if="MenuDetails.description !== undefined">"{{MenuDetails.description}}"
                </div>
              </div>
            </div>
            <!-- 歌单收藏/评论/分享 -->
            <div class="song_interaction">
              <div class="interaction_box">
                <div class="song_collect">
                  <i class="iconfont icon-a-zu6"></i>
                  <span>收藏 <template v-if="MenuDetails.subscribers.length !== 0">{{MenuDetails.subscribers.length}}</template></span>
                </div>
                <div class="song_comment">
                  <i class="iconfont icon-jianyi"></i>
                  <span>评论 <template v-if="MenuDetails.commentCount !== 0">{{MenuDetails.commentCount}}</template></span>
                </div>
                <div class="song_share">
                  <i class="iconfont icon-fenxiang"></i>
                  <span>分享 <template v-if="MenuDetails.shareCount !== 0">{{MenuDetails.shareCount}}</template></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 播放列表 -->
      <div class="songList">
        <div class="songLi_t">
          <div class="Li_Ti_l">
            <i class="iconfont icon-asdfgf-playCircle"></i>
            <strong>播放全部</strong>
            <span>({{MenuDetails.trackCount}})</span>
          </div>
          <div class="Li_Ti_r">
            <i class="iconfont icon-xiazai"></i>
            <i class="iconfont icon-quanxuan"></i>
          </div>
        </div>
        <div class="songLi_row" v-for="(v,i) in AllSongs" :key="v.id">
          <div class="song_sort" @click="playSong(v.id),PLAY()">
            <div class="indexes">
              <span>{{i+1}}</span>
            </div>
            <div class="songName_jieshao">
              <span class="songName">{{v.name}}</span>
              <span class="jieshao">
                <span class="vip" v-if="v.fee === 1">VIP</span>
                <span class="aud_t" v-if="v.fee === 1">试听</span>
                <!-- <span class="SQ">SQ</span> -->
                <span class="jsB">{{v.ar[0].name}}-{{v.al.name}}</span>
              </span>
            </div>
          </div>
          <div class="operation">
            <i class="iconfont icon-liebiao_MV_40"></i>
            <i class="iconfont icon-sandian-copy"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'RecSongList',
  computed: {
    ...mapState('mySongMenu', ['MenuDetails', 'AllSongs']), // 歌单详情、
  },
  data () {
    return {
      opacityStyle: {
        background: 'rgba(254, 43, 31, 0)'
      },
    }
  },
  created() {
console.log(this.MenuDetails)

  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    ...mapActions('recSongMenu', ['playSong']), // playSong：播放歌曲
    /* 这个方法的目的: 由于播放音乐是 watch侦听 url变化,
    ** 要是刷新页面点击上一次的歌曲, 不会变化, 也就执行不了功能, 所以这个是用来记录变化的 */
    ...mapMutations('recSongMenu', ['PLAY']),
    back () { // 返回上一层
      this.$router.go(-1)
    },
    handleScroll () { // 导航栏距离
      let scrollTop = document.documentElement.scrollTop
      this.opacityStyle.background = `rgba(254, 43, 31, ${scrollTop / (scrollTop + 28)})`
      if (scrollTop >= 206) {
        this.opacityStyle.background = `rgba(254, 43, 31, 1)`
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #fff;
  // 溢出隐藏滚动条，还有一行代码在同级
  // overflow: scroll;
  .out {
    // background-color: #f45b3d;
    background-image: url('../assets/pic.jpg');
    background-blend-mode: multiply, multiply;
    .songParticulars {
      height: 18rem;
      position: relative;
      overflow: hidden;
      .bg_dim {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
      .bg_circle {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);

        .bg_df {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 2rem;
          box-sizing: border-box;
          // 歌单信息
          .songDetails {
            display: flex;
            justify-content: space-between;
            margin-top: 3rem;
            .songLiImg {
              margin-right: 1.3rem;
              img {
                width: 8rem;
                height: 8rem;
                border-radius: 0.7rem;
                border-top: 0.4375rem solid #666;
              }
            }
            .songLiRi {
              min-width: 0;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              .songLi_title {
                color: #fff;
                font-size: 1rem;
                letter-spacing: 0.1rem;
                line-height: 1.5rem;
                margin-bottom: 0.5rem;
              }
              .creator_info {
                display: flex;
                align-items: center;
                margin-bottom: 1rem;
                .creator_img {
                  margin-right: 0.5rem;
                  img {
                    width: 1.8em;
                    height: 1.8rem;
                    border-radius: 50%;
                  }
                }
                .creator_nick {
                  color: #d6d6d6;
                  font-size: 0.8rem;
                }
              }
              .creator_tale {
                font-size: 0.6rem;
                color: #d6d6d6;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          // 歌单收藏/评论/分享
          .song_interaction {
            width: 100%;
            height: 2.8rem;
            position: absolute;
            bottom: -3.25rem;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            box-shadow: 0px 4px 10px -10px #aaa;
            border-radius: 20px 20px 0 0;
            .interaction_box {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              div {
                display: flex;
                align-items: center;
                margin-left: 1rem;
                i {
                  font-size: 1.5rem;
                  color: #666;
                }
                span {
                  font-size: 12px;
                  color: #666;
                }
              }
              div:first-child {
                margin-left: 0;
              }
            }
          }
        }
      }
      // 导航栏
      .nav_fixed {
        width: 100%;
        position: fixed;
        top: 0;
        transition: ease-in-out 0.3s;
        z-index: 999;
        // 样式没写完
        .nav_top {
          height: 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          box-sizing: border-box;
          .nav_l {
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: pink;
            color: #fff;
            font-size: 1.3rem;
            i {
              font-size: 1.5rem;
              margin-right: 1rem;
            }
          }
          .nav_r {
            color: #fff;
            i {
              font-size: 1.5rem;
              margin-left: 1rem;
            }
          }
        }
      }
      .nav_change {
        position: fixed !important;
        background-color: #fe2b1f;
      }
    }
    .songList {
      padding: 0 1rem;
      padding-top: 1px;
      padding-bottom: 4.375rem;
      background-color: #fff;
      .songLi_t {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.8rem;
        margin-bottom: 1.4rem;
        .Li_Ti_l {
          display: flex;
          align-items: center;
          i {
            font-size: 2rem;
            color: #fe2b1f;
          }
          strong {
            margin: 0 0.5rem;
            color: #333;
          }
          span {
            font-size: 0.5em;
            color: #b3b3b3;
          }
        }
        .Li_Ti_r {
          i {
            font-size: 1.7em;
            color: #333;
            margin-left: 0.5rem;
          }
        }
      }
      .songLi_row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.3rem;
        .song_sort {
          display: flex;
          align-items: center;
          min-width: 0;
          .indexes {
            width: 1rem;
            margin-right: 1.2rem;
            color: #b3b3b3;
            text-align: center;
          }
          .songName_jieshao {
            display: flex;
            flex-direction: column;
            min-width: 0;
            .songName {
              color: #333;
              margin-bottom: 0.2rem;
              // margin-left: 0.25rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .jieshao {
              display: flex;
              align-items: center;
              font-size: 0.5rem;
              color: #b3b3b3;
              letter-spacing: 1px;
              .SQ {
                color: #fe2b1f;
                padding: 0.1rem 0.1rem;
                border: 0.1rem solid #fe2b1f;
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
      .songLi_row:last-child {
        margin: 0;
      }
    }
  }
}
.container::-webkit-scrollbar {
  display: none;
}
</style>