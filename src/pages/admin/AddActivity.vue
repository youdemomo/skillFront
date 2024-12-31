<template>
  <div class="add-activity container mt-4">
    <h2 class="text-center mb-4">新增活动</h2>
    <form @submit.prevent="submitActivity">
      <div class="mb-3">
        <label for="title" class="form-label">活动名称：</label>
        <input
          v-model="activity.title"
          type="text"
          id="title"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="startTime" class="form-label">开始时间：</label>
        <input
          v-model="activity.startTime"
          type="text"
          id="startTime"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="endTime" class="form-label">结束时间：</label>
        <input
          v-model="activity.endTime"
          type="text"
          id="endTime"
          class="form-control"
          required />
      </div>
      <button type="submit" class="btn btn-primary w-100">提交</button>
    </form>
    <div
      v-if="message"
      :class="`alert ${
        messageType === 'success' ? 'alert-success' : 'alert-danger'
      }`"
      role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import axios from 'axios'

  const activity = ref({
    title: '',
    startTime: '',
    endTime: '',
  })

  const message = ref('')
  const messageType = ref('')

  const submitActivity = async () => {
    try {
      const response = await axios.post(
        'http://localhost:28080/seckill-activity/create',
        {
          title: activity.value.title,
          startTime: activity.value.startTime,
          endTime: activity.value.endTime,
        },
      )
      if (response.status === 200) {
        message.value = '活动新增成功'
        messageType.value = 'success'
      }
    } catch (error) {
      message.value = '活动新增失败，请检查输入'
      messageType.value = 'error'
    }
  }
</script>

<style scoped>
  .add-activity {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 24px;
    color: #333;
  }

  .form-label {
    font-size: 1rem;
    font-weight: 500;
  }

  .btn {
    padding: 0.75em;
    font-size: 1.1rem;
  }

  .alert {
    margin-top: 1em;
  }
</style>
