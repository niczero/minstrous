import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import store from './store'

import './style/index.scss'
import Bootstrap from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(Bootstrap)

/* eslint-disable no-new */
new Vue({
  components: {
    HelloWorld
  },
  el: '[data-nature="vue"]',
  store
})
