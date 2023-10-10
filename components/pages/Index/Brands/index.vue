<template>
  <div class="index-brands">
    <div class="container">
      <div class="index-brands__header">
        <h2 class="index-brands__title">
          Бренды
        </h2>

        <UIButton color="gray">
          Все бренды
          <UIIcon name="arrow" />
        </UIButton>
      </div>

      <div class="index-brands__list">
        <div
          v-for="i in 10"
          :key="i"
          class="index-brands-brand"
        >
          <div class="index-brands-brand__image">
            <img src="@/assets/images/brand-example.png" alt="">
          </div>
          <p class="index-brands-brand__name">
            Название магазина
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.index-brands {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 30px;
  }

  &__title {
    @include h2;
  }

  &__list {
    display: flex;
    align-items: flex-start;
    grid-gap: 40px;

    overflow: hidden;
  }
}

.index-brands-brand {
  display: flex;
  flex-direction: column;
  grid-gap: 18px;

  width: 160px;

  &__image {
    width: 100%;
    height: 160px;

    border: 2px solid $grayBg2;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__name {
    @include overflow-text;

    @include text_big;
    font-weight: 600;
  }
}
</style>
