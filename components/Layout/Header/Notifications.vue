<template>
  <div class="header-notifications">
    <transition-group name="slide-right" mode="out-in">
      <div
        v-for="(item, i) in cartNotifications"
        :key="i"
        class="header-notification"
      >
        <UIIcon name="cart-filled" />
        {{ item }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cart = useCartStore()

const cartNotifications = computed(() => cart.notifications)
</script>

<style lang="scss" scoped>
.header-notifications {
  position: absolute;
  top: calc(100% + 20px);
  right: 0;

  display: flex;
  flex-direction: column;
  grid-gap: 10px;
}

.header-notification {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  padding: 25px 40px;

  @include text_normal;
  font-weight: 500;
  color: $green;

  border-radius: 20px;
  background: $greenLight;

  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
}
</style>