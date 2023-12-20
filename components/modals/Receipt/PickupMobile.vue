<template>
  <div
    :class="[
      'modal-receipt-pickup-mobile',
      {
        'modal-receipt-pickup-mobile--fullscreen' : isFullScreen,
        'modal-receipt-pickup-mobile--selected' : !!selectedItem
      }
    ]"
  >
    <template
      v-if="!!selectedItem"
    >
      <div class="modal-receipt-pickup-mobile__content">
        <div
          class="modal-receipt-pickup-mobile-item modal-receipt-pickup-mobile-item--selected active"
          @click="selectedItem = null"
        >
          <div class="modal-receipt-pickup-mobile-item__left">
            <UIIcon
              name="pickup"
              class="modal-receipt-pickup-mobile-item__icon"
            />
          </div>
          <div class="modal-receipt-pickup-mobile-item__content">
            <p class="modal-receipt-pickup-mobile-item__address">
              {{ selectedItem.address }}
            </p>
            <p class="modal-receipt-pickup-mobile-item__city">
              {{ selectedItem.name }}
            </p>
            <p class="modal-receipt-pickup-mobile-item__time">
              <UIIcon name="clock-filled" />
              {{ selectedItem.working_time}}
            </p>
          </div>
          <div class="modal-receipt-pickup-mobile-item__close">
            <UIIcon name="close" />
          </div>
        </div>

        <UIButton
          color="yellow"
          class="modal-receipt-pickup-mobile__button"
          @click="submit()"
        >
          Заберу отсюда
        </UIButton>
      </div>
    </template>
    <template v-else>
      <button
        type="button"
        class="modal-receipt-pickup-mobile__top-btn"
        @click.prevent="isFullScreen = !isFullScreen"
      >
        <UIIcon name="bottom-sheet" />
      </button>

      <div class="modal-receipt-pickup-mobile__content">
        <div class="modal-receipt-pickup-mobile__search modal-receipt-pickup-mobile-search">
          <UIIcon
            name="loop"
            class="modal-receipt-pickup-mobile-search__loop"
          />
          <UIInput
            v-model="search"
            placeholder="Поиск"
            class="modal-receipt-pickup-mobile-search__input"
          />
        </div>

        <div class="modal-receipt-pickup-mobile__items">
          <div
            v-for="(item, i) in filteredLocations"
            :key="i"
            :class="['modal-receipt-pickup-mobile-item', { 'active' : selectedItem?.id === item.id }]"
            @click="selectItem(item)"
          >
            <div class="modal-receipt-pickup-mobile-item__left">
              <UIIcon
                name="pickup"
                class="modal-receipt-pickup-mobile-item__icon"
              />
            </div>
            <div class="modal-receipt-pickup-mobile-item__content">
              <p class="modal-receipt-pickup-mobile-item__address">
                {{ item.address }}
              </p>
              <p class="modal-receipt-pickup-mobile-item__city">
                {{ item.name }}
              </p>
              <p class="modal-receipt-pickup-mobile-item__time">
                <UIIcon name="clock-filled" />
                {{ item.working_time}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()

const props = defineProps({
  currentAddress: {
    type: undefined,
    default: null,
  },
})

const emits = defineEmits(['close', 'update'])

const isFullScreen = ref(false)
const search = ref('')
const selectedItem = ref(null)

// <!-- Computed -->
const pickupLocations = computed(() => commonStore.pickupLocations)

const filteredLocations = computed(() => {
  return pickupLocations.value.filter(item => {
    return item.address.toLowerCase().includes(search.value.toLowerCase())
  })
})

// <!-- Methods -->
const selectItem = (item) => {
  if (selectedItem.value?.id === item.id) {
    selectedItem.value = null
  } else {
    selectedItem.value = item
  }

  isFullScreen.value = false
  emits('update', selectedItem.value)
}

const submit = () => {
  userStore.setDeliveryForm(null)

  if (useChangeLocation('pickup', props.currentAddress)) {
    emits('close')
  }
}

const setDefault = () => {
  selectedItem.value = props.currentAddress
}

setDefault()
</script>

<style lang="scss" scoped>
.modal-receipt-pickup-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  height: 230px;

  background: $white;
  border-radius: 40px 40px 0 0;
  box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.20);
  overflow: hidden;
  transition: height 0.3s;

  @include mq($bp-small) {
    display: none;
  }

  &--fullscreen {
    height: calc(100% - 20px);
  }

  &--selected {
    height: auto;
  }

  &__top-btn {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 30px;

    padding-top: 20px;
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    padding: 20px;

    overflow-y: auto;
  }

  &__items {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
  }

  &__button {
    flex: 0 0 auto;

    font-weight: 500;
  }
}

.modal-receipt-pickup-mobile-search {
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

.modal-receipt-pickup-mobile-item {
  display: grid;
  grid-template-columns: 40px 1fr;

  cursor: pointer;

  &--selected {
    grid-template-columns: 40px 1fr 36px;
  }

  &.active {
    .modal-receipt-pickup-mobile-item {
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

    padding: 12px 0 12px 16px;

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

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-left: 12px;

    border-bottom: 1px solid $yellowDark;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText3;
      }
    }
  }
}
</style>