<template>
  <div class="sidebar-container">

    <div class="d-flex justify-content-center border-bottom" style="margin-top: 5rem">
      <img :src="logo" alt="logo" class="img-fluid me-2" style="width: 20%;">
      <h3 class="text-white fw-bold">图书系统</h3>
    </div>

    <div v-if="user.role === '管理员'" class="accordion accordion-flush sidebar-content" id="accordionExample">
      <div class="accordion-item" style="background-color: #034267">
        <h2 class="accordion-header d-flex align-items-center" id="flush-headingOne">

          <button class="accordion-button collapsed fs-3 text-white fw-bold" style="background-color: #034267" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <img :src="bookManage" alt="logo" class="img-fluid me-2" style="width: 20%;">
            图书管理
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body d-flex flex-column align-items-center">
            <router-link to="/admin/BookManger"><h4 class="fs-4 text-white ">书籍管理</h4></router-link>
            <router-link to="/admin/addBook"><h4 class="fs-4 text-white ">添加图书</h4></router-link>
          </div>
        </div>
      </div>
      <div class="accordion-item"  style="background-color: #034267">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed fs-3 text-white fw-bold" style="background-color: #034267" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            <img :src="userManage" alt="logo" class="img-fluid me-2" style="width: 20%;">

            用户管理
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body d-flex flex-column align-items-center" >
            <router-link to="/admin/UserManger"><h4 class="fs-4 text-white ">用户管理</h4></router-link>
            <router-link to="/admin/addUser"><h4 class="fs-4 text-white ">添加用户</h4></router-link>
          </div>
        </div>
      </div>

      <div class="accordion-item" style="background-color: #034267">
        <h2 class="accordion-header" id="flush-headingThree">
          <button class="accordion-button collapsed fs-3 text-white fw-bold" style="background-color: #034267" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            <img :src="profile" alt="logo" class="img-fluid me-2" style="width: 20%;">
            个人信息
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body d-flex flex-column align-items-center">
            <router-link to="/profile"><h4 class="fs-4 text-white">编辑信息</h4></router-link>
          </div>
        </div>
      </div>

    </div>

      <div v-else class="sidebar-content">
        <router-link to="/" class="sidebar-label"><h4 class="fs-3 text-white fw-bold">系统首页</h4></router-link>
        <router-link to="/bookList" class="sidebar-label"><h4 class="fs-3 text-white fw-bold">我的书架</h4></router-link>
        <router-link to="/profile" class="sidebar-label"><h4 class="fs-3 text-white fw-bold">个人信息</h4></router-link>
      </div>
  </div>



</template>

<style>
.sidebar-container{
  background: #034267;
  flex: 1;
  align-items: center;
  overflow: hidden;
  max-width: 4%;
  min-width: 240px;
  min-height: 100vh;
}
.sidebar-content{
  margin-top: 1rem;
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
import logo from '@/assets/logo.svg'
import bookManage from '@/assets/bookManage.svg'
import userManage from '@/assets/userManage.svg'
import profile from '@/assets/profile.svg'
  export default {
    setup(){
      const user =  JSON.parse(localStorage.getItem('user')|| '{}')

      return{
        user,
        logo,
        bookManage,
        userManage,
        profile
      }
    }
  }
</script>