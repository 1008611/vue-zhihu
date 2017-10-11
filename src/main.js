// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './assets/theme.less'

Vue.use(MuseUI)
require('swiper/dist/css/swiper.css')
Vue.config.productionTip = false

/* eslint-disable no-new */
document.addEventListener('deviceready', function() {
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
  window.navigator.splashscreen.hide()
}, false);
