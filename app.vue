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

const catalog = useCatalogStore()
const common = useCommonStore()

await catalog.getCatalog()

common.getLocations()
</script>