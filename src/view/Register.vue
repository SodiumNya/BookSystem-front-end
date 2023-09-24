<template>
  <div class="register">
    <div class="register-container">
      <h1 class="register-title">注册</h1>
      <input class="input" placeholder="邮箱" v-model="user.username">
      <span class="errMessage" v-if=usernameErr>邮箱格式不正确</span>

      <input class="input" type="password" placeholder="输入密码" v-model="user.password">
      <span class="errMessage" v-if=passwordErr>两次输入密码不匹配</span>

      <input class="input" type="password" placeholder="确认密码" v-model="user.ensure">

      <button class="register-button" @click="register">注册</button>
      <div>
        已有账号？
        <router-link to="/login">去登录</router-link>
      </div>
    </div>
  </div>

</template>

<style>
.register{
  display: flex;
  background: #0d7940;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.register-container{
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;
  min-width: 360px;
  max-height: 480px;
  height: 35%;
  align-items: center;
}
.register-title{
  color: #11ab5a;
  font-weight: bold;
  letter-spacing: 1rem;
}
.input{
  border-radius: 5px;
  border: 1px solid #bebaba;
  outline: none;
  margin: 0.5rem;
  padding: 0.7rem;
  width: 70%;
}

.register-button{
  background: #109651;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border: none;
  width: 77%;
  padding: 0.5rem;
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
}
.register-button:hover{
  background: #14b764;
}
a{
  color: deepskyblue;
  text-decoration: none;
}
a:hover{
  color: #0aace3;
}
</style>
<script setup>
import {getCurrentInstance, ref} from "vue";
import request from "@/util/request";
import {useRouter} from "vue-router";
const router = useRouter()
const instance = getCurrentInstance()
const _this= instance.appContext.config.globalProperties
let usernameErr= ref(false)
let passwordErr= ref(false)



  const user = {
    username: '',
    password: '',
    ensure: '',
    role: '用户'
  }

  const register = ()=>{
    if(valid(user.username, user.password, user.ensure)){
      request.post('/register', {
        username: user.username,
        password: user.password,
        role: user.role
      }).then(res => {
        if(res.code === 200){
          _this.$toast.success('注册成功', {position: 'top'})
          router.push('/login')
        }else {
          _this.$toast.warning(res.message, {position: 'top'})

        }
      })
    }
  }

  const valid = (username, password, ensure) =>{
    usernameErr.value =  !/@.*\.com$/.test(username)
    passwordErr.value = !(password === ensure)
    return !(usernameErr.value || passwordErr.value)
  }

</script>