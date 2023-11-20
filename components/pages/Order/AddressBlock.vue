<template>
  <div class="page-order-address-block">
    <p class="page-order-address-block__label">
      {{ label }}
    </p>

    <div class="page-order-address-block__box">
      <div
        :class="[
          'page-order-address-block__icon',
          { 'page-order-address-block__icon--pickup' : deliveryType === 'pickup' }
        ]"
      >
        <UIIcon :name="deliveryType === 'delivery' ? 'location-filled' : deliveryType === 'pickup' ? 'pickup' : ''" />
      </div>

      <div class="page-order-address-block__content">
        <div class="page-order-address-block__info">
          <p class="page-order-address-block__address">
            {{ selectedLocation?.address || 'г. Москва, Ул. Стандартная, 21к1' }}
          </p>
          <p class="page-order-address-block__name">
            {{ selectedLocation?.name || 'Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации систем массового участия.' }}
          </p>
          <p
            v-if="selectedLocation?.working_time"
            class="page-order-address-block__time"
          >
            <UIIcon name="clock-filled" />
            {{ selectedLocation.working_time }}
          </p>
        </div>

        <UIIcon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const common = useCommonStore()

const props = defineProps({
  deliveryType: {
    type: String,
    default: 'delivery'
  }
})

const selectedLocation = computed(() => common.selectedLocation)

const label = computed(() => {
  switch (props.deliveryType) {
    case 'delivery':
      return 'Адрес доставки'
    case 'pickup':
      return 'Адрес самовывоза'
    case 'lounge':
      return 'Адрес зала'
    default:
      return 'Адрес доставки'
  }
})
</script>

<style lang="scss" scoped>
.page-order-address-block {
  display: grid;
  grid-gap: 16px;

  &__label {
    @include text_normal;
    font-weight: 500;
    color: $grayText;
  }

  &__box {
    display: flex;
    align-items: center;
    grid-gap: 16px;

    padding: 12px;

    background: $white;
    border-radius: 20px;
    border: 1px solid $grayText2;
  }

  &__icon {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    &--pickup {
      ::v-deep(.ui-icon) svg path {
        fill: $green;
      }
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 12px;
  }

  &__info {
    display: grid;
    grid-gap: 4px;
  }

  &__address {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__name {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    @include text_mini;
    color: $grayText;
  }
}
</style>