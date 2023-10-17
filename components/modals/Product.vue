<template>
  <ModalsOverlay
    @close="closeModal()"
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
          <img src="@/assets/images/menu-card-example.png" alt="">
          
          <p class="modal-product__discount">
            -25%
          </p>

          <div class="modal-product__characteristics">
            <div class="modal-product__characteristic">
              <UIIcon name="icon-halal" />
            </div>
            <div class="modal-product__characteristic">
              <UIIcon name="icon-hit" />
            </div>
            <div class="modal-product__characteristic">
              <UIIcon name="icon-vegan" />
            </div>
            <div class="modal-product__characteristic">
              <UIIcon name="icon-hot" />
            </div>
          </div>
        </div>

        <div class="modal-product__content">
          <div class="modal-product__header">
            <p class="modal-product__title">
              Название блюда
            </p>

            <p class="modal-product__description">
              Описание блюда Описание блюда Описание блюда Описание блюда Описание блюда в три строки
            </p>

            <div class="modal-product__weight modal-product-weight">
              <span>
                Вес продукта
              </span>
              <span>
                324 гр
              </span>
              <span>
                1680 ₽/шт
              </span>
            </div>
          </div>

          <div class="modal-product__structure modal-product-structure">
            <p class="modal-product-structure__title">
              Пищевая ценность на 100г
            </p>
            <div class="modal-product-structure__cols">
              <div class="modal-product-structure__col">
                <p class="modal-product-structure__value">
                  21.3 г
                </p>
                <p class="modal-product-structure__label">
                  Углеводы
                </p>
              </div>
              <div class="modal-product-structure__col">
                <p class="modal-product-structure__value">
                  11.5 г
                </p>
                <p class="modal-product-structure__label">
                  Жиры
                </p>
              </div>
              <div class="modal-product-structure__col">
                <p class="modal-product-structure__value">
                  6.2 г
                </p>
                <p class="modal-product-structure__label">
                  Белки
                </p>
              </div>
              <div class="modal-product-structure__col">
                <p class="modal-product-structure__value">
                  432
                </p>
                <p class="modal-product-structure__label">
                  Ккал
                </p>
              </div>
            </div>
          </div>

          <div class="modal-product__footer">
            <p class="modal-product__price">
              1 680 ₽
              <small>
                1 880 ₽
              </small>
            </p>

            <UIButton
              color="gray"
              class="modal-product__button"
            >
              <UIIcon name="add" />
              В корзину
            </UIButton>
          </div>
        </div>
      </div>

      <div class="modal-product__else modal-product-else">
        <p class="modal-product__title modal-product__title--else">
          Что нибудь ещё?
        </p>

        <Swiper
          :slides-per-view="'auto'"
          :space-between="15"
          class="modal-product-else__slider"
        >
          <SwiperSlide
            v-for="i in 5"
            :key="i"
            class="modal-product-else__slide"
          >
            <div class="modal-product-else-item">
              <div class="modal-product-else-item__image">
                <img src="@/assets/images/menu-card-example.png" alt="">
                <p class="modal-product-else-item__discount">
                  -25%
                </p>
              </div>
              <div class="modal-product-else-item__content">
                <p class="modal-product-else-item__title">
                  Название блюда
                </p>
                <p class="modal-product-else-item__price">
                  1 680 ₽
                  <small>
                    1 880 ₽
                  </small>
                </p>
                <UIButton
                  color="gray"
                  size="small"
                  class="modal-product-else-item__button"
                >
                  <UIIcon name="add" />
                  В корзину
                </UIButton>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'

const emits = defineEmits(['close'])

const closeModal = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
.modal-product {
  position: relative;

  width: 100vw;
  max-width: 1070px;

  display: flex;
  flex-direction: column;

  background: $grayBg2;
  border-radius: 40px;

  &__close {
    position: absolute;
    top: 30px;
    right: 40px;

    padding: 10px;

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
    grid-template-columns: 440px 1fr;
    grid-gap: 38px;

    padding: 30px;

    background: $white;
    border-radius: 40px;
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

    padding: 10px;
  }

  &__header {
    max-width: 450px;

    display: flex;
    flex-direction: column;

    grid-gap: 10px;
  }

  &__title {
    @include h2;

    &--else {
      color: $black;
    }
  }

  &__description {
    @include text_normal;
    font-weight: 500;
  }

  &__structure {
    margin-top: 27px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 27px;
  }

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 20px;

    @include h2;
    color: $orange;

    small {
      @include text_normal;
      font-weight: 500;
      color: $grayText;
      text-decoration: line-through;
    }
  }

  &__button {
    width: 240px;

    font-weight: 500;
  }

  &__else {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;

    padding: 30px 30px 40px;
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

.modal-product-else {
  &__slider {
    margin: 0 -30px;
    padding: 0 30px;
  }

  &__slide {
    width: auto;
  }
}

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

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 6px;

    @include text_normal;
    font-weight: 600;
    color: $orange;

    small {
      @include extra_small;
      color: $grayText;
      text-decoration: line-through;
    }
  }

  &__button {
    width: 135px;

    margin-top: 15px;

    font-weight: 500;
  }
}
</style>