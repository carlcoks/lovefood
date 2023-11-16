export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [],
  }),

  actions: {
    addToCart (item) {
      this.cart.push({
        ...item,
        count: 1,
      })
    },

    incrementItem (id) {
      this.cart.find(item => {
        if (+item.id === +id) {
          item.count++
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

    cartItemsPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        acc += item.count * item.price
        return acc
      }, 0)
    },

    cartItemsRegularPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        acc += item.count * item.regular_price
        return acc
      }, 0)
    }
  }
})