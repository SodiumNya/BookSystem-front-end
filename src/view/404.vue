<template>
  <div class="not-found">
    <h1>404 - Not Found</h1>
    <p>The requested page could not be found.</p>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
