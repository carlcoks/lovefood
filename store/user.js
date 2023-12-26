import { useCommonStore } from '@/store/common'

export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null,
    user: null,
    deliveryForm: null,

    favorites: [],
  }),

  actions: {
    setToken (value) {
      this.token = value
    },

    setUser (value) {
      this.user = value
    },

    updateUser (value) {
      this.user = {
        ...this.user,
        ...value
      }
    },

    setDeliveryForm (value) {
      this.deliveryForm = value
    },

    addToFavorite (value) {
      const commonStore = useCommonStore()

      this.favorites.push(value)

      commonStore.addNotification({
        type: null,
        text: 'Товар добавлен в избранное',
        status: 'success'
      })
    },

    removeFromFavorite (value) {
      const commonStore = useCommonStore()

      this.favorites.find((item, i) => {
        if (item === value) {
          this.favorites.splice(i, 1)

          commonStore.addNotification({
            type: null,
            text: 'Товар удален из избранного',
            status: 'success'
          })
          return true
        }
        return false
      })
    }
  },

  getters: {
    isAuth: (state) => {
      return !!state.user;
    },

    isProductFavorite: (state) => {
      return (productId) => {
        return state.favorites.includes(productId)
      }
    }
  },

  persist: true
});
