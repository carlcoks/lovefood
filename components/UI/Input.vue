<template>
  <div class="input">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'input__area',
        color ? `input__area--${color}` : ''
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: undefined,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.input {
  width: 100%;

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 15px;

    @include text_normal;
    font-weight: inherit;

    background: $grayBg2;
    border-radius: 14px;

    &--white {
      background: $white;
      border: 1px solid $grayText2;
    }

    &--gray {
      background: $grayBg;
    }

    &:disabled {
      background: $grayBg2;
    }

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
