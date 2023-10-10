<template>
  <div class="index-menu-categories">
    <div class="index-menu-categories__tabs">
      <button
        v-for="(item, i) in tabs"
        :key="i"
        class="index-menu-categories-tab"
      >
        {{ item }}
      </button>
    </div>

    <button class="index-menu-categories-tab index-menu-categories-filter">
      <UIIcon name="filter" />
      <span class="index-menu-categories-filter__line" />
      3
    </button>
  </div>
</template>

<script setup>
const tabs = ['Акции', 'Новинки', 'Пицца', 'Роллы', 'Обед/Ужин', 'Собери WOK', 'Закуски', 'Десерты', 'Напитки', 'Еще +']
</script>

<style lang="scss" scoped>
.index-menu-categories {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px;

  background: $grayBg;
  border-radius: 20px;

  &__tabs {
    display: flex;
    align-items: center;
    grid-gap: 7px;
  }
}

.index-menu-categories-tab {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 15px;

  @include text_normal;
  font-weight: 500;

  border-radius: 14px;

  transition: background-color 0.3s;

  &:hover, &.active {
    background-color: $white;
  }
}

.index-menu-categories-filter {
  grid-gap: 10px;

  color: $orange;

  background: $white;

  &__line {
    width: 2px;
    height: 20px;

    background: #D9D9D9;
    border-radius: 2px;
  }
}
</style>
