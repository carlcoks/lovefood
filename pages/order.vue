<template>
  <main class="page-order">
    <div class="container">
      <div class="page-order__box">
        <section class="page-order__section">
          <div class="page-order__content">
            <h1 class="page-order__title">
              Оформление заказа
            </h1>

            <div class="page-order-delivery-types">
              <button
                v-for="(item, i) in deliveryTypes"
                :key="i"
                :class="['page-order-delivery-type', { 'active' : item.type === deliveryType }]"
                @click.prevent="deliveryType = item.type"
              >
                <UIIcon :name="item.type" />
                {{ item.label }}
              </button>
            </div>

            <div class="page-order-form">
              <div class="page-order-form__line">
                <p class="page-order-form__label">
                  Имя
                </p>
                <div class="page-order-form__value">
                  <UIInput
                    value="Антон"
                    color="white"
                  />
                  <UIIcon
                    name="pencil"
                    class="page-order-form__icon"
                  />
                </div>
              </div>
              <div class="page-order-form__line">
                <p class="page-order-form__label">
                  Номер телефона
                </p>
                <div class="page-order-form__value">
                  <UIInput
                    disabled
                    value="+7 999 000 00 00"
                    color="white"
                  />
                </div>
              </div>
              <div class="page-order-form__line">
                <p class="page-order-form__label">
                  E-mail
                </p>
                <div class="page-order-form__value">
                  <UIInput
                    disabled
                    value="Huhbu729@gmail.com"
                    color="white"
                  />
                </div>
              </div>
              <div class="page-order-form__line">
                <p class="page-order-form__label">
                  Адрес доставки
                </p>
                <div class="page-order-form__value">
                  <UIInput
                    value="г. Москва, ул. Стандартная, 21к1"
                    color="white"
                  />
                  <UIIcon
                    name="pencil"
                    class="page-order-form__icon"
                  />
                </div>
              </div>
              <div class="page-order-form__line">
                <p class="page-order-form__label">
                  Комментарий курьеру
                </p>
                <div class="page-order-form__value">
                  <UITextarea
                    value="Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации систем массового участия."
                    color="white"
                  />
                  <UIIcon
                    name="pencil"
                    class="page-order-form__icon"
                  />
                </div>
              </div>
            </div>

            <div class="page-order-delivery-time">
              <p class="page-order__subtitle">
                Выберите время доставки
              </p>
              <div class="page-order-delivery-time__list">
                <button
                  v-for="(item, i) in deliveryTimes"
                  :key="i"
                  :class="['page-order-delivery-time__button', { 'active' : i === deliveryTime}]"
                  @click.prevent="deliveryTime = i"
                >
                  {{ item }}
                </button>
              </div>
            </div>

            <div class="page-order-promocode">
              <p class="page-order__subtitle">
                Ввести промокод
              </p>
              <UIInput
                placeholder="Промокод"
                class="page-order-promocode__field"
              />
            </div>

            <div class="page-order-payments">
              <p class="page-order__subtitle">
                Способы оплаты
              </p>
              <div class="page-order-payments__list">
                <UIRadio>
                  Картой при получении
                </UIRadio>
                <UIRadio>
                  Наличными при получении
                </UIRadio>
                <UIRadio>
                  Онлайн оплата
                </UIRadio>
              </div>
            </div>
          </div>

          <div class="page-order__buttons">
            <UIButton
              color="gray"
              class="page-order__button"
            >
              <UIIcon
                name="arrow"
                class="page-order__button-arrow"
              />
              Назад в корзину
            </UIButton>

            <UIButton
              color="yellow"
              class="page-order__button page-order__button--order"
            >
              <span>
              Оформить заказ
              </span>
              223 500 ₽
            </UIButton>
          </div>
        </section>

        <aside class="page-order__aside page-order-aside">
          <div class="page-order-steps page-order-aside__steps">
            <div class="page-order-step active">
              <div class="page-order-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-step__label">
                Корзина
              </p>
            </div>
            <div class="page-order-step active">
              <div class="page-order-step__number">
                2
              </div>
              <p class="page-order-step__label">
                Оформление заказа
              </p>
            </div>
            <div class="page-order-step">
              <div class="page-order-step__number">
                3
              </div>
              <p class="page-order-step__label">
                Заказ принят
              </p>
            </div>
          </div>

          <div class="page-order-composition">
            <p class="page-order__subtitle">
              Состав заказа
            </p>
            <ul class="page-order-composition__list">
              <li class="page-order-composition__item">
                <p class="page-order-composition__label">
                  Название блюда
                </p>
                <p class="page-order-composition__value">
                  1 680 ₽
                </p>
              </li>
              <li class="page-order-composition__item">
                <p class="page-order-composition__label">
                  Название блюда
                </p>
                <p class="page-order-composition__value">
                  1 680 ₽
                </p>
              </li>
              <li class="page-order-composition__item">
                <p class="page-order-composition__label">
                  Название блюда
                  <small>
                    Морская капуста. креветки, брокколи
                  </small>
                </p>
                <p class="page-order-composition__value">
                  1 680 ₽
                </p>
              </li>
              <li class="page-order-composition__item">
                <p class="page-order-composition__label">
                  Пицца 35 см
                </p>
                <p class="page-order-composition__value">
                  0 ₽
                </p>
              </li>
            </ul>
            <div class="page-order-composition__divider" />
            <ul class="page-order-composition__list">
              <li class="page-order-composition__item">
                <p class="page-order-composition__value">
                  3 товара
                </p>
                <p class="page-order-composition__value">
                  1 680 ₽
                </p>
              </li>
              <li class="page-order-composition__item">
                <p class="page-order-composition__value">
                  Начислим баллов
                  <UIIcon name="info" />
                </p>
                <p class="page-order-composition__value page-order-composition__value--bonuses">
                  + 234
                  <UIIcon name="bonuses" />
                </p>
              </li>
              <li class="page-order-composition__item">
                <p class="page-order-composition__value">
                  Доставка
                  <UIIcon name="info" />
                </p>
                <p class="page-order-composition__value">
                  Бесплатно
                </p>
              </li>
            </ul>
            <div class="page-order-composition__divider" />
            <ul class="page-order-composition__list">
              <li class="page-order-composition__item">
                <p class="page-order-composition__value">
                  Сумма заказа
                </p>
                <p class="page-order-composition__value">
                  3 680 ₽
                </p>
              </li>
            </ul>
          </div>

          <div class="page-order-gift page-order-aside__gift">
            <a
              href="#"
              rel="nofollow"
              class="page-order-gift__close"
            >
              <UIIcon name="close" />
            </a>
            <div
              class="page-order-gift__image"
            >
              <img src="@/assets/images/menu-card-example.png" alt="">
              <div class="page-order-gift__icon">
                <UIIcon name="gift" />
              </div>
            </div>
            <div class="page-order-gift__content">
              <p class="page-order-gift__title">
                Пицца 35 см в подарок!
              </p>
              <p class="page-order-gift__text">
                Вы выбрали 1 подарок из предложенных вариантов
              </p>
              <UIButton
                color="gray"
                size="small"
                class="page-order-gift__button"
              >
                Изменить выбор
              </UIButton>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
const deliveryTypes = [
  { label: 'Доставка', type: 'delivery' },
  { label: 'Самовывоз', type: 'pickup' },
  { label: 'В зале', type: 'lounge' },
]

const deliveryTimes = [
  'Ближайшее время: 38 минут',
  '15:00-15:30',
  '15:30-16:00',
  '16:00-16:30',
  'Другое время',
]

const deliveryType = ref('delivery')
const deliveryTime = ref(1)
</script>

<style lang="scss" scoped>
.page-order {
  padding: 60px 0;

  &__box {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    grid-gap: 40px;
  }

  &__section {
    flex: 1 1 auto;
    max-width: 767px;

    display: flex;
    flex-direction: column;
    grid-gap: 60px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &__title {
    @include h2;
    color: $black;
  }

  &__subtitle {
    @include text_large;
    font-weight: 700;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button {
    font-weight: 600;
    
    &--order {
      grid-gap: 40px;

      span {
        font-weight: 500;
      }
    }
  }

  &__button-arrow {
    transform: rotate(180deg);
  }

  &__aside {
    flex: 0 0 432px;
  }
}

.page-order-form {
  display: grid;
  grid-gap: 16px;

  &__line {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__label {
    padding-top: 15px;

    @include text_normal;
    font-weight: 500;
    color: $black;
  }

  &__value {
    position: relative;

    width: 100%;
    max-width: 560px;

    font-weight: 500;
  }

  &__icon {
    position: absolute;

    top: 16px;
    right: 15px;
  }
}

.page-order-delivery-types {
  width: 100%;
  
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  padding: 5px;

  background: $grayBg2;
  border-radius: 20px;
}

.page-order-delivery-type {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  padding: 12px 15px;
  color: $grayText;
  font-weight: 600;

  background: none;
  border-radius: 14px;
  border: 0;

  transition: color 0.3s, background-color 0.3s;

  &.active {
    color: $blackText;
    background: $yellow;
  }
}

.page-order-delivery-time {
  display: grid;
  grid-gap: 24px;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 12px;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 48px;

    padding: 12px 12px;

    @include text_normal;
    font-weight: 500;
    color: $blackText2;

    white-space: nowrap;

    background: $grayBg2;
    border: 1px solid $grayBg2;
    border-radius: 10px;

    transition: background-color 0.3s, border-color 0.3s;

    &.active {
      color: $blackText;
      background: $white;
      border-color: $yellow;
    }
  }
}

.page-order-promocode {
  display: grid;
  grid-gap: 24px;

  &__field {
    max-width: 436px;

    font-weight: 500;
  }
}

.page-order-payments {
  display: grid;
  grid-gap: 24px;

  &__list {
    display: grid;
    grid-gap: 16px;
  }
}

// Aside
.page-order-aside {
  display: flex;
  flex-direction: column;

  &__steps {
    margin-bottom: 60px;
  }

  &__gift {
    margin-top: 32px;
  }
}

.page-order-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 33px;
}

.page-order-step {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 6px;

  color: $grayText;

  &:before {
    content: '';
    position: absolute;
    top: 24px;
    right: calc(50% + 24px);

    width: 120px;

    border: 1px dashed $grayText;
  }

  &:first-child {
    &:before {
      display: none;
    }
  }

  &.active {
    color: $black;

    &:before {
      border-style: solid;
    }

    .page-order-step {
      &__number {
        border-color: $black;
      }
    }
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    @include text_large;
    font-weight: 700;

    background: $white;
    border: 1px solid $grayText;
    border-radius: 50%;
    z-index: 1;
  }
  
  &__label {
    @include text_mini;
    font-weight: 600;
  }
}

.page-order-composition {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 40px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    color: $black;
    font-weight: 500;

    small {
      @include text_mini;
    }
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    font-weight: 600;

    &--bonuses {
      grid-gap: 6px;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: $grayText2;
  }
}

.page-order-gift {
  position: relative;

  display: flex;
  align-items: flex-start;
  grid-gap: 20px;

  padding: 5px 10px 5px 5px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &__close {
    position: absolute;
    top: 9px;
    right: 10px;

    ::v-deep(.ui-icon) svg {
      width: 18px;
      height: 18px;

      path {
        fill: $grayText2;
      }
    }
  }

  &__image {
    position: relative;

    flex: 0 0 auto;
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 0;

    padding: 4px;

    background: $white;
    border-radius: 0px 0px 0px 9px;
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__text {
    max-width: 260px;

    margin-bottom: 10px;

    @include overflow-multi-text(2);
    @include text_mini;
    color: $grayText;
  }

  &__button {
    width: 100%;

    font-weight: 600;
  }
}
</style>
