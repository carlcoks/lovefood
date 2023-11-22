<template>
  <UIButton
    class="header-cart"
    color="yellow"
    @click.prevent="cartStore.toggleShowCartModal(true)"
  >
    <UIIcon name="cart" />

    <span
      v-if="cartItemsLength"
      class="header-cart__value"
    >
      {{ cartItemsLength }}
      <span />
      {{ cartItemsPrice.toLocaleString() }} ₽
    </span>
    <template v-else>
      Корзина
    </template>
  </UIButton>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()

const { cartItemsLength, cartItemsPrice } = storeToRefs(cartStore)
</script>

<style lang="scss" scoped>
.header-cart {
  font-weight: 500;

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    span {
      width: 2px;
      height: 20px;
      background: rgba(0, 0, 0, 0.30);
      border-radius: 20px;
    }
  }
}
</style>