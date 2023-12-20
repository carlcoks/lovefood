<template>
  <div class="pages-lk-promocodes-item">
    {{ item }}
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
.pages-lk-promocodes-item {

}
</style>