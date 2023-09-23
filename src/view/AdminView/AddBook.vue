<script setup>

import ConfirmModal from "@/components/ConfirmModal.vue";
import BookModal from "@/components/BookModal.vue";
import {ref} from "vue";
import request from "@/util/request";
const bookCoverUpload = ref(null)
const newBook = ref({
  bookTitle: null,
  bookAuthor: null,
  bookCover: null,
  bookContent: null,
  bookIntro: null
})
const showBookCover = ref(false)
const handleBookCoverChange = () => {
  newBook.bookCover = bookCoverUpload.value.files[0]
  const sendData = new FormData;
  sendData.append('file', newBook.bookCover)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  request.post('/files/upload',sendData, config)
      .then(res => {
        if(res.code === 200){
          newBook.value.bookCover = res.data
          showBookCover.value = true
        }
      })
}

const addNewBook = ()=> {
  request.post('/add/book', {
    bookTitle: newBook.value.bookTitle,
    bookAuthor: newBook.value.bookAuthor,
    bookCover: newBook.value.bookCover,
    bookContent: newBook.value.bookContent,
    bookIntro: newBook.value.bookIntro
  })
      .then(res => {
        if(res.code === 200){
          alert(res.message)
        }
      })
}
</script>

<template>
  <div class="add-book-container">
    <h2 class="add-book-title fs-4 fw-bold p-3">添加图书</h2>
    <div class="add-book-main-content">
      <table class="table align-middle table-bordered w-100">
        <thead class="text-center">
        <tr class="border border-dark">
          <th class="border border-dark">书名</th>
          <th class="border border-dark">作者名</th>
          <th class="border border-dark">封面</th>
          <th class="border border-dark">内容</th>
          <th class="border border-dark">书籍简介</th>
        </tr>
        </thead>
        <tbody class="list-user-info-tbody border border-dark w-100" >
        <tr class="list-user-info-tr w-100">
          <td class="">
            <input v-model="newBook.bookTitle" class="border-0 text-center" placeholder="输入书名" style="outline: none">
          </td>
          <td class="">
            <input v-model="newBook.bookAuthor" class="border-0 text-center" placeholder="输入作者名" style="outline: none">
          </td>
          <td class="w-auto d-flex flex-column justify-content-center align-items-center" style="border: none">
            <img  :src="newBook.bookCover" v-if="showBookCover" alt="书籍封面" class="img-fluid ">
            <label class="btn btn-success mt-3" >
              上传封面
              <input id="bookCover-upload" type="file" ref="bookCoverUpload" style="display: none" @change="handleBookCoverChange">
            </label>
          </td>
          <td class="w-auto">
            <p>
              <textarea v-model="newBook.bookContent" rows="12" class="border-0 w-100 text-center" placeholder="输入内容(当前版本请输入连接)" style="outline: none" ></textarea>
            </p>
          </td>
          <td class="w-auto">
            <p>
              <textarea v-model="newBook.bookIntro" rows="11" class="border-0 w-100" placeholder="输入关于本书的简短介绍" style="outline: none" ></textarea>
            </p>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex flex-row-reverse">
        <button class="btn btn-success mb-3" style="width: 100px" @click="addNewBook">保存</button>

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