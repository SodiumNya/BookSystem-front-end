<template>

  <div class="navbar-container">
    <div class="d-flex p-3">
      <img :src="logo" alt="logo" class="img-fluid ms-2" style="width: 10%;">
      <h4 class="fs-5 fw-bold pt-2" >图书系统</h4>
    </div>

    <div class="user-info">
      <router-link v-if="!user.uid" to="/login" class="navbar-login">登录</router-link>
      <router-link v-if="!user.uid" to="/register" class="navbar-register">注册</router-link>
      <img class="user-logo" :src="user.avatar" alt="用户头像" @mouseenter="showCard" @mouseleave="hideCard">


      <div class="user-info-card" ref="infoCard">
        <div class="uid">
          uid：<div>{{user.uid}}</div>
        </div>
        <div class="user-detail">
          <div class="user-row">
            <div class="user-detail-label">
              昵称:<div class="user-data">{{user.nickname}}</div>
            </div>

            <div class="user-detail-label">
              身份:<div class="user-data">{{user.role}}</div>
            </div>

          </div>

          <div class="user-row">
            <div class="user-detail-label">
              用户名:<div class="user-data">{{user.username}}</div>
            </div>
          </div>

          <div class="func-row">
            <div>
              <i/>
              <router-link to="/profile">修改信息</router-link>
            </div>
            <div>
              <i/>
              <router-link to="/login" @click="logout">退出登录</router-link>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style>
.navbar-container{
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background: white;
  max-height: 5%;
  //padding: 16px;
}
.user-info {
  display: flex;
  //flex-direction: column;
  //align-items: flex-end;
  height: 100%;
  margin-right: 1rem;
  align-items: center;
}
.navbar-login{
  color: black;
  margin-right: 10px;
}
.navbar-register{
  color: black;
  margin-right: 10px;
}
.user-logo{
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  overflow: hidden;
}
.title{
  margin-left: 1rem;
}



.user-info-card{
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  display: none;
  color: #7f7f7f;
  flex-direction: column;
  align-items: center;
  background: white;
  position: fixed;
  top: 20px;
  right: 20px;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 2.2rem;
  z-index: 1;
}
.user-detail{
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
}
.user-detail .user-row{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

}
.user-row div{
  margin: 0 0.5rem 0 0.5rem;
}

.func-row{
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.func-row div{
  margin: 0 0.5rem 0 0.5rem;
}

.uid{
  display: flex;
  margin-top: 0.5rem;
  color: black;
  font-weight: bold;
}
.uid div{
  color: deepskyblue;
  font-weight: bold;
}
.user-detail-label{
  display: flex;
  color: black;
  font-weight: bold;
}

.user-data{
  color: #7f7f7f;
}


</style>
<script>
import {ref} from "vue";
import logo from "@/assets/logo-black.svg";
const infoCard = ref(null);
const showCard = ref(false);
export default {
  setup(){
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if(!user.avatar){
      user.avatar = 'http://localhost:9787/files/download/1695021417059_ddd.webp'
    }
    return{
      user,
      infoCard,
      logo
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('user')
    },
    showCard(){
      infoCard.value.style.display = 'flex'

    },
    hideCard(){
      setTimeout(() => {
        infoCard.value.style.display = 'none'
      }, 1000)
    }
  }
}
</script>