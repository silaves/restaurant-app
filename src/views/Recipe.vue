<template>
  <main id="about-page">
    <n-card style="margin-bottom: 16px">
      <div style="width: 100%;text-align: left">
        <span class="card-title">Recetas</span>
      </div>
    <n-grid x-gap="12" :y-gap="12" cols="1 s:1 m:1 l:1 xl:1 2xl:1" responsive="screen">
      <n-gi>
        <n-space>
          <n-button strong secondary type="success" @click="getRecipes">
            <template #icon>
              <Icon size="20">
                <RefreshFilled />
              </Icon>
            </template>
            Recargar
          </n-button>
          <n-button strong secondary type="info" @click="showModalRef=true">
            <template #icon>
              <Icon size="20">
                <AddCircleOutlineFilled />
              </Icon>
            </template>
            Crear Receta
          </n-button>
        </n-space>
      </n-gi>
      <n-gi>
        <n-data-table
            ref="table"
            :columns="columns"
            :data="dataRecipes"
            :pagination="pagination"
            :loading="loadingTable"
        />
      </n-gi>
    </n-grid>
    </n-card>
  </main>
  <n-modal v-model:show="showModalRef" preset="dialog" title="Dialog" :on-after-leave=onHidden  style="width: 600px">
    <template #header>
      <div>Registra una receta</div>
    </template>
    <div>
      <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formValue"
          :rules="rules"
      >
        <n-grid cols="12" item-responsive responsive="screen" :x-gap="15">
          <n-grid-item span="12 s:12 m:12 l:12">
            <n-form-item label="A qué producto crearás los insumos?" path="productParent">
              <n-select
                  v-model:value="formValue.productParent"
                  filterable
                  placeholder="Escriba un producto"
                  :options="parentOptions.options"
                  :loading="parentOptions.loadingTable"
                  clearable
                  remote
                  @search="handleSearchParent"
                  :disabled="selectedDetails.length > 0"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12 m:6 l:6">
            <n-form-item label="Producto" path="productDetail">
              <n-select
                  v-model:value="formValue.productDetail"
                  filterable
                  placeholder="Escriba un producto"
                  :options="detailsOptions.options"
                  :loading="detailsOptions.loadingTable"
                  clearable
                  remote
                  @search="handleSearchDetail"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="6 m:3 l:3">
            <n-form-item label="Cantidad" path="qty">
              <n-input-number v-model:value="formValue.qty" placeholder="cantidad" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="6 m:3 l:3">
            <n-form-item>
              <n-button strong secondary type="success" @click="handleAddDetail">Agregar</n-button>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </div>
    <n-scrollbar style="height: 250px">
    <n-space vertical>
      <n-table striped>
        <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Accion</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in selectedDetails" v-bind:index="index">
          <td>{{ item.name }}</td>
          <td>{{ item.qty }}</td>
          <td>
            <n-button quaternary circle type="error" @click="deleteDetail(index)">
              <template #icon>
                <Icon size="25">
                  <DeleteTwotone />
                </Icon>
              </template>
            </n-button>
          </td>
        </tr>
        </tbody>
      </n-table>
    </n-space>
    </n-scrollbar>
    <template #action>
      <n-button @click="showModalRef=false">Cancelar</n-button>
      <n-button type="primary" @click="handleSubmit">Registrar</n-button>
    </template>
  </n-modal>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'
import { useMessage } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { RefreshFilled, AddCircleOutlineFilled, DeleteTwotone } from '@vicons/material'
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
    title: 'Detalle',
    key: 'detail',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
]

const rules = {
  productParent: {
    required: true,
    message: 'Campo requerido',
    trigger: ['input']
  },
  productDetail: {
    required: true,
    message: 'Campo requerido',
    trigger: ['input']
  },
  qty: {
    type: 'number',
    required: true,
    message: 'Valor incorrecto',
    trigger: ['blur', 'change'],
    validator (rule, value) {
      return value > 0
    },
  }
}

export default defineComponent({

  setup() {
    const showModalRef = ref(false);
    const tableRef = ref(null);
    const formRef = ref(null)
    const message = useMessage();
    const loadingTable = ref(false)
    const dataRecipes = ref([])
    const selectedDetails = ref([]);
    const parentOptions = ref({
      loadingTable: false,
      options: [],
    })
    const detailsOptions = ref({
      loadingTable: false,
      options: [],
    })
    const formValue = ref({
      productParent: null,
      productDetail: null,
      qty: 1,
    })

    async function handleSubmit (e) {
      e.preventDefault()
      try {
        const response = await ProductService.createRecipe(formValue.value.productParent, selectedDetails.value.map( item => {
          return {
            product: item.product,
            qty: item.qty,
          }
        }))
        message.success('Registrado')
        showModalRef.value = false
        await getRecipes()
      } catch (e) {
        message.error('Ops hubo un problema')
      }
    }

    async function getRecipes() {
      loadingTable.value = true;
      try {
        const response = await ProductService.getRecipes()
        dataRecipes.value = response.data.map((v, i) => ({
          name: v.product.name,
          code: v.product.code,
          key: v._id,
        }));
        loadingTable.value = false;
      } catch (error) {
        dataRecipes.value = [];
        loadingTable.value = false;
      }
    }

    async function handleSearchParent (word) {
      try {
        const response = await ProductService.getProducts(word)
        parentOptions.value.options = response.data.map(item => {
          return {
            label: item.name,
            value: item._id,
          }
        })
      } catch (e) {
      }
    }

    async function handleSearchDetail (word) {
      try {
        const response = await ProductService.getProducts(word)
        detailsOptions.value.options = response.data.map(item => {
          return {
            label: item.name,
            value: item._id,
          }
        })
      } catch (e) {
      }
    }

    function handleAddDetail (e) {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          if (formValue.value.productDetail === formValue.value.productParent) {
            message.error('No puede producir el mismo producto como insumo')
          } else {
            const selectedOption = detailsOptions.value.options.find(item => item.value === formValue.value.productDetail)
            selectedDetails.value.push({
              product: formValue.value.productDetail,
              qty: formValue.value.qty,
              name: selectedOption.label,
            })
          }
        } else {
          message.error('Revise los datos llenados')
        }
      })
    }

    function deleteDetail (indexItem) {
      selectedDetails.value = selectedDetails.value.filter(function(value, index, arr){
        if (index !== indexItem) {
          return value
        }
      });
    }

    function onHidden () {
      formValue.value = {
        name: '',
        code: ''
      };
      selectedDetails.value = []
    }

    onMounted(() => {
      getRecipes()
    })

    return {
      pagination: { pageSize: 10 },
      columns,
      rules,
      tableRef,
      dataRecipes,
      loadingTable,
      formRef,
      formValue,
      showModalRef,
      parentOptions,
      selectedDetails,
      detailsOptions,
      handleSubmit,
      getRecipes,
      onHidden,
      handleSearchParent,
      handleSearchDetail,
      handleAddDetail,
      deleteDetail,
    }
  },
  components: {
    Icon,
    RefreshFilled,
    AddCircleOutlineFilled,
    DeleteTwotone
  },
})
</script>