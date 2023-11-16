<template>
  <div class="modal-cart-item">
    <a
      href="#"
      class="modal-cart-item__remove"
      @click.prevent="removeFromCart()"
    >
      <UIIcon name="close" />
    </a>
    <div class="modal-cart-item__main">
      <div class="modal-cart-item__image">
        <img
          :data-src="productImage"
          :alt="item.name"
          v-lazy-load
        >
      </div>
      <div class="modal-cart-item__content">
        <div class="modal-cart-item__top">
          <p class="modal-cart-item__title">
            {{ item.name }}
          </p>
          <!-- <p class="modal-cart-item__info">
            <span>
              100 гр
            </span>
            <span>
              1680 ₽/шт
            </span>
          </p> -->
        </div>

        <div class="modal-cart-item__footer">
          <div class="modal-cart-item__price">
            <small v-if="+itemRegularPrice !== +itemPrice">
              {{ itemRegularPrice.toLocaleString() }} ₽
            </small>
            {{ itemPrice.toLocaleString() }} ₽
          </div>

          <UICounter
            :count="item.count"
            @increment="increment()"
            @decrement="decrement()"
            class="modal-cart-item__counter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
})

// Computed
const productImage = computed(() => {
  return props.item?.images[0] || ''
})

const itemRegularPrice = computed(() => {
  return props.item.regular_price * props.item.count
})

const itemPrice = computed(() => {
  return props.item.price * props.item.count
})

// Methods
const removeFromCart = () => {
  cart.removeFromCart(props.item.id)
}

const increment = () => {
  cart.incrementItem(props.item.id)
}

const decrement = () => {
  cart.decrementItem(props.item.id)
}
</script>

<style lang="scss" scoped>
.modal-cart-item {
  position: relative;

  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 5px 10px 5px 5px;

  background: $white;
  border-radius: 20px;

  &__remove {
    position: absolute;
    top: 15px;
    right: 10px;

    ::v-deep(.ui-icon) svg {
      width: 18px;
      height: 18px;

      path {
        fill: #262626;
      }
    }
  }

  &__main {
    display: flex;
    grid-gap: 20px;
  }

  &__image {
    flex: 0 0 auto;

    width: 100px;
    height: 100px;

    border: 1px solid $grayBg;
    border-radius: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 10px 0;
  }

  &__top {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__title {
    @include overflow-text;
    @include text_small;
    font-weight: 600;
  }

  &__info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @include text_mini;
    color: $grayText;

    span {
      display: flex;
      align-items: center;

      &:after {
        content: '';
        display: block;
        width: 3px;
        height: 3px;

        margin: 0 4px;

        background: $grayText;
        border-radius: 50%;
        opacity: 0.3;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    @include text_normal;
    font-weight: 600;
    color: $orange;

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }

  &__counter {
    max-width: 130px;
  }
}
</style>