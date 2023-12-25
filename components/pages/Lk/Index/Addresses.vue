<template>
  <div class="pages-lk-addresses">
    <div class="pages-lk-addresses__header">
      <p class="pages-lk-addresses__title">
        Сохраненные адреса
      </p>

      <UIButton
        color="yellow"
        class="pages-lk-addresses__button"
      >
        <UIIcon name="add" />
        Добавить новый адрес
      </UIButton>
    </div>

    <div
      v-if="isLoading"
      class="pages-lk-addresses__loader"
    >
      <UILoader is-big />
    </div>

    <div
      v-else-if="!isLoading && addresses.length"
      class="pages-lk-addresses__list"
    >
      <!-- {{ addresses }} -->
      <!-- <div class="pages-lk-address">
        <div class="pages-lk-address__icon">
          <UIIcon name="house" />
        </div>
        <div class="pages-lk-address__content">
          <div class="pages-lk-address__info">
            <p class="pages-lk-address__name">
              Дом
            </p>
            <p class="pages-lk-address__address">
              г. Москва, Ул. Стандартная, 21к1
            </p>
          </div>
          <a
            href="#"
            class="pages-lk-address__edit"
            @click.prevent=""
          >
            <UIIcon name="pencil" />
          </a>
        </div>
      </div> -->
      <!-- <div class="pages-lk-address">
        <div class="pages-lk-address__icon">
          <UIIcon name="briefcase" />
        </div>
        <div class="pages-lk-address__content">
          <div class="pages-lk-address__info">
            <p class="pages-lk-address__name">
              Работа
            </p>
            <p class="pages-lk-address__address">
              г. Москва, Ул. Стандартная, 21к1
            </p>
          </div>
          <a
            href="#"
            class="pages-lk-address__edit"
            @click.prevent=""
          >
            <UIIcon name="pencil" />
          </a>
        </div>
      </div>
      <div class="pages-lk-address">
        <div class="pages-lk-address__icon">
          <UIIcon name="metka" />
        </div>
        <div class="pages-lk-address__content">
          <div class="pages-lk-address__info">
            <p class="pages-lk-address__name">
              Ул. Стандартная, 21к1
            </p>
            <p class="pages-lk-address__address">
              г. Москва
            </p>
          </div>
          <a
            href="#"
            class="pages-lk-address__edit"
            @click.prevent=""
          >
            <UIIcon name="pencil" />
          </a>
        </div>
      </div> -->
    </div>

    <div
      v-else
      class="pages-lk-addresses__empty"
    >
      Нет добавленных адресов
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const isLoading = ref(false)
const addresses = ref([])

const getAddresses = async () => {
  isLoading.value = true

  const { data } = await useFetch('/api/wp-json/wc/auth/user/get_addresses', {
    query: {
      token: userStore.token
    }
  })

  isLoading.value = false

  if (data?.value) {
    addresses.value = data.value
  }
}

getAddresses()
</script>

<style lang="scss" scoped>
.pages-lk-addresses {
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
    display: none;

    @include mq($bp-medium) {
      display: flex;
      font-weight: 500;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 50px 0;
  }

  &__empty {
    @include text_normal;
    font-weight: 600;
    color: $grayText;
  }
}

.pages-lk-address {
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