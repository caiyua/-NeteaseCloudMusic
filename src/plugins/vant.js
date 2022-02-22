import Vue from 'vue'
import {
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  Col,
  Row,
  icon,
  Search,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Form,
  Field,
  Toast,
  Tab,
  Tabs,
  Skeleton,
  Circle,
  Popup,
  Cell,
  Loading,
  PullRefresh, // 下拉
  Lazyload,// 懒加载指令
} from 'vant'

Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Col)
Vue.use(Row)
Vue.use(icon)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Form)
Vue.use(VanImage)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Skeleton)
Vue.use(Circle)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(Loading)
Vue.use(PullRefresh)
// 懒加载
Vue.use(Lazyload, {
  lazyComponent: true,
})