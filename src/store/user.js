// import { logoutApi } from '../utils/api'
import { UserGradeApi } from '../utils/api'
// import store from '@/store'
// import { Toast } from 'vant'
// import router from '../router'
// 登录相关
export default {
  namespaced: true, // 开启命名空间
  actions: {
    getGrade (context) {
      UserGradeApi({ cookie: this.state.login.userData.cookie }).then(res => {
        context.commit('GET_GRADE', { level: res.data.data.level })
      })
    }
  },
  mutations: {
    GET_GRADE (state, value) {
      state.level = value.level
    }
  },
  state: {
    level: 0
  }
}