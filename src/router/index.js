import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import pathArr from './pathArr.js' // 引入拦截路由
import { Toast } from 'vant' // 引入弹框
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/discover' }, // 重定向
  { path: '/login', name: 'login', meta: { footShow: false, playShow: false }, component: () => import('@/views/login/Login.vue') }, // 登录
  { path: '/mobilelogin', name: 'mobilelogin', meta: { footShow: false, playShow: false }, component: () => import('@/views/login/MobileLogin.vue') }, // 登录
  { path: '/emaillogin', name: 'emaillogin', meta: { footShow: false, playShow: false }, component: () => import('@/views/login/EmailLogin.vue') }, // 登录
  /* TabBar */
  { path: '/discover', name: 'discover', meta: { footShow: true, keepAlive: true, playShow: true }, component: () => import('@/views/Discover.vue') }, // 发现
  { path: '/podcast', name: 'podcast', meta: { footShow: true, playShow: true }, component: () => import('@/views/Podcast.vue') }, // 播客
  { path: '/my', name: 'my', meta: { footShow: true, playShow: true }, component: () => import('@/views/My.vue') }, // 我的
  { path: '/ksong', name: 'ksong', meta: { footShow: true, playShow: true }, component: () => import('@/views/Ksong.vue') }, // K歌
  { path: '/cloudvillage', name: 'cloudvillage', meta: { footShow: true, playShow: true }, component: () => import('@/views/CloudVillage.vue') }, // 云村
  /* lable */
  { path: '/recdaily', name: 'recdaily', meta: { footShow: false, playShow: true }, component: () => import('@/views/lable/RecDaily.vue') }, // 每日推荐
  { path: '/privatefm', name: 'privatefm', meta: { footShow: false, playShow: true }, component: () => import('@/views/lable/PrivateFm.vue') }, // 私人FM
  { path: '/songlist', name: 'songlist', meta: { footShow: false, playShow: true }, component: () => import('@/views/lable/SongList.vue') }, // 歌单
  { path: '/top', name: 'top', meta: { footShow: false, playShow: true }, component: () => import('@/views/lable/Top.vue') }, // 排行榜
  { path: '/live', name: 'live', meta: { footShow: false, playShow: true }, component: () => import('@/views/lable/Live.vue') }, // 直播
  { path: '/album', name: 'album', meta: { footShow: false, playShow: true }, component: () => import('@/views/lable/Album.vue') }, // 数字专辑
  /* 点进去歌单*/
  { path: '/recsonglist', name: 'recsonglist', meta: { footShow: false, keepAlive: true, playShow: true }, component: () => import('@/views/RecSongList.vue') }, // 数字专辑
  { path: '/search', name: 'search', meta: { footShow: false, playShow: true }, component: () => import('@/views/Search.vue') }, // 搜索
  { path: '/mysongmenu', name: 'mysongmenu', meta: { footShow: false, keepAlive: true, playShow: true }, component: () => import('@/views/MySongMenu.vue') }// 我的歌单
]


const router = new VueRouter({
  mode: 'hash',
  routes
})


// 路由守卫
router.beforeEach(function (to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {
    const cookie = store.state.login.userData.cookie // 查询token
    if (cookie) {
      next()
    } else {
      next('/login')
      Toast.fail('请先登录……');
      // console.log(this) | 这里this不指向vm | Vue.prototype.$message.warning('请先登录...')
    }
  } else {
    next()
  }
})


export default router