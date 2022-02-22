<template>
  <div class="container">
    <!-- 导航栏 -->
    <div class="nav-row">
      <!-- 左侧图标 -->
      <div class="nav-col">
        <van-icon size="1.7rem" class-prefix="iconfont icon-ego-menu" @click="showPopup"></van-icon>
        <UserPanel :show="show" />
      </div>
      <!-- 右侧图标 -->
      <div class="nav-col">
        <van-icon size="1.7rem" class-prefix="iconfont icon-sousuo" @click="$router.push('/search')"></van-icon>
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="my_info">
      <div class="my_ri">
        <div class="portrait"><img :src="userData.profile.avatarUrl"></div>
        <div class="left">
          <h2 class="nickName">{{userData.profile.nickname}}</h2>
          <div class="vip">
            <span class="isVip">
              <span>CVIP开通</span>
              <!-- <i class="iconfont icon-xiangyoujiantou"></i> -->
            </span>
            <span class="grade">Lv.{{level}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <i class="iconfont icon-xiangyoujiantou"></i>
      </div>
    </div>
    <!-- 用户操作 -->
    <div class="card">
      <div class="card_in">
        <div v-for="(v,i) in userOper" :key="i">
          <img>
          <span>{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 我喜欢 -->
    <div class="card iLike" v-for="v in UserSongMenu" :key="v.id" @click="open(v.id)">
      <img v-if="v.coverImgUrl" :src="v.coverImgUrl + '?param=56y56'">
      <div class="like_r">
        <div class="l_title">{{v.name}}</div>
        <div class="l_count" v-if="v.trackCount">{{v.trackCount}}首</div>
      </div>
    </div>
      <!-- <p style="padding:20px;color:#aaa;font-size:12px">暂无更多，敬请期待！</p> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserPanel from '../components/UserPanel.vue'
export default {
  name: 'My',
  components: {
    UserPanel
  },
  computed: {
    ...mapState('login', ['userData']),
    ...mapState('user', ['level']),
    ...mapState('mySongMenu', ['UserSongMenu']),
    ...mapState('recSongMenu',['songDetails'])
  },
  data () {
    return {
      show: 0, // 用户面板展示状态
      userOper: [
        { name: '最近播放', path: '' },
        { name: '本地/下载', path: '' },
        { name: '云盘', path: '' },
        { name: '已购', path: '' },
        { name: '我的好友', path: '' },
        { name: '收藏和赞', path: '' },
        { name: '我的播客', path: '' },
        { name: '音乐罐子', path: '' }
      ]
    }
  },
  created () {
    this.getGrade()
    this.getUserSongMenu()
  },
  methods: {
    ...mapActions('user', ['getGrade']),
    ...mapActions('mySongMenu', ['getUserSongMenu', 'open']),
    showPopup () { // 刷新用户面板的状态
      this.show = new Date().getTime()
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 81%;
  padding: 5%;
  overflow: scroll;
.nav-row {
    height: 2.3rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    .nav-col {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #303030;
    }
  }
  .my_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    .my_ri {
      display: flex;
      margin-left: 1.3rem;
      .portrait {
        margin-right: 0.8rem;
        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
          border: 2px solid #fff;
        }
      }
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2 {
          font-size: 18px;
          margin-bottom: 0.1rem;
          color: #313131;
          letter-spacing: 1px;
        }
        .vip {
          display: flex;
          transform: scale(0.8);
          margin-left: -0.8125rem;
          .isVip {
            display: flex;
            align-items: center;
            padding: 0.2rem 0.5rem;
            margin-right: 0.3rem;
            font-size: 0.8rem;
            color: #fff;
            background-color: #bbb;
            border-radius: 0.625rem;
            i {
              font-size: 1.5rem;
            }
          }
          .grade {
            padding: 0.2rem 0.8rem;
            font-size: 0.8rem;
            color: #313131;
            background-color: #fff;
            border-radius: 0.625rem;
          }
        }
      }
    }
    .right {
      i {
        font-size: 2rem;
        font-weight: bold;
        color: #313131;
      }
    }
  }
  .card_in {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.8rem;
      margin-top: 0.8rem;
      text-decoration: none;
      img {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.3rem;
        background-color: #fe2b1f;
        border-radius: 50%;
      }
      span {
        font-size: 0.8rem;
        color: #666;
        letter-spacing: 1px;
      }
    }
    div:last-child {
      margin-bottom: 0;
    }
  }
  .iLike {
    display: flex;
    align-items: center;
    padding: 1rem;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 0.6rem;
    }
    .like_r {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 0.8rem;
      .l_title {
        font-size: 1rem;
        margin-bottom: 0.1rem;
      }
      .l_count {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.card {
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
}
</style>