import router from '../router'
import store from '@/store'
import { RecSongMenuApi } from '../utils/api' // 推荐歌单
import { RecSongMenuDetails } from '../utils/api' // 歌单详情
import { SongListAll } from '../utils/api' // 歌单【所有歌曲】
import { SongUrlApi } from '../utils/api' // 歌曲Url
import { SongDetailsApi } from '../utils/api' // 歌曲详情
import { BannerApi } from '../utils/api' // 轮播图
import { recSongsApi } from '../utils/api' // 推荐歌曲
export default {
    namespaced: true,
    actions: {
        getRecSongMenu(context) { // 获取推荐歌单
            RecSongMenuApi({}).then(async res => {
                await context.commit('GET_REC_SONG_MENU', { recSongMenu_D: res.data.result })
            })
        },
        openThisSongMenu(context, value) { // 打开这个歌单（随即获取歌曲列表）
            const id = value
                // 获取歌单详情
            RecSongMenuDetails({ id }).then(async res => {
                    await context.commit('REC_SONG_MENU_DETAILS', { resSongMenuDetails: res.data.playlist })
                })
                // 获取歌单所有歌曲
            SongListAll({ id }).then(async res => {
                await context.commit('OPEN_THIS_SONG_MENU', { recSongList_D: res.data.songs })
            })
        },
        playSong(context, value) { // 获取歌曲Url地址
            const id = value
            const ids = value
            SongUrlApi({ id }).then(async res => { // 音乐地址
                await context.commit('PLAY_SONG', { songUrl: res.data.data[0].url })
            })
            SongDetailsApi({ ids }).then(async res => { // 歌曲详情
                await context.commit('SONG_DETAILS', { songDetails: res.data.songs[0] })
            })
        },
        getBanner(context) { // 获取轮播图
            BannerApi().then(async res => {
                await context.commit('GET_BANNER', { banner: res.data })
            })
        },
        getRecSongs(context) { // 获取推荐歌曲
            const cookie = store.state.login.userData.cookie
            recSongsApi({ cookie }).then(async res => {
                await context.commit('REC_SONGS_API', { songs: res })
            })
        }
    },
    mutations: {
        GET_REC_SONG_MENU(state, value) { // 推荐歌单
            state.recSongMenu_D = value.recSongMenu_D
        },

        REC_SONG_MENU_DETAILS(state, value) { // 歌单详情
            state.recSongMenuDetails = value.resSongMenuDetails
            console.log(state.recSongMenuDetails)
        },

        OPEN_THIS_SONG_MENU(state, value) { // 推荐歌单里的所有歌曲
            state.recSongList_D = value.recSongList_D
            router.push('/recsonglist')
            state.loadingIcon = false
        },

        PLAY_SONG(state, value) { // 歌曲Url
            state.songUrl = value.songUrl
        },

        PLAY(state) { // 歌曲Url(修复漏洞) 
            state.songUrl_New = new Date().getTime()
        },

        SONG_DETAILS(state, value) { // 歌曲详情
            state.songDetails = value.songDetails
        },

        LOADING_ICON(state) { // 控制加载图标的显示
            state.loadingIcon = true
        },
        GET_BANNER(state, value) { // 获取轮播图
            state.banner = value.banner.banners
        },
        REC_SONGS_API(state, value) { // 获取推荐歌曲
            state.recSongs = value.songs.data.data.dailySongs
            console.log(state.recSongs)
        }
    },
    state: {
        recSongMenu_D: [], // 推荐歌单
        recSongMenuDetails: [], // 歌单详情
        recSongList_D: [], // 推荐歌单里的歌曲列表
        songUrl: '', // 正在播放的歌曲Url
        songUrl_New: 0, // Url(候补)
        songDetails: [], // 当前播放歌曲详情
        loadingIcon: false, // 加载图标显示状态
        banner: [], // 轮播图
        recSongs: [] // 推荐歌曲
    },
    getters: {}
}