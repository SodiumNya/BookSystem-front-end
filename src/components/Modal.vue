<script setup>
import {onMounted, ref} from "vue";
import request from "@/util/request";
const props = defineProps({
  user: Object,
  modalId: String,
  roles: Array
})
const emit = defineEmits(['returnData'])
const save = () => {
  emit('returnData',props.user)
}
const getDefaultAvatar = ()=>{
  request.get(`/admin/user/reSet/avatar${props.user.uid}`)
      .then(res => {
        if(res.code === 200){
          props.user.avatar = res.data
        }
      })
}
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :id=props.id data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
                    <table class="table align-middle table-bordered">
                      <thead>
                      <tr >
                        <th scope="col">uid</th>
                        <th>账号</th>
                        <th>密码</th>
                        <th>昵称</th>
                        <th>个人简介</th>
                        <th>身份</th>
                        <th>头像</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{{user.uid}}</td>
                        <td>{{user.username}}</td>
                        <td>
                          <input v-model="user.password" class="border-0 text-center" style="outline: none">
                        </td>
                        <td>
                          <input v-model="user.nickname" class="border-0 text-center" style="outline: none">
                        </td>
                        <td>
                          <input v-model="user.describe" class="border-0 text-center" style="outline: none">
                        </td>
                        <td>
                          <select v-model="user.role" class="border-0" style="outline: none">
                            <option v-for="role in roles">{{role}}</option>
                          </select>
                        </td>
                        <td>
                          <img :src="user.avatar" alt="用户头像" class="img-fluid w-25 rounded">
                          <button class="btn btn-success ms-3" @click="getDefaultAvatar">重置头像</button>
                        </td>
                      </tr>
                      </tbody>
                    </table>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="save" data-bs-dismiss="modal">保存修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>