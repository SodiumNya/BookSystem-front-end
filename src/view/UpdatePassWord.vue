<script setup>

import {getCurrentInstance, onMounted, ref} from "vue";
import request from "@/util/request";
import {useRouter} from "vue-router";
const email = ref(null)
const instance = getCurrentInstance()
const _this= instance.appContext.config.globalProperties
const router = useRouter()
const reSetPassword = ()=> {
  _this.$toast.success('抱歉,该功能还没有做完', {position: 'top'})

  // request.post('/user/reSet/password', {email})
  //     .then(res => {
  //       if(res.code === 200){
  //         _this.$toast.success('重置密码成功', {position: 'top'})
  //         router.push('/login')
  //       }else {
  //         _this.$toast.warning('重置密码成功', {position: 'top'})
  //       }
  //     })
}

</script>

<template>
  <div class="vh-100 d-flex align-items-center justify-content-center" style="background-color: #1c7e94">
    <div class="update-password-container ">
      <h2 class="mt-3">修改密码</h2>
      <form action="" class="was-validated">
        <p class="">我们将发送重置密码到你的绑定邮箱,请注意查看</p>
        <div class="d-flex w-100 align-items-center mt-lg-5">
          <div class="form-group">
            <label for="uname">账号绑定的邮箱:</label>
            <input v-model="email" type="text" class="form-control" id="uname" placeholder="Enter username" required>
            <div class="invalid-feedback">请输入邮箱！</div>
          </div>
          <button class="btn btn-primary ms-2" @click="reSetPassword">发送验证码</button>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>
.update-password-container{
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 5px;
  min-width: 420px;
  height: 35%;
  align-items: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);

}
</style>