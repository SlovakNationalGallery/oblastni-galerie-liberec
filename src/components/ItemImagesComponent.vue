<template>
    <div class="relative" v-if="item.content.images.length">
        <span class="absolute bg-black/60 h-10 leading-10 rounded-full right-2 text-center text-white w-10 top-2"><i class="fa fa-search-plus" /></span>
        <Swiper
        @imagesReady="swiperTo(0)"
        @swiper="setSwiper"
        class="my-4"
        slidesPerView="auto">
            <SwiperSlide class="pr-4 last:pr-0" v-for="(image, i) in item.content.images" :key="i">
                <router-link :to="{ name: 'zoom', query: { page: i } }">
                    <img class="cursor-pointer mx-auto" :src="$imagePreviewUrl(image, 800)" />
                </router-link>
            </SwiperSlide>
        </Swiper>

        <template v-if="item.content.images.length > 1">
            <div class="absolute bg-white/80 cursor-pointer h-10 leading-10 left-2 rounded-full text-center top-1/2 -translate-y-1/2 w-10 z-10" @click="swiperPrev"><i class="fa fa-arrow-left"></i></div>
            <div class="absolute bg-white/80 cursor-pointer h-10 leading-10 rounded-full right-2 text-center top-1/2 -translate-y-1/2 w-10 z-10" @click="swiperNext"><i class="fa fa-arrow-right"></i></div>

            <div class="text-center">
                <button @click="swiperTo(i)" class="before:content-['•'] leading-[0] my-2 px-2 before:text-base text-[0]" :class="[ i === swiper?.realIndex ? 'opacity-100' : 'opacity-40' ]" v-for="(image, i) in item.content.images" :key="i">{{ i }}</button>
            </div>
        </template>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
    props: ['item'],
    components: { Swiper, SwiperSlide },
    data() {
        return {
            swiper: null,
        }
    },
    methods: {
        setSwiper(swiper) {
            this.swiper = swiper
        },
        swiperPrev() {
            this.swiper?.slidePrev()
        },
        swiperNext() {
            this.swiper?.slideNext()
        },
        swiperTo(index) {
            this.swiper?.slideTo(index)
        },
    }
}
</script>