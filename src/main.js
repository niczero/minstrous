import Vue from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import store from './store'

import './style/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    HelloWorld
  },
  el: '[data-nature="vue"]',
  store
})
