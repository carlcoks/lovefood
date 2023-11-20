<template>
  <header class="header">
    <div class="container">
      <div class="header__box">
        <div class="header__side">
          <LayoutHeaderLogo
            :is-small="isShowCategories"
            class="header__logo"
          />

          <transition name="fade" mode="out-in">
            <div
              v-if="!isShowCategories"
              class="header__side"
            >
              <LayoutHeaderInfo
                class="header__info"
              />

              <div class="header__top">
                <LayoutHeaderRestaurant
                  v-if="!isMobileOrTablet || route.fullPath === '/'"
                  class="header__restaurant"
                  @click="isShowReceipt = true"
                />
                <NuxtLink
                  v-else
                  to="/"
                  class="header__back"
                >
                  <UIIcon name="arrow" />
                  {{ pageTitle }}
                </NuxtLink>

                <button
                  type="button"
                  class="header__burger burger"
                  @click.prevent="isShowMobileMenu = true"
                >
                  <UIIcon name="burger" />
                </button>
              </div>

              <LayoutHeaderSearch
                v-if="!isMobileOrTablet || route.fullPath === '/'"
                class="header__search"
              />
            </div>

            <PagesIndexMenuCategories
              v-else
              class="header__categories"
            />
          </transition>
        </div>

        <div class="header__side header__side--right">
          <LayoutHeaderCart />

          <transition name="fade" mode="out-in">
            <div
              v-if="!isShowCategories"
              class="header__side header__side--right"
            >
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
          </transition>
        </div>

        <CommonCartNotifications class="header__notifications" />
      </div>
    </div>

    <ModalsReceipt
      v-if="isShowReceipt"
      @close="isShowReceipt = false"
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

    <transition name="mobile-menu" mode="out-in">
      <LayoutHeaderMobileMenu
        v-if="isShowMobileMenu"
        @auth="isShowAuth = true"
        @close="isShowMobileMenu = false"
      />
    </transition>
  </header>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()
const route = useRoute()

const isShowAuth = ref<true | false>(false)
const isShowAcceptCity = ref<true | false>(false)
const isShowSettings = ref<true | false>(false)
const isShowReceipt = ref<true | false>(false)
const isShowMobileMenu = ref<true | false>(false)

const isShowCategories = ref(false)

const isMobileOrTablet = computed(() => commonStore.isMobileOrTablet)

const pageTitle = computed(() => {
  if (route.fullPath === '/order') {
    return 'Оформление заказа'
  }
  return ''
  // return 'Рестораны'
})

const onScroll = () => {
  const top = document.getElementById('categories')?.getBoundingClientRect().top || null

  if (top !== null && top <= 0) {
    isShowCategories.value = true
  } else {
    isShowCategories.value = false
  }
}

onMounted(() => {
  document.addEventListener('scroll', onScroll)
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

  background: $white;

  z-index: 1000;

  @include mq($bp-medium) {
    height: 80px;

    border-bottom: 1px solid $grayBg;
  }

  &__box {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 40px;

    padding: 15px 0;

    @include mq($bp-medium) {
      padding: 14px 0;
    }
  }

  &__side {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    

    @include mq($bp-medium) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      grid-gap: 40px;
    }

    &--right {
      display: none;

      @include mq($bp-medium) {
        display: flex;

        flex: 0 0 auto;

        grid-gap: 12px;
      }
    }
  }

  &__logo {
    flex: 0 0 auto;

    display: none;

    @include mq($bp-medium) {
      display: block;
    }
  }

  &__categories {
    flex: 1 1 auto;
  }

  &__info {
    flex: 0 0 auto;
  }

  &__top {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;

    @include mq($bp-medium) {
      grid-gap: 0;
    }
  }

  &__back {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_large;
    font-weight: 700;

    .ui-icon {
      transform: rotate(180deg);
    }
  }

  &__restaurant {
    flex: 1 1 auto;
    max-width: 350px;
  }

  &__burger {
    display: flex;

    @include mq($bp-medium) {
      display: none;
    }
  }

  &__search {
    flex: 1 1 auto;
  }

  &__button {
    font-weight: 500;
    padding: 12px 20px 12px 15px;
  }

  &__notifications {
    display: none;

    @include mq($bp-medium) {
      display: flex;
    }
  }
}
</style>