<template>
  <main class="page-lk">
    <div class="container">
      <div class="page-lk__box">
        <aside class="page-lk-aside page-lk__aside">
          <UIButton
            to="/"
            color="yellow"
            class="page-lk-aside__button"
          >
            <UIIcon name="arrow" />
            В меню
          </UIButton>
        </aside>

        <section class="page-lk__section">
          <h1 class="page-lk__title">
            Личный кабинет
          </h1>

          <div class="page-lk__content">
            <PagesLkNavigation
              class="page-lk__navigation"
            />

            <div class="page-lk__page">
              <NuxtPage :page-key="route => route.fullPath" class="page-lk__page" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk {
  padding: 10px 0 40px;

  @include mq($bp-medium) {
    padding: 40px 0;
  }

  &__box {
    display: flex;
    align-items: flex-start;
    grid-gap: 40px;
  }

  &__aside {
    display: none;

    @include mq($bp-medium) {
      display: block;
      flex: 0 0 168px;
    }
  }

  &__section {
    flex: 1 1 auto;

    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium) {
      padding-top: 3px;
    }
  }

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include h2;
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    grid-gap: 55px;
  }

  &__navigation {
    display: none;

    @include mq($bp-medium) {
      display: block;
      flex: 0 0 395px;
    }
  }

  &__page {
    flex: 1 1 auto;

    @include mq($bp-medium) {
      padding-top: 40px;
    }
  }
}

.page-lk-aside {
  &__button {
    width: 100%;
    justify-content: flex-start;
    font-weight: 500;

    .ui-icon {
      transform: rotate(180deg);
    }
  }
}
</style>
