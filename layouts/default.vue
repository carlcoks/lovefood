<template>
  <div :class="['layout-default', { 'layout-default--index' : route.fullPath === '/' }]">
    <LayoutHeader />

    <slot />

    <LayoutFooter />

    <LazyModalsProduct
      v-if="isShowProductModal"
    />

    <LazyModalsCart
      v-if="isShowCartModal"
    />

    <LazyModalsReceipt
      v-if="isShowReceiptModal"
    />

    <LazyModalsAuth
      v-if="isShowAuthModal"
    />

    <LazyModalsSettings
      v-if="isShowSettingsModal"
    />

    <LazyModalsAcceptCity
      v-if="isShowAcceptCityModal"
    />
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

const catalogStore = useCatalogStore()
const { isShowProductModal } = storeToRefs(catalogStore)

const cartStore = useCartStore()
const commonStore = useCommonStore()

const route = useRoute()

const isShowCartModal = computed(() => cartStore.isShowCartModal)

const isShowReceiptModal = computed(() => commonStore.isShowReceiptModal)
const isShowAuthModal = computed(() => commonStore.isShowAuthModal)
const isShowSettingsModal = computed(() => commonStore.isShowSettingsModal)
const isShowAcceptCityModal = computed(() => commonStore.isShowAcceptCityModal)
</script>

<style lang="scss" scoped>
.layout-default {
  padding-top: 70px;
  
  @include mq($bp-medium) {
    padding-top: 80px;
  }
  
  &--index {
    padding-top: 146px;

    @include mq($bp-medium) {
      padding-top: 80px;
    }
  }
}
</style>