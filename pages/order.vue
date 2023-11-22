<template>
  <main class="page-order">
    <div class="container">
      <div class="page-order__box">
        <section class="page-order__section">
          <div class="page-order__content">
            <h1 class="page-order__title">
              Оформление заказа
            </h1>

            <div class="page-order__block">
              <div class="page-order-delivery-types">
                <div class="page-order-delivery-types__wrap">
                  <div class="page-order-delivery-types__list">
                    <button
                      v-for="(item, i) in deliveryTypes"
                      :key="i"
                      :class="['page-order-delivery-type', { 'active' : item.type === deliveryType }]"
                    >
                      <UIIcon :name="item.type" />
                      {{ item.label }}
                    </button>
                  </div>
                </div>
              </div>

              <transition name="fade" mode="out-in">
                <PagesOrderDeliveryBlock
                  v-if="deliveryType === 'delivery'"
                />
              </transition>

              <PagesOrderAddressBlock
                :delivery-type="deliveryType"
              />
            </div>

            <PagesOrderFormBlock
              v-model="userData"
            />

            <div class="page-order-delivery-time">
              <p class="page-order__subtitle">
                Выберите время доставки
              </p>
              <div class="page-order-delivery-time__list">
                <div class="page-order-delivery-time__list-wrap">
                  <button
                    v-for="(item, i) in deliveryTimes"
                    :key="i"
                    :class="['page-order-delivery-time__button', { 'active' : i === deliveryTime}]"
                    @click.prevent="deliveryTime = i"
                  >
                    {{ item }}
                  </button>
                </div>
              </div>
            </div>

            <div class="page-order__row">
              <PagesOrderPromocodeBlock />

              <PagesOrderBonusBlock />
            </div>

            <PagesOrderPaymentsBlock
              :payment-methods="paymentMethods"
              v-model="paymentMethod"
            />
          </div>

          <PagesOrderButtonsBlock
            :is-loading="isLoading"
            class="page-order__buttons page-order__buttons--desktop"
            @submit="order"
          />
        </section>

        <aside class="page-order__aside page-order-aside">
          <div class="page-order-steps page-order-aside__steps">
            <div class="page-order-step active">
              <div class="page-order-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-step__label">
                Корзина
              </p>
            </div>
            <div class="page-order-step active">
              <div class="page-order-step__number">
                2
              </div>
              <p class="page-order-step__label">
                Оформление заказа
              </p>
            </div>
            <div class="page-order-step">
              <div class="page-order-step__number">
                3
              </div>
              <p class="page-order-step__label">
                Заказ принят
              </p>
            </div>
          </div>

          <PagesOrderComposition />
        </aside>

        <PagesOrderButtonsBlock
          :is-loading="isLoading"
          class="page-order__buttons page-order__buttons--mobile"
          @submit="order"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

const cartStore = useCartStore()
const commonStore = useCommonStore()

const { cartItems, cartItemsLength } = storeToRefs(cartStore)

const deliveryTypes = [
  { label: 'Доставка', type: 'delivery' },
  { label: 'Самовывоз', type: 'pickup' },
  { label: 'В зале', type: 'lounge' },
]

const deliveryTimes = [
  'Ближайшее время: 38 минут',
  '15:00-15:30',
  '15:30-16:00',
  '16:00-16:30',
  'Другое время',
]

const isLoading = ref(false)
const deliveryType = ref('delivery')
const deliveryTime = ref(0)

const userData = reactive({
  name: '',
  nameError: '',
  phone: '',
  phoneError: '',
})

const paymentMethods = ref([])
const paymentMethod = ref(null)

const selectedLocation = computed(() => commonStore.selectedLocation)
const currentDeliveryType = computed(() => commonStore.deliveryType)
const selectedPaymentMethod = computed(() => paymentMethods.value.find(item => item.id === paymentMethod.value))

// Methods
const order = async () => {
  if (isLoading.value) {
    return false
  }

  if (!userData.name) {
    userData.nameError = 'Введите имя'
    return false
  }
  if (!userData.phone) {
    userData.phoneError = 'Введите телефон'
    return false
  }

  let obj = {
    promo: null,

    set_paid: false,

    // environment_information: {
    //   platform: platform.os.family,
    //   app_version: platform.os.version,
    //   build_number: platform.os.architecture
    // },

    payment_method: selectedPaymentMethod.value.id,
    payment_method_title: selectedPaymentMethod.value.title,

    billing: {
      first_name: userData.name,
      phone: userData.phone,
      country: 'RU',
      address_1: selectedLocation.value.address,
      warehouse_id: selectedLocation.value.warehouse_id
    },

    shipping: {
      first_name: userData.name,
      phone: userData.phone,
      country: 'RU',
      address_1: selectedLocation.value.address,
      warehouse_id: selectedLocation.value.warehouse_id
    },
  }

  
  obj.line_items = cartItems.value.map(item => {
    return {
      product_id: item.id,
      quantity: item.count,
      type: 'main'
    }
  })

  const bonuses = 0

  // if (this.$root.cartData.coupons.length != 0) {
  //   let coupons = []
  //   for(var code in this.$root.cartData.coupons) {
  //     let el = this.$root.cartData.coupons[code]
  //     let couponItem = {
  //       amount: el.value,
  //       code: el.code,
  //       discount_type: el.type
  //     }

  //     coupons.push(couponItem)
  //     if (el.total) bonuses += el.total;
  //   }

  //   data.coupon_lines = coupons;
  // }
  obj.bonuses = bonuses

  // if (this.$root.user.auth) {
  //   data.customer_id = this.$root.userData.id
  // }

  const consumer_key = 'ck_8e9043f849e95e6d003c3cc2474fc22b2ed01eec'
  const consumer_secret = 'cs_74c746f821c405606c0950997a33b194ffc06876'

  let query = {
    consumer_key,
    consumer_secret
  }
  // if (this.$root.user.auth) {
  //   query.customer = this.$root.userData.id
  // }
  query = new URLSearchParams(query).toString()

  isLoading.value = true

  const { data } = await useMyFetch('/wp-json/wc/v3/orders', {
    method: 'post',
    query,
    body: obj
  })

  isLoading.value = false

  console.log('data', data)

  cartStore.clearCart()

  // axios.post(config.api.newOrder + '?' + query, data).then(res => {
  //   this.loading = false

  //   try {
  //     this.$cart.clear()
  //     this.$router.push({ name: 'orderInfo', params: { hash: res.data.order_key } })
  //   } catch(e) {
  //     // err
  //   }
  // }).catch(() => {
  //   this.loading = false
  //   this.$cart.clearCoupons()
  //   alert('Произошла ошибка сервера, попробуйте еще раз.')
  // })
}

// const checkAvailable = () => {
//   if (!selectedLocation.value || !cartItemsLength) {
//     return navigateTo('/')
//   }
// }

const getPaymentMethods = async () => {
  const { data } = await useMyFetch('/wp-json/systeminfo/v1/payment_methods')

  const methods = data?.value || []
  paymentMethods.value = methods.filter(item => item.enabled)

  if (methods.length) {
    paymentMethod.value = methods[0]?.id
  }
}

onMounted(() => {
  if (currentDeliveryType.value) {
    deliveryType.value = currentDeliveryType.value
  }
})

// checkAvailable()
getPaymentMethods()
</script>

<style lang="scss" scoped>
.page-order {
  padding: 10px 0 60px;

  @include mq($bp-medium) {
    padding: 60px 0;
  }

  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    grid-gap: 40px;

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  &__section {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 60px;

    @include mq($bp-medium) {
      max-width: 767px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &__block {
    display: grid;
    grid-gap: 20px;

    @include mq($bp-medium) {
      grid-gap: 24px;
    }
  }

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;

      @include h2;
      color: $black;
    }
  }

  &__subtitle {
    @include text_large;
    font-weight: 700;
  }

  &__row {
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 60px;
    }
  }

  &__aside {
    width: 100%;

    @include mq($bp-medium) {
      flex: 0 0 432px;
    }
  }

  &__buttons {
    &.page-order__buttons {
      &--desktop {
        display: none;

        @include mq($bp-medium) {
          display: flex;
        }
      }

      &--mobile {
        display: flex;

        @include mq($bp-medium) {
          display: none;
        }
      }
    }
  }
}

.page-order-delivery-types {
  height: 58px;

  margin: 0 -20px;

  overflow: hidden;

  @include mq($bp-medium) {
    height: auto;
    margin: 0;
  }

  &__wrap {
    padding: 0 16px 20px;

    overflow: auto;

    @include mq($bp-medium) {
      padding: 0;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    padding: 5px;

    background: $grayBg2;
    border-radius: 20px;
  }
}

.page-order-delivery-type {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  padding: 12px 15px;
  color: $grayText;
  font-weight: 600;

  background: none;
  border-radius: 14px;
  border: 0;

  transition: color 0.3s, background-color 0.3s;
  white-space: nowrap;

  &.active {
    color: $blackText;
    background: $yellow;
  }
}

.page-order-delivery-time {
  display: grid;
  grid-gap: 24px;

  &__list {
    height: 48px;

    margin: 0 -20px;

    overflow: hidden;

    @include mq($bp-medium) {
      margin: 0;
    }
  }

  &__list-wrap {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    padding: 0 16px 20px;

    overflow: auto;

    @include mq($bp-medium) {
      padding: 0 0 20px 0;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 48px;

    padding: 12px 12px;

    @include text_normal;
    font-weight: 500;
    color: $blackText2;

    white-space: nowrap;

    background: $grayBg2;
    border: 1px solid $grayBg2;
    border-radius: 10px;

    transition: background-color 0.3s, border-color 0.3s;

    &.active {
      color: $blackText;
      background: $white;
      border-color: $yellow;
    }
  }
}

// Aside
.page-order-aside {
  display: flex;
  flex-direction: column;

  &__steps {
    &.page-order-aside__steps {
      display: none;
      
      @include mq($bp-medium) {
        display: flex;

        margin-bottom: 60px;
      }
    }
  }
}

.page-order-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 33px;
}

.page-order-step {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 6px;

  color: $grayText;

  &:before {
    content: '';
    position: absolute;
    top: 24px;
    right: calc(50% + 24px);

    width: 120px;

    border: 1px dashed $grayText;
  }

  &:first-child {
    &:before {
      display: none;
    }
  }

  &.active {
    color: $black;

    &:before {
      border-style: solid;
    }

    .page-order-step {
      &__number {
        border-color: $black;
      }
    }
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    @include text_large;
    font-weight: 700;

    background: $white;
    border: 1px solid $grayText;
    border-radius: 50%;
    z-index: 1;
  }
  
  &__label {
    @include text_mini;
    font-weight: 600;
  }
}
</style>
