<template>
  <div class="add-seckill-product container mt-4">
    <h2 class="text-center mb-4">新增秒杀商品</h2>
    <form @submit.prevent="submitSeckillProduct">
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
      <div class="mb-3">
        <label for="price" class="form-label">秒杀价格：</label>
        <input
          v-model="seckillProduct.price"
          type="text"
          id="price"
          class="form-control"
          required />
      </div>
      <button type="submit" class="btn btn-primary w-100">添加秒杀商品</button>
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

  const seckillProduct = ref({
    activityId: '',
    productId: '',
    price: '',
  })

  const message = ref('')
  const messageType = ref('')

  const submitSeckillProduct = async () => {
    try {
      const response = await axios.post(
        'http://localhost:28080/admin/seckill/add',
        {
          activityId: seckillProduct.value.activityId,
          productId: seckillProduct.value.productId,
          price: seckillProduct.value.price,
        },
      )
      if (response.status === 200) {
        alert('秒杀商品添加成功')
        message.value = '秒杀商品添加成功'
        messageType.value = 'success'
      }
    } catch (error) {
      message.value = '秒杀商品添加失败，请检查输入'
      messageType.value = 'error'
    }
  }
</script>

<style scoped>
  .add-seckill-product {
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
