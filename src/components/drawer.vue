<script setup>
    import cartItemList from './cartItemList.vue';

</script>

<template>

    <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-10"></div>

    <div class="bg-white fixed z-20 w-96 h-full right-0 top-0 p-8 rounded-xl">
        <h2 class="font-bold text-2xl">Корзина</h2>
        
        <cartItemList />        

        <div class="flex flex-col gap-3 mt-20">
            <div class="flex gap-2">
                <span>Итого:</span>
                <div class="flex-grow border-b border-dashed border-slate-300"></div>
                <b>13000руб.</b>
            </div>
            <div class="flex">
                <span>Комиссия 5%:</span>
                <div class="flex-grow border-b border-dashed border-slate-300"></div>
                <b>665руб.</b>
            </div>
        </div>

        <button disabled="" class="transition bg-lime-500 text-white w-full py-3 rounded-xl mt-6 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 cursor-pointer">Оформить заказ</button>


    </div>
</template>