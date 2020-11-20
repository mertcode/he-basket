<template>
  <div class="cart">
    
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    computed: {
      ...mapGetters({
        orders: 'orders'
      })
    }
  }
</script>
