import { createStore } from 'vuex'
import Geo from '../classes/Geo';

export default createStore({
  state: {
    userCountryInfo: {}
  },
  mutations: {

    setUserCountryInfo(state,countryInfo){
      state.userCountryInfo = countryInfo;
    }

  },

  actions: {},

  modules: {}
})
