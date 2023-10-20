<template>
  <div class="modal">
    <div class="modal__overlay" />

    <div
      :class="`modal__box modal__box--${position}`"
      @click.self="onClickOverlay()"
    >
      <div
        class="modal__wrap"
        @click.self="onClickOverlay()"
      >
        <div
          class="modal__content"
          :style="offset ? `margin: ${offset}px auto` : ''"
          @click.self="onClickOverlay()"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  position: {
    type: String,
    default: 'center',
  },
  offset: {
    type: Number,
    default: 20,
  },
})

const emits = defineEmits(['close'])

const onClickOverlay = () => {
  emits('close')
}

onMounted(() => {
  document.body.style = 'overflow: hidden'
})

onBeforeUnmount(() => {
  document.body.style = ''
})
</script>

<style lang="scss" scoped>
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.30);
    z-index: 2000;
  }

  &__box {
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    text-align: center;
    white-space: nowrap;
    z-index: 2001;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__wrap {
    position: relative;
    height: 100%;

    &:after {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 100%;
      content: '';
    }
  }

  &__content {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    white-space: normal;
    text-align: left;
  }
}
</style>
