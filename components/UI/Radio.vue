<template>
  <label
    :for="id"
    class="radio"
  >
    <input
      :id="id"
      type="radio"
      :value="value"
      :checked="isChecked"
      class="radio__input"
      @change="$emit('update:modelValue', $event.target.value)"
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
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  modelValue: {
    type: undefined,
    default: '',
  },
  value: {
    type: undefined,
    default: '',
  },
})

const isChecked = computed(() => {
  return props.modelValue === props.value
})
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
      border-color: $yellow;

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

    border: 2px solid $grayText2;
    border-radius: 50%;

    &:after {
      content: '';

      width: 16px;
      height: 16px;

      background: $yellow;
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
