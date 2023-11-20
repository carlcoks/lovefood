<template>
  <div class="page-order-promocode">
    <p class="page-order-promocode__title">
      Ввести промокод
    </p>

    <div class="page-order-promocode__box">
      <span class="page-order-promocode__icon">
        <UIIcon name="promocode" />
      </span>
      <input
        type="text"
        placeholder="Промокод"
        class="page-order-promocode__input"
      >

      <div class="page-order-promocode__actions">
        <button class="page-order-promocode__action">
          Применить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-order-promocode {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__box {
    position: relative;

    width: 100%;
  }

  &__icon {
    position: absolute;
    top: 12px;
    left: 16px;
    bottom: 12px;

    z-index: 1;
  }

  &__input {
    width: 100%;
    height: 48px;

    padding: 12px 16px 12px 52px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg2;
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

  &__actions {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    padding-right: 4px;

    &:before {
      content: '';

      display: block;

      width: 2px;
      height: 20px;

      background: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }
  }

  &__action {
    height: 100%;

    padding: 0 16px;

    @include text_normal;
    font-weight: 500;
    color: $grayText;

    background: none;
    border: none;
  }
}
</style>