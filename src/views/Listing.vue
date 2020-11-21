<template>
  <div class="listing-wrapper flex-center" v-if="!loading">

    <div class="listings flex-center" v-for="listing in listings" :key="listing.id">

      <img class="listings-image" :src="listing.image" :alt="listing.name">
      <div class="listings-name">{{ listing.name }}</div>

      <div class="listings-bottom flex-center">

        <div class="listings-currency">
          {{ listing.currency }}
          <span class="listings-price">{{ listing.price }}</span>
        </div>

        <button class="btn btn-orange" @click="addItem(listing)">ADD TO BASKET</button>

      </div>

    </div>

  </div>
  <div class="flex-center loading" v-else>
    Loading. This might take a few seconds...
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
