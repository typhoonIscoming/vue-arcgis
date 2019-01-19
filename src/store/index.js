
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const root = {
    rootState: 'this is root state'
}
import map from './map'


const store = new Vuex.Store({
    state: root,
    modules: {
        map,
    },
    strict: true,
})

export default store
