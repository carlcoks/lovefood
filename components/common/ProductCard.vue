<template>
  <div class="index-menu-card">
    <div
      class="index-menu-card__image"
      @click.prevent="openProduct()"
    >
      <img
        :data-src="productImage"
        :alt="item.name"
        v-lazy-load
      >

      <span
        v-if="discount"
        class="index-menu-card__discount"
      >
        -{{ discount }}%
      </span>
      
      <button
        :class="['index-menu-card__favorite', { 'active' : isFavorite }]"
        @click.stop.prevent="isFavorite = !isFavorite"
      >
        <UIIcon name="heart" />
      </button>

      <div class="index-menu-card__types">
        <div class="index-menu-card-type">
          <UIIcon name="icon-halal" />
        </div>
        <div class="index-menu-card-type">
          <UIIcon name="icon-hit" />
        </div>
        <div class="index-menu-card-type">
          <UIIcon name="icon-vegan" />
        </div>
        <div class="index-menu-card-type">
          <UIIcon name="icon-hot" />
        </div>
      </div>
    </div>

    <div class="index-menu-card__content">
      <p
        class="index-menu-card__name"
        @click="openProduct()"
      >
        {{ item.name }}
      </p>

      <div class="index-menu-card__description">
        <!-- <p class="index-menu-card__info">
          <span>
            100 гр
          </span>
          <span>
            1680 ₽/шт
          </span>
        </p> -->
        <p />

        <p class="index-menu-card__price">
          <small v-if="+item.regular_price !== +item.price">
            {{ item.regular_price.toLocaleString() }} ₽
          </small>
          {{ item.price.toLocaleString() }} ₽
        </p>
      </div>

      <UIButton
        v-if="!count"
        color="gray"
        class="index-menu-card__button"
        @click="addToCart()"
      >
        <UIIcon name="add" />
        В корзину
      </UIButton>

      <UICounter
        v-else
        :count="count"
        @increment="increment()"
        @decrement="decrement()"
        class="index-menu-card__counter"
      />
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'

const catalog = useCatalogStore()
const cart = useCartStore()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const isFavorite = ref(false)

// Computed
const productImage = computed(() => {
  return props.item?.images[0] || ''
})

const discount = computed(() => {
  if (props.item?.regular_price && props.item?.price && +props.item.regular_price !== +props.item.price) {
    return 100 - (props.item.price / props.item.regular_price * 100)
  }

  return 0
})

const count = computed(() => {
  const item = cart.cart.find(item => +item.id === +props.item.id)

  return item?.count || 0
})

// Methods
const openProduct = () => {
  catalog.setProduct(props.item)
}

const addToCart = () => {
  cart.addToCart(props.item)
}

const increment = () => {
  cart.incrementItem(props.item.id)
}

const decrement = () => {
  cart.decrementItem(props.item.id)
}
</script>

<style lang="scss" scoped>
.index-menu-card {
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  padding-bottom: 10px;

  background: $white;
  border-radius: 20px;

  @include mq($bp-small) {
    grid-gap: 20px;
  }

  &__image {
    position: relative;
    width: 100%;
    height: 212px;

    border-radius: 20px;
    border: 1px solid $grayBg;
    overflow: hidden;

    cursor: pointer;

    @include mq($bp-small) {
      height: 316px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 16px;
    left: 16px;

    padding: 4px 12px;

    @include text_mini;
    font-weight: 600;

    background: $grayBg;
    border-radius: 16px;
  }

  &__favorite {
    position: absolute;
    top: 0;
    right: 0;

    padding: 16px;

    &.active {
      ::v-deep(.ui-icon) svg path {
        fill: $orange;
      }
    }
  }

  &__types {
    position: absolute;
    left: 16px;
    bottom: 16px;

    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }

  &__content {
    display: grid;
    padding: 0 10px;
  }

  &__name {
    margin-bottom: 12px;

    @include overflow-text;
    @include text_big;
    font-weight: 600;

    cursor: pointer;

    @include mq($bp-small) {
      margin-bottom: 20px;
    }
  }

  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__info {
    display: none;

    @include mq($bp-small) {
      display: flex;
      align-items: center;

      color: $grayText;
      @include text_mini;

      span {
        display: flex;
        align-items: center;

        &:after {
          content: url('@/assets/svg/dot-middle.svg');
          display: flex;
          align-items: center;
          margin: 0 10px;
        }

        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }
  }

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 6px;

    color: $orange;

    @include text_normal;
    font-weight: 600;

    small {
      @include extra_small;
      color: $grayText;
      text-decoration: line-through;
    }
  }

  &__button {
    margin-top: 15px;

    font-weight: 500;
  }

  &__counter {
    height: 48px;
    margin-top: 15px;
  }
}

.index-menu-card-type {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  margin-left: -7px;

  background: $white;
  border-radius: 50%;
  box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-left: 0;
  }

  .ui-icon {
    width: 20px;
    height: 20px;
  }
}
</style>