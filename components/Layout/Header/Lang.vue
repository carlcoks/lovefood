<template>
  <div class="lang">
    <div class="lang__box">
      RU

      <img src="@/assets/images/flags/ru.png" alt="">
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.lang {
  position: relative;

  cursor: pointer;

  &__box {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 500;
    color: $grayText2;
  }
}
</style>