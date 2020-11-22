import shopService from '../services/shopService'

export default {

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
      return error
    }
  }

}