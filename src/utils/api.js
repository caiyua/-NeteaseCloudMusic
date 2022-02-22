import request from './request.js'
// 手机号登录
export const PhoneLoginApi = (params) => request.post(`/login/cellphone?timeStamp=${new Date().getTime()}`, params)
    // 邮箱登录
export const EmailLoginApi = (params) => request.post(`/login/email?timeStamp=${new Date().getTime()}`, params)
    // 轮播图数据
export const BannerApi = (params) => request.post(`/banner?timeStamp=${new Date().getTime()}`, params)
    // 推荐歌单
export const RecSongMenuApi = (params) => request.get('/personalized', { params })
    // 歌单详情
export const RecSongMenuDetails = (params) => request.get('/playlist/detail', { params })
    // 歌单所有歌曲
export const SongListAll = (params) => request.get('/playlist/track/all', { params })
    // 歌曲Url
export const SongUrlApi = (params) => request.get('/song/url', { params })
    // 歌曲详情
export const SongDetailsApi = (params) => request.get('/song/detail', { params })
    // 搜索
export const SearchApi = (params) => request.get('/search?limit=5', { params })
    // 搜索建议
export const SearchSuggestApi = (params) => request.get('/search/suggest?type=mobile', { params })
    // 默认搜索词
export const defaultKeyWordApi = (params) => request.get('/search/default', { params })
    // 退出登录
export const logoutApi = (params) => request.post(`/logout?timeStamp=${new Date().getTime()}`, params)
    // 获取登录状态
export const logStatusApi = (params) => request.post(`/login/status?timeStamp=${new Date().getTime()}`, params)
    // 获取用户等级信息
export const UserGradeApi = (params) => request.post('/user/level', params)
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
export const usSoCoMvDjApi = (params) => request.post('/user/subcount', params)
    // 获取用户歌单
export const UserSongListApi = (params) => request.get('/user/playlist', { params })
    // 获取推荐歌曲
export const recSongsApi = (params) => request.get('/recommend/songs', { params })