<template>
  <div class="page-lk-promocodes">
    <h2 class="page-lk-promocodes__title">
      Мои промокоды
    </h2>

    <div class="page-lk-promocodes__list">
      <div class="page-lk-promocodes-item">

      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-promocodes {
  display: grid;
  grid-gap: 20px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }
}

.page-lk-promocodes-item {
  padding: 20px 0;
}
</style>
