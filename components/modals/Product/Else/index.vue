<template>
  <div class="modal-product-else">
    <p class="modal-product-else__title">
      Что нибудь ещё?
    </p>

    <Swiper
      :slides-per-view="'auto'"
      :space-between="15"
      class="modal-product-else__slider"
    >
      <SwiperSlide
        v-for="(item, i) in related"
        :key="i"
        class="modal-product-else__slide"
      >
        <ModalsProductElseProduct
          :item="item"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'

defineProps({
  related: {
    type: Array,
    default: () => ([]),
  },
})
</script>

<style lang="scss" scoped>
.modal-product-else {
  &__title {
    @include h2;
    color: $black;
  }

  &__slider {
    margin: 0 -30px;
    padding: 0 30px;
  }

  &__slide {
    width: auto;
  }
}


</style>