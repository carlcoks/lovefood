<template>
  <main class="page-order">
    <div class="container">
      <div class="page-order__box">
        <section class="page-order__section">
          <div class="page-order__content">
            <h1 class="page-order__title">
              Оформление заказа
            </h1>

            <div class="page-order__block">
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

              <transition name="fade" mode="out-in">
                <PagesOrderDeliveryBlock
                  v-if="deliveryType === 'delivery'"
                />
              </transition>

              <PagesOrderAddressBlock
                :delivery-type="deliveryType"
              />
            </div>

            <div class="page-order-form">
              <p class="page-order__subtitle">
                Кто получит заказ?
              </p>

              <div class="page-order-form__row">
                <UIInput
                  label="Имя"
                  value="Антон"
                  color="white"
                  disabled
                />
                <UIInput
                  label="Номер телефона"
                  value="+7 999 000 00 00"
                  color="white"
                  disabled
                />
              </div>
            </div>

            <div class="page-order-delivery-time">
              <p class="page-order__subtitle">
                Выберите время доставки
              </p>
              <div class="page-order-delivery-time__list">
                <div class="page-order-delivery-time__list-wrap">
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
            </div>

            <div class="page-order__row">
              <PagesOrderPromocodeBlock />

              <PagesOrderBonusBlock />
            </div>

            <PagesOrderPaymentsBlock />
          </div>

          <PagesOrderButtonsBlock class="page-order__buttons page-order__buttons--desktop" />
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

          <PagesOrderComposition />
        </aside>

        <PagesOrderButtonsBlock class="page-order__buttons page-order__buttons--mobile" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

const cart = useCartStore()
const common = useCommonStore()

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

const commonDeliveryType = computed(() => common.deliveryType)

onMounted(() => {
  if (commonDeliveryType.value) {
    deliveryType.value = commonDeliveryType.value
  }
})
</script>

<style lang="scss" scoped>
.page-order {
  padding: 60px 0;

  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    grid-gap: 40px;

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-around;
    }
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

  &__block {
    display: grid;
    flex-direction: column;
    grid-gap: 24px;
  }

  &__title {
    @include h2;
    color: $black;
  }

  &__subtitle {
    @include text_large;
    font-weight: 700;
  }

  &__row {
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 60px;
    }
  }

  &__aside {
    width: 100%;

    @include mq($bp-medium) {
      flex: 0 0 432px;
    }
  }

  &__buttons {
    &.page-order__buttons {
      &--desktop {
        display: none;

        @include mq($bp-medium) {
          display: flex;
        }
      }

      &--mobile {
        display: flex;

        @include mq($bp-medium) {
          display: none;
        }
      }
    }
  }
}

.page-order-form {
  display: grid;
  grid-gap: 24px;

  &__row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
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
    height: 48px;

    margin: 0 -16px;

    overflow: hidden;

    @include mq($bp-medium) {
      margin: 0;
    }
  }

  &__list-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 12px;

    padding: 0 16px 20px;

    overflow: auto;

    @include mq($bp-medium) {
      padding: 0;
    }
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

// Aside
.page-order-aside {
  display: flex;
  flex-direction: column;

  &__steps {
    &.page-order-aside__steps {
      display: none;
      
      @include mq($bp-medium) {
        display: flex;

        margin-bottom: 60px;
      }
    }
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
</style>
