<template>
  <div class="profile-container">
    <div class="profile-content">
      <h2 class="profile-title">修改基本信息</h2>
      <div class="public-profile">
        <div class="profile-detail">
          <label for="nickname">昵称</label>
          <input id="nickname" type="text" v-model="data.nickname" required="required">

          <label for="username" >uid</label>
          <input id="username" type="text" disabled :placeholder="user.uid">

          <label for="username" >用户名</label>
          <input id="username" type="text" v-model="user.username" disabled >

          <label for="password">密码</label>
          <input id="password" type="text" disabled v-model="user.password">

          <label for="describe">个人简介</label>
          <textarea id="describe" rows="4" v-model="data.describe" ></textarea>

          <button class="profile-save" @click="saveBasicInfo">保存修改</button>

        </div>


        <div class="profile-avatar">
          <img :src="user.avatar" alt="头像" class="profile-avatar-picture">
          <label class="avatar-upload" >
            上传新头像
            <input id="avatar-upload" type="file" ref="avatarUpload" @change="handleAvatarChange">
          </label>
        </div>

      </div>

    </div>

    <div class="profile-content">
      <h2 class="profile-title">修改重要信息</h2>
      <div class="public-profile">
        <div class="profile-detail">
          <label for="username" >用户名</label>
          <input id="username" type="text" v-model="data.username">

          <label for="password">密码</label>
          <input id="password" type="text" v-model="data.password">

          <button class="profile-save" @click="saveCoreInfo">保存修改</button>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.profile-container{
  margin: 10px;
  align-items: center;
}
.profile-content{
  width: 100%;
  padding-bottom: 3rem;
  margin-top: 1rem;
}
.profile-title{
  margin: 10px;
  padding: 5px;
  border-bottom: 1px solid #dad8d8;
}
.public-profile{
  display: flex;
  margin-left: 10px;
  padding-left: 5px;
  padding-right: 5px;
  width: 50%;
  align-items: center;

}
.profile-detail{
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  font-weight: bold;
}
.profile-detail input{
  border-radius: 5px;
  border: 1px solid #bebaba;
  outline: none;
  line-height: 2;
  width: 22.5rem;
  margin-top: 5px;
  padding-left: 10px;
}
.profile-detail textarea{
  border-radius: 5px;
  border: 1px solid #bebaba;
  margin-top: 5px;
  outline: none;
  resize: none;
  padding-left: 10px;
}

.profile-detail label{
  margin-top: 10px;
}
.profile-avatar{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
}
.profile-avatar-picture{
  margin-top: 10px;
  border-radius: 100%;
  width: 200px;
  height: 200px;
}

.profile-save{
  margin-top: 1rem;
  border: none;
  background: #1f883d;
  color: #fffff3;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem;
  width: 25%;
}
.profile-save:hover{
  background: #289845;
}
.avatar-upload{
  margin-top: 1rem;
  display: inline-block;
  background: #0ba9d9;
  padding: 0.5rem;
  border-radius: 5px;
  color: #fffff3;
  font-weight: bold;
  //pointer-events: none;
}

.avatar-upload:hover{
  background: #0cb7ec;
}
.avatar-upload input{
  display: none;
}
</style>

<script setup>
import request from "@/util/request";
import {useRouter} from "vue-router";
import {ref} from "vue";

import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const _this= instance.appContext.config.globalProperties

const router = useRouter()
  const user = JSON.parse(localStorage.getItem('user' || '{}'))

  let data = ref({
    nickname: user.nickname,
    username: user.username,
    password: user.password,
    describe: user.describe,
    avatar: user.avatar,
  });

  let uploadAvatar = user.avatar
  const avatarUpload = ref(null)
  const handleAvatarChange = ()=>{
    uploadAvatar = avatarUpload.value.files[0]
    const sendData = new FormData;
    sendData.append('uid', user.uid)
    sendData.append('avatar', uploadAvatar)
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    request.post('/update/basic/avatar',sendData, config)
        .then(res => {
          if(res.code === 200){
            request.get(`/select/${user.uid}`)
                .then(res =>{
                  if(res.code === 200){
                    localStorage.setItem('user', JSON.stringify(res.data))
                    setTimeout(()=>{
                      window.location.reload()

                    }, 1000)
                  }
                })
            _this.$toast.success('修改成功', {position: 'top', duration: 1500});


          }
          }
        )
  }

  const saveCoreInfo = ()=> {
    if(data.value.username)
    request.post('/update/core', {
      uid: user.uid,
      username: data.value.username,
      password: data.value.password
    }).then(res =>{
      if(res.code === 200){
        _this.$toast.success('修改成功', {position: 'top', duration: 1500});

        localStorage.removeItem('user')
        router.push('/login')

      }
    })
  }




  const saveBasicInfo = ()=>{

    request.post('/update/basic', {
      uid: user.uid,
      nickname: data.value.nickname,
      describe: data.value.describe,
    }).then(res =>{
      if(res.code === 200){
        _this.$toast.success('修改成功', {position: 'top', duration: 1500});

        request.get(`/select/${user.uid}`)
            .then(res =>{
              if(res.code === 200){
                localStorage.setItem('user', JSON.stringify(res.data))
                setTimeout(()=>{
                  window.location.reload()
                }, 1000)
              }
            })
      }
    })
  }

</script>