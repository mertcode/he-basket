<template>

    <div class="cart">

        <div class="title">MY CART ({{ orders.length }})</div>

        <div class="cart-items" v-for="(order, index) in orders" :key="order.id">
            <div class="cart-items-upper">
                <img class="cart-items-image" :src="order.image" :alt="order.name">
                <div class="cart-items-info">
                    <div class="cart-items-name"> {{ order.name }} </div>
                    <div class="cart-items-currency">
                        {{ order.currency }}
                        <span class="cart-items-price">{{ order.price.toFixed(2) }}</span>
                    </div>
                </div>
            </div>

            <div class="cart-items-actions">
                <div class="counter flex-center">
                    <button class="flex-center" @click="decrement(order.id)">-</button>
                    <input type="text" :value="order.amount">
                    <button class="flex-center" @click="increment(order.id)">+</button>
                </div>
                <div class="remove" @click="removeCartItem(index)">
                    Remove
                </div>
            </div>
        
        </div>

        <div class="cart-actions flex-center">
            <button class="btn btn-gray" @click="continueShopping">
                CONTINUE SHOPPING
            </button>
            <button class="ml-2 btn btn-orange" @click="placeOrder">
                PLACE ORDER
            </button>
        </div>

    </div>

</template>

<script>

  import { mapActions } from 'vuex'

  export default {
    name: 'Cart',
    props: {
      orders: {
        type: Array,
        required: true
      }
    },
    methods: {
      ...mapActions({
        removeItem: 'removeCartItem',
        submitOrder: 'submitOrder',
        setFeedback: 'setFeedback',
        changeCartItemAmount: 'changeCartItemAmount'
      }),
      removeCartItem(index){
        this.removeItem(index)
      },
      continueShopping(){
        this.$router.go(-1)
      },
      placeOrder(){

        const finalOrder = this.orders.map(item => {
          return {
            id: item.id,
            amount: item.amount
          }
        })

        this.submitOrder(finalOrder).then(res => {
          if(res.response && res.response.data.status == 'error') {
            this.setFeedback(res.response.data.message)
          } else {
            this.setFeedback(res.data.message)
          }
        })

      },
      decrement(id){
        this.changeCartItemAmount({id, amount: -1})
      },
      increment(id){
        this.changeCartItemAmount({id, amount: 1})
      }
    }
  }

</script>