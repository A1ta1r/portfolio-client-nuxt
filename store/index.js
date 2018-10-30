import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      advertisers: [
        {
          id: 0,
          name: "Иван-банк",
          agreement: "Подписан",
          enabled: true,
          income: "1 423.58 ₽",
          totalIncome: "20 535.44 ₽"
        },
        {
          id: 1,
          name: "Деньгобанк",
          agreement: "Подписан",
          enabled: true,
          income: "1 423.58 ₽",
          totalIncome: "20 535.44 ₽"
        },
        {
          id: 2,
          name: "Просто чувак",
          agreement: "Подписан",
          enabled: true,
          income: "114.34 ₽",
          totalIncome: "4 675.44 ₽"
        },
        {
          id: 3,
          name: "Аферисты",
          agreement: "Расторгнут",
          enabled: false,
          income: "0 ₽",
          totalIncome: "0 ₽"
        }
      ],
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
}

export default createStore
