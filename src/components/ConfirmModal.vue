<script setup>
const props = defineProps({
  title: String,
  context: String,
})

const emit = defineEmits(['returnData'])
const confirmValue = ()=> {
  emit("returnData", true)
}
</script>

<template>
  <!-- Button trigger modal -->
  <!-- Modal -->
  <div class="modal fade" id="confirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{context}}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="confirmValue" data-bs-dismiss="modal">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>