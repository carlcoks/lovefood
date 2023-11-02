<template>
  <div class="index-menu-categories">
    <div class="index-menu-categories__tabs-wrap">
      <div class="index-menu-categories__tabs">
        <a
          v-for="(item, i) in catalog.categories"
          :key="i"
          :href="`#${item.name.toLowerCase()}`"
          :class="['index-menu-categories-tab', { 'active' : i === activeTab }]"
          @click="activeTab = i"
        >
          {{ item.name }}
        </a>
      </div>
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
import { useCatalogStore } from '@/store/catalog'

const catalog = useCatalogStore()

const emits = defineEmits(['showFilters'])

const activeTab = ref(0)
</script>

<style lang="scss" scoped>
.index-menu-categories {
  position: sticky;
  top: 0;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  grid-gap: 16px;

  z-index: 10;

  @include mq($bp-small) {
    flex-direction: row;

    padding: 8px;

    background: $grayBg2;
    border-radius: 20px;
  }

  &__tabs-wrap {
    height: 48px;

    margin: 0 -20px 0 0;

    overflow: hidden;

    @include mq($bp-small) {
      margin: 0;
    }
  }

  &__tabs {
    display: flex;
    align-items: center;
    grid-gap: 7px;

    padding-right: 20px;
    padding-bottom: 20px;

    overflow-x: auto;

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

  height: 48px;

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
    border-color: $grayBg2;
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
