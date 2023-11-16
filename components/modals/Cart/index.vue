<template>
  <ModalsOverlay
    :is-show="isShow"
    position="right"
    :offset="0"
    name="cart"
    @close="emits('close')"
  >
    <div
      :class="[
        'modal-cart',
        { 'modal-cart--empty' : !cart.cartItems.length }
      ]"
    >
      <a
        href="#"
        class="modal-cart__close"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>
      
      <div
        v-if="cart.cartItems.length"
        class="modal-cart__main"
      >
        <div class="modal-cart__header">
          <div class="modal-cart__top">
            <p class="modal-cart__title">
              Корзина
            </p>

            <button
              class="modal-cart__clear"
              @click.prevent="clearCart()"
            >
              <UIIcon name="close" />
              Очистить
            </button>
          </div>
          <p class="modal-cart__count">
            {{ cart.cartItemsLength }} товара на <span>{{ cart.cartItemsPrice }} ₽</span>
          </p>
        </div>

        <div class="modal-cart__content">
          <ModalsCartProduct
            v-for="(item, i) in cart.cartItems"
            :key="i"
            :item="item"
          />
        </div>

        <div class="modal-cart__footer">
          <form
            class="modal-cart-promocode"
            @submit.prevent
          >
            <UIIcon
              name="promocode"
              class="modal-cart-promocode__icon"
            />
            <input
              type="text"
              placeholder="Промокод"
              class="modal-cart-promocode__input"
            >
            <span class="modal-cart-promocode__divider" />
            <button
              type="submit"
              class="modal-cart-promocode__button"
            >
              Применить
            </button>
          </form>

          <div class="modal-cart-delivery">
            <div class="modal-cart-delivery__icon">
              <UIIcon name="delivery" />
            </div>
            <div class="modal-cart-delivery__list">
              <div class="modal-cart-delivery__line">
                <p class="modal-cart-delivery__value">
                  Доставка
                </p>
                <p class="modal-cart-delivery__value">
                  40-50 мин
                </p>
              </div>
              <div class="modal-cart-delivery__line">
                <p class="modal-cart-delivery__value">
                  250 ₽
                </p>
                <p class="modal-cart-delivery__value modal-cart-delivery__value--gray">
                  До бесплатной 550 ₽
                </p>
              </div>
            </div>
          </div>

          <UIButton
            color="yellow"
            class="modal-cart-order-btn"
          >
            Перейти к оформлению
            <span class="modal-cart-order-btn__price">
              <small v-if="+cart.cartItemsRegularPrice !== +cart.cartItemsPrice">
                {{ cart.cartItemsRegularPrice.toLocaleString() }} ₽
              </small>
              {{ cart.cartItemsPrice.toLocaleString() }} ₽
            </span>
          </UIButton>
        </div>
      </div>

      <ModalsCartEmptyBlock v-else />
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

const emits = defineEmits(['close'])

const isShow = ref(true)

const closeModal = () => {
  isShow.value = false
}

const clearCart = () => {
  cart.clearCart()
}
</script>

<style lang="scss" scoped>
.modal-cart {
  width: 512px;
  height: 100vh;

  display: flex;
  flex-direction: column;

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

  &__main {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding: 40px 40px 20px;

    background: $white;
    border-bottom: 1px solid $grayText2;
    border-radius: 40px 0 0 0;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__clear {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 500;
    color: $grayText;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $grayText;
      }
    }
  }

  &__count {
    @include text_big;
    font-weight: 600;

    span {
      color: $orange;
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    padding: 28px 40px;

    overflow-y: auto;
  }

  &__footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    padding: 20px 40px 40px;

    background: $white;
    border-top: 1px solid $grayText2;
    border-radius: 0 0 40px 0;
  }
}

.modal-cart-promocode {
  position: relative;

  display: flex;
  align-items: center;

  @include text_normal;
  font-weight: 500;

  background: $grayBg;
  border-radius: 14px;

  &__icon {
    position: absolute;
    left: 16px;
    top: 12px;
  }

  &__input {
    flex: 1 1 auto;

    height: 48px;

    padding-left: 52px;

    background: none;
    border: 0;

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

  &__divider {
    flex: 0 0 auto;

    width: 2px;
    height: 20px;
    background: rgba(0, 0, 0, 0.3);
  }

  &__button {
    flex: 0 0 auto;

    height: 48px;

    padding: 15px 20px 15px 16px;
    
    color: $grayText;
  }
}

.modal-cart-delivery {
  display: flex;
  align-items: center;
  grid-gap: 18px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 52px;
    height: 52px;

    background: $grayBg;
    border-radius: 14px;
  }

  &__list {
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

    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 3px;

      margin: 0 5px;

      background: $grayText;
      border-radius: 50%;
      opacity: 0.3;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }

    &--gray {
      color: $grayText;
    }
  }
}

.modal-cart-order-btn {
  justify-content: space-between;

  padding: 0px 20px;

  font-weight: 500;

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 6px;

    font-weight: 600;

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }
}
</style>