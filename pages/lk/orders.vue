<template>
  <div class="page-lk-orders">
    <h2 class="page-lk-orders__title">
      История заказов
    </h2>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-orders {
  max-width: 766px;

  display: grid;
  grid-gap: 20px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }
}
</style>
