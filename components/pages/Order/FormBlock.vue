<template>
  <div class="page-order-form">
    <p class="page-order-form__title">
      Кто получит заказ?
    </p>

    <div class="page-order-form__row">
      <div class="page-order-form-input">
        <label
          for="name"
          class="page-order-form-input__label"
        >
          Имя
        </label>
        <input
          id="name"
          type="text"
          v-model="modelValue.name"
          placeholder="Введите имя"
          class="page-order-form-input__area"
        >
      </div>

      <div class="page-order-form-input">
        <label
          for="phone"
          class="page-order-form-input__label"
        >
          Номер телефона
        </label>
        <input
          id="phone"
          type="tel"
          v-maska
          data-maska="+7 (###) ###-##-##"
          v-model="modelValue.phone"
          placeholder="Введите номер телефона"
          class="page-order-form-input__area"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { vMaska } from 'maska'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['update:modelValue'])

const name = ref('')
const phone = ref('')
</script>

<style lang="scss" scoped>
.page-order-form {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
}

.page-order-form-input {
  display: grid;
  grid-gap: 12px;

  &__label {
    @include text_normal;
    font-weight: 500;
    color: $black;
  }

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg2;
    border: 1px solid $grayText2;
    border-radius: 14px;
  }
}
</style>