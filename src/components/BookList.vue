<template>
  <div class="book-store">
    <div class="book-store-row" v-for="books in bookList">
      <div class="book-store-col" v-for="bookObject in books">
        <router-link :to="`/bookDetail/${bookObject.bookId}`">
          <div class="book">
            <img alt="书籍封面" :src="bookObject.bookCover">
            <div class="book-detail">
              <div class="book-title">{{bookObject.bookTitle}}</div>
              <div class="book-author-name" @click="aaa">
                {{bookObject.bookAuthor}}
              </div>
            </div>
          </div>

        </router-link>

      </div>
    </div>
  </div>

</template>

<style scoped>
.book-store{
  margin: 20px;
  align-items: center;
  height: 50%;
}
.book-store-row{
  display: flex;
  height: 20%;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  border-collapse: collapse;
}
.book-store-col{
  height: 100%;
}
.book{
  margin: 10px;
  display: flex;
  height: 100%;
}
.book img{
  max-width: 90%;
  max-height: 80%;
}
.book-title{
  padding: 25px 10px 10px 5px;
  color: black;
  font-weight: bold;
}
.book-author-name{
  color: black;
  align-items: center;
  padding: 0 10px 0 5px;

}
.book-author-name a{
  color: black;
}
.book-detail{
  margin: 5px;
  align-items: center;

}
</style>

<script setup>

const props = defineProps({
  bookList: Array
})


</script>