<template>
  <div class="page-lk-coupons">
    <h2 class="page-lk-coupons__title">
      Мои промокоды
    </h2>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-coupons {
  display: grid;
  grid-gap: 40px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }
}
</style>
