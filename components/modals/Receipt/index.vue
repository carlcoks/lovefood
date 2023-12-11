te<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowReceiptModal(false)"
  >
    <div class="modal-receipt">
      <a
        href="#"
        class="modal-receipt__close"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>

      <div class="modal-receipt__main">
        <div class="modal-receipt__tabs">
          <button
            v-for="(item, i) in types"
            :key="i"
            :class="['modal-receipt__tab modal-receipt-tab', { 'active' : currentType === item.type }]"
            @click.prevent="currentType = item.type"
          >
            <UIIcon :name="item.type" />
            {{ item.label }}
          </button>
        </div>

        <div class="modal-receipt__content">
          <transition
            name="fade"
            mode="out-in"
          >
            <ModalsReceiptDelivery
              v-if="currentType === 'delivery'"
              :delivery-coords="deliveryCoords"
              :delivery-zone="deliveryZone"
              @close="closeModal()"
            />
            <ModalsReceiptPickup
              v-else-if="currentType === 'pickup'"
              :current-address="currentAddress"
              @update="currentAddress = $event"
              @close="closeModal()"
            />
            <ModalsReceiptLounge
              v-else-if="currentType === 'lounge'"
            />
          </transition>
        </div>
      </div>

      <ModalsReceiptMap
        :delivery-type="currentType"
        :current-address="currentAddress"
        @update="currentAddress = $event"
        @setDeliveryCoords="deliveryCoords = $event"
        @setDeliveryZone="deliveryZone = $event"
        class="modal-receipt__map"
      />
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const types = [
  { label: 'Доставка', type: 'delivery' },
  { label: 'Самовывоз', type: 'pickup' },
  { label: 'В зале', type: 'lounge' },
]

const isShow = ref(true)
const currentType = ref('delivery')

const currentAddress = ref(null)

const deliveryCoords = ref(null)
const deliveryZone = ref(null)

// <!-- Computed -->
const deliveryType = computed(() => commonStore.deliveryType)
const selectedLocation = computed(() => commonStore.selectedLocation)

// <!-- Methods -->
const closeModal = () => {
  isShow.value = false
}

onMounted(() => {
  if (deliveryType.value) {
    currentType.value = deliveryType.value
  }

  if (selectedLocation.value) {
    currentAddress.value = selectedLocation.value
  }
})
</script>

<style lang="scss" scoped>
.modal-receipt {
  width: 100vw;
  min-height: 100vh;

  display: grid;

  background: $white;

  @include mq($bp-small) {
    max-width: 1150px;
    min-height: auto;
    min-height: 678px;

    grid-template-columns: repeat(2, 1fr);
  
    border-radius: 40px;
  }

  &__close {
    position: absolute;
    top: 50px;
    right: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;

    background: $white;
    border-radius: 50%;

    z-index: 10;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText;
      }
    }
  }

  &__main {
    display: flex;
    flex-direction: column;

    padding: 0;

    @include mq($bp-small) {
      padding: 50px 60px;
    }
  }

  &__map {
    display: none;

    @include mq($bp-small) {
      display: block;
    }
  }

  &__tabs {
    flex: 0 0 auto;

    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);

    margin-bottom: 30px;
    padding: 5px;
    
    background: $grayBg2;
    border-radius: 20px;
  }

  &__content {
    flex: 1 1 auto;
  }
}

.modal-receipt-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  padding: 12px 15px;

  @include text_normal;
  font-weight: 600;
  color: $grayText;

  border-radius: 14px;
  background-color: transparent;
  border: 0;

  transition: background-color 0.3s, color 0.3s;

  &.active {
    color: $blackText;
    background-color: $yellow;
  }
}
</style>
