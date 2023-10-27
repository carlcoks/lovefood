<template>
  <div
    :class="[
      'header-restaurant',
      {
        'header-restaurant--close' : isClose,
        'header-restaurant--location' : !deliveryType && !isClose,
      },
    ]"
  >
    <div class="header-restaurant__box">
      <p class="header-restaurant__label">
        <UIIcon
          :name="icon"
          class="header-restaurant__icon"
        />
        {{ labelText }}
      </p>
      <span
        v-if="!isClose"
        class="header-restaurant__divider"
      />
      <p
        v-if="!isClose && !deliveryType"
        class="header-restaurant__value"
      >
        Как хотите получить заказ?
        <small>
          Выберите способ получения
        </small>
      </p>
      <p
        v-else-if="!isClose"
        class="header-restaurant__value"
      >
        {{ valueText }}
      </p>
    </div>

    <UIIcon
      name="arrow"
      class="header-restaurant__arrow"
    />
  </div>
</template>

<script setup lang="ts">
const deliveryType = ref<'pickup' | 'delivery' | null>(null)

const isClose = computed(() => {
  return false
})

const icon = computed(() => {
  if (isClose.value) {
    return 'clock-filled'
  } else if (deliveryType.value) {
    return deliveryType.value
  } else {
    return 'location'
  }
})

const labelText = computed(() => {
  if (isClose.value) {
    return 'Ресторан сейчас закрыт'
  } else if (deliveryType.value === 'pickup') {
    return 'Самовывоз'
  } else if (deliveryType.value === 'delivery') {
    return 'Доставка'
  } else {
    return 'Москва'
  }
})

const valueText = computed(() => {
  return 'Стандартная, 12'
})
</script>

<style lang="scss" scoped>
.header-restaurant {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 30px;

  min-width: 300px;
  height: 48px;

  padding: 0 15px;

  @include text_normal;
  font-weight: 500;

  background: $white;
  border: 1px solid $blackText;
  border-radius: 14px;

  cursor: pointer;

  &--close {
    color: $orange;

    background: rgba(255, 102, 0, 0.11);
    border-color: $orange;

    .header-restaurant {
      &__arrow {
        ::v-deep svg path {
          fill: $orange;
        }
      }
    }
  }

  &--location {
    background: $yellowLight;
    border-color: $yellow;

    .header-restaurant {
      &__box {
        grid-gap: 16px;
      }

      &__label {
        @include text_mini;
        font-weight: 600;
      }

      &__divider {
        background: $yellow;
      }

      &__value {
        @include text_small;
        font-weight: 600;

        small {
          @include text_mini;
          font-weight: 400;
        }
      }
    }
  }

  &__box {
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__label {
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__divider {
    width: 2px;
    height: 20px;
    background: $grayBg;
  }

  &__value {
    display: flex;
    flex-direction: column;
    grid-gap: 2px;

    @include overflow-text;
  }
}
</style>