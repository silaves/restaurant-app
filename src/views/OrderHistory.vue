<template>
  <main id="Home-page">
    <n-card style="margin-bottom: 16px">
      <div style="width: 100%;text-align: left;padding-bottom: 10px;">
        <span class="card-title">Historial de Ordenes</span>
      </div>
      <n-grid x-gap="12" :y-gap="12" cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
        <n-gi>
          <n-space>
            <n-button strong secondary type="success" @click="getOrders">
              <template #icon>
                <Icon size="20">
                  <RefreshFilled />
                </Icon>
              </template>
              Recargar
            </n-button>
          </n-space>
        </n-gi>
        <n-gi>
          <n-data-table
              ref="table"
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :loading="loadingTable"
          />
        </n-gi>
      </n-grid>
    </n-card>
  </main>
</template>

<script>
import {h, defineComponent, onMounted, ref} from 'vue'
import { Icon } from '@vicons/utils'
import { RefreshFilled, AddCircleOutlineFilled } from '@vicons/material'
import { NTag } from 'naive-ui'
import OrderService from '../services/OrderService'

const columns = [
  {
    title: 'Mesa/Cliente',
    key: 'table',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Estado',
    key: 'status',
    render (row) {
      let typeStatus = 'warning'
      let labelStatus = 'PENDIENTE'
      switch (row.status) {
        case 0:
          labelStatus = 'PENDIENTE'
          typeStatus = 'warning'
          break
        case 1:
          labelStatus = 'RECIBIDO'
          typeStatus = 'info'
          break
        case 2:
          labelStatus = 'FINALIZADO'
          typeStatus = 'success'
          break
        case 3:
          labelStatus = 'CANCELADO'
          typeStatus = 'error'
          break
        default:
          labelStatus = 'PENDIENTE'
          typeStatus = 'warning'
      }
      return h(
          NTag,
          {
            type: typeStatus,
            bordered: false
          },
          {
            default: () => labelStatus
          }
      )
    }
  },
  {
    title: 'Fecha de orden',
    key: 'startDate',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Fecha de entrega',
    key: 'endDate',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
]

export default defineComponent({

  setup() {
    const tableRef = ref(null);
    const loadingTable = ref(false)
    const data = ref([])

    async function getOrders() {
      loadingTable.value = true;
      try {
        const response = await OrderService.getOrders()
        data.value = response.data.map((v, i) => ({
          table: v.table,
          status: v.status,
          startDate: v.startDate,
          endDate: v.endDate,
        }));
        loadingTable.value = false;
      } catch (error) {
        data.value = [];
        loadingTable.value = false;
      }
    }

    onMounted(() => {
      getOrders()
    })

    return {
      table: tableRef,
      columns: columns,
      pagination: { pageSize: 10 },
      loadingTable,
      data,
      getOrders
    }
  },
  components: {
    Icon,
    RefreshFilled,
    AddCircleOutlineFilled,
  },

})
</script>