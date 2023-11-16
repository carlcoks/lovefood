<template>
  <div :class="['index-menu-card', { 'index-menu-card--promo' : isPromo }]">
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
        <div v-if="badges.includes('halal')" class="index-menu-card-type">
          <UIIcon name="icon-halal" />
        </div>
        <div v-if="badges.includes('preorder')" class="index-menu-card-type">
          <UIIcon name="icon-hit" />
        </div>
        <div v-if="badges.includes('vegan')" class="index-menu-card-type">
          <UIIcon name="icon-vegan" />
        </div>
        <div v-if="badges.includes('spicy')" class="index-menu-card-type">
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
        <p class="index-menu-card__info index-menu-card__info--gray">
          <span>
            В наличии
          </span>
          <span>
            {{ item.stock_quantity }} шт
          </span>
        </p>
      </div>

      <div class="index-menu-card__description">
        <p class="index-menu-card__info">
          <span>
            {{ item.base_portion_size }} {{ item.sub_measure_unit }}
          </span>
          <!-- <span>
            1 шт
          </span>
          <span>
            367 гр
          </span> -->
        </p>

        <CommonPriceBlock
          :regular-price="+item.regular_price"
          :price="+item.price"
          class="index-menu-card__price"
        />
      </div>

      <UICounter
        v-if="count"
        :count="count"
        @increment="increment()"
        @decrement="decrement()"
        class="index-menu-card__counter"
      />

      <UIButton
        v-else
        color="gray"
        :class="['index-menu-card__button', { 'index-menu-card__button--arrow' : buttonLabel.icon === 'arrow'}]"
        @click="buttonLabel.icon === 'add' ? addToCart() : openProduct()"
      >
        <UIIcon
          v-if="buttonLabel.icon === 'add'"
          :name="buttonLabel.icon"
        />
        {{ buttonLabel.text }}
        <UIIcon
          v-if="buttonLabel.icon === 'arrow'"
          :name="buttonLabel.icon"
        />
      </UIButton>
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
  isPromo: {
    type: Boolean,
    default: false,
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

const buttonLabel = computed(() => {
  const variants = ['variable', 'group_variable', 'group_variable_2']

  if (props.item.type === 'supplements') {
    return {
      text: 'Собрать',
      icon: ''
    }
  } else if (variants.includes(props.item.type)) {
    return {
      text: 'Выбрать',
      icon: 'arrow'
    }
  }

  return {
    text: 'В корзину',
    icon: 'add'
  }
})

const badges = computed(() => {
  return props.item?.acf['product-badge'] || []
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

  background: $white;
  border-radius: 20px;

  &--promo {
    background: $yellowLightSecondary;

    .index-menu-card {
      &__image {
        border-color: $yellow;
      }

      &__discount {
        background: $orange;
      }

      &__button {
        background: $white;
      }
    }
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
    padding: 16px 10px 10px;
  }

  &__name {
    margin-bottom: 16px;

    @include overflow-text;
    @include text_big;
    font-weight: 600;

    cursor: pointer;
  }

  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
  }

  &__info {
    // display: none;

    // @include mq($bp-small) {
      display: flex;
      align-items: center;

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
    // }

    &--gray {
      color: $grayText;
    }
  }

  &__button {
    font-weight: 500;

    &--arrow {
      ::v-deep(.ui-icon) {
        svg path {
          fill: $blackText3;
        }
      }
    }
  }

  &__counter {
    height: 48px;
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