<template>
  <div class="modal-receipt-delivery">
    <div class="modal-receipt-delivery__main">
      <div class="modal-receipt-delivery__header">
        <p class="modal-receipt-delivery__title">
          Укажите адрес доставки
        </p>

        <!-- <p class="modal-receipt-delivery__location">
          <UIIcon name="location" />
          Москва
        </p> -->
      </div>

      <div class="modal-receipt-delivery-form">
        <div class="modal-receipt-delivery-form__header">
          <p class="modal-receipt-delivery-form__label">
            Город, улица, дом
          </p>

          <!-- <p class="modal-receipt-delivery-form__navigate">
            <UIIcon
              name="navigate"
            />
            определить
          </p> -->
        </div>
        <div class="modal-receipt-delivery-form__lines">
          <div class="modal-receipt-delivery-form__line">
            <UIInput
              v-model="address"
              placeholder="Адрес"
              color="gray"
            />
          </div>
          <div class="modal-receipt-delivery-form__line modal-receipt-delivery-form__line--cols">
            <UIInput
              placeholder="Кв/офис"
              color="gray"
            />
            <UIInput
              placeholder="Подъезд"
              color="gray"
            />
            <UIInput
              placeholder="Этаж"
              color="gray"
            />
            <UIInput
              placeholder="Домофон"
              color="gray"
            />
          </div>
          <div class="modal-receipt-delivery-form__line">
            <UITextarea
              placeholder="Комментарий курьеру"
              color="gray"
              class="modal-receipt-delivery-form__textarea"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="modal-receipt-delivery__footer">
      <div class="modal-receipt-delivery__info modal-receipt-delivery-info">
        <div class="modal-receipt-delivery-info__icon">
          <UIIcon name="delivery" />
        </div>
        <div class="modal-receipt-delivery-info__content">
          <div class="modal-receipt-delivery-info__line">
            <p class="modal-receipt-delivery-info__value">
              Доставка
            </p>
            <p class="modal-receipt-delivery-info__value">
              40-50 мин
            </p>
          </div>
          <div class="modal-receipt-delivery-info__line">
            <p class="modal-receipt-delivery-info__value">
              250 ₽
            </p>
            <p class="modal-receipt-delivery-info__value modal-receipt-delivery-info__value--green">
              Бесплатно от 1200 ₽
            </p>
          </div>
        </div>
      </div>

      <UIButton
        disabled
        color="yellow"
        class="modal-receipt-delivery__button"
      >
        Подтвердить
      </UIButton>
    </div>
  </div>
</template>

<script setup>
const address = ref('')

// watch(() => address.value, (text) => {
//   if (text) {
//     startSearch()
//   }
// })

// const startSearch = async () => {
//   const data = await ymaps3.search({
//     text: [61.295738462230666, 55.165532432072844],
//     type: ['toponyms']
//   })
// }
</script>

<style lang="scss" scoped>
.modal-receipt-delivery {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 30px;

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__location {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_mini;
    font-weight: 600;
    color: $grayText;

    cursor: pointer;

    .ui-icon {
      width: 20px;
      height: 20px;

      ::v-deep svg path {
        fill: $grayText;
      }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding-top: 4px;

    border-top: 1px solid $grayText2;
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-receipt-delivery-form {
  display: flex;
  flex-direction: column;
  grid-gap: 14px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include text_small;
    font-weight: 500;
  }

  &__label {
    color: $grayText;
  }

  &__navigate {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    cursor: pointer;

    .ui-icon {
      width: 18px;
      height: 18px;

      ::v-deep svg path {
        fill: $orange;
      }
    }
  }

  &__lines {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    font-weight: 500;
  }

  &__line {
    &--cols  {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 18px;
    }
  }

  &__textarea {
    ::v-deep textarea {
      height: 80px;
    }
  }
}

.modal-receipt-delivery-info {
  display: flex;
  align-items: center;
  grid-gap: 16px;

  padding: 12px 16px;

  border-radius: 20px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background: $grayBg2;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__value {
    display: flex;
    align-items: center;

    @include text_small;
    font-weight: 500;

    &:last-child {
      &:after {
        display: none;
      }
    }

    &:after {
      content: '';

      width: 3px;
      height: 3px;

      margin: 0 5px;

      background: $grayText;
      border-radius: 50%;

      opacity: 0.3;
    }

    &--green {
      color: $green;
    }
  }
}
</style>