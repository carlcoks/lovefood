<template>
  <div class="header-search">
    <span class="header-search__icon">
      <UIIcon name="loop" />
    </span>

    <UIInput
      placeholder="Поиск"
      class="header-search__field"
    />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header-search {
  position: relative;
  width: 100%;

  &__icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }

  &__field {
    font-weight: 500;

    ::v-deep input {
      padding-left: 49px;

      background: $grayBg;
    }
  }
}
</style>
