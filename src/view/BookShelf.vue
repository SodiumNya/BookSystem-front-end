
<template>
  <div class="book-shelf-content">
    <h2 class="borrow-book">我借阅的图书</h2>
    <div v-if="isLoading" style="margin-left: 2rem">
      <h2>加载中...</h2>
    </div>
    <book-list :book-list="bookData" v-else/>
    <div class="pager">
    </div>
  </div>


</template>

<style scoped>
.borrow-book{
  margin: 10px 10px 10px 24px;
  padding: 5px;
  border-bottom: 1px solid #dad8d8;
}
.book-shelf-content{
  margin-top: 1rem;
  width: 100%;
  height: 100%;
}
</style>

<script setup>

import BookList from "@/components/BookList.vue";
import {onMounted, ref} from "vue";
import request from "@/util/request";
let bookData = ref([])
const isLoading = ref(true)
const currentPage = ref('1')
const pageSize = ref('5')
onMounted(()=>{
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  request.get(`select/bookShelf${user.uid}/${currentPage.value}/${pageSize.value}`)
      .then(res =>{
        if(res.code === 200){
          bookData.value = res.data
          isLoading.value = false
        }
      })
})
</script>