<template>
  <section class="index-menu">
    <div class="container">
      <PagesIndexMenuCategories
        class="index-menu__categories"
      />

      <div class="index-menu__content">
        <div class="index-menu__block">
          <h2 class="index-menu__title">
            Акции
          </h2>
          <div class="index-menu__list">
            <PagesIndexMenuCard
              v-for="i in 12"
              :key="i"
            />
          </div>
        </div>

        <div class="index-menu__block">
          <h2 class="index-menu__title">
            Новинки
          </h2>
          <div class="index-menu__list">
            <PagesIndexMenuCard
              v-for="i in 12"
              :key="i"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.index-menu {
  &__categories {
    margin-bottom: 40px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &__title {
    @include h2;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 30px 17px;
  }
}
</style>