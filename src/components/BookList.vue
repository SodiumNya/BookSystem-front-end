<template>
  <div class="book-store">
    <div class="book-store" v-for="bookRow in bookList">
      <div class="book-store-row">
        <div class="book" v-for="book in bookRow">
          <div class="book-detail">
            <router-link :to="`/bookDetail/${book.bookId}`" >
              <img :src="book.bookCover" class="cover" alt="书籍封面">
            </router-link>
            <div class="book-detail-right">
              <router-link :to="`/bookDetail/${book.bookId}`">
                <div class="book-title">{{book.bookTitle}}</div>
              </router-link>

              <router-link to="#">
                <div class="book-author-name">{{book.bookAuthor}}</div>
              </router-link>
            </div>
          </div>
<!--          <router-link :to="`/bookDetail/${book.bookId}`" class="book-detail">-->
<!--            -->
<!--          </router-link>-->
        </div>
      </div>
    </div>
  </div>





</template>

<style scoped>
.book-store{
  margin: 10px;
  display: flex;
  width: 100%;
  justify-content: center;
  height: 60%;
  //background-color: #7f7f7f;
}
.book-store-row{
  display: flex;
  align-items: center;
  //margin: 1rem;
  height: 35%;
  width: 100%;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-collapse: collapse;
}
.book-store-col{
  height: 20%;
}
.book{
  display: flex;
  height: 95%;
  max-width: 30%;
}
.cover{
  height: 100%;
  width: 100%;
}
.book-title{
  padding: 25px 10px 10px 5px;
  color: black;
  font-weight: bold;
  overflow: hidden;
  max-width: 13rem;
  font-family: 宋体, serif;
}
.book-author-name{
  color: black;
  align-items: center;
  padding: 0 10px 0 5px;
  overflow: hidden;
  max-width: 13rem;
  font-family: 宋体, serif;
}
.book-author-name a{
  color: black;
}
.book-detail{
  display: flex;
  //align-items: center;
  justify-content: center;
  height: 100%;

}
.book-detail-right{
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
}
</style>

<script setup>

const props = defineProps({
  bookList: Array
})


</script>