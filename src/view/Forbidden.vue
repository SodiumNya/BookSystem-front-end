<template>
  <div class="forbidden">
    <h1>403 - Forbidden</h1>
    <p>Access to this page is forbidden.</p>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'Forbidden'
}
</script>

<style scoped>
.forbidden {
  text-align: center;
  margin-top: 50px;
}
</style>
