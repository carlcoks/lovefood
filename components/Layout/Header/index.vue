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

          <LayoutHeaderSearch
            class="header__search"
          />

          <LayoutHeaderRestaurant
            class="header__restaurant"
          />
        </div>

        <div class="header__side header__side--right">
          <UIButton>
            <UIIcon name="menu" />
            Бронь столов
          </UIButton>

          <UIButton color="yellow">
            Корзина
          </UIButton>

          <UIButton color="gray">
            <UIIcon name="person" />
            Войти
          </UIButton>

          <div class="header-action">
            <UIIcon name="ruble" />
            Рубль
          </div>

          <div class="header-action">
            <UIIcon name="world" />
            Русский
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
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

  &__search {
    max-width: 390px;
  }

  &__restaurant {
    max-width: 380px;
  }
}

.header-action {
  @include text_mini;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 4px;

  padding: 0 4px;

  color: $grayText;
}
</style>