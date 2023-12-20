export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    deliveryForm: null,
  }),

  actions: {
    setUser(value) {
      this.user = value;
    },

    setDeliveryForm (value) {
      this.deliveryForm = value
    },
  },

  getters: {
    isAuth: (state) => {
      return !!state.user;
    },

    fullName: (state) => {
      return (state.user?.firstname || state.user?.lastname) ? `${state.user.firstname} ${state.user.lastname}` : state.user?.displayname
    }
  },

  persist: true
});
