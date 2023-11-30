<template>
  <div class="page-lk-favorite">
    <h2 class="page-lk-favorite__title">
      Вам понравилось
    </h2>

    <div class="page-lk-favorite__list">
      <!-- <CommonProductCard
        v-for="i in 9"
        :key="i"
      /> -->
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-favorite {
  display: grid;
  grid-gap: 32px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px 17px;
  }
}
</style>
