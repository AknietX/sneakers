<script setup>
defineProps({
    title: String,
    imageUrl: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function,
})
</script>

<template>
<div  class="relative bg-white border border-slate-200 rounded-3xl p-8 cursor-pointer  hover:shadow-xl transition hover:-translate-y-2  duration-150" >
  
  <img @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg' " class="absolute top-8 left-8 hover:opacity-100 opacity-90" alt="Like 1">
  <img :src="imageUrl" alt="">
  <p>{{ title }}</p>

  <div class="flex justify-between">

    <div class="flex flex-col">
      <span class="text-slate-400 mt-5">Цена:</span>
      <b>{{ price }} руб.</b>
    </div>

    <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg' " alt="" class="cursor-pointer">

  </div>
  
</div>
</template>