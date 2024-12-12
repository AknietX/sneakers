<script setup>


import { onMounted, ref, reactive, watch, provide, computed } from 'vue';
import axios, { Axios } from 'axios';
  

  import Header from './components/header.vue'
  import cardList from './components/cardList.vue'
  import Drawer from './components/drawer.vue';
import js from '@eslint/js';
import CartItem from './components/cartItem.vue';

const items = ref([])
const cart  = ref([])
const isCreatingOrder = ref(false)

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value )

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value / 100) * 5))

const stopScroll = ()=>{
  document.body.classList.add('overflow-hidden')
}
const contineScroll = ()=>{
  document.body.classList.remove('overflow-hidden')
}

const AddCart = (item) =>{
  cart.value.push(item)
  item.isAdded = true
}
const RemoveFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () =>{
  try{
    isCreatingOrder.value = true
    const {data}  = await axios.post(`https://f9e0dc9b5d5910b7.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []
    
    return data
  }catch(err){
    console.log(err)
  }finally{
    isCreatingOrder.value = false
  }
}


const onClickAddPlus= (item) =>{

  if(!item.isAdded){
    AddCart(item)
  }else{
    RemoveFromCart(item)
  }
}

const drawerOpen = ref(false)

const closeDrawer = () =>{
  drawerOpen.value = false
}

const openDrawer = () =>{
  drawerOpen.value = true
}


const filters = reactive({
  sortBy:'title',
  searchQuery:''
})

const fetchFavorites = async () => {
  try{

    const { data:favorites } = await axios.get("https://7d51df7b87030aad.mokky.dev/favorites")
    items.value = items.value.map((item)=>{
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)
      if(!favorite){
        return item
        
      }
      return {
          ...item,
          isFavorite: true,
          favoriteId: null,
          favoriteId: favorite.id
      }
      });

      console.log(items.value)
  }catch (err){
    console.log(err)
  }
  
};


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

const addToFavorite = async (item) => {
  try{

    if(!item.isFavorite){
        const obj = {
          parentId: item.id
        }
        item.isFavorite = true;
        const { data } = await axios.post('https://7d51df7b87030aad.mokky.dev/favorites', obj)
        
        item.favoriteId = data.id
    
        console.log(data)
    }else{
      item.isFavorite = false;
      await axios.delete(`https://7d51df7b87030aad.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null;
    }

  }catch (err){
    console.log(err)
  }
}


onMounted(async () =>{
  const localCart = localStorage.getItem('cartED');
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item)=>({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(filters, fetchItems)


watch(cart, ()=>{
  items.value = items.value.map((item)=>({
    ...item,
    isAdded: false
  }))
})

watch(
  cart,
 () => {
    localStorage.setItem('cartED', JSON.stringify(cart.value))
  },
  {deep: true}
)

provide('cart', {
  openDrawer,
  cart,
  RemoveFromCart,
  stopScroll,
  contineScroll
})


const onChangeSelectInput = (event) => {
  filters.searchQuery = event.target.value
}

const onChangeSelect = (event) =>{
  filters.sortBy = event.target.value
  
}
// scrolling
const isCartOpen = ref(false)

    const openCart = () =>{
        isCartOpen.value = true
    }
    const closeCart = () =>{
        isCartOpen.value = false
    }

    watch(isCartOpen, (newValue) => {
  if (newValue) {
    document.body.classList.add('overflow-hidden'); // Блокируем скроллинг
  } else {
    document.body.classList.remove('overflow-hidden'); // Разблокируем скроллинг
  }
    });   




</script>



<template>
  <Drawer v-if="drawerOpen" @close-drawer="closeDrawer" @close-cart="closeCart" :total-price="totalPrice" :vat-price="vatPrice" @create-order="createOrder" :disabled-button="cartButtonDisabled"/>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 pb-8">
    <Header @open-cart="openCart" @open-Drawer="openDrawer" :total-price="totalPrice"></Header>

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

      <cardList :items="items" @addToFavorite="addToFavorite" @add-to-cart = onClickAddPlus />
    </div>




  </div>
  
</template>





<style scoped>
  
</style>

