import router from '../router'
import { UserSongListApi } from '../utils/api.js' // 用户歌单
import { RecSongMenuDetails } from '../utils/api.js' // 歌单详情
import { SongListAll } from '../utils/api.js' // 歌单所有歌曲
export default {
  namespaced: true,
  actions: {
    getUserSongMenu (context) {
      UserSongListApi({ uid: this.state.login.userData.profile.userId }).then(res => {
        context.commit('G_U_S_M', { UserSongMenu: res.data })
      })
    },
    open (context, value) {
      router.push('/mysongmenu')
      RecSongMenuDetails({ id: value, cookie: this.state.login.userData.cookie }).then(res => {
        context.commit('DETAILS', { MenuDetails: res.data })
      })
      SongListAll({ id: value, cookie: this.state.login.userData.cookie }).then(res => {
        context.commit('ALL_SONG', { AllSongs: res.data })
      })
    },

  },
  mutations: {
    G_U_S_M (state, value) {
      state.UserSongMenu = value.UserSongMenu.playlist
    },
    DETAILS (state, value) {
      state.MenuDetails = value.MenuDetails.playlist
    },
    ALL_SONG (state, value) {
      state.AllSongs = value.AllSongs.songs
    }
  },
  state: {
    UserSongMenu: [], // 用户歌单
    MenuDetails: [], // 打开的歌单详情
    AllSongs: [] // 所有歌曲
  }
}