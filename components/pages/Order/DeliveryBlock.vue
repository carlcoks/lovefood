<template>
  <div class="page-order-delivery-block">
    <div class="page-order-delivery-block-info">
      <div class="page-order-delivery-block-info__icon">
        <UIIcon name="delivery" />
      </div>
      <div class="page-order-delivery-block-info__content">
        <p class="page-order-delivery-block-info__line">
          <span class="page-order-delivery-block-info__value">
            Доставка
          </span>
          <span class="page-order-delivery-block-info__value">
            40-50 мин
          </span>
        </p>
        <p class="page-order-delivery-block-info__line">
          <span class="page-order-delivery-block-info__value page-order-delivery-block-info__value--price">
            0 ₽
          </span>
          <span
            class="page-order-delivery-block-info__value page-order-delivery-block-info__value--free"
          >
            <!-- До бесплатной 550 ₽ -->
            Бесплатно
          </span>
        </p>
      </div>
    </div>

    <div class="page-order-delivery-block-progress">
      <div class="page-order-delivery-block-progress__line">
        <div
          style="width: 100%"
          class="page-order-delivery-block-progress__bar"
        />
      </div>

      <div class="page-order-delivery-block-progress__values">
        <div class="page-order-delivery-block-progress__value">
          <UIIcon name="delivery" />
          250 ₽
        </div>

        <div class="page-order-delivery-block-progress__value">
          <UIIcon name="delivery" />
          0 ₽
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-order-delivery-block {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 20px;

  background: $grayBg2;
  border-radius: 20px;
}

.page-order-delivery-block-info {
  display: flex;
  align-items: center;
  grid-gap: 18px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 52px;
    height: 52px;

    background: $white;
    border-radius: 16px;

    ::v-deep(.ui-icon) svg {
      width: 32px;
      height: 32px;
    }
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

    &--price {
      font-weight: 600;
    }

    &--status {
      color: $grayText;
    }

    &--free {
      color: $green;
    }

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
  }
}

.page-order-delivery-block-progress {
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  &__line {
    position: relative;

    width: 100%;
    height: 4px;

    padding: 0 10px;

    background: $grayBg2;
    border-radius: 20px;
    overflow: hidden;
  }

  &__bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    background: $green;
  }

  &__values {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 4px;

    padding: 2px 6px;

    @include text_mini;
    font-weight: 600;

    background: $white;
    border-radius: 20px;

    ::v-deep(.ui-icon) svg {
      width: 16px;
      height: 16px;
    }
  }
}
</style>