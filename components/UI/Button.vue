<template>
  <button
    :type="type"
    :class="[
      'button',
      color ? `button--${color}` : ''
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  min-width: 105px;
  height: 48px;

  padding: 12px 15px;

  @include text_normal;
  font-weight: 500;

  background: none;
  border: 0;
  border-radius: 14px;

  &--yellow {
    background: $yellow;
  }

  &--gray {
    background: $grayBg;
  }
}
</style>
