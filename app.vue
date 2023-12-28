<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'
import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()
const commonStore = useCommonStore()

const setWindowStore = () => {
  // commonStore.isMobile = window.innerWidth < 700;
  commonStore.isMobileOrTablet = window.innerWidth < 992
  commonStore.isTablet = window.innerWidth < 992 && window.innerWidth >= 768

  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

onMounted(() => {
  setWindowStore()
  window.addEventListener('resize', setWindowStore)
})

catalogStore.getCatalog()
commonStore.getBanners()
</script>