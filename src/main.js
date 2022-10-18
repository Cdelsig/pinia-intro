import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'

import './assets/main.css'

Vue.use(PiniaVuePlugin)

const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  pinia
}).$mount('#app')

//createApp(App).use(createPinia).mount('#app')  // for vue 3, need to import createApp from vue here