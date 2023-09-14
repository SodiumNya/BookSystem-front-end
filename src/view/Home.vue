<template>
  <div class="search-section">
    <h1>回车，前往书的世界</h1>
    <div class="search">
      <input type="text">
      <span class="search_logo" @click=""></span>
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
 //background: #7f7f7f;
 }
.search_logo{
  content: "";
  top: 16px;
  left: 20px;
  width: 20px;
  height: 20px;
  background-size: 100%;
  background: url("https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/search_magnifier.3aaf44ac.png") no-repeat;
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
}

</style>
<script setup>

import BookList from "@/components/BookList.vue";
const bookData = [
   [{
     BookName: '三体(全集)',
     Author: '刘慈欣',
     src: "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg"
   },]
]
</script>