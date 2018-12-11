<template>
  <div>
    hello,一起学习vue
   <div :key="item.id" v-for="item in shopList">
     <button>-</button>
      <span>{{item.count}}</span>
      <button @click="add(item.id)">+</button>
   </div>
  </div>
</template>
<script>
  export default {
    computed: {
      shopList(){
        return this.$store.state.shopList
      }
    },
    methods: {
      add (id) {
        /* this.$store.commit('updateCountById', {
          id
        }) */
        this.$store.dispatch('updateCountAction',{
          id
        })
      }
    }
  }
</script>
<style>

</style>

