
<template>
  <h2 class="borrow-book">我借阅的图书</h2>
  <book-list :book-list="bookData"/>
  <div class="pager">
  </div>
</template>

<style scoped>
.borrow-book{
  margin: 30px 20px 10px;
}
</style>

<script setup>

import BookList from "@/components/BookList.vue";
const bookData = [
  [
    {
      BookName: '三体(全集)',
      Author: '刘慈欣',
      src: "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg"
    },
    {
      BookName: '三体(全集)',
      Author: '刘慈欣',
      src: "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg"
    },
  ],
  [
    {
      BookName: '三体(全集)',
      Author: '刘慈欣',
      src: "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg"
    },
    {
      BookName: '三体(全集)',
      Author: '刘慈欣',
      src: "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg"
    },
  ],
]
</script>