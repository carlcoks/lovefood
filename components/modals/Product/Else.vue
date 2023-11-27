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
        v-for="i in 5"
        :key="i"
        class="modal-product-else__slide"
      >
        <div class="modal-product-else-item">
          <div class="modal-product-else-item__image">
            <img src="@/assets/images/menu-card-example.png" alt="">
            <p class="modal-product-else-item__discount">
              -25%
            </p>
          </div>
          <div class="modal-product-else-item__content">
            <p class="modal-product-else-item__title">
              Название блюда
            </p>

            <CommonPriceBlock
              :regular-price="1880"
              :price="1680"
              is-reverse
            />

            <UIButton
              color="gray"
              size="small"
              class="modal-product-else-item__button"
            >
              <UIIcon name="add" />
              В корзину
            </UIButton>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
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

.modal-product-else-item {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  padding: 5px;

  background: $white;
  border-radius: 20px;

  &__image {
    position: relative;

    width: 140px;
    height: 100px;

    border: 1px solid $grayBg;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 8px;
    left: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 47px;
    height: 19px;

    @include extra_small;
    font-weight: 600;

    background: $grayBg;
    border-radius: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-bottom: 9px;

    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__button {
    width: 135px;

    margin-top: 15px;

    font-weight: 500;
  }
}
</style>