<template>
  <div class="page-lk-promocodes">
    <h2 class="page-lk-promocodes__title">
      Мои промокоды
    </h2>

    <div
      v-if="!isLoading"
      class="page-lk-promocodes-list"
    >
      <PagesLkPromocodesItem
        v-for="(item, i) in promocodes"
        :key="i"
        :item="item"
      />
    </div>
    <div
      v-else
      class="page-lk-promocodes__loader"
    >
      <UILoader is-big />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const isLoading = ref(false)
const promocodes = ref([])

// <!-- Computed -->
const user = computed(() => userStore.user)

// <!-- Methods -->
const getPromocodes = async () => {
  isLoading.value = true

  const { data } = await useFetch('/api/wp-json/systeminfo/v1/user/avaible_coupons', {
    query: {
      user_id: user.value.id,
    },
  })

  isLoading.value = false

  promocodes.value = data?.value || []
}

getPromocodes()
</script>

<style lang="scss" scoped>
.page-lk-promocodes {
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

.page-lk-promocodes-list {
  display: flex;
  flex-direction: column;

  &__item {
    border-bottom: 1px solid $grayText2;
  }
}
</style>
