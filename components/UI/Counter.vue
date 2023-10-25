<template>
  <div class="counter">
    <button
      class="counter__button"
      @click.prevent="decrement()"
    >
      <UIIcon name="minus" />
    </button>

    <span class="counter__count">
      {{ count }}
    </span>

    <button
      class="counter__button"
      @click.prevent="increment()"
    >
      <UIIcon name="plus" />
    </button>
  </div>
</template>

<script setup>
const count = ref(1)

const decrement = () => {
  if (count.value === 0) {
    return false
  }

  count.value--
}

const increment = () => {
  count.value++
}
</script>

<style lang="scss" scoped>
.counter {
  width: 130px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @include text_normal;
  font-weight: 500;

  border-radius: 14px;
  background: $grayBg;

  &__button {
    height: 32px;

    padding: 6px 10px;
  }
}
</style>