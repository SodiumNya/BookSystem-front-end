<template>
  <div class="profile-container">
    <div class="profile-content">
      <h3 class="profile-title">修改基本信息</h3>
      <div class="public-profile">
        <div class="profile-detail">
          <label for="nickname">昵称</label>
          <input id="nickname" type="text" :placeholder="user.nickname">

          <label for="username" >用户名</label>
          <input id="username" type="text" disabled :placeholder="user.username">

          <label for="password">密码</label>
          <input id="password" type="text" disabled :placeholder="user.password">

          <label for="describe">个人简介</label>
          <textarea id="describe" rows="4" :placeholder="user.describe"></textarea>

          <button class="profile-save">保存修改</button>

        </div>


        <div class="profile-avatar">
          <img src="https://avatars.githubusercontent.com/u/112569765?…00&u=5821d799b19c6471af785b40e1c71ba8fe48ca9e&v=4" alt="头像" class="profile-avatar-picture">
          <label class="avatar-upload">
            上传头像
            <input id="avatar-upload" type="file">
          </label>
        </div>

      </div>

    </div>

    <div class="profile-content">
      <h3 class="profile-title">修改重要信息</h3>
      <div class="public-profile">
        <div class="profile-detail">
          <label for="username" >用户名</label>
          <input id="username" type="text" :placeholder="user.username">

          <label for="password">密码</label>
          <input id="password" type="text" :placeholder="user.password">

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

  const user = JSON.parse(localStorage.getItem('user' || '{}'))
  const saveCoreInfo = ()=>{
    request.post('#', {
      nickname: user.nickname,
      describe: user.describe
    })
  }

  const saveBasicInfo = ()=>{
    request.post('#', {
      username: user.username,
      password: user.password
    })
  }
</script>