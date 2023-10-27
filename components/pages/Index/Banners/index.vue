<template>
  <section class="index-banners">
    <div class="container">
      <div class="index-banners__box">
        <Swiper
          :modules="[Pagination]"
          pagination
          loop
          :slides-per-view="1"
          :space-between="20"
          class="index-banners__slider"
        >
          <SwiperSlide class="index-banners-banner">
            <img src="@/assets/images/banners/1.jpg" alt="">
          </SwiperSlide>
          <SwiperSlide class="index-banners-banner">
            <img src="@/assets/images/banners/2.jpg" alt="">
          </SwiperSlide>
        </Swiper>

        <div class="index-banners__banners">
          <img src="@/assets/images/banners/3.jpg" alt="">
          <img src="@/assets/images/banners/4.jpg" alt="">
        </div>
      </div>
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
  &__box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  &__slider {
    width: 100%;
    
    padding-bottom: 23px;

    overflow: hidden;
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

  &__banners {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
}

.index-banners-banner {
  border-radius: 40px;
  overflow: hidden;
}
</style>