<template>

  <div class="navbar-container">
    <div>
      <h3 class="title">图书系统</h3>
    </div>

    <div class="user-info">
      <img class="suer-logo" :src="user.avatar" alt="">
      <div class="dropdown">
        <div class="uid">
          uid：<div>{{user.uid}}</div>
        </div>
        <div class="user-detail">
          <div class="row">
            <div class="user-detail-label">
              昵称:<div class="user-data">{{user.nickname}}</div>
            </div>

            <div class="user-detail-label">
              身份:<div class="user-data">{{user.role}}</div>
            </div>

          </div>

          <div class="row">
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
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  margin-right: 1rem;
}
.suer-logo{
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  overflow: hidden;
}
.title{
  margin-left: 1rem;
}

.user-info:hover .dropdown{
  display: flex;
  opacity: 1;
  transition-delay: 0.3s;
}

.dropdown{
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  display: none;
  color: #7f7f7f;
  flex-direction: column;
  align-items: center;
  background: white;
  position: absolute;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 2.2rem;
  z-index: 1;
  opacity: 0;
  transition: 0.5s ease-in-out;
}
.user-detail{
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
}
.user-detail .row{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.row div{
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
export default {
  setup(){
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    user.avatar = 'https://avatars.githubusercontent.com/u/112569765?…00&u=5821d799b19c6471af785b40e1c71ba8fe48ca9e&v=4'
    return{
      user
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('user')
    }
  }
}
</script>