<template>
  <div class="sidebar-container">

    <div class="sidebar-content" v-if="user.role === '管理员'">
      <router-link to="/admin/BookManger" class="sidebar-label">书籍管理</router-link>
      <router-link to="/admin/UserManger" class="sidebar-label">用户管理</router-link>
      <router-link to="/profile" class="sidebar-label">个人信息</router-link>
    </div>
    <div class="sidebar-content" v-else>
      <router-link to="/" class="sidebar-label">系统首页</router-link>
      <router-link to="/bookList" class="sidebar-label">我的书架</router-link>
      <router-link to="/profile" class="sidebar-label">个人信息</router-link>
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