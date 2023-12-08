<template>
  <div class="page-order-composition">
    <div class="page-order-composition__header">
      <p class="page-order-composition__title">
        Состав заказа
      </p>

      <button
        type="button"
        class="page-order-composition__edit"
        @click.prevent="cartStore.toggleShowCartModal(true)"
      >
        Изменить
      </button>
    </div>
    <ul class="page-order-composition__list">
      <PagesOrderCompositionProduct
        v-for="(item, i) in cartStore.cartItems"
        :key="i"
        :item="item"
      />
    </ul>

    <div class="page-order-composition__divider" />

    <ul class="page-order-composition__list">
      <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          {{ cartStore.cartItemsLength }} {{ declOfNum(cartStore.cartItemsLength, ['товар', 'товара', 'товаров']) }}
        </p>
        <p class="page-order-composition__value">
          {{ cartStore.cartItemsPrice.toLocaleString() }} ₽
        </p>
      </li>
      <!-- <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Списание баллов
        </p>
        <p class="page-order-composition__value page-order-composition__value--bonuses">
          0
          <UIIcon name="bonuses" />
        </p>
      </li> -->
      <!-- <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Доставка
          <UIIcon name="info" />
        </p>
        <p class="page-order-composition__value">
          Бесплатно
        </p>
      </li> -->
    </ul>

    <div class="page-order-composition__divider" />

    <ul class="page-order-composition__list">
      <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Сумма заказа
        </p>
        <p class="page-order-composition__value">
          {{ cartStore.cartItemsPrice.toLocaleString() }} ₽
        </p>
      </li>
      <!-- <li class="page-order-composition__item">
        <p class="page-order-composition__value">
          Начислим баллов
          <UIIcon name="info" />
        </p>
        <p class="page-order-composition__value page-order-composition__value--bonuses">
          0
          <UIIcon name="bonuses" />
        </p>
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

import declOfNum from '@/utils/declOfNum'

const cartStore = useCartStore()
</script>

<style lang="scss" scoped>
.page-order-composition {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 20px;

  background: $grayBg2;
  border-radius: 20px;
  
  @include mq($bp-medium) {
    padding: 40px;
    
    background: $white;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
  }

  &__header {
    display: none;

    @include mq($bp-medium) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__edit {
    @include text_normal;
    font-weight: 500;
    color: $grayText;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    color: $black;
    font-weight: 500;

    small {
      @include text_mini;
    }
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    font-weight: 600;

    &--bonuses {
      grid-gap: 6px;

      ::v-deep(.ui-icon) svg path {
        fill: $orange;
      }
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: $grayText2;
  }
}
</style>