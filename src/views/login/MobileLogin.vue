<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar title="手机号登录" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <h3>登录体验更多精彩</h3>
      <p>未注册手机号登陆后将自动创建账号</p>
      <!-- 登录表单 -->
      <van-form @submit="getPhoneLogin(formInfo)">
        <van-field v-model="formInfo.phone" placeholder="手机号" />
        <van-field v-model="formInfo.password" type="password" placeholder="密码" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
// 引入Vuex映射
import {mapActions} from 'vuex'
export default {
  name: 'phoneLogin',
  data () {
    return {
      formInfo: {
        // 手机号
        phone: '13100259907',
        // 手机号密码
        password: 'pswwyy702.',
      },
    }
  },

  methods: {
    onClickLeft () {
      Toast('取消登录');
      this.$router.go(-1); //返回上一层
    },
    // 完成手机登录
      ...mapActions('login',['getPhoneLogin'])
  },
};
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  .content {
    padding: 1rem;
    h3 {
      margin-bottom: 0;
      font-weight: 500;
      color: rgb(66, 66, 66);
      letter-spacing: 2px;
    }
    p {
      margin-top: 0.3rem;
      font-size: 12px;
      color: #a3a2a2;
      letter-spacing: 1px;
    }
    .van-form {
      margin-top: 1rem;
      .van-button {
        background-color: #fe3b3b;
        border: 1px solid #fe3b3b;
      }
    }
  }
}
</style>