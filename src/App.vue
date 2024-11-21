<script setup>


import { onMounted, ref, reactive, watch } from 'vue';
import axios, { Axios } from 'axios';
  

  import Header from './components/header.vue'
  import cardList from './components/cardList.vue'
  import Drawer from './components/drawer.vue';

const items = ref([])

const filters = reactive({
  sortBy:'title',
  searchQuery:''
})

const fetchFavorites = async () => {
  const { data:favorites } = await axios.get("https://7d51df7b87030aad.mokky.dev/favorites")
  items.value = items.value.map((item)=>{
    const favorite = favorites.find((favorite) => favorite.parentId === item.id)
    if(!favorite){
      return item
    }else{
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    }
  })
  console.log(items.value)
}

const fetchItems = async () =>{
  try{
    const params = {
      sortBy:filters.sortBy,
    }
    
    if(filters.searchQuery){
      params.title = `*${filters.searchQuery}*`
    }


    const {data} = await axios.get("https://18284c4289db6ce4.mokky.dev/items",
      {
        params
      })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite:false,
      isAdded:false
    }))

  }catch (err) {
    console.log(err)
  }
}

onMounted(async () =>{
  await fetchItems()
  await fetchFavorites()
})



const onChangeSelectInput = (event) => {
  filters.searchQuery = event.target.value
}

const onChangeSelect = (event) =>{
  filters.sortBy = event.target.value
  
}
watch(filters, fetchItems)

</script>



<template>
  <!-- <Drawer /> -->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 pb-8">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-7">

        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex">

          <select name="" id="" class="py-2 outline-none border rounded-md px-3" v-on:change="onChangeSelect" >
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img src="/search.svg" alt="" class="absolute left-3 top-3">
            <input @input="onChangeSelectInput" class="border rounded-md py-2 pl-9 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Поиск...">
          </div>
        </div>

      </div>

      <cardList :items="items"/>
    </div>




  </div>
  
</template>





<style scoped>
  
</style>

