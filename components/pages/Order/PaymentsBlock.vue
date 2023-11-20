<template>
  <div class="page-order-payments">
    <p class="page-order-payments__title">
      Способы оплаты
    </p>

    <div class="page-order-payments__list">
      <div class="page-order-payments__item">
        <UIRadio
          id="card"
          v-model="paymentType"
          value="card"
        >
          Картой при получении
        </UIRadio>
      </div>

      <div class="page-order-payments__item">
        <UIRadio
          id="cash"
          v-model="paymentType"
          value="cash"
        >
          Наличными при получении
        </UIRadio>

        <div
          v-if="paymentType === 'cash'"
          class="page-order-payments-block"
        >
          <p class="page-order-payments-block__label">
            С какой суммы подготовить сдачу?
          </p>
          <div class="page-order-payments-block__box">
            <div class="page-order-payments-block__prefix">
              Сдача с
            </div>
            <input
              type="text"
              value="5 000 ₽"
              class="page-order-payments-block__input"
            >
          </div>
        </div>
      </div>

      <div class="page-order-payments__item">
        <UIRadio
          id="online"
          v-model="paymentType"
          value="online"
        >
          Онлайн оплата
        </UIRadio>
      </div>
    </div>
  </div>
</template>

<script setup>
const paymentType = ref(null)
</script>

<style lang="scss" scoped>
.page-order-payments {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__list {
    display: grid;
    grid-gap: 16px;
  }
}

.page-order-payments-block {
  display: grid;
  grid-gap: 12px;

  margin: 16px 0 0 34px;

  width: 100%;
  max-width: 265px;

  &__label {
    @include text_normal;
    font-weight: 500;
    color: $grayText;
  }

  &__box {
    position: relative;
    width: 100%;
  }

  &__prefix {
    position: absolute;

    top: 0;
    left: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    @include text_normal;
    font-weight: 500;
    color: $grayText;

    padding: 0 14px 0 16px;

    z-index: 1;

    &:after {
      content: '';

      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;

      display: block;

      width: 2px;
      height: 20px;

      margin: auto;

      background: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }
  }

  &__input {
    width: 100%;
    height: 48px;

    padding: 12px 16px 12px 109px;

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
}
</style>