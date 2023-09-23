<script setup>

import {getCurrentInstance, onMounted, ref} from "vue";
import request from "@/util/request";
const instance = getCurrentInstance()
const _this= instance.appContext.config.globalProperties
const userAvatarUpload = ref(null)
const newUser = ref({
  username: null,
  password: null,
  role: 'any',
  nickname: null,
  avatar: null,
  describe: null
})
const showAvatar = ref(false)
const handleUserAvatarChange = () => {
  newUser.avatar = userAvatarUpload.value.files[0]
  const sendData = new FormData;
  sendData.append('file', newUser.avatar)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  request.post('/files/upload',sendData, config)
      .then(res => {
        if(res.code === 200){
          newUser.value.avatar = res.data
          showAvatar.value = true
        }
      })
}

const addNewUser = ()=> {
  if(newUser.value.role === 'any'){
    _this.$toast.warning('请检查输入信息', {position: 'top'})
    return
  }
  request.post('/add/user', {
    username: newUser.value.username,
    password: newUser.value.password,
    role: newUser.value.role,
    nickname: newUser.value.nickname,
    avatar: newUser.value.avatar,
    describe: newUser.value.describe
  })
      .then(res => {
        if(res.code === 200){
          _this.$toast.success('添加用户成功', {position: 'top'})
        }else {
          _this.$toast.warning(res.message, {position: 'top'})
        }
      })
}

const roles = ref([])
onMounted(()=>{
  request.get('/get/role')
      .then(res =>{
        if(res.code === 200){
          roles.value = res.data
        }
      })
})
</script>

<template>
  <div class="add-book-container">
    <h2 class="add-book-title fs-4 fw-bold p-3">添加用户</h2>
    <div class="add-book-main-content">
      <table class="table align-middle table-bordered w-100">
        <thead class="text-center">
        <tr class="border border-dark">
          <th class="border border-dark">账户</th>
          <th class="border border-dark">密码</th>
          <th class="border border-dark">角色</th>
          <th class="border border-dark">昵称</th>
          <th class="border border-dark">简介</th>
          <th class="border border-dark">头像</th>
        </tr>
        </thead>
        <tbody class="list-user-info-tbody border border-dark w-100" >
        <tr class="list-user-info-tr w-100">
          <td class="">
            <input v-model="newUser.username" class="border-0 text-center" placeholder="输入账户名" style="outline: none">
          </td>
          <td class="">
            <input v-model="newUser.password" class="border-0 text-center" placeholder="输入密码" style="outline: none">
          </td>

          <td class="">
            <input v-model="newUser.nickname" class="border-0 text-center" placeholder="输入昵称" style="outline: none">
          </td>
          <td class="">
            <select id="role-select" class="border-0" style="outline: none" v-model="newUser.role">
              <option value="any">选择用户类型</option>
              <option v-for="role in roles">{{role}}</option>
            </select>
          </td>

          <td class="w-auto">
            <p>
              <textarea v-model="newUser.describe" rows="11" class="border-0 w-100" placeholder="输入简短的介绍" style="outline: none" ></textarea>
            </p>
          </td>

          <td class="w-auto d-flex flex-column justify-content-center align-items-center" style="border: none">
            <img  :src="newUser.avatar" v-if="showAvatar" alt="用户头像" class="img-fluid ">
            <label class="btn btn-success mt-3" >
              上传头像
              <input id="bookCover-upload" type="file" ref="userAvatarUpload" style="display: none" @change="handleUserAvatarChange">
            </label>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex flex-row-reverse">
        <button class="btn btn-success mb-3" style="width: 100px" @click="addNewUser">保存</button>

      </div>

    </div>
  </div>

</template>

<style scoped>
.add-book-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.add-book-title{
  margin: 10px;
  padding: 5px;
  border-bottom: 1px solid #dad8d8;
  width: 95%;
}
.add-book-main-content{
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-height: 100%;
  width: 95%;
}
</style>