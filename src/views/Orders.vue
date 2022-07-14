<template>
  <main id="Home-page">
<!--    <n-divider>Pedidos</n-divider>-->
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:5" :x-gap="12" :y-gap="12" responsive="screen">
      <n-grid-item v-for="order in dataOrders">
        <CardOrder
          :title="order.table"
          :objectOrder="order"
        />
      </n-grid-item>
    </n-grid>
  </main>
</template>

<script>
import {h, defineComponent, onMounted, ref} from 'vue'
import { Icon } from '@vicons/utils'
import { RefreshFilled, AddCircleOutlineFilled } from '@vicons/material'
import CardOrder from "../components/CardOrder.vue";
import OrderService from '../services/OrderService'

export default defineComponent({

  setup() {
    const dataOrders = ref([])

    async function loadDataOrdersPending() {
      const statusPending = '0'
      const response = await OrderService.getOrdersRequested(statusPending)
      dataOrders.value = response.data
    }

    onMounted(() => {
      loadDataOrdersPending()
    })
    return {
      dataOrders: dataOrders,
    }
  },
  components: {
    Icon,
    RefreshFilled,
    AddCircleOutlineFilled,
    CardOrder,
  },

})
</script>