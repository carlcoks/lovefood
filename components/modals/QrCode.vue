<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="emits('close')"
  >
    <div class="modal-qr-code">
      <div class="modal-qr-code__header">
        <p class="modal-qr-code__title">
          Предъявите QR код кассиру
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-qr-code__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <div class="modal-qr-code__main">
        <img src="@/assets/images/qr-code.png" alt="">
      </div>

      <UIButton
        color="yellow"
        class="modal-qr-code__button"
        @click="closeModal()"
      >
        Готово
      </UIButton>
    </div>
  </ModalsOverlay>
</template>

<script setup>
const emits = defineEmits(['close'])

const isShow = ref(true)

const closeModal = () => {
  isShow.value = false
}
</script>

<style lang="scss" scoped>
.modal-qr-code {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 20px;

  background: $white;
  
  @include mq($bp-small) {
    min-height: auto;
    max-width: 450px;

    padding: 50px 60px;

    border-radius: 40px;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText;
      }
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: bold;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    font-weight: 500;
  }
}
</style>