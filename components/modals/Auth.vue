<template>
  <ModalsOverlay
    @close="closeModal()"
  >
    <div class="modal-auth">
      <div class="modal-auth__header">
        <p class="modal-auth__title">
          Вход на сайт
        </p>

        <a
          href="#"
          class="modal-auth__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>
      <p class="modal-auth__description">
        Укажите номер телефона, чтобы войти на сайт
      </p>

      <form
        class="modal-auth__form"
        @submit.prevent="onSubmit()"
      >
        <UIButton
          color="yellow"
          class="modal-auth__button"
        >
          Продолжить
        </UIButton>
      </form>
    </div>
  </ModalsOverlay>
</template>

<script setup>
const emits = defineEmits(['close'])

const closeModal = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
.modal-auth {
  width: 100vw;
  max-width: 442px;

  display: flex;
  flex-direction: column;

  padding: 50px 60px;

  background: $white;
  border-radius: 40px;

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
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
  }

  &__title {
    @include h2;
  }

  &__description {
    @include text_big;

    margin-bottom: 40px;
  }

  &__button {
    width: 100%;

    font-weight: 500;
  }
}
</style>
