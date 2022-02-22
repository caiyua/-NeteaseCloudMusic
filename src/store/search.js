import router from '../router'
import { SearchApi } from '../utils/api'
import { SearchSuggestApi } from '../utils/api'
import { defaultKeyWordApi } from '../utils/api'
export default {
  namespaced: true,
  actions: {
    sendSearch (context, value) { // 搜索请求
      const keywords = value
      if (keywords.trim() !== '') {
        SearchApi({ keywords }).then(async res => {
          await context.commit('SEARCH_RES', { searchRes: res.data.result })
        })
      } else { // 如果为空的话就搜索默认关键字
        SearchApi({ keywords: context.state.default_K_W.defaultKeyWord }).then(async res => {
          await context.commit('DEFAULT_SEARCH', { searchRes: res.data.result })
        })
      }
    },
    sendSuggest (context, value) { // 搜索建议
      const keywords = value
      if (keywords.trim() !== '') {
        SearchSuggestApi({ keywords }).then(async res => {
          await context.commit('SUGGEST', { suggest: res.data.result })
        })
      }
    },
    defaultKeyWord (context) { // 搜索默认关键词
      defaultKeyWordApi({}).then(async res => {
        await context.commit('DEFA_K_W', { defaultKeyWord: res.data.data })
      })
    }
  },
  mutations: {
    CLEAR_SEARCH (state) { // 进入之前先清除搜索内容
      state.searchRes = []
      state.suggest = []
      router.push('/search')
    },
    SEARCH_RES (state, value) {
      state.searchRes = value.searchRes.songs
      state.isDefaSearch = false
    },
    DEFAULT_SEARCH (state, value) {
      state.searchRes = value.searchRes.songs
      state.isDefaSearch = true
    },
    SUGGEST (state, value) {
      state.suggest = value.suggest.allMatch
    },
    DEFA_K_W (state, value) {
      state.default_K_W = value
    }
  },
  state: {
    searchRes: [], // 搜索结果
    suggest: [], // 搜索建议
    default_K_W: '', // 搜索默认关键词
    isDefaSearch: false // 监听是否默认搜索
  }
}