<template>
  <div class="modal-product-else-item">
    <div class="modal-product-else-item__image">
      <img
        v-lazy-load
        :data-src="itemImage"
        alt=""
      >
      <p
        v-if="discount"
        class="modal-product-else-item__discount"
      >
        -{{ discount }}%
      </p>
    </div>
    <div class="modal-product-else-item__content">
      <p class="modal-product-else-item__title">
        {{ item.name }}
      </p>

      <CommonPriceBlock
        :regular-price="itemRegularPrice"
        :price="itemPrice"
        is-reverse
      />

      <!-- <CommonAddButton /> -->

      <UICounter
        v-if="productType === 'simple' && count"
        :count="count"
        @increment="increment()"
        @decrement="decrement()"
        class="modal-product-else-item__counter"
      />
      <UIButton
        v-else
        color="gray"
        size="small"
        :class="['modal-product-else-item__button', { 'modal-product-else-item__button--arrow' : buttonLabel.icon === 'arrow'}]"
        @click="productType === 'simple' ? addToCart() : openProduct()"
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
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const itemImage = computed(() => {
  return props.item?.images[0] || ''
})

const itemPrice = computed(() => {
  return +props.item.price
})

const itemRegularPrice = computed(() => {
  return +props.item.regular_price
})

const discount = computed(() => {
  if (itemPrice.value !== itemRegularPrice.value) {
    return 100 - (itemPrice.value / itemRegularPrice.value * 100)
  }

  return 0
})

// Тип продукта
const productType = computed(() => {
  return props.item?.type
})

const buttonLabel = computed(() => {
  // const variants = ['variable', 'group_variable', 'group_variable_2']

  if (props.productType === 'simple') {
    return {
      text: 'В корзину',
      icon: 'add'
    }
  } else if (props.productType === 'supplements') {
    return {
      text: 'Собрать',
      icon: 'arrow'
    }
  }

  return {
    text: 'Выбрать',
    icon: 'arrow'
  }
})
</script>

<style lang="scss" scoped>
.modal-product-else-item {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  padding: 5px;

  background: $white;
  border-radius: 20px;

  &__image {
    position: relative;

    width: 140px;
    height: 100px;

    border: 1px solid $grayBg;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 8px;
    left: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 47px;
    height: 19px;

    @include extra_small;
    font-weight: 600;

    background: $grayBg;
    border-radius: 16px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-bottom: 9px;

    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__button {
    width: 135px;

    margin-top: 15px;

    font-weight: 500;
  }
}
</style>