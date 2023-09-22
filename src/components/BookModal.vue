<script setup>
import {onMounted, ref} from "vue";
import request from "@/util/request";
const props = defineProps({
  book: Object,
  modalId: String,
})

const emit = defineEmits(['returnData'])
const save = () => {
  emit('returnData',props.book)
}

let bookCoverUpload = ref(null)
const handleBookCoverChange = ()=>{
  props.book.bookCover = bookCoverUpload.value.files[0]
  const sendData = new FormData;
  sendData.append('file', props.book.bookCover)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  request.post('/files/upload',sendData, config)
      .then(res => {
        if(res.code === 200){
          props.book.bookCover = res.data
          console.log(props.book)
        }
      })
}
</script>

<template>
  <!-- Modal -->
  <div class="modal fade" :id=props.modalId data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">修改信息</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table align-middle table-bordered w-100">
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
            <tbody class="list-user-info-tbody border border-dark w-100" >
              <tr class="list-user-info-tr w-100">
                <td class="border border-dark">{{book.bookId}}</td>
                <td class="border border-dark">
                  <input v-model="book.bookTitle" class="border-0 text-center" style="outline: none">
                </td>
                <td class="border border-dark">
                  <input v-model="book.bookAuthor" class="border-0 text-center" style="outline: none">
                </td>
                <td class="border border-dark w-25">
                  <img :src="book.bookCover" alt="书籍封面" class="img-fluid ">
                  <label class="btn btn-success mt-3" >
                    上传新封面
                    <input id="bookCover-upload" type="file" ref="bookCoverUpload" style="display: none" @change="handleBookCoverChange">
                  </label>
                </td>
                <td class="border border-dark w-25">
                  <p>
                    <textarea rows="8" v-model="book.bookContent" class="border-0 w-100 text-center" style="outline: none" ></textarea>
                  </p>
                </td>
                <td class="border border-dark w-25">
                  <p>
                    <textarea rows="11" v-model="book.bookIntro" class="border-0 w-100" style="outline: none" ></textarea>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="save" data-bs-dismiss="modal">保存修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>