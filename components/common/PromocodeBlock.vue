<template>
  <form
    :class="[
      'promocode-block',
      {
        'promocode-block--cart' : inCart,
        'promocode-block--error' : !!promocodeError
      }
    ]"
    @submit.prevent="onSubmit()"
  >
    <span class="promocode-block__icon">
      <UIIcon name="promocode" />
    </span>
    <input
      v-model.trim="promocode"
      type="text"
      placeholder="Промокод"
      :disabled="isLoading"
      class="promocode-block__input"
    >

    <div class="promocode-block__actions">
      <button
        v-if="!!promocodeError"
        class="promocode-block__action"
        @click.prevent.stop="onReset()"
      >
        Сбросить
      </button>
      <button
        v-else
        :disabled="isLoading"
        type="submit"
        class="promocode-block__action"
      >
        {{ isLoading ? 'Применяем...' : 'Применить' }}
      </button>
    </div>

    <span
      v-if="!!promocodeError"
      class="promocode-block__error"
    >
      {{ promocodeError }}
    </span>
  </form>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)

defineProps({
  inCart: {
    type: Boolean,
    default: false,
  },
})

const promocode = ref('')
const promocodeError = ref('')
const isLoading = ref(false)

watch(() => promocode.value, () => {
  promocodeError.value = ''
})

const onReset = () => {
  promocode.value = ''
  promocodeError.value = ''
}

const onSubmit = async () => {
  if (isLoading.value) {
    return false
  }

  isLoading.value = true

  const obj = {}

  obj.coupon_code = promocode.value

  obj.line_items = cartItems.value.map(item => {
    return {
      product_id: item.id,
      quantity: item.count,
    }
  })

  const { data, error } = await useFetch('/api/wp-json/api/flutter_woo/coupon', {
    method: 'POST',
    body: obj
  })

  if (error?.value) {
    const message = error?.value?.data?.message || 'Не удалось применить промокод'

    promocodeError.value = message
  }

  isLoading.value = false
}
</script>

<style lang="scss" scoped>
.promocode-block {
  position: relative;

  width: 100%;

  &--error {
    .promocode-block {
      &__input {
        border-color: $red;
      }

      &__actions {
        &:before {
          background: $orangeLight;
        }
      }

      &__action {
        color: $red;
      }
    }
  }

  &--cart {
    .promocode-block {
      &__error {
        top: 100%;

        @include text_mini;
        font-weight: 500;
      }
    }
  }

  &__icon {
    position: absolute;
    top: 12px;
    left: 16px;
    bottom: 12px;

    z-index: 1;
  }

  &__input {
    width: 100%;
    height: 48px;

    padding: 12px 16px 12px 52px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg2;
    border: 1px solid $grayBg2;
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: $grayText;
    }
    &:-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &::-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: $grayText;
    }
    &::-ms-input-placeholder {
      color: $grayText;
    }
    &::placeholder {
      color: $grayText;
    }
  }

  &__actions {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    padding-right: 4px;

    &:before {
      content: '';

      display: block;

      width: 2px;
      height: 20px;

      background: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
    }
  }

  &__action {
    height: 100%;

    padding: 0 16px;

    @include text_normal;
    font-weight: 500;
    color: $grayText;

    background: none;
    border: none;
  }

  &__error {
    position: absolute;
    top: calc(100% + 4px);
    left: 16px;

    @include text_small;
    font-weight: 500;
    color: $red;
  }
}
</style>