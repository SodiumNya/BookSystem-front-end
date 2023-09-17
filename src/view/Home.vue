<template>
  <div class="search-section">
    <h1>回车，找本书看看</h1>
    <div class="search">
      <input type="text" v-model="searchData" placeholder="输入/书名/作者名" >
      <span class="search_logo" @click="getBook" @keyup.enter="keyDown"></span>
    </div>
  </div>
  <book-list :book-list="bookData"/>
</template>

<style>
.search-section{
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  border-bottom: 10px solid #e0e2e5;
 }
.search_logo{
  content: "";
  top: 16px;
  left: 20px;
  width: 20px;
  height: 100%;
  background-size: 100%;
  background: url("https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/search_magnifier.3aaf44ac.png") no-repeat;
}
.search_logo:hover{
  background: #312f2f url("https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/search_magnifier.3aaf44ac.png") no-repeat;
}
.search{
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 5px;
  height: 10%;
  width: 40%;
  border-radius: 26px;
  padding: 10px;
  border: 1px solid darkgray;
  outline: none;
}
.search input{
  border: none;
  outline: none;
  width: 90%;
  height: 100%;
  padding: 10px;
  border-radius: 26px;
  font-size: large;
}

</style>
<script setup>

import BookList from "@/components/BookList.vue";
import request from "@/util/request";
import {onMounted, onUnmounted, ref} from "vue";
const searchData = ref('')
const currentPage = ref('1')
const pageSize = 25
const bookData = ref([
])

const keyDown = (e)=>{
  if (e.keyCode === 13){
    getBook()
  }
}
const getBook = ()=>{
  // alert(searchData.value)
  request.post(`/select/bookList/${searchData.value}/${currentPage.value}/${pageSize}`)
      .then(res => {
        if(res.code === 200){
          bookData.value = res.data;
        }else {
          // bookData.value = null
        }
      })
}

onMounted(()=>{
  window.addEventListener('keydown', keyDown)
})

onUnmounted(()=>{
  window.removeEventListener('keydown', keyDown, false)
})
</script>