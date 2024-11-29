<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
    id: Number,
    price: Number,
    title: String, 
    imageUrl: String,
    
})

</script>


<template>
    <div class="border border-slate-200 rounded-xl p-4 flex gap-4 hover:-translate-y-1 transition relative">
        <img :src="imageUrl" alt="" class="w-16 cursor-pointer">
        <span class="text-sm absolute ">1x</span>
        <div class="flex flex-col ">
            <p class="text-sm">{{ title }}</p>
            <div class="flex justify-between justify-center">
                <b class="hover:font-normal">1 руб.</b>
                <img @click="()=> emit ('onClickRemove') " src="/public/close.svg" alt="ezz" class="cursor-pointer opacity-40  hover:opacity-100 absolute right-3 bottom-5">
            </div>
        </div>

    </div>
</template>