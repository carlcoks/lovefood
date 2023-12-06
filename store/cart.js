import { useCommonStore } from '@/store/common'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [],
    notifications: [],
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
        images: item.images,
        count: 1,
        supplements: item?.supplements || [],
      })

      this.addNotification()
    },

    incrementItem (idx) {
      this.cart[idx].count++
      this.addNotification()
    },

    decrementItem (idx) {
      this.cart[idx].count--

      if (this.cart[idx].count === 0) {
        this.cart.splice(idx, 1)
      }
    },

    removeFromCart (idx) {
      this.cart.splice(idx, 1)
    },

    removeSupplementFromProduct (idx, supplementId) {
      this.cart[idx].supplements.find((item, i) => {
        if (+item.id === +supplementId) {
          this.cart[idx].supplements.splice(i, 1)
          return true
        }

        return false
      })
    },

    clearCart () {
      this.cart = []
    },

    toggleShowCartModal (value) {
      this.isShowCartModal = value
    },

    addNotification () {
      this.notifications.push('Товар добавлен в корзину')

      setTimeout(() => {
        this.notifications.splice(0, 1)
      }, 2000)
    }
  },

  getters: {
    cartItems: (state) => {
      return state.cart
    },

    cartItemsLength: (state) => {
      return state.cart.reduce((acc, item) => {
        acc = acc + item.count
        return acc
      }, 0)
    },

    // Сумма всех товаров с учетом скидки
    cartItemsPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        let price = item.price

        if (item?.supplements?.length) {
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
        let price = item.regular_price

        if (item?.supplements?.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count * price
        return acc
      }, 0)
    },

    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },

    productInCart: (state) => {
      return (id, supplements = []) => {
        let idx = null

        const item = state.cart.find((item, i) => {
          if (
            +item.id === +id &&
            supplements.length === item.supplements.length &&
            item.supplements.every(itemSupplement => supplements.find(supplement => supplement.id === itemSupplement.id && supplement.count === itemSupplement.count))
          ) {
            idx = i
            return true
          }

          return false
        })

        return {
          item,
          idx
        }
      }
    }
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['cart']
  },
})