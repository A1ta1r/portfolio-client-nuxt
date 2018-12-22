import Vue from 'vue'
import moment from 'moment'

import 'moment/locale/ru'

if (!Vue.prototype.hasOwnProperty('$moment')) {
  Object.defineProperty(Vue.prototype, '$moment', {
    get() {
      return moment
    }
  })
}

