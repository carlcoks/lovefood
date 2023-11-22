<template>
  <section class="index-menu">
    <div class="container">
      <PagesIndexMenuCategories
        id="categories" 
        @show-filters="isShowFilters = true"
        class="index-menu__categories"
      />

      <div class="index-menu__content">
        <div
          v-for="block in catalogStore.filteredCatalog"
          :key="block.id"
          :id="`block_${block.id}`"
          class="index-menu__block"
        >
          <h2 class="index-menu__title">
            {{ block.name }}
          </h2>

          <Swiper
            v-if="block.id === 140 || block.id === 16"
            :modules="[Navigation]"
            slides-per-view="auto"
            :breakpoints="{
              0: {
                spaceBetween: 15,
              },
              991: {
                spaceBetween: 30,
              }
            }"
            :navigation="{
              prevEl: block.id === 140 ? prev1 : prev2,
              nextEl: block.id === 140 ? next1 : next2,
            }"
            class="index-menu__slider"
          >
            <SwiperSlide
              v-for="product in block.products"
              :key="product.id"
              class="index-menu__slide"
            >
              <CommonProductCard
                :item="product"
                :is-promo="block.id === 140"
              />
            </SwiperSlide>

            <div :ref="block.id === 140 ? 'prev1' : 'prev2'" class="index-menu__arrow index-menu__arrow--prev">
              <UIIcon name="arrow" />
            </div>
            <div :ref="block.id === 140 ? 'next1' : 'next2'" class="index-menu__arrow index-menu__arrow--next">
              <UIIcon name="arrow" />
            </div>
          </Swiper>

          <div
            v-else
            class="index-menu__list"
          >
            <CommonProductCard
              v-for="product in block.products"
              :key="product.id"
              :item="product"
            />
          </div>
        </div>
      </div>
    </div>

    <ModalsFilters
      v-if="isShowFilters"
      @close="isShowFilters = false"
    />
  </section>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()

const isShowFilters = ref(false)

const prev1 = ref(null)
const next1 = ref(null)
const prev2 = ref(null)
const next2 = ref(null)
</script>

<style lang="scss" scoped>
@import 'swiper/css';

.index-menu {
  overflow: hidden;

  &__categories {
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__block {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    margin-bottom: 20px;

    @include mq($bp-small) {
      grid-gap: 30px;

      margin-bottom: 30px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;

    @include mq($bp-small) {
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 25px 15px;
    }
  }

  &__slider {
    width: 100%;

    overflow: visible;
  }

  &__slide {
    width: 212px;

    @include mq($bp-small) {
      width: 316px;
    }
  }

  &__arrow {
    display: none;

    @include mq($bp-small) {
      position: absolute;
      top: 144px;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 60px;
      height: 60px;

      background: $white;
      border-radius: 50%;
      box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.05);

      transition: opacity 0.3s;
      cursor: pointer;
      z-index: 1;

      ::v-deep(.ui-icon) svg {
        width: 40px;
        height: 40px;
      }

      &--prev {
        left: -30px;

        .ui-icon {
          transform: rotate(180deg);
        }
      }

      &--next {
        right: -30px;
      }

      &.swiper-button-lock {
        display: none;
      }
    }
  }
}
</style>