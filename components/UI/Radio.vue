<template>
  <label class="radio">
    <input
      type="radio"
      class="radio__input"
    >
    <span
      class="radio__box"
    />
    <span class="radio__text">
      <slot />
    </span>
  </label>
</template>

<script setup>
// defineProps({

// })
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  grid-gap: 10px;

  cursor: pointer;

  &__input {
    display: none;

    &:checked + .radio__box {
      &:after {
        opacity: 1;
      }
    }
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    border: 1px solid $grayText2;
    border-radius: 50%;

    &:after {
      content: '';

      width: 16px;
      height: 16px;

      background: $grayText2;
      border-radius: 50%;

      transition: opacity 0.3s;
      opacity: 0;
    }
  }

  &__text {
    color: $black;
    font-weight: 500;
  }
}
</style>
