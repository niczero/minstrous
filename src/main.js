import Vue from 'vue'
import store from './store'

import './style/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
  },
  el: '[data-nature="vue"]',
  store
})
