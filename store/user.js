export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null,
    user: null,
    deliveryForm: null,
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
  },

  getters: {
    isAuth: (state) => {
      return !!state.user;
    },
  },

  persist: true
});
