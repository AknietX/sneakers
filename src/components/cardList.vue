<script  setup>    
    import Card from './card.vue'
    defineProps({
        items: Array,
    })
</script>

<template>
    <div class="grid grid-cols-4 gap-5 z-10">
        <Card  v-for="item in items"
        :key="item.id"
        :price="item.price" 
        :imageUrl="item.imageUrl" 
        :title="item.title" 
        :addFavorite="items.addFavorite"
        :isFavorite="items.isFavorite">
        </Card>
       
      </div>
</template>