<script >

</script>
<template>
<div class="user-manger-container">
  <h2 class="user-manger-title fs-4 fw-bold p-3">用户管理</h2>
<!--  <h1 v-if="isLoading.value">加载中</h1>-->
  <div class="user-manger-main-content">
    <div class="user-select">
      <div class="user-select-user-role">
        <label for="role-select">身份:</label>
        <select id="role-select" v-model="selectedRole">
          <option value="any">选择用户类型</option>
          <option v-for="role in roles">{{role}}</option>
        </select>
      </div>
      <div class="user-select-user-search">
        <input type="search" v-model="searchInput" placeholder="输入uid/账号/昵称进行检索">
      </div>
      <input class="submit" type="submit" value="查询" @click="search">
    </div>
    <div class="user-manger-info">
      <table class="list-user-info">
        <thead class="text-center">
        <tr class="list-user-info-thead">
          <th>uid</th>
          <th>账号</th>
          <th>密码</th>
          <th>昵称</th>
          <th>头像</th>
          <th>个人简介</th>
          <th>身份</th>
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
            <button type="button" class="button-edit" data-bs-toggle="modal" data-bs-target="#xxx" @click="handleCurrentUser(user)">修改信息</button>
          </td>
          <td class="list-user-info-td">
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirm" @click="handleCurrentUser(user)">删除用户</button>
          </td>
        </tr>
        <modal id="xxx"
               :modal-id="'xxx'"
               :user=currentUser
               :roles="roles"
               @returnData='save' />
        </tbody>
        <confirm-modal :title="'删除'"
                       :context="'删除用户会发生不得了的事情, 你考虑好了吗'"
                       @returnData="deleteUser"/>
      </table>

      <nav aria-label="Page navigation example" class="mt-3">
          <ul class="pagination">
            <li class="page-item" >
              <a class="page-link" href="#" @click="toFirstPage" >
                第一页
              </a>
            </li>

            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous" @click="toFrontPage">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item"><a class="page-link" href="#">{{currentPage}}</a></li>

            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next" @click="toNextPage">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>

            <li class="page-item"><a class="page-link" href="#" @click="toLastPage">最后一页</a></li>
          </ul>
        </nav>
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
  import Modal from "@/components/Modal.vue";

  import { getCurrentInstance } from 'vue'
  import ConfirmModal from "@/components/ConfirmModal.vue";

  const currentUser = ref({})
  const instance = getCurrentInstance()
  const _this= instance.appContext.config.globalProperties

  const users = ref(null)
  const roles = ref([])
  const selectedRole = ref('any')
  const searchInput = ref(null)
  const isLoading = ref(true)

  const currentPage = ref(1)
  const pageSize = 1;
  const total = ref(1)

  const countLastPage = () =>{
    return Math.ceil(total.value / pageSize)
  }

  let lastPage = countLastPage()

  const toFirstPage = () => {
    currentPage.value = 1;
    search()
  }
  const toLastPage = () => {
    currentPage.value = lastPage;
    search()

  }
  const toFrontPage = () =>{
    if(currentPage.value !== 1){
      currentPage.value--
      search()

    }
  }
  const toNextPage = () =>{
    if(currentPage.value !== Math.ceil(total.value/pageSize)){
      currentPage.value++;
      search()

    }
  }


  const handleCurrentUser = (user) =>{
    currentUser.value = JSON.parse(JSON.stringify(user))
  }
  const editUserInfo = (user)=>{
    let data = null
    request.get(`/select/${user.id}`)
        .then(res =>{
          if(res.code === 200){
            data = res.data
          }
        })
    return data
  }

  const save = (data)=>{
    console.log("这里是保存发请求",data)
    request.post('/admin/manage/user/update',{
      'uid': data.uid,
      'username': data.username,
      'nickname': data.nickname,
      'password': data.password,
      'avatar': data.avatar,
      'describe': data.describe,
      'role': data.role
    })
        .then(res =>{
          if(res.code === 200){
            // 消息组件提示修改成功
            search()
            _this.$toast.success("修改成功", {position: 'top'})

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
            currentPage.value = res.currentPage
            total.value = res.total
            lastPage = countLastPage()
          }
        })
  }

  const deleteUser = () => {
    request.delete(`/delete/user/${currentUser.value.uid}`)
        .then(res => {
          if(res.code === 200){
            search();
            _this.$toast.success('删除成功', {position: 'top'})
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
