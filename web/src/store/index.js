import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)


const state = {
  labelCount: '',
  articleCount: '',
  categoryCount: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
