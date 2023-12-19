<template>
  <div class="index-menu-categories">
    <div class="index-menu-categories__tabs-wrap">
      <div
        ref="tabsRef"
        class="index-menu-categories__tabs"
      >
        <button
          v-for="item in categories"
          :key="item.id"
          :id="`category-tab-${item.id}`"
          type="button"
          :class="['index-menu-categories-tab', { 'active' : activeTab === item.id }]"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.name }}
        </button>

        <button
          v-if="!showMore"
          type="button"
          class="index-menu-categories-tab"
          @click.prevent="showMore = true"
        >
          Ещё+
        </button>
      </div>
    </div>

    <CommonFilterButton
      @click="emits('showFilters')"
    />
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

import scrollToEl from '@/utils/scrollToEl'

const catalogStore = useCatalogStore()

const emits = defineEmits(['showFilters'])

const tabsRef = ref(null)
const activeTab = ref(null)
const showMore = ref(false)
const positions = []
const HEIGHT = 80

const categories = computed(() => {
  const arr = catalogStore.categories

  if (!showMore.value) {
    return arr.slice(0, 9)
  }

  return arr
})

const scrollTo = (id) => {
  activeTab.value = id

  scrollToEl(`block_${id}`, HEIGHT * -1)
}

const onScroll = (e) => {
  const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) + HEIGHT

  if (scrollPosition < positions[0]?.top) {
    return activeTab.value = positions[0]?.id || null
  }

  const isset = positions.find(item => {
    if (scrollPosition >= item.top && scrollPosition <= item.bottom) {
      activeTab.value = item.id

      tabsRef.value.scroll({
        left: 0,
        behavior: 'smooth'
      })

      const el = document.getElementById(`category-tab-${item.id}`)
      if (el) {
        tabsRef.value.scroll({
          left: el.offsetLeft,
          behavior: 'smooth'
        })
      }

      return true
    }

    return false
  })

  if (!isset) {
    activeTab.value = null
  }
}

const getBlocksPositions = () => {
  categories.value.forEach(item => {
    const el = document.getElementById(`block_${item.id}`)

    if (el) {
      positions.push({
        id: item.id,
        top: el.offsetTop,
        bottom: el.offsetTop + el.scrollHeight,
      })
    }
  })
}

onMounted(() => {
  activeTab.value = categories.value[0]?.id || null

  nextTick(() => {
    getBlocksPositions()
    document.addEventListener('scroll', onScroll)
  })
})
</script>

<style lang="scss" scoped>
.index-menu-categories {
  // position: sticky;
  // top: 0;

  width: 100%;
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
    position: relative;

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
</style>
