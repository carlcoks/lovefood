te<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="emits('close')"
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
            />
            <ModalsReceiptPickup
              v-else-if="currentType === 'pickup'"
            />
            <ModalsReceiptLounge
              v-else-if="currentType === 'lounge'"
            />
          </transition>
        </div>
      </div>

      <div class="modal-receipt__map">
        <img src="@/assets/images/map.jpg" alt="">
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
const emits = defineEmits(['close'])

const isShow = ref(true)

const types = [
  { label: 'Доставка', type: 'delivery' },
  { label: 'Самовывоз', type: 'pickup' },
  { label: 'В зале', type: 'lounge' },
]
const currentType = ref('delivery')

const closeModal = () => {
  isShow.value = false
}
</script>

<style lang="scss" scoped>
.modal-receipt {
  width: 100vw;
  max-width: 1150px;
  height: 678px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  background: $white;
  border-radius: 40px;

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

    padding: 50px 60px;
  }

  &__map {
    width: 100%;
    height: 100%;

    border-radius: 0 40px 40px 0;
    overflow: hidden;
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
