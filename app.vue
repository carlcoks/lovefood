<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

const catalog = useCatalogStore()

await catalog.getCatalog()
</script>