import Vue from 'vue'
import Vuex from 'vuex'
// 存入session插件
import createPersistedState from 'vuex-persistedstate'
// 引入模块化文件
import login from './login'
import recSongMenu from './recSongMenu'
import search from './search'
import user from './user'
import mySongMenu from './mySongMenu'
// 应用Vuex插件
Vue.use(Vuex)

// 创建并暴露store
export default new Vuex.Store({
    modules: {
        login,
        recSongMenu,
        search,
        user,
        mySongMenu
    },
    plugins: [createPersistedState()]
})