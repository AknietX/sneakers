<script  setup>    
import Card from './card.vue'
defineProps({
    items: Array,
})
const emit = defineEmits(['addToFavorite', 'addToCart'])

</script>

<template>
    <div class="grid grid-cols-4 gap-5 z-10" v-auto-animate>
        <Card  v-for="item in items"
        :key="item.id"
        :price="item.price" 
        :imageUrl="item.imageUrl" 
        :title="item.title" 
        :onClickFavorite="() => emit('addToFavorite', item)"
        :isFavorite="item.isFavorite"
        :onClickAdd="() => emit('addToCart', item)"
        :isAdded="item.isAdded"
        >
        </Card>
       
      </div>
</template>