<template>
  <UICounter
    v-if="productType === 'simple' && count"
    :count="count"
    @increment="increment()"
    @decrement="decrement()"
    class="add-button"
  />

  <button
    type="submit"
    class="add-button"
    @click.prevent="click()"
  >

  </button>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },

  productType: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['increment', 'decrement', 'click', 'add'])

// <!-- Computed -->
const buttonLabel = computed(() => {
  // const variants = ['variable', 'group_variable', 'group_variable_2']

  if (props.productType === 'simple') {
    return {
      text: 'В корзину',
      icon: 'add'
    }
  } else if (props.productType === 'supplements') {
    return {
      text: 'Собрать',
      icon: 'arrow'
    }
  }

  return {
    text: 'Выбрать',
    icon: 'arrow'
  }
})

// <!-- Methods -->
const click = () => {

}
</script>

<style lang="scss" scoped>
.add-button {

}
</style>