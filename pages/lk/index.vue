<template>
  <div class="page-lk-personal">
    <h2 class="page-lk-personal__title">
      Личная информация
    </h2>

    <div class="page-lk-personal-user">
      <div class="page-lk-personal-user__info">
        <div class="page-lk-personal-user__image">
          C
        </div>
        <p class="page-lk-personal-user__name">
          Светлана Длиннаяфамилия
        </p>
      </div>

      <button
        class="page-lk-personal-user__button"
        @click.prevent="logout()"
      >
        <UIIcon name="logout" />
        Выйти
      </button>
    </div>

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

    <div class="page-lk-personal-addresses">
      <div class="page-lk-personal-addresses__header">
        <p class="page-lk-personal-addresses__titl">
          Сохраненные адреса
        </p>

        <UIButton
          color="yellow"
          class="page-lk-personal-addresses__button"
        >
          <UIIcon name="add" />
          Добавить новый адрес
        </UIButton>
      </div>

      <div class="page-lk-personal-addresses__list">
        <div class="page-lk-personal-address">
          <div class="page-lk-personal-address__icon">
            <UIIcon name="house" />
          </div>
          <div class="page-lk-personal-address__content">
            <div class="page-lk-personal-address__info">
              <p class="page-lk-personal-address__name">
                Дом
              </p>
              <p class="page-lk-personal-address__address">
                г. Москва, Ул. Стандартная, 21к1
              </p>
            </div>
            <a
              href="#"
              class="page-lk-personal-address__edit"
              @click.prevent=""
            >
              <UIIcon name="pencil" />
            </a>
          </div>
        </div>
        <div class="page-lk-personal-address">
          <div class="page-lk-personal-address__icon">
            <UIIcon name="briefcase" />
          </div>
          <div class="page-lk-personal-address__content">
            <div class="page-lk-personal-address__info">
              <p class="page-lk-personal-address__name">
                Работа
              </p>
              <p class="page-lk-personal-address__address">
                г. Москва, Ул. Стандартная, 21к1
              </p>
            </div>
            <a
              href="#"
              class="page-lk-personal-address__edit"
              @click.prevent=""
            >
              <UIIcon name="pencil" />
            </a>
          </div>
        </div>
        <div class="page-lk-personal-address">
          <div class="page-lk-personal-address__icon">
            <UIIcon name="metka" />
          </div>
          <div class="page-lk-personal-address__content">
            <div class="page-lk-personal-address__info">
              <p class="page-lk-personal-address__name">
                Ул. Стандартная, 21к1
              </p>
              <p class="page-lk-personal-address__address">
                г. Москва
              </p>
            </div>
            <a
              href="#"
              class="page-lk-personal-address__edit"
              @click.prevent=""
            >
              <UIIcon name="pencil" />
            </a>
          </div>
        </div>
      </div>
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

    width: 16px;
    height: 16px;

    ::v-deep svg path {
      fill: #262626;
    }
  }
}

.page-lk-personal-user {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 30px;

  @include text_normal;

  background: $grayBg2;
  border-radius: 20px;

  &__info {
    display: flex;
    align-items: center;
    grid-gap: 12px;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    @include text_large;
    font-weight: 700;
    color: $blue;

    background: $white;
    border: 2px solid $blue;
    border-radius: 50%;
  }

  &__name {
    @include overflow-text;
    font-weight: 600;
  }

  &__button {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    
    font-weight: 500;

    color: $grayText;
  }
}

.page-lk-personal-addresses {
  display: flex;
  flex-direction: column;
  grid-gap: 30px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_big;
    font-weight: 600;
  }

  &__button {
    font-weight: 500;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }
}

.page-lk-personal-address {
  display: grid;
  align-items: center;
  grid-template-columns: 40px 1fr;
  grid-gap: 16px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    grid-gap: 12px;

    padding: 12px 0;

    border-bottom: 1px solid $grayText2;
  }

  &__info {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__name {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
  }

  &__address {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }
}
</style>