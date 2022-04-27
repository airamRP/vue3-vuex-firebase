import { createStore } from 'vuex'
import logger from 'vuex'

// import logger from 'vuex/dist/logger'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  // strict: debug,    // Modo estricto en producción
  // plugins: debug ? [logger.createLogger()] : [],
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
