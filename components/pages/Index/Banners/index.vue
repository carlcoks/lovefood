<template>
  <section class="index-banners">
    <div class="container">
      <Swiper
        :modules="[Pagination]"
        pagination
        loop
        :slides-per-view="2"
        :space-between="20"
        class="index-banners__slider"
      >
        <SwiperSlide class="index-banners-banner">
          <img src="@/assets/images/banners/1.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="index-banners-banner">
          <img src="@/assets/images/banners/2.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="index-banners-banner">
          <img src="@/assets/images/banners/3.jpg" alt="">
          <img src="@/assets/images/banners/4.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="index-banners-banner">
          <img src="@/assets/images/banners/1.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="index-banners-banner">
          <img src="@/assets/images/banners/2.jpg" alt="">
        </SwiperSlide>
        <SwiperSlide class="index-banners-banner">
          <img src="@/assets/images/banners/3.jpg" alt="">
          <img src="@/assets/images/banners/4.jpg" alt="">
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>

<style lang="scss" scoped>
@import 'swiper/css';

.index-banners {
  &__slider {
    padding-bottom: 23px;
  }

  ::v-deep .swiper-pagination {
    top: unset;
    bottom: 0;
    left: 39px;

    display: flex;
    align-items: center;
    grid-gap: 10px;

    width: auto;

    .swiper-pagination-bullet {
      width: 16px;
      height: 3px;

      margin: 0;

      background: $grayText2;
      border-radius: 2px;

      opacity: 1;

      &.swiper-pagination-bullet-active {
        background: $blackText;
      }
    }
  }
}

.index-banners-banner {
  display: flex;
  align-items: flex-start;
  grid-gap: 20px;

  border-radius: 40px;
  overflow: hidden;
}
</style>