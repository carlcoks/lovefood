<template>
  <header class="header">
    <div class="container">
      <div class="header__box">
        <div class="header__side">
          <NuxtLink
            to="/"
            class="header__logo logo"
          >
            <UIIcon name="logo" />
          </NuxtLink>

          <LayoutHeaderInfo
            class="header__info"
          />

          <LayoutHeaderRestaurant
            class="header__restaurant"
            @click="isShowReceipt = true"
          />

          <LayoutHeaderSearch
            class="header__search"
          />
        </div>

        <div class="header__side header__side--right">
          <UIButton
            class="header__button"
            color="yellow"
            @click.prevent="isShowCart = true"
          >
            <UIIcon name="cart" />
            Корзина
          </UIButton>

          <UIButton
            class="header__button"
            color="gray"
            @click.prevent="isShowAuth = true"
          >
            <UIIcon name="person-outline" />
            Войти
          </UIButton>

          <div />

          <LayoutHeaderLang
            @click="isShowSettings = true"
          />
        </div>
      </div>
    </div>

    <ModalsReceipt
      v-if="isShowReceipt"
      @close="isShowReceipt = false"
    />

    <ModalsCart
      v-if="isShowCart"
      @close="isShowCart = false"
    />

    <ModalsAuth
      v-if="isShowAuth"
      @close="isShowAuth = false"
    />

    <ModalsSettings
      v-if="isShowSettings"
      @close="isShowSettings = false"
    />

    <ModalsAcceptCity
      v-if="isShowAcceptCity"
      @close="isShowAcceptCity = false"
    />
  </header>
</template>

<script setup lang="ts">
const isShowCart = ref<true | false>(false)
const isShowAuth = ref<true | false>(false)
const isShowAcceptCity = ref<true | false>(false)
const isShowSettings = ref<true | false>(false)
const isShowReceipt = ref<true | false>(false)

onMounted(() => {
  // setTimeout(() => {
  //   isShowAcceptCity.value = true
  // }, 2000)
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  height: 80px;

  background: $white;
  border-bottom: 1px solid $grayBg;

  z-index: 1000;

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 40px;

    padding: 14px 0;
  }

  &__side {
    flex: 1 1 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 40px;

    &--right {
      flex: 0 0 auto;

      grid-gap: 12px;
    }
  }

  &__logo {
    flex: 0 0 auto;
  }

  &__info {
    flex: 0 0 auto;
  }

  &__restaurant {
    flex: 0 0 auto;
    max-width: 380px;
  }

  &__search {
    flex: 1 1 auto;
  }

  &__button {
    font-weight: 500;
  }
}

.header-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 4px;

  padding: 0 4px;

  color: $grayText;
  
  font-weight: 500;
  @include text_mini;
}
</style>