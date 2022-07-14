<script>
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
import {AddCircleOutlineFilled, DeleteTwotone} from '@vicons/material'
import ProductService from "../services/ProductService";
import {Icon} from "@vicons/utils";
import OrderService from "../services/OrderService";

export default defineComponent({
  props: [],
  setup() {
    const message = useMessage()
    const formRef = ref(null)
    const showSpin = ref(false)
    const formValue = ref({
      table: '',
      qty: 1,
      recipe: null,
      productName: null,
    })
    const loadingSelectRef = ref(false)
    const optionsSelectRef = ref([])
    const selectedRecipes = ref([])

    async function handleSearch (word) {
      try {
        const response = await ProductService.getRecipesFilter(word)
        optionsSelectRef.value = response.data.map(item => {
          return {
            label: item.product.name,
            value: item._id,
          }
        })
      } catch (e) {
      }
    }

    function handleValidateClick (e) {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          const selectedOption = optionsSelectRef.value.find(item => item.value === formValue.value.recipe)
          selectedRecipes.value.push({
            recipe: formValue.value.recipe,
            qty: formValue.value.qty,
            productName: selectedOption.label,
          })
        } else {
          message.error('Revise los datos llenados')
        }
      })
    }

    function deleteDetail(indexItem) {
      const filtered = selectedRecipes.value.filter(function(value, index, arr){
        if (index !== indexItem) {
          return value
        }
      });
      selectedRecipes.value = filtered
    }

    async function submitCustomizeOrder() {
      try {
        const selectedRecipeTmp = selectedRecipes.value.map(item => {
          return {
            recipe: item.recipe,
            qty: item.qty,
          }
        })
        const response = await OrderService.createCustomOrder(formValue.value.table, selectedRecipeTmp)
        selectedRecipes.value = []
        formValue.value.table = ''
        formValue.value.qty = 1
        formValue.value.recipe = null
        message.success('Registrado')
      } catch (e) {
        message.error('Ops, hubo un error')
      }
    }

    return {
      formRef,
      size: ref('medium'),
      formValue: formValue,
      rules: {
        table: {
          required: true,
          message: 'Ingrese un numero de mesa',
          trigger: 'blur'
        },
        qty: {
          type: 'number',
          required: true,
          message: 'Ingrese la cantidad de platos',
          trigger: ['blur', 'change'],
          validator (rule, value) {
            return value > 0
          },
        },
        recipe: {
          required: true,
          message: 'Ingrese una receta',
          trigger: ['blur', 'change'],
        }
      },
      showSpin,
      loadingSelectRef,
      optionsSelectRef,
      selectedRecipes,
      handleValidateClick,
      handleSearch,
      deleteDetail,
      submitCustomizeOrder,
    }
  },
  components: {
    Icon,
    DeleteTwotone,
    AddCircleOutlineFilled,
  },
})
</script>

<template>
  <n-spin :show="showSpin">
    <n-card x-gap="12" size="huge">
      <span class="c-card-title c-center">Simple</span>
      <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formValue"
          :rules="rules"
          :size="size"
          class="c-center"
      >
        <n-grid cols="12" item-responsive responsive="screen" :x-gap="15">
          <n-grid-item span="12 m:6 l:3">
            <n-form-item label="Para quien es el pedido" path="table">
              <n-input v-model:value="formValue.table" placeholder="mesa o cliente" :disabled="selectedRecipes.length > 0" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12 m:6 l:3">
            <n-form-item label="Seleccione una receta" path="recipe">
              <n-select
                  v-model:value="formValue.recipe"
                  filterable
                  placeholder="Escriba un producto"
                  :options="optionsSelectRef"
                  :loading="loadingSelectRef"
                  clearable
                  remote
                  @search="handleSearch"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12 m:6 l:3">
            <n-form-item label="Cantidad de platos" path="qty">
              <n-input-number v-model:value="formValue.qty" placeholder="cantidad" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12 m:6 l:3">
            <n-form-item>
              <div style="text-align: left">
                <n-button type="success" @click="handleValidateClick">Agregar</n-button>
              </div>
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <n-space vertical>
        <n-table striped>
          <thead>
          <tr>
            <th>Receta</th>
            <th>Cantidad</th>
            <th>Accion</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in selectedRecipes" v-bind:index="index">
            <td>{{ item.productName }}</td>
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
      <template #action>
        <div class="t-center">
          <n-button type="info" size="large" @click="submitCustomizeOrder">
            Solicitar pedido
          </n-button>
        </div>
      </template>
    </n-card>
  </n-spin>
</template>