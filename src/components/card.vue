<script setup>

defineProps({
    id: Number,
    title: String,
    imageUrl: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function
    
})

</script>

<template>
<div  class="relative bg-white border border-slate-200 rounded-3xl p-8 pb-20 cursor-pointer  hover:shadow-xl transition hover:-translate-y-2  duration-150" >
  
  <img @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg' " class="absolute top-8 left-8 hover:opacity-100 opacity-90" alt="Like 1">
  <img :src="imageUrl" alt="" class="h-172 w-204">
  <p>{{ title }}</p>
  
  <div class="flex justify-between absolute bottom-8 left-8 right-8">

    <div class="flex flex-col">
      <span class="text-slate-400 ">Цена:</span>
      <b>{{ price }} сом.</b>
    </div>

    <img  @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg' " alt="" class="cursor-pointer transition">

  </div>
  
</div>
</template>