import Vue from 'vue'
import ThemeSwatch from './components/ThemeSwatch.vue'
import store from './store'

import './style/index.scss'
import '@fortawesome/fontawesome-free/js/all'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    ThemeSwatch
  },
  el: '[data-nature="vue"]',
  store
})
