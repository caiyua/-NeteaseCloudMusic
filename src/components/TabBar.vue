<template>
  <div class="container">
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" active-color="#bf5050" inactive-color="#9b9b9b">
      <van-tabbar-item replace :to="v.path" v-for="(v,i) in tabbars" :key="'tabbar'+i" @click="tabIndex(i)"
        :dot="v.dot">
        <span>{{v.title}}</span>
        <template #icon="props">
          <img :src="props.active ? v.icon.active : v.icon.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data () {
    return {
      active: 0,
      // 底部导航栏数据
      tabbars: [
        {
          path: '/discover',
          title: '发现',
          dot: false,
          icon: {
            active: require('@/assets/icon/tabbar/faxian_active.png'),
            normal: require('@/assets/icon/tabbar/faxian_normal.png'),
          }
        },
        // {
        //   path: '/podcast',
        //   title: '播客',
        //   dot: false,
        //   icon: {
        //     active: require('@/assets/icon/tabbar/boke_active.png'),
        //     normal: require('@/assets/icon/tabbar/boke_normal.png'),
        //   }
        // },
        {
          path: '/my',
          title: '我的',
          dot: false,
          icon: {
            active: require('@/assets/icon/tabbar/my_active.png'),
            normal: require('@/assets/icon/tabbar/my_normal.png'),
          }
        },
        // {
        //   path: '/ksong',
        //   title: 'K歌',
        //   dot: false,
        //   icon: {
        //     active: require('@/assets/icon/tabbar/ksons_active.png'),
        //     normal: require('@/assets/icon/tabbar/ksongs_normal.png'),
        //   }
        // },
        // {
        //   path: '/cloudvillage',
        //   title: '云村',
        //   dot: true,
        //   icon: {
        //     active: require('@/assets/icon/tabbar/cloudcun_active.png'),
        //     normal: require('@/assets/icon/tabbar/cloudcun_normal.png'),
        //   }
        // },
      ]
    }
  },
  methods: {
    // 动态选中每一项
    tabIndex (i) {
      this.active = i
    }
  }
}
</script>

<style>
</style>