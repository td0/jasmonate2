import Vuex from 'vuex'
import { auth } from '@/services/fireinit.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload
      }
    },
    actions: {
      autoSignIn({ commit }, payload) {
        commit('setUser', payload)
      },

      signIn({ commit }, data) {
        return new Promise((resolve, reject) => {
          auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then(user => {
              commit('setUser', user)
              resolve(user)
            })
            .catch(err => {
              reject(err)
            })
        })
      },

      signOut({ commit }) {
        return new Promise((resolve, reject) => {
          auth
            .signOut()
            .then(() => {
              commit('setUser', null)
              resolve()
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    }
  })
}

export default createStore
