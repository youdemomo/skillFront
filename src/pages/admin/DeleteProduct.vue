<template>
  <div class="delete-seckill-product container mt-4">
    <h2 class="text-center mb-4">删除秒杀商品</h2>
    <form @submit.prevent="deleteSeckillProduct">
      <div class="mb-3">
        <label for="activityId" class="form-label">活动ID：</label>
        <input
          v-model="seckillProduct.activityId"
          type="text"
          id="activityId"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="productId" class="form-label">商品ID：</label>
        <input
          v-model="seckillProduct.productId"
          type="text"
          id="productId"
          class="form-control"
          required />
      </div>
      <button type="submit" class="btn btn-danger w-100">删除秒杀商品</button>
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

  // 响应式数据，存储活动ID和商品ID
  const seckillProduct = ref({
    activityId: '',
    productId: '',
  })

  // 提示消息
  const message = ref('')
  const messageType = ref('')

  // 删除秒杀商品的函数
  const deleteSeckillProduct = async () => {
    try {
      const { activityId, productId } = seckillProduct.value
      const response = await axios.delete(
        `http://localhost:28080/admin/seckill/delete/${activityId}/${productId}`,
      )

      if (response.status === 200) {
        alert('秒杀商品删除成功')
        message.value = '秒杀商品删除成功'
        messageType.value = 'success'
      }
    } catch (error) {
      message.value = '秒杀商品删除失败，请检查输入'
      messageType.value = 'error'
    }
  }
</script>

<style scoped>
  .delete-seckill-product {
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
