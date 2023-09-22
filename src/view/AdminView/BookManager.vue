
<template>
  <div class="user-manger-container">
    <h2 class="user-manger-title fs-4 fw-bold p-3">图书管理</h2>
    <div class="user-manger-main-content">
      <div class="user-select">
        <div class="user-select-user-search">
          <input type="search" v-model="searchInput" placeholder="输入/书名/作者名进行检索">
        </div>
        <input class="submit" type="submit" value="查询" @click="searchBook">
      </div>
      <div class="user-manger-info">
        <table class="table align-middle mt-lg-5 w-100">
          <thead class="text-center">
          <tr class="border border-dark">
            <th class="border border-dark">bookID</th>
            <th class="border border-dark">书名</th>
            <th class="border border-dark">作者名</th>
            <th class="border border-dark">封面</th>
            <th class="border border-dark">内容</th>
            <th class="border border-dark">书籍简介</th>
          </tr>
          </thead>
          <tbody class="list-user-info-tbody border border-dark" >
          <tr class="list-user-info-tr" v-for="book in books">
            <td class="border border-dark">{{book.bookId}}</td>
            <td class="border border-dark">{{book.bookTitle}}</td>
            <td class="border border-dark">{{book.bookAuthor}}</td>
            <td class="border border-dark"><img :src="book.bookCover" alt="书籍封面" class="img-fluid w-25 h-auto"></td>
            <td class="border border-dark overflow-hidden w-25" >{{book.bookContent}}</td>
            <td class="border border-dark overflow-scroll w-25">{{book.bookIntro}}</td>
            <td>
              <button type="button" class="btn btn-success" data-bs-toggle= "modal" data-bs-target="#bookModal" @click="handleEditBook(book)">修改</button>
            </td>
            <td class="border border-dark">
              <button type="button" class="btn btn-danger" data-bs-toggle= "modal" data-bs-target="#confirm" @click="handleEditBook(book)">删除</button>
            </td>
          </tr>
          <book-modal :modal-id="'bookModal'"
                      :book= editBook
                      @returnData="updateBook"/>
          <confirm-modal  :title="'删除'"
                         :context="'删除图书可能会发生不得了的事情, 你考虑好了吗'"
                         @returnData="deleteBook"/>
          </tbody>
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

.list-user-info-label input{
  display: none;
}

.user-select{
  display: flex;
  align-items: baseline;
  justify-content: start;
  border-bottom: 1px solid #dad8d8;

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

import { getCurrentInstance } from 'vue'
import BookModal from "@/components/BookModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
const instance = getCurrentInstance()
const _this= instance.appContext.config.globalProperties

const currentPage = ref(1)
const pageSize = 10;
const total = ref(1)
const countLastPage = () =>{
  return Math.ceil(total.value / pageSize)
}

let lastPage = countLastPage()

const toFirstPage = () => {
  currentPage.value = 1;
  searchBook()
}
const toLastPage = () => {
  currentPage.value = lastPage;
  searchBook()

}
const toFrontPage = () =>{
  if(currentPage.value !== 1){
    currentPage.value--
    searchBook()

  }
}
const toNextPage = () =>{
  if(currentPage.value !== Math.ceil(total.value/pageSize)){
    currentPage.value++;
    searchBook()

  }
}

const books = ref(null)

const searchInput = ref(null)

const editBook = ref({})
const load = ref(false)
const handleEditBook  = (book) => {
  load.value = true
  editBook.value = JSON.parse(JSON.stringify(book))
}
const searchBook = () =>{
  if(!searchInput) {
    return
  }
  request.get(`/select/bookList/${searchInput.value}/${currentPage.value}/${pageSize}`)
      .then(res =>{
        if(res.code === 200){
          books.value = res.data.flat()
          currentPage.value = res.currentPage
          total.value = res.total

        }else {
          _this.$toast.waring(res.data, {position: 'top'})
        }
      })
}
const updateBook = (data)=>{
  request.post('/update/book', {
    bookId: data.bookId,
    bookTitle: data.bookTitle,
    bookAuthor: data.bookAuthor,
    bookCover: data.bookCover,
    bookContent: data.bookContent,
    bookIntro: data.bookIntro
  }).then(res => {
    if(res.code === 200){
      searchBook()
      _this.$toast.sucess('修改成功！', {position: 'top'})
    }
  })
}

const deleteBook = (bookId)=>{

  request.delete(`/delete/book/${editBook.value.bookId}`)
      .then(res=>{
        if(res.code === 200){
          searchBook()
          _this.$toast.success('删除成功！', {position: 'top'})
        }
      })
}
</script>
