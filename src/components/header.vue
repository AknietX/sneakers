<script setup>
import { fromJSON } from 'postcss';


const emit = defineEmits(['openDrawer',])

</script>



<template>
      <header class="flex justify-between border-b border-gray-200 px-10 py-8 items-center rounded-b-lg">
      <div class="flex items-center">
        <a href="../index.html"><img src="/logo.png" alt="Logo" class="w-10 mr-5 cursor-pointer" ></a>
        <div>
          <h2 class="text-xl uppercase font-bold">Vue sneakers</h2>
          <p class="text-slate-500">магазин лучших кроссовок</p>
        </div>
      </div> 
      <div class="">
        <ul class="flex items-center gap-10">
          <li @click="() => emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
            <img src="/cart.svg" alt="cart">
            <b>1205 руб.</b>
          </li>
          <li class="flex items-center cursor-pointer  gap-3 text-gray-500 hover:text-black">
            <img src="/heart.svg" alt="cart">
            <span>Закладки</span>
          </li>
          <li class="flex items-center cursor-pointer  gap-3 text-gray-500 hover:text-black">
            <img src="/profile.svg" alt="cart">
            <span class="">Профиль</span>
          </li>
        </ul>
      </div>
    </header>
</template>