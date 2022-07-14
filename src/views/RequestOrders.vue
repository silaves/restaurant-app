<template>
  <main id="Home-page">
    <n-card style="margin-bottom: 16px">
      <div style="width: 100%;text-align: left">
        <span class="card-title">Realiza tu pedido</span>
      </div>
      <n-tabs default-value="simple" justify-content="space-evenly" type="line" size="large">
        <n-tab-pane name="simple" tab="Simple">
          <SimpleOrder/>
        </n-tab-pane>
        <n-tab-pane name="tu eliges" tab="Tu eliges">
          <CustomizeOrder/>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </main>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ProductService from '../services/ProductService'
import SimpleOrder from "../components/SimpleOrder.vue"
import CustomizeOrder from "../components/CustomizeOrder.vue";

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
  components: {
    SimpleOrder,
    CustomizeOrder,
  },
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
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
.card-spacing {
  padding: 40px;
}
</style>

