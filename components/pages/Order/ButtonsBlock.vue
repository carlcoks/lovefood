<template>
  <div class="page-order-buttons">
    <UIButton
      color="gray"
      class="page-order-buttons__button page-order-buttons__button--back"
    >
      <UIIcon
        name="arrow"
        class="page-order-buttons__arrow"
      />
      Назад в корзину
    </UIButton>

    <UIButton
      color="yellow"
      class="page-order-buttons__button page-order-buttons__button--order"
    >
      <span>
      Оформить заказ
      </span>
      {{ cart.cartItemsPrice.toLocaleString() }} ₽
    </UIButton>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cart = useCartStore()
</script>

<style lang="scss" scoped>
.page-order-buttons {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    width: 100%;
    font-weight: 600;

    @include mq($bp-medium) {
      width: auto;
    }

    &--back {
      display: none;

      @include mq($bp-medium) {
        display: flex;
      }
    }
    
    &--order {
      grid-gap: 40px;
      justify-content: space-between;

      span {
        font-weight: 500;
      }
    }
  }

  &__arrow {
    transform: rotate(180deg);
  }
}
</style>