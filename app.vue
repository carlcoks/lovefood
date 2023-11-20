<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCommonStore } from '@/store/common'

const catalogStore = useCatalogStore()
const commonStore = useCommonStore()

await catalogStore.getCatalog()

commonStore.getLocations()

const setWindowStore = () => {
  // commonStore.isMobile = window.innerWidth < 700;
  commonStore.isMobileOrTablet = window.innerWidth < 992
  commonStore.isTablet = window.innerWidth < 992 && window.innerWidth >= 768
}

onMounted(() => {
  setWindowStore()
  window.addEventListener('resize', setWindowStore)
})
</script>