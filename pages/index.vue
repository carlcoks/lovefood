<template>
  <main class="main">
    <PagesIndexSlider />

    <PagesIndexBrands
      class="main__brands"
    />

    <PagesIndexMenu />
  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.main {
  padding: 40px 0;

  &__brands {
    margin-bottom: 60px;
  }
}
</style>
