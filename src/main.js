import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

//my
//全局引入接口
// import companyApi from '@/api/company'
// Vue.use(companyApi)
//图片前缀地址
Vue.prototype.hostUrl = 'https://9uc-1253537498.cos.ap-shanghai.myqcloud.com'
//时间格式化
const filerdata = (s)=>{
  return s < 10 ? '0' + s: s;
}
Vue.prototype.$dateFormat = (param) => {
  let dateMat = new Date(param * 1000);
  const year = dateMat.getFullYear();
  const month = dateMat.getMonth() + 1;
  const day = dateMat.getDate();
  const hh = dateMat.getHours();
  const mm = dateMat.getMinutes();
  let timeFormat = year + "/" + filerdata(month) + "/" + filerdata(day) + " " + filerdata(hh) + ":" + filerdata(mm);
  return timeFormat;
}
//提示信息
Vue.prototype.$alert_my = (param) =>{
  this.$message({
    type: 'success',
    message: param
  });
}
Vue.prototype.$confirm_my = (param) => {
  this.$confirm(param.message, param.title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    
  }).catch(() => {
             
  });
}
//地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'c287b27e8e07e0b82fd1d9807dc5c670',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor','Geocoder'],
  v: '1.4.4'
});


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
