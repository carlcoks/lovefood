import { useCommonStore } from '@/store/common'

export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    catalog: [],
    selectedProductId: null, // select product for modal
  }),

  actions: {
    async getCatalog () {
      const { data } = await useMyFetch('/wp-content/uploads/app_sync/prodcat.json')

      const catalog = (data?.value || []).map(item => {
        const products = item.products.filter(product => product)

        return {
          id: item.id,
          name: item.name,
          products,
        }
      }).filter(item => item?.products?.length)

      this.catalog = catalog
    },

    setProduct (data = null) {
      this.selectedProductId = data
    }
  },

  getters: {
    filteredCatalog: (state) => {
      const commonStore = useCommonStore()
      const warehouseId = commonStore.selectedLocation?.warehouse_id || null

      if (warehouseId) {
        return state.catalog.map(item => {
          const products = item.products.filter(product => {
            return product.locations.find(location => location.id === warehouseId)
          })

          return {
            ...item,
            products
          }
        }).filter(item => item.products.length)
      }

      return state.catalog
    },

    categories () {
      return this.filteredCatalog.map(item => {
        return {
          id: item.id,
          name: item.name,
        }
      })
    },

    ingredients: (state) => {
      return state.catalog.find(item => item.id === 135)?.products || []
    },

    relatedItems: (state) => {
      return (related) => {
        const array = []

        related.forEach(id => {
          state.catalog.find(item => {
            const product = item.products.find(product => +product.id === +id)
            if (product) {
              array.push(product)
              return true
            }
            return false
          })
        })

        return array
      }
    },

    selectedProduct: (state) => {
      let data = null
      const productId = state.selectedProductId

      state.catalog.find(item => {
        item.products.find(product => {
          if (+product.id === +productId) {
            data = product
            return true
          }
          return false
        })
      })

      return data
    },

    isShowProductModal: (state) => {
      return !!state.selectedProductId
    },
  },
})
