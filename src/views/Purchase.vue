<template>
  <main id="Home-page">
    <n-card style="margin-bottom: 16px">
      <div style="width: 100%;text-align: left">
        <span class="card-title">Realiza tu Compra</span>
      </div>
      <n-tabs default-value="simple" justify-content="space-evenly" type="line" size="large">
        <n-tab-pane name="simple" tab="Simple">
          <SimplePurchase/>
        </n-tab-pane>
        <n-tab-pane name="tu eliges" tab="Tu eliges">
          <CustomizePurchase/>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </main>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ProductService from '../services/ProductService'
import SimplePurchase from "../components/SimplePurchase.vue";
import CustomizePurchase from "../components/CustomizePurchase.vue";

function createOptions () {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.from({ length: 50 }).map((v, i) => i)
}

export default defineComponent({
  components: {CustomizePurchase, SimplePurchase},
  data() {
    return {
      options: [],
      value: []
    }
  },
  methods: {
    async loadRecipes() {
      try {
        const response = await ProductService.getRecipes()
        this.options = response.data.map((v, i) => ({
          label: v.product.name,
          value: v._id,
        }));
      } catch (error) {
        this.options = [];
      }
    }
  },
  created() {
    this.loadRecipes();
  }
})
</script>

<style scoped>

</style>

