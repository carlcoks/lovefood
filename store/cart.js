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
        ...item,
        count: 1,
      })

      this.addNotification()
    },

    incrementItem (id) {
      this.cart.find(item => {
        if (+item.id === +id) {
          item.count++

          this.addNotification()
          return true
        }

        return false
      })
    },

    decrementItem (id) {
      this.cart.find((item, i) => {
        if (+item.id === +id) {
          if (item.count > 1) {
            item.count--
          } else {
            this.cart.splice(i, 1)
          }

          return true
        }

        return false
      })
    },

    removeFromCart (id) {
      this.cart.find((item, i) => {
        if (+item.id === +id) {
          this.cart.splice(i, 1)

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
        acc += item.count * item.price
        return acc
      }, 0)
    },

    // Сумма всех товаров без скидки
    cartItemsRegularPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        acc += item.count * item.regular_price
        return acc
      }, 0)
    }
  }
})