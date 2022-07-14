<script>
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import ProductService from "../services/ProductService";

export default defineComponent({
  props: [],
  setup() {
    const message = useMessage()
    const loadingRef = ref(false)
    const optionsRef = ref([])
    const selectedValue = ref(null)

    async function handleSearch (word) {
      try {
        const response = await ProductService.getProducts(word)
        optionsRef.value = response.data.map(item => {
          return {
            label: item.name,
            value: item._id,
          }
        })
      } catch (e) {
      }
    }

    async function makePurchase(productId) {
      try {
        const response = await ProductService.purchaseMarket(productId)
        message.success(`Producto comprado, ${response.data.purchased} unidad(es)`)
      } catch (e) {
        if (e.response && e.response.status === 422) {
          message.warning('No disponible en Plaza de Mercado')
        } else {
          message.error('Ops, hubo un problema')
        }
      }
    }

    return {
      loading: loadingRef,
      options: optionsRef,
      selectedValue,
      handleSearch,
      makePurchase,
    }
  },
})
</script>

<template>
  <n-card x-gap="12" size="huge">
    <span class="c-card-title c-center">Plaza de Mercado</span>
    <template #footer>
      <div style="display:flex;justify-content: center;width: 100%">
        <div class="select-purchase">
          <n-select
            v-model:value="selectedValue"
            filterable
            placeholder="Escriba un producto"
            :options="options"
            :loading="loading"
            clearable
            remote
            @search="handleSearch"
          />
        </div>
      </div>
    </template>
    <template #action>
      <div class="t-center">
        <n-button type="info" size="large" @click="makePurchase(selectedValue, $event)">
          Comprar
        </n-button>
      </div>
    </template>
  </n-card>
</template>