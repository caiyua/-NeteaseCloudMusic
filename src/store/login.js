import { PhoneLoginApi } from '../utils/api'
import { EmailLoginApi } from '../utils/api'
// import { logoutApi } from '../utils/api'
import { logStatusApi } from '../utils/api'
import store from '@/store'
import { Toast } from 'vant'
import router from '../router'
// 登录相关
export default {
	namespaced: true, // 开启命名空间
	actions: {
		getPhoneLogin (context, value) { // 手机号登录
			const { phone, password } = value
			const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
			if (phoneReg.test(phone) && password) {
				PhoneLoginApi({ phone, password }).then(res => { // 手机号登录请求api
					if (res.data.code === 502) return Toast.fail('手机号或密码错误');
					if (res.data.code === 200) {
						context.commit('GET_PHONE_LOGIN', { userData: res.data })
					}
				})
			} else {
				Toast.fail('请输入正确的手机号或密码');
			}
		},

		getEmailLogin (context, value) { // 邮箱号登录
			const { email, password } = value
			const emailReg = /^[A-Za-z]\w{5,17}@(vip\.(126|163|188)\.com|163\.com|126\.com|yeach\.net)/
			if (emailReg.test(email) && password) {
				// 邮箱号登录请求api
				EmailLoginApi({ email, password }).then(res => {
					console.log(res.data)
					if (res.data.code === 502) return Toast.fail('邮箱号或密码错误')
					if (res.data.code === 200) {
						context.commit('GET_EMAIL_LOGIN', { userData: res.data })
					}
				})
			} else {
				Toast.fail('请输入正确的邮箱号或密码')
			}
		},

		out (context) {
			const cookie = store.state.login.userData.cookie
			logStatusApi({ cookie }).then(res => {
				context.commit('OUT', { logStatus: res.data })
			})
		}
	},
	mutations: {
		GET_PHONE_LOGIN (state, value) { // 手机号登录
			state.userData = value.userData
			Toast.success('登录成功')
			router.push({ path: '/discover' })
		},
		GET_EMAIL_LOGIN (state, value) { // 邮箱号登录
			state.userData = value.userData
			Toast.success('登录成功')
			router.push({ path: '/discover' })
		},
		OUT (state, value) {
			state.logStatus = value.logStatus.data
			console.log(state.logStatus)
		}
	},
	state: {
		userData: [], // 登录成功返回的数据
		logStatus: [] // 登录状态
	}
}