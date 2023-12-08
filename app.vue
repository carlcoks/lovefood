<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

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