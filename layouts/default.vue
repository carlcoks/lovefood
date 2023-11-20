<template>
  <div class="layout-default">
    <LayoutHeader />

    <slot />

    <LayoutFooter />

    <LazyModalsProduct
      v-if="catalog.isShowProductModal"
    />

    <LazyModalsCart
      v-if="isShowCart"
    />
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'

const catalog = useCatalogStore()
const cart = useCartStore()

const isShowCart = computed(() => cart.isShowCart)
</script>

<style lang="scss" scoped>
.layout-default {
  padding-top: 146px;

  @include mq($bp-small) {
    padding-top: 80px;
  }
}
</style>