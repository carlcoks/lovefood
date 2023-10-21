<template>
  <main class="page-lk">
    <div class="container">
      <div class="page-lk__box">
        <aside class="page-lk-aside page-lk__aside">
          <UIButton
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
            <nav class="page-lk-nav page-lk__nav">
              <ul class="page-lk-nav__list">
                <li
                  v-for="(item, i) in nav"
                  :key="i"
                  class="page-lk-nav__item"
                >
                  <NuxtLink
                    :to="item.link"
                    class="page-lk-nav-link page-lk-nav__link"
                  >
                    <span class="page-lk-nav-link__value">
                      <UIIcon
                        :name="item.icon"
                        class="page-lk-nav-link__icon"
                      />
                      {{ item.label }}
                    </span>
                    <UIIcon
                      name="arrow"
                      class="page-lk-nav-link__arrow"
                    />
                  </NuxtLink>
                </li>
              </ul>
            </nav>

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
const nav = [
  { label: 'Личная информация', link: '/lk', icon: 'person' },
  { label: 'Избранное', link: '/lk/favorite', icon: 'heart' },
  { label: 'Доступные купоны', link: '/lk/coupons', icon: 'gift' },
  { label: 'Бонусная система', link: '/lk/bonuses', icon: 'bonuses' },
  { label: 'Реферальная система', link: '/lk/referals', icon: 'referals' },
  { label: 'Предпочтения', link: '/lk/preferences', icon: 'preferences' },
  { label: 'История заказов', link: '/lk/orders', icon: 'orders' },
  { label: 'Колесо фортуны', link: '/lk/game', icon: 'wheel' },
  { label: 'История уведомлений', link: '/lk/notifications', icon: 'notifications' },
]
</script>

<style lang="scss" scoped>
.page-lk {
  padding: 40px 0;

  &__box {
    display: flex;
    align-items: flex-start;
    grid-gap: 40px;
  }

  &__aside {
    flex: 0 0 168px;
  }

  &__section {
    flex: 1 1 auto;

    display: grid;
    grid-gap: 40px;

    padding-top: 3px;
  }

  &__title {
    @include h2;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    grid-gap: 55px;
  }

  &__nav {
    flex: 0 0 395px;
  }

  &__page {
    flex: 1 1 auto;

    padding-top: 40px;
  }
}

.page-lk-aside {
  &__button {
    width: 100%;
    font-weight: 500;

    .ui-icon {
      transform: rotate(180deg);
    }
  }
}

.page-lk-nav {
  padding: 20px 40px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &__list {
    display: grid;
    grid-gap: 16px;
  }
}

.page-lk-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 0;

  @include text_big;
  font-weight: 600;

  border-bottom: 1px solid $grayText2;

  transition: border-color 0.3s;

  &.router-link-exact-active {
    border-color: $orange;

    .page-lk-nav-link {
      &__icon {
        ::v-deep svg path {
          fill: $orange;
        }
      }

      &__arrow {
        transform: rotate(180deg);

        ::v-deep svg path {
          fill: $blackText;
        }
      }
    }
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }

  &__icon {
    ::v-deep svg path {
      fill: $grayText2;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    grid-gap: 8px;
  }

  &__arrow {
    transition: transform 0.3s;

    ::v-deep svg path {
      fill: $grayText2;
    }
  }
}
</style>
