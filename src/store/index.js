import Vue from "vue";
import Vuex from "vuex";
import shopService from '../services/shopService'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    listings: [],
    orders: []

  },
  getters: {

    listings(state){
      return state.listings
    },
    orders(state){
      return state.orders
    }

  },
  mutations: {

    addToBasket(state, payload){
      state.orders = [...state.orders, payload]
    },
    setListings(state, payload){
      state.listings = payload
    }
  },
  actions: {

    async getListings({commit}){

      try {

        const response = await shopService.getListings()

        commit('setListings', response.data)

        return response

      } catch(error) {

        console.log(error)

      }

    },
    addToBasket({commit}, payload){
      commit('addToBasket', payload)
    },
    async submitOrder(_ ,{ orders }){
      
      try {

        const response = await shopService.submitOrder(orders)

        return response

      } catch(error) {
        console.log(error)
      }
    }

  }

});
