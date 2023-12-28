import { useCommonStore } from '@/store/common'

interface State {
  cart: cartItem[]
  promocode: Promocode | null
  isShowCartModal: boolean
}

interface cartItem {
  id: number
  name: string
  price: number
  regular_price: number
  image: string
  count: number
  countable: boolean
  measure_unit: string
  portion_nat_size: number
  supplements: Supplement[]
  variation_id: number | null
  locations: number[]
}

interface Supplement {
  id: number
  name: string
  price: number
  count: number
}

interface Promocode {
  value: string
  type: string
  amount: number
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => ({
    cart: [],
    promocode: null,
    isShowCartModal: false,
  }),

  actions: {
    addToCart (item) {
      const commonStore = useCommonStore()

      if (!commonStore.deliveryType) {
        commonStore.toggleShowDeliveryTypeModal(true)
        return false
      } else if (!commonStore.selectedLocation) {
        commonStore.toggleShowReceiptModal(true)
        return false
      }

      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        regular_price: item.regular_price,
        image: item.images[0],
        count: 1,
        countable: item.countable,
        measure_unit: item.measure_unit,
        portion_nat_size: item.portion_nat_size,
        supplements: item?.supplements || [],
        variation_id: +item?.variation_id || null,
        locations: item.locations.map(item => item.id),
      })

      commonStore.addNotification({
        type: 'cart',
        text: 'Товар добавлен в корзину',
        status: 'success'
      })
    },

    incrementItem (idx: number) {
      const commonStore = useCommonStore()

      this.cart[idx].count++

      commonStore.addNotification({
        type: 'cart',
        text: 'Товар добавлен в корзину',
        status: 'success'
      })
    },

    decrementItem (idx: number) {
      this.cart[idx].count--

      if (this.cart[idx].count === 0) {
        this.cart.splice(idx, 1)
      }
    },

    removeFromCart (idx: number) {
      this.cart.splice(idx, 1)
    },

    removeMissedProductsFromCart (locationId: number) {
      this.cart = this.cart.filter(item => item.locations.includes(locationId))
    },

    clearCart () {
      this.cart = []
    },

    toggleShowCartModal (value: boolean) {
      this.isShowCartModal = value
    },

    setPromocode (value: Promocode | null) {
      this.promocode = value
    },
  },

  getters: {
    cartItems: (state) => {
      return state.cart
    },

    cartItemsLength: (state) => {
      return state.cart.reduce((acc, item) => {
        const count = !item.countable ? 1 : item.count

        acc = acc + count
        return acc
      }, 0)
    },

    // Сумма всех товаров с учетом скидки
    cartItemsPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        let price = +item.price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count * price
        return acc
      }, 0)
    },

    // Сумма всех товаров без скидки
    cartItemsRegularPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        let price = +item.regular_price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count * price
        return acc
      }, 0)
    },

    productInCart: (state) => {
      return (id: number, supplements: Supplement[] = [], variationId: number | null = null) => {
        let idx = null

        const item = state.cart.find((item, i) => {
          if (
            item.id === id &&
            item?.variation_id === variationId &&
            supplements.length === item.supplements.length &&
            item.supplements.every(itemSupplement => supplements.find(supplement => supplement.id === itemSupplement.id && supplement.count === itemSupplement.count))
          ) {
            idx = i
            return true
          }

          return false
        })

        return {
          item: item || null,
          idx
        }
      }
    },

    missedProductsList: (state) => {
      return (locationId: number) => {
        return state.cart.filter(item => !item.locations.includes(locationId))
      }
    }
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['cart']
  },
})