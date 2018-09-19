import Vue from "vue";

import { Input } from 'element-ui/lib/input'
import { Table } from 'element-ui/lib/table'
import { Switch } from 'element-ui/lib/switch'
import { DatePicker } from 'element-ui/lib/date-picker'
import { Card } from 'element-ui/lib/card'

// import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(Input, {
  locale
})
Vue.use(Table, {
  locale
})
Vue.use(Switch, {
  locale
})
Vue.use(DatePicker, {
  locale
})
Vue.use(Card, {
  locale
})
