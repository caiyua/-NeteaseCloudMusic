<template>
  <div class="content">
    <van-popup v-model="UserPanel" position="left" :style="{ width: '80%', height: '100%' }">
      <div class="userInfo">
        <img :src="userData.profile.avatarUrl" v-if="userData.profile.avatarUrl !== ''">
        <span v-if="userData.profile.nickname !== ''">{{userData.profile.nickname}}<i
            class="iconfont icon-xiangyoujiantou"></i></span>
      </div>
      <div class="card" style="box-shadow: none">
        <div class="outLogin">
          <van-button @click="goLogOut">退出登录</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="isLogOut" round :style="{ height: '10%' }" class="sure">
      <span class="isSure">确定退出当前账号吗？</span>
      <div>
        <van-button @click="cancel">取消</van-button>
        <van-button @click="out">退出</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'UserPanel',
  props: ['show'],
  watch: {
    show () {
      this.UserPanel = !this.UserPanel
    }
  },
  computed: {
    ...mapState('login', ['userData'])
  },
  data () {
    return {
      UserPanel: false, // 用户面板的显示状态
      isLogOut: false // 退出面板的显示状态
    }
  },
  methods: {
    ...mapActions('login', ['out']),
    goLogOut () { // 点击退出
      this.isLogOut = !this.isLogOut
    },
    cancel () { // 点击取消
      this.isLogOut = false
    },
  }
}
</script>

<style lang="less" scoped>
.content {
  .van-popup {
    border-top: 0.1rem solid #f5f5f5;
    background-color: #f5f5f5;
    padding: 1rem;
    box-sizing: border-box;
    .userInfo {
      display: flex;
      align-items: center;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      span {
        display: flex;
        align-items: center;
        color: #313131;
        letter-spacing: 0.05rem;
        i {
          font-size: 2rem;
          margin-left: -0.5rem;
          margin-top: 0.05rem;
        }
      }
    }
    .card {
      border-radius: 0.8rem;
      padding: 0;
      margin: 1rem 0;
      .outLogin {
        .van-button {
          width: 100%;
          border-radius: 0.8rem;
          color: #fe2b1f;
          font-size: 1rem;
          border: 0;
        }
      }
    }
  }
  .sure {
    width: 90%;
    height: auto !important;
    border-radius: 0.3rem;
    .isSure {
      display: block;
      font-size: 0.8em;
      color: rgb(117, 117, 117);
      margin-bottom: 2rem;
    }
    div {
      display: flex;
      justify-content: flex-end;
      .van-button {
        width: auto;
        height: auto;
        padding: 0;
        margin-left: 2rem;
        background: none;
        border: 0;
        .van-button__text {
          color: #fe2b1f;
        }
      }
    }
  }
}
</style>