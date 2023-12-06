<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="close()"
  >
    <div class="modal-product">
      <a
        href="#"
        class="modal-product__close"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>

      <div class="modal-product__main">
        <div class="modal-product__image">
          <img
            v-lazy-load
            :data-src="productImage"
            :alt="product.name"
          >
          
          <p
            v-if="discount"
            class="modal-product__discount"
          >
            -{{ discount }}%
          </p>

          <button
            type="button"
            :class="['modal-product__favorite', { 'modal-product__favorite--active' : isFavorite }]"
            @click="isFavorite = !isFavorite"
          >
            <UIIcon name="heart" />
          </button>

          <div class="modal-product__characteristics">
            <div v-if="badges.includes('halal')" class="modal-product__characteristic">
              <UIIcon name="icon-halal" />
            </div>
            <div v-if="badges.includes('preorder')" class="modal-product__characteristic">
              <UIIcon name="icon-hit" />
            </div>
            <div v-if="badges.includes('vegan')" class="modal-product__characteristic">
              <UIIcon name="icon-vegan" />
            </div>
            <div v-if="badges.includes('spicy')" class="modal-product__characteristic">
              <UIIcon name="icon-hot" />
            </div>
          </div>
        </div>

        <div class="modal-product__content">
          <div class="modal-product__header">
            <p class="modal-product__title">
              {{ product.name }}
            </p>

            <div
              v-html="product.description"
              class="modal-product__description"
            />
          </div>

          <div class="modal-product-variants">
            <div class="modal-product-variants__line">
              <button
                v-for="(acfVariant, i) in acfVariations"
                :key="i"
                :class="['modal-product-variants__button', { 'active' : size === 0 }]"
                @click.prevent="size = i"
              >
                {{ acfVariant.product_name_short }}
              </button>
            </div>
          </div>

          <div
            v-if="productSupplements.length"
            class="modal-product-add"
          >
            <p class="modal-product-add__title">
              Добавить к блюду
            </p>
            <div class="modal-product-add__content">
              <div
                v-for="(supplement, s) in productSupplements"
                :key="s"
                :class="['modal-product-add-item', { 'active' : selectedSupplements[s]?.length }]"
                @click="openSupplementsModal(supplement, s)"
              >
                <div
                  v-if="selectedSupplements[s]?.length"
                  class="modal-product-add-item__selected"
                >
                  <span>
                    {{ selectedSupplements[s].reduce((acc, item) => { acc += item.count; return acc }, 0) }} шт
                  </span>
                  <span>
                    {{ selectedSupplements[s].reduce((acc, item) => { acc += item.count * item.price; return acc }, 0) }} ₽
                  </span>
                </div>
                <div
                  v-else-if="supplement.supplement_required === 'yes'"
                  class="modal-product-add-item__required"
                >
                  Обязательно
                </div>
                <div class="modal-product-add-item__image">
                  <img
                    v-lazy-load
                    :data-src="supplement.image"
                    alt=""
                  >
                </div>
                <div class="modal-product-add-item__box">
                  {{ supplement.title }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="productAcf.uglevod_product_nutr || productAcf.fat_product_nutr || productAcf.protein_product_nutr || productAcf.kkal_product_nutr"
            class="modal-product__structure modal-product-structure"
          >
            <p class="modal-product-structure__title">
              Пищевая ценность на 100г
            </p>
            <div class="modal-product-structure__cols">
              <div
                v-if="productAcf.uglevod_product_nutr"
                class="modal-product-structure__col"
              >
                <p class="modal-product-structure__value">
                  {{ productAcf.uglevod_product_nutr }} г
                </p>
                <p class="modal-product-structure__label">
                  Углеводы
                </p>
              </div>
              <div
                v-if="productAcf.fat_product_nutr"
                class="modal-product-structure__col"
              >
                <p class="modal-product-structure__value">
                  {{ productAcf.fat_product_nutr }} г
                </p>
                <p class="modal-product-structure__label">
                  Жиры
                </p>
              </div>
              <div
                v-if="productAcf.protein_product_nutr"
                class="modal-product-structure__col"
              >
                <p class="modal-product-structure__value">
                  {{ productAcf.protein_product_nutr }} г
                </p>
                <p class="modal-product-structure__label">
                  Белки
                </p>
              </div>
              <div
                v-if="productAcf.kkal_product_nutr"
                class="modal-product-structure__col"
              >
                <p class="modal-product-structure__value">
                  {{ productAcf.kkal_product_nutr }}
                </p>
                <p class="modal-product-structure__label">
                  Ккал
                </p>
              </div>
            </div>
          </div>

          <div class="modal-product__footer">
            <div class="modal-product__footer-line">
              <p
                v-if="isCountable"
                class="modal-product-weight"
              >
                <span>
                  Вес продукта
                </span>
                <span>
                  {{ productWeight }}
                </span>
              </p>
              <p
                v-else
                class="modal-product-weight"
              >
                <span>
                  {{ productBasePortionSize }} {{ productSubMeasureUnit }}
                </span>
              </p>

              <p class="modal-product-weight">
                <span>
                  В наличии
                </span>
                <span>
                  {{ inStock }} {{ productMeasureUnit }}
                </span>
              </p>
            </div>

            <div class="modal-product__buttons">
              <CommonPriceBlock
                :regular-price="+productRegularPrice"
                :price="+productPrice"
                is-reverse
                is-big
              />

              <CommonAddButton
                :count="productCount"
                product-type="simple"
                :disabled="isButtonDisabled"
                @increment="increment()"
                @decrement="decrement()"
                @add="addToCart()"
                class="modal-product__button"
              />
            </div>
          </div>
        </div>
      </div>

      <ModalsProductElse
        v-if="relatedArray.length"
        :related="relatedArray"
      />
    </div>

    <ModalsSupplements
      v-if="isShowSupplementsModal"
      :item="currentSupplement"
      :selected="selectedSupplements[currentSupplementKey]"
      @submit="selectSupplemets"
      @close="closeSupplementsModal()"
    />
  </ModalsOverlay>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'

const catalog = useCatalogStore()
const cart = useCartStore()

const { selectedProduct, relatedItems } = storeToRefs(catalog)
const { productInCart } = storeToRefs(cart)

const isShow = ref(true)
const isFavorite = ref(false)
const isShowSupplementsModal = ref(false) // Модалка для добавок
const currentSupplement = ref(null) // выбранная категории добавок
const currentSupplementKey = ref(null) // ключ выбранной категории добавок
const selectedSupplements = ref({}) // Все выбранные добавки

const size = ref(0)
const type = ref(1)

// Computed
const supplementsPrice = computed(() => {
  const obj = selectedSupplements.value
  let sum = 0
  for (const key in obj) {
    sum += obj[key].reduce((acc, item) => {
      acc += item.count * item.price

      return acc
    }, 0)
  }

  return sum
})

const product = computed(() => {
  return selectedProduct.value
})

const productImage = computed(() => {
  return product.value?.images[0] || ''
})

const productPrice = computed(() => {
  return +supplementsPrice.value + +product.value.price
})

const productRegularPrice = computed(() => {
  return +supplementsPrice.value + +product.value.regular_price
})

const discount = computed(() => {
  if (+productPrice.value !== +productRegularPrice.value) {
    return 100 - (productPrice.value / productRegularPrice.value * 100)
  }

  return 0
})

const relatedArray = computed(() => {
  return relatedItems.value(product.value.related_ids)
})

const isCountable = computed(() => {
  return product.value?.countable || false
})

// Вес продукта
const productWeight = computed(() => {
  return product.value?.weight || 0
})

// Кол-во
const productQuantity = computed(() => {
  return product.value?.stock_quantity || 0
})

const productBasePortionSize = computed(() => {
  return product.value?.base_portion_size || 1
})

// В наличии
const inStock = computed(() => {
  return productQuantity.value / productBasePortionSize.value
})

const productMeasureUnit = computed(() => {
  return product.value?.measure_unit || ''
})

const productSubMeasureUnit = computed(() => {
  return product.value?.sub_measure_unit || ''
})

const productAcf = computed(() => {
  return product.value?.acf || {}
})

const badges = computed(() => {
  return productAcf.value['product-badge'] || []
})

// Добавки к блюду
const productSupplements = computed(() => {
  return productAcf.value['supplements'] || []
})

const supplementsArray = computed(() => {
  const obj = selectedSupplements.value
  const supplements = []
  for (const key in obj) {
    obj[key].forEach(item => {
      supplements.push(item)
    })
  }

  return supplements
})

const currentProductInCart = computed(() => {
  return productInCart.value(+product.value.id, supplementsArray.value)
})

// Кол-во добавленных в корзину
const productCount = computed(() => {
  return currentProductInCart.value?.item?.count || 0
})

const isButtonDisabled = computed(() => {
  if (productSupplements.value.length) {
    return productSupplements.value.find((item, i) => {
      if (item.supplement_required === 'yes' && !selectedSupplements.value[i]?.length) {
        return true
      }
      return false
    })
  }

  return false
})

// <!-- Methods -->
const addToCart = () => {
  if (isButtonDisabled.value) {
    return false
  }

  cart.addToCart({
    ...product.value,
    supplements: supplementsArray.value
  })
}

const increment = () => {
  cart.incrementItem(currentProductInCart.value.idx)
}

const decrement = () => {
  cart.decrementItem(currentProductInCart.value.idx)
}

// Открыть модалку для выбора добавок
const openSupplementsModal = (item, key) => {
  currentSupplement.value = item
  currentSupplementKey.value = key
  isShowSupplementsModal.value = true
}

// Закрыть модалку для выбора добавок
const closeSupplementsModal = () => {
  isShowSupplementsModal.value = false
  currentSupplement.value = null
  currentSupplementKey.value = null
}

// Подтвердить выбор добавок и закрыть модалку выбора
const selectSupplemets = (data) => {
  selectedSupplements.value[currentSupplementKey.value] = data
  closeSupplementsModal()
}

const closeModal = () => {
  isShow.value = false
}

const close = () => {
  catalog.setProduct(null)
}
</script>

<style lang="scss" scoped>
.modal-product {
  position: relative;

  width: 100vw;
  max-width: 1070px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background: $grayBg2;

  @include mq($bp-small) {
    min-height: auto;

    border-radius: 40px;
  }

  &__close {
    position: absolute;
    top: 30px;
    right: 40px;

    padding: 10px;

    z-index: 10;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $grayText;
      }
    }
  }

  &__main {
    display: grid;
    grid-gap: 30px;

    padding: 20px;

    background: $white;

    @include mq($bp-small) {
      grid-template-columns: 440px 1fr;
      grid-gap: 38px;

      padding: 30px;

      border-radius: 40px;
    }
  }

  &__image {
    position: relative;

    width: 100%;
    height: 440px;

    border-radius: 40px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 20px;
    left: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 86px;
    height: 39px;

    @include text_big;
    font-weight: 600;

    // background: $white;
    background: $grayBg;
    border-radius: 20px;
  }

  &__favorite {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;

    padding: 20px;

    ::v-deep(.ui-icon) svg {
      width: 40px;
      height: 40px;
    }

    &--active {
      ::v-deep(.ui-icon) svg path {
        fill: $orange;
      } 
    }
  }

  &__characteristics {
    position: absolute;
    bottom: 20px;
    left: 20px;

    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }

  &__characteristic {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    
    margin-left: -13px;

    background: $white;
    border-radius: 50%;
    box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.05);

    &:last-child {
      margin-left: 0;
    }

    .ui-icon {
      width: 24px;
      height: 24px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    
    grid-gap: 20px;
  }

  &__header {
    max-width: 450px;

    display: flex;
    flex-direction: column;

    grid-gap: 10px;
  }

  &__title {
    @include h2;
  }

  &__description {
    @include text_normal;
    font-weight: 500;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    margin: auto 0 0;
    padding-top: 20px;

    border-top: 1px solid $grayBg;
  }

  &__footer-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button {
    max-width: 240px;
  }
}

.modal-product-variants {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: 15px;

  &__line {
    display: flex;
    align-items: center;
    // grid-gap: 3px;
    flex-wrap: wrap;
    grid-gap: 3px 15px;

    padding: 3px;

    border-radius: 117px;
    // background: $grayBg2;
  }

  &__button {
    padding: 8px 25px;

    @include text_normal;
    font-weight: 600;

    background: $grayBg;
    border-radius: 40px;
    border: 0;

    transition: background-color 0.3s;

    &.active {
      background: $white;
    }
  }
}

.modal-product-weight {
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;

    @include text_mini;
    color: $grayText;

    &:after {
      content: '';
      width: 3px;
      height: 3px;

      margin: 0 10px;

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

.modal-product-add {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px 10px;
  }
}

.modal-product-add-item {
  position: relative;

  display: flex;
  flex-direction: column;

  background: $white;
  border-radius: 20px;
  outline: 1px solid $grayBg;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  overflow: hidden;

  cursor: pointer;

  &.active {
    outline-width: 2px;
    outline-color: $yellowDark;
  }

  &__selected {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 6px 15px;

    @include text_mini;
    font-weight: 600;
    color: $orange;

    background: $yellowLightSecondary;
    border-radius: 0 0 20px 0;

    span {
      display: flex;
      align-items: center;

      &:after {
        content: '';
        display: block;
        width: 3px;
        height: 3px;

        margin: 0 6px;

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

  &__required {
    position: absolute;
    top: 0;
    left: 0;

    padding: 6px 15px;

    @include text_mini;
    font-weight: 600;
    color: $orange;

    background: $orangeLight;
    border-radius: 0 0 20px 0;
  }

  &__image {
    width: 100%;
    height: 120px;

    border: 1px solid $grayBg;
    border-radius: 20px;

    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;

    padding: 8px;

    // @include overflow-multi-text(2);
    @include text_small;
    font-weight: 600;
    text-align: center;

    overflow: hidden;
  }
}

.modal-product-structure {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &__title {
    @include text_big;
    font-weight: 600;
    color: $grayText;
  }

  &__cols {
    display: flex;
    align-items: flex-start;
  }

  &__col {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 5px;

    padding: 0 26px;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
      
      &:after {
        display: none;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;

      width: 1px;
      height: 41px;

      margin: auto;

      background: $grayText2;
    }
  }

  &__value {
    @include text_large;
    font-weight: 700;
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }
}
</style>