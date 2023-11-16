<template>
  <div class="price-block">
    <small v-if="+regularPrice !== +price">
      {{ regularPrice.toLocaleString() }} ₽
    </small>
    {{ price.toLocaleString() }} ₽
  </div>
</template>

<script setup>
defineProps({
  regularPrice: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    default: 0,
  }
})
</script>

<style lang="scss" scoped>
.price-block {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  color: $orange;

  @include text_normal;
  font-weight: 600;

  small {
    @include extra_small;
    color: $grayText;
    text-decoration: line-through;
  }
}
</style>