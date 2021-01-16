import { createStore } from 'vuex'

export default createStore({
  state: {
    userCountryInfo: null
  },
  mutations: {

    setUserGeoInfo(state,countryInfo){
      state.userCountryInfo = countryInfo;
    }

  },

  actions: {

  },

  modules: {}
})
