<template>
  <NuxtLink
    to="/"
    class="logo"
  >
    <UIIcon :name="isSmall ? 'logo-small' : 'logo'" />
  </NuxtLink>
</template>

<script setup>
defineProps({
  isSmall: {
    type: Boolean,
    default: false
  }
})
</script>