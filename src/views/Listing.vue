<template>
  <div class="listing-wrapper flex-center" v-if="!loading">

    <div class="listings flex-center" v-for="(listing, index) in listings" :key="index">

      <img class="listings-image" :src="listing.image" :alt="listing.name">
      <div class="listings-name">{{ listing.name }}</div>

      <div class="listings-bottom flex-center">

        <div class="listings-currency">
          {{ listing.currency }}
          <span class="listings-price">{{ listing.price }}</span>
        </div>

        <button @click="addItem(listing)">ADD TO BASKET</button>

      </div>

    </div>

  </div>
</template>

<script>

  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "Listing",
    computed: {
      ...mapGetters({
        listings: 'listings'
      })
    },
    data(){
      return {
        loading: false
      }
    },
    methods: {
      ...mapActions({
        addToBasket: 'addToBasket'
      }),
      addItem(item){
        this.addToBasket(item)
        this.$router.push({name: 'Cart'})
      }
    },
    created(){
      this.loading = true
      this.$store.dispatch('getListings').then(() => {
        this.loading = false
      })
    }
  }

</script>
