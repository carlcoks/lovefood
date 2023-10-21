<template>
  <div class="page-lk-personal">
    <h2 class="page-lk-personal__title">
      Личная информация
    </h2>

    <form class="page-lk-personal__form">
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Имя
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            value="Антон"
            color="white"
          />
          <UIIcon
            name="pencil"
            class="page-lk-personal__icon"
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Номер телефона
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            value="+7 999 000 00 00"
            color="white"
            disabled
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          E-mail
          <UIIcon name="info" />
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            value="Huhbu729@gmail.com"
            color="white"
          />
          <UIIcon
            name="pencil"
            class="page-lk-personal__icon"
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Дата рождения
          <UIIcon name="info" />
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            value="25 Июля 1989"
            color="white"
            disabled
          />
        </div>
      </div>
      <div class="page-lk-personal__line">
        <p class="page-lk-personal__label">
          Пол
        </p>
        <div class="page-lk-personal__value">
          <UIInput
            value="Мужской"
            color="white"
            disabled
          />
        </div>
      </div>
    </form>

    <div class="page-lk-personal__buttons">
      <UIButton
        color="orange"
        class="page-lk-personal__button"
      >
        Выйти из аккаунта
      </UIButton>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-personal {
  max-width: 770px;

  display: grid;
  grid-gap: 40px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }

  &__form {
    display: grid;
    grid-gap: 16px;
  }

  &__line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_normal;
    font-weight: 500;

    ::v-deep(.ui-icon) svg path {
      fill: $grayText2;
    }
  }

  &__value {
    position: relative;

    width: 100%;
    max-width: 560px;

    font-weight: 500;
  }

  &__icon {
    position: absolute;

    top: 16px;
    right: 15px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__button {
    font-weight: 500;
  }
}
</style>