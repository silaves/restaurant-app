<template>
  <n-card class="custom-card" hoverable>
    <template #header>
      <span class="card-sub-title">
        {{order.table}}
      </span>
    </template>
    <template #header-extra>
      <n-button type="success" @click="finalizeOrder(order._id, $event)">
        CONCLUIDO
      </n-button>
    </template>
    <n-scrollbar class="custom-card-container">
      <div v-for="detail in order.details">
        <n-divider />
        <n-grid x-gap="12" :cols="12">
          <n-gi span="6">
            <span :class="'card-sub-title'+(detail.status===0?'':' line-through')">{{detail.recipe.product.name}}</span>
          </n-gi>
          <n-gi span="2">
            <span :class="'card-sub-title'+(detail.status===0?'':' line-through')">{{detail.qty}}</span>
          </n-gi>
          <n-gi span="4">
            <div style="text-align: right">
              <n-button size="small" type="info" :disabled="detail.status!==0" @click="prepareRecipe(detail._id, $event)">PREPARAR</n-button>
            </div>
          </n-gi>
        </n-grid>
        <div>
          <div v-for="recipeDetail in detail.recipe.details">
            <n-grid x-gap="12" :cols="2">
              <n-gi>
                <span :class="detail.status===0?'':'line-through'">{{ recipeDetail.product.name }}</span>
              </n-gi>
              <n-gi>
                <span :class="detail.status===0?'':'line-through'">{{ recipeDetail.qty*detail.qty }}</span>
              </n-gi>
            </n-grid>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </n-card>
</template>

<script>
import {h, defineComponent, onMounted, ref} from 'vue'
import { Icon } from '@vicons/utils'
import { RefreshFilled, AddCircleOutlineFilled } from '@vicons/material'
import OrderService from "../services/OrderService";
import { useMessage } from 'naive-ui'

export default defineComponent({
  props: ['objectOrder'],
  setup(props) {
    const message = useMessage()
    const order = props.objectOrder

    async function prepareRecipe(value, e) {
      try {
        const response = await OrderService.markOrderDetailAsReceivd(value)
        message.success('Registrado')
      } catch (e) {
        if (e.response && e.response.status === 422) {
          message.warning('El insumo no tiene stock disponible')
        } else {
          message.error('Ops!, hubo un error')
        }
      }
    }

    async function finalizeOrder(value, e) {
      try {
        const response = await OrderService.finalizeOrder(value)
        message.success('Registrado')
      } catch (e) {
        if (e.response && e.response.status === 422) {
          message.warning('Existen detalles de ordenes que no se procesaron')
        } else {
          message.error('Ops!, hubo un error')
        }
      }
    }

    return {
      header: props.title,
      order: order,
      prepareRecipe: prepareRecipe,
      finalizeOrder: finalizeOrder,
    }
  },
  components: {
    Icon,
    RefreshFilled,
    AddCircleOutlineFilled,
  },

})
</script>