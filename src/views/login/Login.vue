<template>
  <div class="container">
    <!-- logo -->
    <div id="logo">
      <div class="circle"></div>
    </div>
    <van-row class="below" gutter="10">
      <van-col :span="10" offset="2">
        <van-button class="mobileLogin" icon="phone-o" to="/mobilelogin">手机登录</van-button>
      </van-col>
      <van-col :span="10">
        <van-button class="emailLogin" icon="envelop-o" to="/emaillogin">邮箱登录</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    onSubmit (values) {
      console.log('submit', values);
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 90% !important;
  background-color: #db2b1e;
  position: relative;
  padding: 2rem 3rem;
  #logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f02924;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -300%);
    .circle {
      width: 50%;
      height: 50%;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
  .below {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 400%);
    width: 100%;
    .van-button {
      width: 100% !important;
      box-shadow: 0px 5px 8px -5px #761111;
    }
    .emailLogin {
      background-color: rgba(255, 255, 255, 0);
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  }
}
</style>