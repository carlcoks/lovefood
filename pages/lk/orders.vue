<template>
  <div class="page-lk-orders">
    <h2 class="page-lk-orders__title">
      Мои заказы
    </h2>

    <div
      v-if="!isLoading"
      class="page-lk-orders-list"
    >
      <div
        v-for="(item, i) in orders"
        :key="i"
        class="page-lk-orders-list-item page-lk-orders-list__item"
      >
        <div class="page-lk-orders-list-item__col page-lk-orders-list-item__col--number">
          <p class="page-lk-orders-list-item__number">
            № {{ item.id }}
          </p>
        </div>

        <div class="page-lk-orders-list-item__col page-lk-orders-list-item__col--status">
          <div class="page-lk-orders-list-item-status">
            Готовится
          </div>
        </div>

        <div class="page-lk-orders-list-item__col page-lk-orders-list-item__col--date">
          <p class="page-lk-orders-list-item__date">
            21:30-22:00
          </p>
        </div>

        <div class="page-lk-orders-list-item__col page-lk-orders-list-item__col--images">
          <div class="page-lk-orders-list-item__images">
            <div
              v-for="item in item.line_items.slice(0, 3)"
              :key="item.id"
              class="page-lk-orders-list-item__image"
            >
              <img
                :src="item.image.src"
                alt=""
              >
            </div>
          </div>
        </div>

        <div class="page-lk-orders-list-item__col page-lk-orders-list-item__col--price">
          <CommonPriceBlock
            :price="item.total"
          />
        </div>

        <div class="page-lk-orders-list-item__col page-lk-orders-list-item__col--actions">
          <div class="page-lk-orders-list-item__actions">
            <UIButton
              color="gray"
              class="page-lk-orders-list-item__more"
            >
              Подробнее
            </UIButton>

            <button
              class="page-lk-orders-list-item__button page-lk-orders-list-item__button--cancel"
            >
              <UIIcon name="close" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="page-lk-orders__loader"
    >
      <UILoader is-big />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const config = useRuntimeConfig()

const isLoading = ref(false)
const orders = ref([])

// Computed
const user = computed(() => userStore.user)

// Methods
const getOrders = async () => {
  isLoading.value = true

  const { data } = await useMyFetch('/wp-json/wc/v2/orders', {
    query: {
      customer: user.value.id,
      consumer_key: config.public.CONSUMER_KEY,
      consumer_secret: config.public.CONSUMER_SECRET,
    },
  })

  isLoading.value = false

  orders.value = data?.value || []
}

getOrders()
</script>

<style lang="scss" scoped>
.page-lk-orders {
  max-width: 766px;

  display: grid;
  grid-gap: 20px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

.page-lk-orders-list {
  display: flex;
  flex-direction: column;

  &__item {
    border-bottom: 1px solid $grayText2;
  }
}

.page-lk-orders-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 0;

  &__col {
    flex: 0 0 auto;

    display: flex;
    align-items: center;

    &--number {
      flex: 0 0 70px;
    }

    &--status {
      flex: 0 0 120px;

      justify-content: center;
    }

    &--date {
      flex: 0 0 80px;
    }

    &--images {
      flex: 0 0 118px;
    }

    &--price {
      flex: 0 0 100px;
    }

    &--actions {
      flex: 0 0 192px;
    }
  }

  &__number {
    @include text_mini;
    font-weight: 600;
    color: $black;
  }

  &__date {
    @include text_mini;
    color: $black;
    text-align: center;
  }

  &__images {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 50px;
    height: 50px;

    transform: translateX(-16px);

    background: $grayBg;
    border: 1px solid $grayBg;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

    overflow: hidden;

    &:first-child {
      transform: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 10px;
  }

  &__more {
    height: 34px;
    font-weight: 500;
  }

  &__button {
    width: 56px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: 2px solid transparent;
    border-radius: 14px;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText3;
      }
    }

    &--cancel {
      border-color: $red;
    }

    &--repeat {
      border-color: $yellow;
    }
  }
}

.page-lk-orders-list-item-status {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  padding: 4px 12px;

  @include extra_small;
  font-weight: 600;
  color: #F2A32C;

  background: $yellowLightSecondary;
  border-radius: 16px;
}
</style>

