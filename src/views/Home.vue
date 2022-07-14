<template>
  <main id="Home-page">
    <div style="width: 100%;text-align: center" class="container-welcome">
      <div>
        <img :src="doge" alt="Vue" style="max-width: 300px;min-width:100px" />
      </div>
      <div>
        <h1>WELCOME</h1>
      </div>
      <div>
        <n-button strong secondary type="info" size="large" @click="$router.push('warehouse')">
          EMPEZAR
        </n-button>
      </div>
    </div>
  </main>
</template>

<script setup>
import doge from '../assets/logo.png'
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Oxygen:400,300);
@import url(https://fonts.googleapis.com/css?family=Montserrat:700);

.container-welcome {
  margin-top: 5%;
}
.container-welcome h1{
  color: var(--dark);
  font-size: 5em;
  text-align: center;
  position: relative;
  top:2%;
  font-family: 'Montserrat', sans-serif;
}

.container-welcome button{
  position:relative;
  padding: 30px 40px;
  transition:all .3s ease;
  font-size: 30px;
  font-family: 'Montserrat', sans-serif !important;
  border-radius:5px;
}
</style>