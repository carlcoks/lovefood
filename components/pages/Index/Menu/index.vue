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
          v-for="block in filteredCatalog"
          :key="block.id"
          :id="`block_${block.id}`"
          class="index-menu__block"
        >
          <h2 class="index-menu__title">
            {{ block.name }}
          </h2>
          <div class="index-menu__list">
            <CommonProductCard
              v-for="product in block.products"
              :key="product.id"
              :item="product"
              :is-promo="block.id === 140"
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
import { useCatalogStore } from '@/store/catalog'
import { useCommonStore } from '@/store/common'

const catalog = useCatalogStore()
const common = useCommonStore()

const isShowFilters = ref(false)

const selectedLocation = computed(() => common.selectedLocation)

const filteredCatalog = computed(() => {
  if (selectedLocation.value) {
    return catalog.catalog.map(item => {
      return {
        ...item,
        products: item.products.filter(product => {
          const isset = product.locations.find(location => +location.id === +selectedLocation.value.warehouse_id)
          if (isset) {
            return true
          } else {
            return false
          }
        })
      }
    })
  }

  return catalog.catalog
})
</script>

<style lang="scss" scoped>
.index-menu {
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
}
</style>