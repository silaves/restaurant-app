<template>
  <main id="about-page">
    <n-card style="margin-bottom: 16px">
      <div style="width: 100%;text-align: left">
        <span class="card-title">Bodega</span>
      </div>
    <n-grid x-gap="12" :y-gap="12" cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
      <n-gi>
        <n-space>
          <n-button strong secondary type="success" @click="getProducts">
            <template #icon>
              <Icon size="20">
                <RefreshFilled />
              </Icon>
            </template>
            Recargar
          </n-button>
          <n-button strong secondary type="info" @click="showModal=true">
            <template #icon>
              <Icon size="20">
                <AddCircleOutlineFilled />
              </Icon>
            </template>
            Crear Producto
          </n-button>
        </n-space>
      </n-gi>
      <n-gi>
        <n-data-table
          ref="table"
          :columns="columns"
          :data="dataProducts"
          :pagination="pagination"
          :loading="loadingTable"
        />
      </n-gi>
    </n-grid>
    </n-card>
  </main>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog" :on-after-leave=onHidden>
    <template #header>
      <div>Registra un producto</div>
    </template>
    <div>
      <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formValue"
          :rules="rules"
          :size="size"
      >
        <n-form-item label="Nombre" path="name">
          <n-input v-model:value="formValue.name" placeholder="Nombre" />
        </n-form-item>
        <n-form-item label="Código" path="code">
          <n-input v-model:value="formValue.code" placeholder="Código" />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-button @click="showModal=false">Cancelar</n-button>
      <n-button type="primary" @click="handleSubmit">Registrar</n-button>
    </template>
  </n-modal>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'
import { useMessage } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { RefreshFilled, AddCircleOutlineFilled } from '@vicons/material'
import ProductService from "../services/ProductService";

const columns = [
  {
    title: 'Nombre',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Código',
    key: 'code',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Stock actual',
    key: 'currentStock',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
]

export default defineComponent({

  setup() {
    const tableRef = ref(null);
    const showModalRef = ref(false);
    const formRef = ref(null)
    const message = useMessage();
    const loadingTable = ref(false)
    const dataProducts = ref([])
    const formValue = ref({
      name: '',
      code: ''
    })

    function handleSubmit (e) {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          try {
            const response = ProductService.createProduct(formValue.value.name, formValue.value.code)
            getProducts()
            message.success('Registrado')
          } catch (e) {
            message.error('Ops hubo un error')
          }
          showModalRef.value = false
        }
      })
    }

    async function getProducts() {
      loadingTable.value = true;
      try {
        const response = await ProductService.getProductsWithStock()
        dataProducts.value = response.data.map((v, i) => ({
          name: v.name,
          code: v.code,
          currentStock: v.currentStock,
          key: v._id,
        }));
        loadingTable.value = false;
      } catch (error) {
        dataProducts.value = [];
        loadingTable.value = false;
      }
    }

    function onHidden () {
      formValue.value = {
        name: '',
        code: ''
      };
    }

    onMounted(() => {
      getProducts()
    })

    return {
      table: tableRef,
      dataProducts,
      columns: columns,
      pagination: { pageSize: 10 },
      loadingTable,
      showModal: showModalRef,
      formRef: formRef,
      size: ref('medium'),
      formValue,
      rules: {
        name: {
          required: true,
          message: 'Campo requerido',
          trigger: ['input']
        },
        code: {
          required: true,
          message: 'Campo requerido',
          trigger: ['input']
        }
      },
      handleSubmit,
      getProducts,
      onHidden,
    }
  },
  components: {
    Icon,
    RefreshFilled,
    AddCircleOutlineFilled,
  },
  async created() {
    await this.getProducts();
  }
})
</script>