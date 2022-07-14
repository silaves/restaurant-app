<script>
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'
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
    })
    function handleValidateClick (e) {
      e.preventDefault()
      formRef.value?.validate( async (errors) => {
        if (!errors) {
          showSpin.value = true
          try {
            await OrderService.createSimpleOrder(formValue.value.table, formValue.value.qty)
            message.success('Orden registrada')
          } catch (e) {
            message.error('Ops!, hubo un error')
          }
          showSpin.value = false
        } else {
          message.error('Revise los datos llenados')
        }
      })
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
      },
      showSpin,
      handleValidateClick: handleValidateClick,
    }
  },
})
</script>

<template>
  <n-spin :show="showSpin">
  <n-card x-gap="12" size="huge">
      <span class="c-card-title c-center">Simple</span>
      <n-alert type="success">
        Realiza un pedido de una receta aleatoria
      </n-alert>
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
        <n-form-item label="Para quien es el pedido" path="table">
          <n-input v-model:value="formValue.table" placeholder="mesa o cliente" />
        </n-form-item>
        <n-form-item label="Cantidad de platos" path="qty">
          <n-input-number v-model:value="formValue.qty" placeholder="cantidad" />
        </n-form-item>
      </n-form>
    </template>
    <template #action>
      <div class="t-center">
        <n-button type="info" size="large" @click="handleValidateClick">
          Solicitar pedido
        </n-button>
      </div>
    </template>
  </n-card>
  </n-spin>
</template>