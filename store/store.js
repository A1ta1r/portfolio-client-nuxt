import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    advertisers: [],
    banners: [],
    banner_places: [],
    adv: []
  },
  actions: {
    load_advertisers ({ commit }) {
      axios.get('https://loan-portfolio-api.herokuapp.com/...')
        .then(result => result.data)
        .then(advertisers => {
          commit('SET_ADVERTISERS', advertisers)
        })
    },

    load_banners ({ commit }) {
      axios.get('https://loan-portfolio-api.herokuapp.com/...x3')
        .then(result => result.data)
        .then(banners => {
          commit('SET_BANNERS', banners)
        })
    },

    load_banner_places ({ commit }) {
      axios.get('https://loan-portfolio-api.herokuapp.com/...')
        .then(result => result.data)
        .then(banner_places => {
          commit('SET_BANNER_PLACES', banner_places)
        })
    },

    load_adv ({ commit }) {
      axios.get('https://loan-portfolio-api.herokuapp.com/health')
        .then(result => result.data)
        .then(adv => {
          commit('SET_ADV', adv)
        })
    }
  },
  mutations: {
    SET_ADVERTISERS (state, advertisers) {
      state.advertisers = advertisers
    },
    SET_BANNERS (state, banners) {
      state.banners = banners
    },
    SET_BANNER_PLACES (state, banner_places) {
      state.banner_places = banner_places
    },
    SET_ADV (state, adv) {
      state.adv = adv
    }
  }
})
