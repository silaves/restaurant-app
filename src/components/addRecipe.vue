<template>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog" :on-after-leave=onHidden style="width: 600px">
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
          size="huge"
      >
        <n-grid cols="12" item-responsive responsive="screen" :x-gap="15">
          <n-grid-item span="12 s:12 m:12 l:12">
            <n-form-item label="Nombre" path="name">
              <n-input v-model:value="formValue.name" placeholder="Nombre" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item span="12 m:6 l:3">
            <n-form-item label="Código" path="code">
              <n-input v-model:value="formValue.code" placeholder="Código" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
    </div>
    <template #action>
      <n-button @click="showModal=false">Cancelar</n-button>
      <n-button type="primary" @click="handleSubmit">Registrar</n-button>
    </template>
  </n-modal>
</template>

<script>
import {defineComponent, toRefs, ref, watch} from 'vue'
import { useMessage } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { RefreshFilled, AddCircleOutlineFilled } from '@vicons/material'
import ProductService from "../services/ProductService";

const rules = {
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
}

export default defineComponent({
  setup(props) {
    const formRef = ref(null)
    let { showModalRef } = toRefs(props);
    const message = useMessage();
    const showModal = ref(false)
    const formValue = ref({
      name: '',
      code: ''
    })
    watch(
        () => showModalRef,
        (cars, prevCars) => {
          showModal.value = showModalRef.value
        },
        { deep: true }
    );

    function handleSubmit (e) {
      e.preventDefault()
      formRef.value?.validate((errors) => {
        if (!errors) {
          try {
            const response = ProductService.createProduct(formValue.value.name, formValue.value.code)
            message.success('Registrado')
          } catch (e) {
            message.error('Ops hubo un error')
          }
        }
      })
    }

    function onHidden () {
      formValue.value = {
        name: '',
        code: ''
      };
    }



    return {
      pagination: { pageSize: 10 },
      rules,
      formRef,
      formValue,
      handleSubmit,
      onHidden,
      showModal
    }
  },
  components: {
    Icon,
    RefreshFilled,
    AddCircleOutlineFilled,
  },

})
</script>