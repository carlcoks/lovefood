<template>
  <div class="modal-receipt-delivery">
    <div class="modal-receipt-delivery__main">
      <div class="modal-receipt-delivery__header">
        <p class="modal-receipt-delivery__title">
          Укажите адрес доставки
        </p>

        <!-- <p class="modal-receipt-delivery__location">
          <UIIcon name="location" />
          Москва
        </p> -->
      </div>

      <div class="modal-receipt-delivery-form">
        <div class="modal-receipt-delivery-form__header">
          <p class="modal-receipt-delivery-form__label">
            Город, улица, дом
          </p>

          <!-- <p class="modal-receipt-delivery-form__navigate">
            <UIIcon
              name="navigate"
            />
            определить
          </p> -->
        </div>
        <div class="modal-receipt-delivery-form__lines">
          <div class="modal-receipt-delivery-form__line">
            <div class="modal-receipt-delivery-form-input">
              <input
                v-model="form.address"
                type="text"
                placeholder="Адрес"
                :class="[
                  'modal-receipt-delivery-form-input__area',
                  {
                    'modal-receipt-delivery-form-input__area--error' : addressError
                  }
                ]"
                @input="searchAddress"
              >
              <span
                v-if="addressError"
                class="modal-receipt-delivery-form-input__error"
              >
                Ваш адрес вне зоны доставки
              </span>

              <div
                v-if="isShowResults && results.length"
                class="modal-receipt-delivery-form-results"
              >
                <div
                  v-for="(item, i) in results"
                  :key="i"
                  class="modal-receipt-delivery-form-results__item"
                  @click="setAddress(item)"
                >
                  {{ item.address }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-receipt-delivery-form__line modal-receipt-delivery-form__line--cols">
            <UIInput
              v-model="form.flat"
              placeholder="Кв/офис"
              color="gray"
            />
            <UIInput
              v-model="form.entrance"
              placeholder="Подъезд"
              color="gray"
            />
            <UIInput
              v-model="form.floor"
              placeholder="Этаж"
              color="gray"
            />
            <UIInput
              v-model="form.number"
              placeholder="Домофон"
              color="gray"
            />
          </div>
          <div class="modal-receipt-delivery-form__line">
            <UITextarea
              v-model="form.comment"
              placeholder="Комментарий курьеру"
              color="gray"
              class="modal-receipt-delivery-form__textarea"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="modal-receipt-delivery__footer">
      <div class="modal-receipt-delivery__info modal-receipt-delivery-info">
        <div class="modal-receipt-delivery-info__icon">
          <UIIcon name="delivery" />
        </div>
        <div class="modal-receipt-delivery-info__content">
          <div
            v-if="!addressError && !condition"
            class="modal-receipt-delivery-info__line"
          >
            <p class="modal-receipt-delivery-info__value">
              Укажите адрес доставки
            </p>
          </div>

          <div
            v-if="addressError"
            class="modal-receipt-delivery-info__line"
          >
            <p class="modal-receipt-delivery-info__value">
              Невозможно определить стоимость доставки
            </p>
          </div>
          <div
            v-if="addressError"
            class="modal-receipt-delivery-info__line"
          >
            <p class="modal-receipt-delivery-info__value modal-receipt-delivery-info__value--red">
              Выберите корректный адрес
            </p>
          </div>

          <div
            v-if="condition"
            class="modal-receipt-delivery-info__line"
          >
            <p class="modal-receipt-delivery-info__value">
              Доставка
            </p>
            <p class="modal-receipt-delivery-info__value">
              {{ condition.time_deliv }} мин
            </p>
          </div>

          <div
            v-if="condition"
            class="modal-receipt-delivery-info__line"
          >
            <p
              v-for="(item, i) in condition.sum"
              :key="i"
              :class="[
                'modal-receipt-delivery-info__value',
                {
                  'modal-receipt-delivery-info__value--green' : +item.deliv_price === 0
                }
              ]"
            >
              <template
                v-if="+item.deliv_price === 0"
              >
                Бесплатно от {{ item.min_sum_order }} ₽
              </template>
              <template v-else>
                {{ item.deliv_price }} ₽
              </template>
            </p>
          </div>
        </div>
      </div>

      <UIButton
        :disabled="isButtonDisabled"
        color="yellow"
        class="modal-receipt-delivery__button"
        @click="submit()"
      >
        Подтвердить
      </UIButton>
    </div>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()

const props = defineProps({
  deliveryCoords: {
    type: Array,
    default: null,
  },

  deliveryZone: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['close', 'setDeliveryCoords'])

const form = reactive({
  address: '',
  flat: '',
  entrance: '',
  floor: '',
  number: '',
  comment: '',
  coords: null,
})
const results = ref([])
const isShowResults = ref(false)

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    searchByCoords(data)
  }
})

// <!-- Computed -->
const addressError = computed(() => {
  if (props.deliveryCoords && !props.deliveryZone) {
    return true
  }
  
  return false
})

const condition = computed(() => {
  if (!props.deliveryZone) {
    return null
  }

  return commonStore.conditions.find(item => item.zone === props.deliveryZone)
})

const isButtonDisabled = computed(() => {
  if (!props.deliveryZone) {
    return true
  }

  return false
})

// <!-- Methods -->
const searchAddress = async () => {
  isShowResults.value = true
  results.value = []

  if (ymaps) {
    const search = await ymaps.geocode(form.address)

    const geo = search.geoObjects.toArray();

    if (geo.length) {
      results.value = geo.map(item => {
        return {
          address: item.properties.get('text'),
          coords: item.geometry.getCoordinates()
        }
      })
    }
  }
}

const setAddress = (data) => {
  isShowResults.value = false
  
  const coords = data.coords
  
  form.address = data.address
  form.coords = coords

  emits('setDeliveryCoords', coords)
}

const searchByCoords = async (coords) => {
  if (ymaps) {
    const search = await ymaps.geocode(coords)
    const obj = search.geoObjects.get(0)

    form.address = obj.properties.get('text')
    form.coords = coords
  }
}

const submit = () => {
  userStore.setDeliveryForm(form)

  const obj = {
    address: form.address,
    name: '',
    warehouse_id: condition.value.warehouse_id
  }

  if (useChangeLocation('delivery', obj)) {
    emits('close')
  }
}

const setDefault = () => {
  if (userStore.deliveryForm) {
    for (const key in userStore.deliveryForm) {
      form[key] = userStore.deliveryForm[key]
    }

    ymaps.ready(() => {
      setTimeout(() => {
        emits('setDeliveryCoords', form.coords)
      }, 1000)
    })
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.modal-receipt-delivery {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 30px;

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__location {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_mini;
    font-weight: 600;
    color: $grayText;

    cursor: pointer;

    .ui-icon {
      width: 20px;
      height: 20px;

      ::v-deep svg path {
        fill: $grayText;
      }
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding-top: 4px;

    border-top: 1px solid $grayText2;
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}

.modal-receipt-delivery-form {
  display: flex;
  flex-direction: column;
  grid-gap: 14px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include text_small;
    font-weight: 500;
  }

  &__label {
    color: $grayText;
  }

  &__navigate {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    cursor: pointer;

    .ui-icon {
      width: 18px;
      height: 18px;

      ::v-deep svg path {
        fill: $orange;
      }
    }
  }

  &__lines {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    font-weight: 500;
  }

  &__line {
    &--cols  {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 18px;
    }
  }

  &__textarea {
    ::v-deep textarea {
      height: 80px;
    }
  }
}

.modal-receipt-delivery-info {
  display: flex;
  align-items: center;
  grid-gap: 16px;

  padding: 12px 16px;

  border-radius: 20px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background: $grayBg2;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__value {
    display: flex;
    align-items: center;

    @include text_small;
    font-weight: 500;

    &:last-child {
      &:after {
        display: none;
      }
    }

    &:after {
      content: '';

      width: 3px;
      height: 3px;

      margin: 0 5px;

      background: $grayText;
      border-radius: 50%;

      opacity: 0.3;
    }

    &--green {
      color: $green;
    }

    &--red {
      @include text_mini;
      color: $red;
    }
  }
}

.modal-receipt-delivery-form-input {
  position: relative;
  width: 100%;

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg;
    border: 1px solid $grayBg;
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

    &--error {
      border-color: $red;
    }
  }

  &__error {
    padding: 4px 0 0 16px;

    @include text_small;
    font-weight: 500;
    color: $red;
  }
}

.modal-receipt-delivery-form-results {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;

  max-height: 250px;

  display: flex;
  flex-direction: column;

  background: $grayBg;
  border-radius: 0 0 14px 14px;

  overflow-y: auto;
  overflow-x: hidden;

  &__item {
    padding: 5px 10px;

    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background: $grayText;
    }
  }
}
</style>