<template>
  <div class="sidebar-container">
    <div class="sidebar-content">
      <router-link to="/" class="sidebar-label">系统首页</router-link>
      <router-link to="/bookList" class="sidebar-label">我的书架</router-link>
      <router-link to="#" class="sidebar-label">找书看</router-link>
      <div v-if="user.role === '管理员'" class="sidebar-label">我的书架</div>
    </div>
  </div>
</template>

<style>
.sidebar-container{
  background: #034267;
  flex: 1;
  align-items: center;
  overflow: hidden;
  max-width: 2%;
  min-width: 150px;
  min-height: 100vh;
}
.sidebar-content{
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.sidebar-label{
  margin-top: 1rem;
  padding: 0 3px 0 3px;
  color: whitesmoke;
  font-size: 25px;
}
.sidebar-label:hover{
  color: #41b9d3;
}
</style>
<script>
  export default {
    setup(){
      const user =  JSON.parse(localStorage.getItem('user')|| '{}')
      return{
        user
      }
    }
  }
</script>