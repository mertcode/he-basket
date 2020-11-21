<template>

  <div>
    <Basket :orders="orders"/>
    <Modal v-if="feedback" :feedback="feedback" @cancel="cancel"/>
  </div>


</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Modal from '@/components/Modal'
  import Basket from '@/components/Basket'

  export default {
    name: 'Cart',
    components: {
      Modal,
      Basket
    },
    computed: {
      ...mapGetters({
        orders: 'orders',
        feedback: 'feedback'
      })
    },
    methods: {
      ...mapActions({
        setFeedback: 'setFeedback'
      }),
      cancel(){
        this.setFeedback('')
      }
    }
  }

</script>
