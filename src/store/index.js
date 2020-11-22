import Vue from "vue";
import Vuex from "vuex";
import actions from './actions'

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
    ...actions
  }

});
