<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import Login from "@/view/Login.vue";
import Home from "@/view/Home.vue";
export default {

  components:{
    Home,
    Login,
    Navbar,
    Sidebar
  }
}
</script>




