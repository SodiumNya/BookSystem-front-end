
<template>
  <div class="user-manger-container">
    <h2 class="user-manger-title">图书管理</h2>
    <div class="user-manger-main-content">
      <div class="user-select">
        <div class="user-select-user-search">
          <input type="search" v-model="searchInput" placeholder="输入/书名/作者名进行检索">
        </div>
        <input class="submit" type="submit" value="查询" @click="search">
      </div>
      <div class="user-manger-info">
        <table class="list-user-info">
          <thead>
          <tr class="list-user-info-thead">
            <th>bookID</th>
            <th>书名</th>
            <th>作者名</th>
            <th>封面</th>
            <th>内容</th>
            <th>书籍简介</th>
          </tr>
          </thead>
          <tbody class="list-user-info-tbody">
          <tr class="list-user-info-tr" v-for="user in users">
            <td class="list-user-info-td">{{user.uid}}</td>
            <td class="list-user-info-td">{{user.username}}</td>
            <td class="list-user-info-td">{{user.password}}</td>
            <td class="list-user-info-td">{{user.nickname}}</td>
            <td class="list-user-info-td">
              <img :src="user.avatar" alt="用户头像" class="list-user-info-img">
            </td>
            <td class="list-user-info-td">{{user.describe}}</td>
            <td class="list-user-info-td">{{user.role}}</td>
            <td class="list-user-info-td">
              <button class="button-edit" @click="editUserInfo(user)">修改信息</button>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<style scoped>
.user-manger-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.user-manger-title{
  margin: 10px;
  padding: 5px;
  border-bottom: 1px solid #dad8d8;
  width: 95%;
}
.user-manger-main-content{
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-height: 100%;
  width: 95%;
}
.user-manger-info{
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-user-info{
  justify-content: center;
  margin-top: 3rem;
  width: 80%;
  min-width: 480px;
  border: 1px solid;
  border-collapse: collapse;
}
.list-user-info-thead{
  font-weight: bold;
}
.list-user-info-thead th{
  border: 1px solid;
}
.list-user-info-tbody {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-user-info-tr{
  line-height: 1;
}
.list-user-info-td{
  height: 48px;
  width: auto;
  border: 1px solid;
}
.list-user-info-label{

}
.list-user-info-label input{
  display: none;
}
.list-user-info-img{
  max-height: 100%;
  width: auto;
}
.user-select{
  display: flex;
  align-items: baseline;
  justify-content: start;
  border-bottom: 1px solid #dad8d8;

}
.user-select-user-role{
  margin: 1rem;
}
.user-select-user-role select{
  padding: 0.5rem;
  margin-left: 5px;
  border-radius: 5px;
  outline: none;
  border: 1px solid darkgray;
}
.user-select-user-search{
  margin: 1rem;
}
.user-select-user-search input{
  padding: 0.5rem;
  border-radius: 5px;
  outline: none;
  border: 1px solid darkgray;

}
.button-edit{
  border: none;
  background: #1f883d;
  color: #fffff3;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem;
}
.button-edit:hover{
  background: #289845;
}
.submit{
  background-color: #0aace3;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  color: whitesmoke;
  font-weight: bold;
  width: 4rem;
}
.submit:hover{
  background-color: #097498;
}
.button-save{
  margin-top: 1rem;
  border: none;
  background: #1f883d;
  color: #fffff3;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.5rem;
  width: 4rem;
}
.button-save:hover{
  background: #289845;
}
.user-manger-footer{
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>

<script setup>
import request from "@/util/request";
import {onMounted, ref} from "vue";

const users = ref(null)
const roles = ref([])
const selectedRole = ref('any')
const searchInput = ref(null)
const isLoading = ref(true)
const currentPage = ref(1)
const pageSize = 10;
const editUserInfo = (user)=>{
  request.get(`/select/${user.uid}`)
      .then(res =>{
        if(res.code === 200){
          //跳出弹窗
        }
      })
}
const save = ()=>{
  request.post('/admin/manage/user/update',{})
      .then(res =>{
        if(res.code === 200){
          // 消息组件提示修改成功
        }
      })
}
const search = () =>{
  if((selectedRole.value === 'any') && !searchInput.value){
    return
  }
  request.get(`/admin/user/get/all/${selectedRole.value}/${searchInput.value}/${currentPage.value}/${pageSize}`)
      .then(res =>{
        if(res.code === 200 || res.code === 233){
          users.value = res.data
          isLoading.value = false
        }
      })
}
onMounted(()=>{
  request.get('/get/role')
      .then(res =>{
        if(res.code === 200){
          roles.value = res.data
        }
      })
})
</script>
