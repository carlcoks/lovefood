<template>
  <div class="header-restaurant">
    <div class="header-restaurant__box">
      <UIIcon name="clock-orange" />
      Ресторан сейчас закрыт
    </div>

    <UIIcon name="arrow" />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header-restaurant {
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 300px;
  height: 48px;

  padding: 12px 15px;

  color: $orange;

  @include text_normal;
  font-weight: 500;
  
  background: rgba(255, 102, 0, 0.11);
  border-radius: 14px;
  border: 1px solid var(--sign-sale, #F60);

  .ui-icon {
    ::v-deep svg path {
      fill: $orange;
    }
  }

  &__box {
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }
}
</style>