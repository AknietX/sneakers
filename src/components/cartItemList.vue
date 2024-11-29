<script  setup>    
    import cartItem from './cartItem.vue'
    import { inject } from 'vue';

    const { cart, RemoveFromCart } = inject("cart")
</script>

<template>
    <div class="flex flex-col gap-5 text-clip h-600 mt-5 flex-grow">

        <cartItem v-for="item in cart" 
        :key="item.id" 
        :imageUrl="item.imageUrl" 
        :title="item.title"
        :price = "item.price"
        @on-click-remove = RemoveFromCart(item) />
        

     
      </div>
</template>