<template>
  <div id="app">
    <!-- 内容占位，缓存路由 -->
    <!-- <keep-alive> -->
    <router-view v-if="$route.meta.keepAlive" />
    <!-- </keep-alive> -->
    <router-view v-if="!$route.meta.keepAlive" />

    <TabBar v-show="$route.meta.footShow" /> <!-- 底部导航栏 -->
    <playMusic v-if="$route.meta.playShow" :class="play_b" /> <!-- 播放组件，样式渲染条件用计算属性 -->
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import playMusic from '@/components/playMusic.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: { TabBar, playMusic },
  watch: {
    // 监听路由的变化
    '$route': 'reject'
  },
  computed: {
    play_b () { // 播放组件
      return {
        play_b:
          this.$route.name !== 'discover' &&
          this.$route.name !== 'podcast' &&
          this.$route.name !== 'my' &&
          this.$route.name !== 'ksong' &&
          this.$route.name !== 'cloudvillage'
      }
    },
    ...mapState('login', ['userData'])
  },
  data () {
    return {
      TabBar: [
        'discover',
        'podcast',
        'my',
        'ksong',
        'cloudvillage'
      ]
    }
  },
  methods: {
    reject () {
      // 获取Cookie
      const cookie = this.userData.token // 查询token
      if (cookie) { // 在登录的情况下，再跳转登录页，则驳回
        if (this.$route.path === '/login') this.$router.push('/')
        if (this.$route.path === '/mobilelogin') this.$router.push('/')
        if (this.$route.path === '/emaillogin') this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  #app {
    height: 100%;
    img {
      vertical-align: middle;
    }
  }
  width: 100% !important;
  height: 100% !important;
  background-color: #f5f5f5;
  .card {
    padding: 2rem 1rem;
    background-color: #fff;
    box-shadow: 0 8px 12px #ebedf0;
  }
  .play_out {
    bottom: 3.2rem;
  }
  .play_b {
    bottom: 0;
  }
}
</style>