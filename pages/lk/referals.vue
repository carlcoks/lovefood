<template>
  <div class="page-lk-referals">
    <h2 class="page-lk-referals__title">
      Реферальная система
    </h2>

    <div class="page-lk-referals__card page-lk-referals-card">
      <div class="page-lk-referals-card__content">
        <UIIcon
          name="referals"
          class="page-lk-referals-card__icon"
        />
        <div class="page-lk-referals-card__info">
          <p class="page-lk-referals-card__title">
            Пригласи друга!
          </p>
          <p class="page-lk-referals-card__text">
            Получи <b>500 ₽</b> за его первый заказ
          </p>
        </div>
      </div>

      <UIButton
        color="yellow"
        class="page-lk-referals-card__button"
      >
        Пригласить друга
      </UIButton>
    </div>

    <div class="page-lk-referals__cols">
      <div class="page-lk-referals-promocode">
        <p class="page-lk-referals-promocode__label">
          Твой промокод
        </p>
      </div>
      <p class="page-lk-referals__text">
        Это твой личный промокод, поделись им с друзьями и они получат скидку 500 руб на первый заказ.
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-referals {
  max-width: 775px;

  display: grid;
  grid-gap: 40px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }

  &__cols {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 60px;
  }

  &__text {
    @include text_normal;
    font-weight: 500;
    color: $black;
  }
}

.page-lk-referals-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 40px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &__content {
    display: flex;
    align-items: center;
    grid-gap: 30px;
  }

  &__icon {
    ::v-deep svg {
      width: 32px;
      height: 32px;
      
      path {
        fill: $blue;
      }
    }
  }

  &__info {
    display: grid;
    grid-gap: 6px;
  }

  &__title {
    @include text_big;
    font-weight: 600;
    color: $blue;
  }

  &__text {
    @include text_small;
  }

  &__button {
    font-weight: 500;
  }
}

.page-lk-referals-promocode {
  display: flex;
  align-items: center;

  &__label {
    @include text_big;
    font-weight: 600;
    color: $black;
  }
}
</style>
