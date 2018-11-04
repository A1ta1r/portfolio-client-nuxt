import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      advertisers: [],
      banners: [],
      banner_places: [],
      adv: [],
      server_state: true,
      singleAdvertiser: {}
    },
    actions: {
      load_advertisers ({ commit }) {
        return this.$axios.get('partners')
          .then(result => result.data.advertisers)
          .then(advertisers => {
            commit('SET_ADVERTISERS', advertisers)
          })
      },
      update_advertiser_status({commit}, el) {
        let data = {
          isActive: el.row.isActive,
        };
        return this.$axios.put(`partners/${el.row.id}`, data)
          .then(response => {});
      },

      update_advertiser_total({commit}, advertiser) {
        return this.$axios.put(`partners/${advertiser.id}`, advertiser)
      },

      get_advertiser({commit}, id) {
        return this.$axios.get(`partners/${id}`)
          .then(result => result.data.advertiser)
          .then(advertiser => {
            commit('SET_SINGLE_ADVERTISER', advertiser)
          })
      },

      add_advertiser({commit}, advertiser) {
        return this.$axios.post('partners', advertiser)
      },

      delete_advertiser({commit}, advertiser) {
        return this.$axios.delete(`partners/${advertiser.row.id}`)
          .then(this.load_advertisers)
      },

      load_banners ({ commit }) {
        return this.$axios.get('https://loan-portfolio-api.herokuapp.com/...x3')
          .then(result => result.data)
          .then(banners => {
            commit('SET_BANNERS', banners)
          })
      },

      load_banner_places ({ commit }) {
        return this.$axios.get('https://loan-portfolio-api.herokuapp.com/...')
          .then(result => result.data)
          .then(banner_places => {
            commit('SET_BANNER_PLACES', banner_places)
          })
      },

      load_adv ({ commit }) {
        return this.$axios.get('promotions')
          .then(result => result.data.advertisements)
          .then(adv => {
            commit('SET_ADV', adv)
          })
      },

      load_advertiser_ads({ commit }, id) {
        return this.$axios.get(`/partners/${id}/promotions`)
          .then(result => result.data.advertisements)
          .then(ads => {
            commit('SET_ADVERTISER_ADS', ads)
          })
      },

      add_adv ({ commit }, promo) {
        return this.$axios.post('promotions', promo)
          .then(this.load_advertiser_ads(promo.advertiserId))
      },

      check_server ({ commit }) {
        return this.$axios.get('health')
          .then(status => {
            commit('SET_SERVER_STATUS', status.status)
          })
      }
    },
    mutations: {
      SET_SINGLE_ADVERTISER(state, advertiser) {
        state.singleAdvertiser = advertiser;
      },
      SET_ADVERTISERS (state, advertisers) {
        state.advertisers = advertisers
      },
      SET_BANNERS (state, banners) {
        state.banners = banners
      },
      SET_BANNER_PLACES (state, banner_places) {
        state.banner_places = banner_places
      },
      SET_ADVERTISER_ADS (state, ads) {
        state.advertisers.filter(x => x.id === ads.advertiserId).ads = ads
      },
      SET_ADV (state, adv) {

        state.adv = adv
      },
      SET_SERVER_STATUS(state, status) {
        state.server_state = status < 400;
      }
    }
  })
}

export default createStore
