<template>
  <div class="book-detail-container">
    <h1 v-if="isLoading">加载中</h1>
    <div v-else class="book-detail-main-container">
      <div class="book-detail-content">

        <span class="book-detail-cover">
          <a :href="book.bookContent" class="book-cover">
          <img :src="book.bookCover" alt="书籍封面">
          </a>

        </span>

        <div class="book-info-right">
          <div class="book-info-right-top">
            <div class="book-detail-text">
              <div class="book-title">{{book.bookTitle}}</div>
              <div class="book-author">{{book.bookAuthor}}</div>
            </div>
            <div class="book-info-right-top-button">
              <button>加入书架</button>
              <a :href="book.bookContent">
                <button>开始阅读</button>
              </a>
            </div>
          </div>

          <div class="book-intro">
            <p >{{book.bookIntro}}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-detail-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #262628;
  width: 100%;
  height: 100%;
}
.book-detail-main-container{
  display: flex;
  width: 34%;
  height: 100%;
  background-color: #1c1c1d;
}
.book-detail-content{
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  color: whitesmoke;
  border-bottom: 1px solid #282829;
  width: 100%;
  height: 50%;
}
.book-info-right{
  margin-right: 1rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  //justify-content: center;
  width: 70%;
}
.book-info-right-top{
  //max-width:30%;
  display: flex;
}
.book-detail-cover{
  display: flex;
  justify-content: end;
  margin-left: 4rem;
  width: 30%;
}
.book-cover{
  max-height: 20%;
  width: 100%;
}
.book-cover img{
  width: 100%;
}
.book-info-right-top-button{
  margin: 1rem 4rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
}
.book-info-right-top-button button{
  border-radius: 26px;
  text-align: center;
  color: whitesmoke;
  background-color: #16a0fb;
  margin-bottom: 1rem;
  padding: 0.8rem 1.5rem;
  font-size: large;
  border: none;
}
.book-info-right-top-button button:hover{
  background-color: #0782d2;
  cursor: pointer;
}
.book-detail-text{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.book-title {
  font-size: xx-large;
  font-family: 宋体, serif;
  margin-bottom: 0.5rem;
}
.book-author {
  font-size: x-large;
  font-family: 宋体, serif;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #0096fd;
}
.book-intro{
  max-width: 80%;
  overflow: hidden;
  overflow-wrap: break-word;
}
.book-intro p{
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import request from "@/util/request";
let book = ref(null)
const isLoading = ref(true)
const toRead = ()=>{book.bookContent}
onMounted(() =>{
  const route = useRoute();
  const BookId = route.params.bookId
  request.get(`/select/book/${BookId}`)
      .then(res =>{
        if(res.code === 200){
          book.value = res.data
          isLoading.value = false

        }else {
          isLoading.value = false
        }
      })
})

</script>