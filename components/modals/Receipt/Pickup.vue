<template>
  <div class="modal-receipt-pickup">
    <div class="modal-receipt-pickup__header">
      <div class="modal-receipt-pickup__search modal-receipt-pickup-search">
        <UIIcon
          name="loop"
          class="modal-receipt-pickup-search__loop"
        />
        <UIInput
          v-model="search"
          placeholder="Поиск"
          class="modal-receipt-pickup-search__input"
        />
      </div>

      <!-- <p class="modal-receipt-pickup__location">
        <UIIcon name="location" />
        Москва
      </p> -->
    </div>

    <div class="modal-receipt-pickup__main">
      <div
        v-for="(item, i) in filteredLocations"
        :key="i"
        :class="['modal-receipt-pickup-item', { 'active' : currentAddress?.id === item.id }]"
        @click="currentAddress?.id === item.id ? currentAddress = null : currentAddress = item"
      >
        <div class="modal-receipt-pickup-item__left">
          <UIIcon
            name="pickup"
            class="modal-receipt-pickup-item__icon"
          />
        </div>
        <div class="modal-receipt-pickup-item__content">
          <p class="modal-receipt-pickup-item__address">
            {{ item.address }}
          </p>
          <p class="modal-receipt-pickup-item__city">
            {{ item.name }}
          </p>
          <p class="modal-receipt-pickup-item__time">
            <UIIcon name="clock-filled" />
            {{ item.working_time}}
          </p>
        </div>
      </div>
    </div>

    <div class="modal-receipt-pickup__footer">
      <UIButton
        :disabled="!currentAddress"
        color="yellow"
        class="modal-receipt-pickup__button"
        @click="submit()"
      >
        Подтвердить
      </UIButton>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const common = useCommonStore()

const props = defineProps({
  locations: {
    type: Array,
    default: () => ([]),
  },
})

const emits = defineEmits(['close'])

const search = ref('')
const currentAddress = ref(null)

const selectedLocation = computed(() => common.pickupLoselectedLocationcation)

const filteredLocations = computed(() => {
  return props.locations.filter(item => {
    return item.address.toLowerCase().includes(search.value.toLowerCase())
  })
})

const submit = () => {
  common.setDeliveryType('pickup')
  common.setLocation(currentAddress.value)

  emits('close')
}

onMounted(() => {
  if (selectedLocation.value) {
    currentAddress.value = selectedLocation.value
  }
})
</script>

<style lang="scss" scoped>
.modal-receipt-pickup {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  grid-gap: 20px;

  &__header {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__search {
    flex: 1 1 auto;
  }

  &__location {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_mini;
    font-weight: 600;
    color: $grayText;

    cursor: pointer;

    .ui-icon {
      width: 20px;
      height: 20px;

      ::v-deep svg path {
        fill: $grayText;
      }
    }
  }

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    overflow-y: auto;
  }

  &__footer {
    flex: 0 0 auto;
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-receipt-pickup-search {
  position: relative;

  &__loop {
    position: absolute;
    top: 12px;
    left: 16px;
  }

  &__input {
    ::v-deep input {
      padding-left: 52px;
    }
  }
}

.modal-receipt-pickup-item {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 16px;

  cursor: pointer;

  &.active {
    .modal-receipt-pickup-item {
      &__icon {
        ::v-deep svg path {
          fill: $green;
        }
      }

      &__content {
        border-color: $yellowDark;
      }
    }
  }

  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 24px;
    height: 24px;

    ::v-deep svg path {
      fill: $grayText2;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    padding: 12px 0;

    border-bottom: 1px solid $grayText2;
  }

  &__address {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__city {
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