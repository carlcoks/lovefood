<template>
  <div class="cart-notifications">
    <transition-group name="slide-right">
      <div
        v-for="(item, i) in cartNotifications"
        :key="i"
        class="cart-notification"
      >
        <UIIcon name="cart-filled" class="cart-notification__icon" />
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()

const cartNotifications = computed(() => cartStore.notifications)
</script>

<style lang="scss" scoped>
.cart-notifications {
  position: absolute;
  right: 0;
  bottom: calc(54px + 20px);
  left: 0;

  display: flex;
  flex-direction: column;
  grid-gap: 10px;

  @include mq($bp-small) {
    top: calc(100% + 20px);
    bottom: unset;
    left: unset;
  }
}

.cart-notification {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  padding: 12px 40px;

  @include text_normal;
  font-weight: 500;
  color: $green;

  background: $greenLight;
  border-radius: 20px;
  border: 1px solid $greenDark;

  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  @include mq($bp-small) {
    padding: 25px 40px;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>