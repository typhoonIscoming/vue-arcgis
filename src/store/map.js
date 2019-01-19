
const state = {
    mapObj: null
}

const getters = {
    getMap(state) {
        return state.mapObj
    },
}

const actions = {
    setMap({ commit }, obj) {
        console.log('mapobj', obj)
        commit('mutationMap', obj)
    },
}

const mutations = {
    mutationMap(state, obj) {
        state.mapObj = obj
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
}