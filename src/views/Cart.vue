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
            <span class="cart-items-price">{{ order.price }}</span>
          </div>
        </div>
      </div>

      <div class="cart-items-actions">
        <div class="counter flex-center">
          <button class="flex-center" @click="decrement(index)">-</button>
          <input type="text">
          <button class="flex-center" @click="increment(index)">+</button>
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
    
    <Modal v-if="feedback" :feedback="feedback" @cancel="feedback = ''"/>

  </div>


</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Modal from '@/components/Modal'

  export default {
    name: 'Cart',
    components: {
      Modal
    },
    computed: {
      ...mapGetters({
        orders: 'orders'
      })
    },
    data(){
      return {
        feedback: ''
      }
    },
    watch: {
      orders(){
        if(!this.orders.length) {
          this.$router.push( {name: 'Listing'} )
        }
      }
    },
    methods: {
      ...mapActions({
        removeItem: 'removeCartItem',
        submitOrder: 'submitOrder'
      }),
      removeCartItem(index){
        this.removeItem(index)
      },
      continueShopping(){
        this.$router.go(-1)
      },
      placeOrder(){
        const test = this.orders.map(item => {
          return {
            id: item.id,
            amount: 1
          }
        })

        this.submitOrder(test).then(res => {
          if(res.response.data.status == 'error') this.feedback = res.response.data.message
        })
      },
      decrement(index){
        console.log(index)
      },
      increment(index){
        console.log(index)
      }
    }
  }

</script>
