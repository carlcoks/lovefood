<template>
  <div class="index-menu-categories">
    <div class="index-menu-categories__tabs">
      <button
        v-for="(item, i) in tabs"
        :key="i"
        :class="['index-menu-categories-tab', { 'active' : i === activeTab }]"
        @click.prevent="activeTab = i"
      >
        {{ item }}
      </button>
    </div>

    <button
      class="index-menu-categories-tab index-menu-categories-filter"
      @click.prevent="emits('showFilters')"
    >
      <UIIcon name="filter" />
      <span class="index-menu-categories-filter__line" />
      3
    </button>
  </div>
</template>

<script setup>
const emits = defineEmits(['showFilters'])

const tabs = ['Акции', 'Новинки', 'Пицца', 'Роллы', 'Обед/Ужин', 'Собери WOK', 'Закуски', 'Десерты', 'Напитки', 'Еще +']

const activeTab = ref(0)
</script>

<style lang="scss" scoped>
.index-menu-categories {
  position: sticky;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  grid-gap: 16px;

  z-index: 10;

  @include mq($bp-small) {
    height: 80px;

    flex-direction: row;
    grid-gap: 0;

    padding: 8px;

    background: $grayBg;
    border-radius: 20px;
  }

  &__tabs {
    display: flex;
    align-items: center;
    grid-gap: 7px;

    margin: 0 -20px 0 -16px;
    padding: 0 20px 0 16px;

    overflow: auto;

    @include mq($bp-small) {
      margin: 0;
      padding: 0;
    }
  }
}

.index-menu-categories-tab {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 15px;

  @include text_normal;
  font-weight: 500;
  white-space: nowrap;

  background: $grayBg2;
  border-radius: 14px;
  border: 2px solid $grayBg2;

  transition: background-color 0.3s;

  @include mq($bp-small) {
    background: none;
  }

  &:hover {
    background-color: $white;
    border-color: transparent;
  }

  &.active {
    background-color: $white;
    border-color: $yellow;
  }
}

.index-menu-categories-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  
  font-size: 0;

  background: $grayBg;

  @include mq($bp-small) {
    grid-gap: 10px;

    @include text_normal;
    color: $orange;

    background: $white;
  }

  &__line {
    display: none;

    @include mq($bp-small) {
      display: block;
      width: 2px;
      height: 20px;

      background: #D9D9D9;
      border-radius: 2px;
    }
  }
}
</style>
