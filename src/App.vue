<template>
  <n-message-provider>
    <div class="app">
      <Sidebar />
      <router-view />
    </div>
  </n-message-provider>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --white: #ffff;
  --sidebar-width: 300px;

  --purple-pure: #3C1874;
  --gray-purple: #283747;
  --cloud: #F3F3F3;
  --purple-red: #3C1874;
  --bright-red: #DE354C;

  // paypal
  --green-light: #e1fffa;
  --green-dark: #6dd3b8;
  --yellow-light: #fdd045;
  --yellow-dark: #fec343;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}
body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
.c-center {
  display:flex;
  justify-content: center;
}
.t-center {
  text-align: center;
}
.c-card-title {
  color:var(--dark);
  font-weight: 600;
  font-size: 20px;
}
.card-title {
  color:var(--dark);
  font-weight: 600;
  font-size: 20px;
}
.card-sub-title {
  color:var(--dark);
  font-weight: 600;
  font-size: 18px;
}
.line-through {
  text-decoration:line-through;
}
.custom-card {
  background-color: var(--yellow-dark);
}
.custom-card-container {
  height: 250px;
}
.custom-card-footer {
  background-color: var(--green-light);
}
.custom-card .n-card-header {
  padding-bottom: 0;
}
.select-purchase {
  width: 50%;
}
@media (max-width: 760px) {
  .select-purchase {
    width: 100%;
  }
}
</style>