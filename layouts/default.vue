<template>
  <div class="layout-default">
    <LayoutHeader />

    <slot />

    <LayoutFooter />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.layout-default {
  padding-top: 80px;
}
</style>