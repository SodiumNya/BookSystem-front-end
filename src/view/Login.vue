<template>
  <div id="login">
    <div class="login-container">
      <h1 class="login-title">登录</h1>
      <div class="input-container">
        <input v-model=verifyUser.username class="input" placeholder="邮箱/uid">
        <span class="errMessage" v-if=usernameErr>用户名格式不正确</span>

      </div>
      <div class="input-container">
        <input v-model=verifyUser.password class="input" type="password" placeholder="输入密码">
        <span class="errMessage" v-if="passwordErr">密码格式不正确</span>
      </div>

      <div class="input-container">
        <div class="code">
          <input v-model=validCode class="code-input" placeholder="输入验证码">
          <valid-code ref="captchaRef" />
        </div>
        <span class="errMessage" v-if="captchaErr">验证码不正确</span>

      </div>

      <button class="login-button" @click="login">登录</button>
      <div class="bottom">
        <router-link to="/register"><span>没有账号？</span>去注册</router-link>
        <router-link to="#">修改密码</router-link>
      </div>
    </div>
  </div>

</template>

<style>
#login{
  display: flex;
  background: #1c7e94;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.login-container{
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;
  min-width: 360px;
  height: 35%;
  align-items: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);

}
.login-title{
  color: #41b9d3;
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
.code-input{
  border-radius: 5px;
  border: 1px solid #bebaba;
  outline: none;
  width: 30%;
  text-align: center;
}
.code{
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  outline: none;
  padding: 0.7rem;
  width: 75%;
}
.login-button{
  background: deepskyblue;
  border-radius: 5px;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border: none;
  width: 75%;
  padding: 0.5rem;
  color: white;
  font-size: 20px;
  letter-spacing: 4px;
}
.login-button:hover{
  background: #0aace3;
}
a{
  color: deepskyblue;
  text-decoration: none;
}
a span{
  color: black;
}
a:hover{
  color: #0aace3;
}
.errMessage{
  width: 75%;
  text-align: left;
  font-size: 12px;
  color: red;
}

.input-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
.bottom{
  display: flex;
  width: 75%;
  justify-content: space-between;
}
</style>
<script>

import validCode from "@/components/ValidCode.vue";
import {ref} from "vue";
import request from "@/util/request";
export default {
  components: {
    validCode
  },
  setup() {
    return {
      validCode: '',
      verifyUser:{
        username: '',
        password: '',
      },
      user:{
        nickname: '',
        password: '',
        role: '',
        token: '',
        uid: '',
        username: '',
        avatar: 'https://avatars.githubusercontent.com/u/112569765?…00&u=5821d799b19c6471af785b40e1c71ba8fe48ca9e&v=4',
      },

      usernameErr: ref(false),
      passwordErr: ref(false),
      captchaErr: ref(false)
    }
  },
  methods: {
    invalid(){
      const captcha = this.$refs.captchaRef.captchaText
      this.captchaErr = !(captcha.toLocaleLowerCase() === this.validCode.toLocaleLowerCase())
      this.usernameErr = (this.verifyUser.username.length === 0 || (!/^[a-zA-Z0-9]+$/.test(this.username)))
      this.passwordErr = (this.verifyUser.password.length < 1)

      return this.captchaErr || this.usernameErr || this.passwordErr
    },
    login() {
      if(this.invalid()){
        return
      }

      request.post('/login', {
          username: this.verifyUser.username,
          password: this.verifyUser.password
      }).then(res =>{
        if(res.code ===  200){
          localStorage.setItem('user',JSON.stringify(res.data))
          this.$router.push('/')
        }
      })


    }
  }
}
</script>