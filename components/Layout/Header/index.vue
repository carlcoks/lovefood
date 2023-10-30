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

          <div class="header__top">
            <LayoutHeaderRestaurant
              class="header__restaurant"
              @click="isShowReceipt = true"
            />

            <button
              type="button"
              class="header__burger burger"
              @click.prevent="isShowMobileMenu = true"
            >
              <span />
            </button>
          </div>

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
const isShowMobileMenu = ref<true | false>(false)

onMounted(() => {
  // setTimeout(() => {
  //   isShowAcceptCity.value = true
  // }, 2000)
})
</script>

<style lang="scss" scoped>
.header {
  // position: fixed;
  // top: 0;
  // right: 0;
  // left: 0;

  display: flex;
  align-items: center;

  background: $white;

  z-index: 1000;

  @include mq($bp-small) {
    height: 80px;

    border-bottom: 1px solid $grayBg;
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 40px;

    padding: 15px 0;

    @include mq($bp-small) {
      padding: 14px 0;
    }
  }

  &__side {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    

    @include mq($bp-small) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      grid-gap: 40px;
    }

    &--right {
      display: none;

      @include mq($bp-small) {
        display: flex;

        flex: 0 0 auto;

        grid-gap: 12px;
      }
    }
  }

  &__logo {
    flex: 0 0 auto;

    display: none;
  }

  &__info {
    flex: 0 0 auto;

    display: none;
  }

  &__top {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__restaurant {
    flex: 0 0 auto;
    max-width: 380px;
  }

  &__burger {
    display: flex;

    @include mq($bp-small) {
      display: none;
    }
  }

  &__search {
    flex: 1 1 auto;
  }

  &__button {
    font-weight: 500;
  }
}

.burger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 5px;

  width: 40px;
  height: 40px;

  &:before,
  &:after {
    content: '';
  }

  &:before,
  &:after,
  span {
    width: 30px;
    height: 3px;

    background: #262626;
    border-radius: 50px;
  }
}
</style>