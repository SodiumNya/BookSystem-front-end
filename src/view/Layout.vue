<template>
  <div class="book-sys-container">
    <sidebar/>
    <div class="main-container">
      <navbar/>
      <div class="content">
        <router-view ></router-view>
      </div>
    </div>
  </div>
</template>

<style>
.book-sys-container{
  display: flex;
  height: 100%;
  width: 100%;
}
.main-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;

}
.content{
  margin: 1rem;
  background: white;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
</style>
<script>

import sidebar from "@/components/Sidebar.vue";
import navbar from "@/components/Navbar.vue";


export default {
  components: {
    sidebar,
    navbar
  }
}
</script>