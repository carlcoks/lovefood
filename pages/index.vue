<template>
  <main class="index">
    <PagesIndexBanners
      class="index__banners"
    />

    <PagesIndexBrands
      class="index__brands"
    />

    <PagesIndexMenu />
  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.index {
  padding: 40px 0;

  &__banners, &__brands {
    margin-bottom: 60px;
  }
}
</style>
