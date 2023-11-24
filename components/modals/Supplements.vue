<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="emits('close')"
  >
    <div class="modal-supplements">
      <div class="modal-supplements__header">
        <p class="modal-supplements__title">
          {{ item.title }}
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-supplements__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <div class="modal-supplements__body">
        <div
          v-for="(product, i) in products"
          :key="i"
          :class="['modal-supplements-item', { 'active' : supplement.find(item => item.id === product.id) }]"
          @click="selectProduct(product)"
        >
          <span
            v-if="supplement.find(item => item.id === product.id)"
            class="modal-supplements-item__check"
          >
            <UIIcon name="check" />
          </span>
          <div class="modal-supplements-item__image">
            <img :src="product.images[0]" alt="">
          </div>
          <p class="modal-supplements-item__title">
            {{ product.name }}
          </p>

          <div
            v-if="supplement.find(item => item.id === product.id)"
            class="modal-supplements-item__counter"
          >
            <button
              @click.prevent.stop="decrement(product.id)"
            >
              <UIIcon name="minus" />
            </button>
            {{ supplement.find(item => item.id === product.id)?.count || 0 }}
            <button
              @click.prevent.stop="increment(product.id)"
            >
              <UIIcon name="plus" />
            </button>
          </div>
          <div
            v-else
            class="modal-supplements-item__counter"
          >
            <UIIcon name="plus" />
            {{ product.price.toLocaleString() }} ₽
          </div>
        </div>
      </div>

      <div class="modal-supplements__footer">
        <UIButton
          type="submit"
          color="yellow"
          class="modal-supplements__button"
          @click="submit()"
        >
          Подтвердить
        </UIButton>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()
const { ingredients } = storeToRefs(catalogStore)

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },

  selected: {
    type: Array,
    default: () => ([]),
  },
})

const emits = defineEmits(['close', 'submit'])

const isShow = ref(true)
const supplement = ref(props.selected)

// Computed
const products = computed(() => {
  const products = props.item?.products || []

  return products.map(item => {
    return ingredients.value.find(ingredient => +ingredient.id === +item)
  })
})

// Methods
const closeModal = () => {
  isShow.value = false
}

const submit = () => {
  emits('submit', supplement.value)
}

const selectProduct = (obj) => {
  const data = {
    id: +obj.id,
    count: 1,
    price: +obj.price,
    name: obj.name
  }

  if (props.item.type === 'radio') {
    supplement.value = []

    supplement.value.push(data)
  } else {
    const isset = supplement.value.find((item, i) => {
      if (+item.id === +obj.id) {
        supplement.value.splice(i, 1)
        return true
      }
      return false
    })

    if (!isset) {
      supplement.value.push(data)
    }
  }
}

const increment = (id) => {
  supplement.value.find(item => {
    if (+item.id === +id) {
      item.count++
      return true
    }

    return false
  })
}

const decrement = (id) => {
  supplement.value.find((item, i) => {
    if (+item.id === +id) {
      if (item.count > 1) {
        item.count--
      } else {
        supplement.value.splice(i, 1)
      }
      return true
    }

    return false
  })
}
</script>

<style lang="scss" scoped>
.modal-supplements {
  width: 100vw;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 30px 40px;

  background: $white;
  border-radius: 40px;

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText3;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include h2;
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px 30px;
  }

  &__footer {

  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-supplements-item {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 6px 9px;

  border-radius: 20px;
  outline: 1px solid $grayBg;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  cursor: pointer;

  &.active {
    outline-width: 2px;
    outline-color: #F2A32C;
  }

  input {
    display: none;
  }

  &__check {
    position: absolute;
    top: 6px;
    right: 7px;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: #F2A32C;
      }
    }
  }

  &__image {
    width: 72px;
    height: 72px;

    margin-bottom: 4px;

    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    width: 100%;

    @include text_mini;
    text-align: center;

    margin-bottom: 8px;
  }

  &__counter {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 10px;

    width: 100%;
    height: 32px;

    margin: auto 0 0 0;

    @include text_normal;
    font-weight: 500;

    background: $grayBg;
    border-radius: 14px;
  }
}
</style>