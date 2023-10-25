<template>
  <div class="page-lk-promocodes">
    <h2 class="page-lk-promocodes__title">
      Мои промокоды
    </h2>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-promocodes {
  display: grid;
  grid-gap: 40px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }
}
</style>
