<template>
  <component
    :is="component"
    :to="to"
    :type="type"
    :class="[
      'button',
      color ? `button--${color}` : '',
      size ? `button--${size}` : '',
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
import { NuxtLink } from '#components'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
})

const component = computed(() => {
  if (props.to) {
    return NuxtLink
  }

  return 'button'
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

  background: none;
  border: 0;
  border-radius: 14px;

  transition: background-color 0.3s;

  &--small {
    height: 32px;

    font-size: 14px;

    padding: 6px 15px;
  }

  &--yellow {
    background: $yellow;
  }

  &--yellow-light {
    background: $yellowLight;
  }

  &--gray {
    background: $grayBg;

    &:hover {
      background: $grayBg2;
    }
  }

  &--orange {
    color: $white;
    background: $orange;
  }
}
</style>
