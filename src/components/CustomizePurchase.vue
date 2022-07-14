<script>
import {defineComponent, onMounted, ref} from 'vue'
import { useMessage } from 'naive-ui'
import ProductService from "../services/ProductService";

export default defineComponent({
  setup() {
    const message = useMessage()
    const formRef = ref(null)
    const showSpin = ref(false)
    const loadingRef = ref(false)
    const optionsRef = ref([])
    const formValue = ref({
      product: null,
      qty: 1,
    })

    async function handleSearch (word=null) {
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

    function handleValidateClick (e) {
      e.preventDefault()
      formRef.value?.validate( async (errors) => {
        if (!errors) {
          showSpin.value = true
          try {
            await ProductService.purchase(formValue.value.product, formValue.value.qty)
            message.success('Registrado')
          } catch (e) {
            message.error('Ops! hubo un error')
          }
          showSpin.value = false
        } else {
          message.error('Revise los datos llenados')
        }
      })
    }

    onMounted(() => {
      handleSearch()
    })
    return {
      formRef,
      size: ref('medium'),
      formValue: formValue,
      rules: {
        product: {
          required: true,
          message: 'Seleccione un producto',
          trigger: 'input',
        },
        qty: {
          type: 'number',
          required: true,
          message: 'Ingrese una cantidad valida',
          trigger: ['blur', 'change'],
          validator (rule, value) {
            return value > 0
          },
        },
      },
      showSpin,
      optionsRef,
      loadingRef,
      handleValidateClick,
      handleSearch,
    }
  },
})
</script>

<template>
  <n-spin :show="showSpin">
    <n-card x-gap="12" size="huge">
      <span class="c-card-title c-center">Elige un producto y asigna una cantidad</span>
      <template #footer>
        <n-form
            ref="formRef"
            inline
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            class="c-center"
        >
          <n-form-item label="Producto" path="product">
            <n-select
                v-model:value="formValue.product"
                filterable
                placeholder="Escriba un producto"
                :options="optionsRef"
                :loading="loadingRef"
                clearable
                remote
                @search="handleSearch"
            />
          </n-form-item>
          <n-form-item label="Cantidad" path="qty">
            <n-input-number v-model:value="formValue.qty" placeholder="cantidad" />
          </n-form-item>
        </n-form>
      </template>
      <template #action>
        <div class="t-center">
          <n-button type="info" size="large" @click="handleValidateClick">
            Comprar
          </n-button>
        </div>
      </template>
    </n-card>
  </n-spin>
</template>