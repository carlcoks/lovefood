<template>
  <ModalsOverlay
    position="right"
    :offset="0"
    @close="closeModal()"
  >
    <div class="modal-cart modal-cart--empty">
      <a
        href="#"
        class="modal-cart__close"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>
      
      
      <div class="modal-cart-empty">
        <div class="modal-cart-empty__header">
          <UIIcon name="cart-empty" />
          <p class="modal-cart__title">
            Ой, пока пусто!
          </p>
        </div>
        <div class="modal-cart-empty__content">
          <p class="modal-cart-empty__label">
            Хотите повоторить предыдущий заказ?
          </p>
          <UIButton
            color="yellow"
            class="modal-cart-empty__button"
          >
            Повторить
          </UIButton>
        </div>
      </div>
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
.modal-cart {
  width: 512px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 40px 0 0 40px;
  background: $grayBg;

  &--empty {
    justify-content: center;
  }

  &__close {
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__title {
    @include h2;
  }
}

.modal-cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 40px;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 23px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;

    width: 292px;

    padding: 30px 40px;

    text-align: center;

    background: $white;
    border-radius: 20px;
  }

  &__label {
    @include text_big;
    font-weight: 600;
    color: $black;
  }

  &__button {
    width: 100%;

    font-weight: 500;
  }
}
</style>