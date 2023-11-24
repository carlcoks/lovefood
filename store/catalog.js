import { useCommonStore } from '@/store/common'

export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    catalog: [],
    product: null, // select product for modal
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
      this.product = data
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

    ingredients (state) {
      return state.catalog.find(item => item.id === 135)?.products || []
    },

    isShowProductModal: (state) => {
      return !!state.product
    },
  },
})
