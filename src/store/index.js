import Vue from "vue";
import Vuex from "vuex";
import shopService from '../services/shopService'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    listings: [],
    orders: [],
    feedback: ''

  },
  getters: {

    listings(state){
      return state.listings
    },
    orders(state){
      return state.orders.map(order => {
        return {
          ...order,
          price: parseFloat(order.price) * order.amount
        }
      })
    },
    feedback(state){
      return state.feedback
    },
    getCartItemById: (state) => (id) => {
      return state.orders.find(order => order.id === id)
    }

  },
  mutations: {

    addToBasket(state, payload){
      state.orders = [...state.orders, payload]
    },
    setListings(state, payload){
      state.listings = payload
    },
    removeCartItem(state, payload){
      state.orders.splice(payload, 1)
    },
    setFeedback(state, payload){
      state.feedback = payload
    },
    changeCartItemAmount(state, payload){

      state.orders = state.orders.reduce((finalArray, currentItem) => {
        let newAmount = currentItem.id === payload.id ? currentItem.amount + payload.amount : currentItem.amount
        return [...finalArray, {
          ...currentItem,
          amount: newAmount ? newAmount : 1
        }]
      }, [])

    },
    clearCart(state){
      state.orders = []
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
        return error

      }

    },
    addToBasket({commit, getters, dispatch}, payload){
      const foundOrder = getters.getCartItemById(payload.id)

      if(foundOrder){
        dispatch('changeCartItemAmount', {
          id: payload.id,
          amount: 1
        })
      } else {
        commit('addToBasket', {...payload, amount: 1})
      }

    },
    changeCartItemAmount({commit}, payload){
      commit('changeCartItemAmount', payload)
    },
    removeCartItem({commit}, payload){
      commit('removeCartItem', payload)
    },
    setFeedback({commit}, payload){
      commit('setFeedback', payload)
    },
    async submitOrder({commit} , orders){
      
      try {

        const response = await shopService.submitOrder(orders)

        if(response.data.status === 'success'){
          commit('clearCart')
        }

        return response

      } catch(error) {
        console.log(error)
        return error
      }
    }

  }

});
