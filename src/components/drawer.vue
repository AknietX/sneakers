<script setup>
    import cartItemList from './cartItemList.vue';
    import infoBlock from './infoBlock.vue';


    

    const props = defineProps({
        totalPrice: Number,
        vatPrice: Number,
        disabledButton: Boolean
    })
    const emit = defineEmits(['createOrder', 'closeCart', 'closeDrawer'])

    const totalFunction = ()=>{
        emit('closeCart')
        emit('closeDrawer')
    }
    
</script>

<template>

    <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-10"></div>
    
    <div class=" bg-white fixed z-20 w-96 h-full  right-0 top-0 p-8  rounded-xl ">
        
        <div class="flex items-center ml-1 h-10">
            <img v-if="totalPrice" @click="totalFunction"  src="/arrow-left.svg" alt="" class="w-10 h-20 opacity-60 transition hover:-translate-x-0.5 hover:opacity-80 cursor-pointer mt-1">
            <h2 class="font-bold text-2xl ml-3" >Корзина</h2>
            <img v-if="!totalPrice" @click="totalFunction" class="absolute right-1 top-1 h-9 opacity-70 hover:opacity-100 cursor-pointer"  src="/close-drawer.svg" alt="закрыть">
        </div>
        <div class="h-full max-h-[460px] overflow-y-auto scrollbar-hide">
            <div v-if="!totalPrice" class="flex h-full items-center justify-center absolute">
                <infoBlock title="Корзина пустая" description="Добавьте хотябы одну пару кроссовок, чтобы сделать заказ" image-url="/package-icon.png"/>
            </div>
            <cartItemList v-if="totalPrice" />        
        </div>
        
        
        
        <div v-if="totalPrice" class="mt-5 w-80 mx-auto fixed height-150 bg-white">

            <div class="flex flex-col gap-3">
                <div class="flex gap-2">
                    <span>Итого:</span>
                    <div class="flex-grow border-b border-dashed border-slate-300"></div>
                    <b>{{ totalPrice }}руб.</b>
                </div>
                <div class="flex">
                    <span>Комиссия 5%:</span>
                    <div class="flex-grow border-b border-dashed border-slate-300"></div>
                    <b>{{ vatPrice }}руб.</b>
                </div>
            </div>
    
            <button :disabled="disabledButton" @click="()=>emit('createOrder')" class="transition bg-lime-500 text-white w-full py-3 rounded-xl mt-6 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 cursor-pointer mb-10">Оформить заказ</button>

        </div>
    </div>
</template>