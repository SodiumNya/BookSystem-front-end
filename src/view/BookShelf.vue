
<template>
  <h2 class="borrow-book">我借阅的图书</h2>
  <book-list :book-list="bookData"/>
  <div class="pager">
  </div>
</template>

<style scoped>
.borrow-book{
  margin: 30px 20px 10px;
  border-bottom: 1px solid #c0c0c4;

}
</style>

<script setup>

import BookList from "@/components/BookList.vue";
import {ref} from "vue";
let bookData = ref([])
</script>