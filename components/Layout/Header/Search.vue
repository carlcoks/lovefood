<template>
  <div class="header-search">
    <span class="header-search__icon">
      <UIIcon name="loop" />
    </span>

    <input
      type="text"
      placeholder="Поиск"
      class="header-search__input"
    >
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

  &__input {
    width: 100%;
    height: 48px;

    padding-left: 49px;

    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.16px;

    background: $grayBg;
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: $grayText;
    }
    &:-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &::-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: $grayText;
    }
    &::-ms-input-placeholder {
      color: $grayText;
    }
    &::placeholder {
      color: $grayText;
    }
  }
}
</style>
