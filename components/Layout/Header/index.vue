<template>
  <header class="header">
    <div class="container">
      <div class="header__box">
        <div class="header__side">
          <NuxtLink
            to="/"
            class="logo"
          >
            <UIIcon name="logo" />
          </NuxtLink>

          <LayoutHeaderInfo
            class="header__info"
          />

          <LayoutHeaderRestaurant
            class="header__restaurant"
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

          <LayoutHeaderLang />
        </div>
      </div>
    </div>

    <ModalsCart
      v-if="isShowCart"
      @close="isShowCart = false"
    />

    <ModalsAuth
      v-if="isShowAuth"
      @close="isShowAuth = false"
    />
  </header>
</template>

<script setup lang="ts">
const isShowCart = ref<true | false>(false)
const isShowAuth = ref<true | false>(false)
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

  &__info {
    flex: 0 0 auto;
  }

  &__restaurant {
    max-width: 380px;
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