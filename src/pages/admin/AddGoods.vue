<template>
  <div class="add-product container mt-4">
    <h2 class="text-center mb-4">新增商品</h2>
    <form @submit.prevent="submitProduct">
      <div class="mb-3">
        <label for="name" class="form-label">商品名称：</label>
        <input
          v-model="product.name"
          type="text"
          id="name"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">商品描述：</label>
        <input
          v-model="product.description"
          type="text"
          id="description"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">价格：</label>
        <input
          v-model="product.price"
          type="text"
          id="price"
          class="form-control"
          required
          @input="validatePrice" />
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">库存：</label>
        <input
          v-model="product.stock"
          type="number"
          id="stock"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="specifications" class="form-label">规格：</label>
        <input
          v-model="product.specifications"
          type="text"
          id="specifications"
          class="form-control"
          required />
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">商品图片URL：</label>
        <input
          v-model="product.imageUrl"
          type="text"
          id="imageUrl"
          class="form-control"
          required />
      </div>
      <button type="submit" class="btn btn-primary w-100">添加商品</button>
    </form>

    <!-- 提示信息 -->
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

  // 商品数据
  const product = ref({
    name: '',
    description: '',
    price: '',
    stock: 0,
    specifications: '',
    imageUrl: '',
    type: 0, // type 默认为 0
  })

  // 提示信息
  const message = ref('')
  const messageType = ref('')

  // 校验价格
  const validatePrice = () => {
    // 使用正则表达式确保输入的是一个有效的小数或整数
    const priceRegex = /^\d+(\.\d{1,2})?$/ // 允许最多两位小数
    if (!priceRegex.test(product.value.price)) {
      message.value = '价格格式不正确，请输入有效的数字（最多两位小数）。'
      messageType.value = 'error'
    } else {
      message.value = ''
    }
  }

  // 提交商品数据
  const submitProduct = async () => {
    // 校验价格是否有效
    if (
      !product.value.price ||
      !/^\d+(\.\d{1,2})?$/.test(product.value.price)
    ) {
      message.value = '请输入有效的价格。'
      messageType.value = 'error'
      return
    }

    try {
      // 发送 POST 请求
      const response = await axios.post('http://localhost:28080/product/add', {
        name: product.value.name,
        description: product.value.description,
        price: parseFloat(product.value.price), // 确保发送时为数值类型
        stock: product.value.stock,
        specifications: product.value.specifications,
        imageUrl: product.value.imageUrl,
        type: product.value.type, // 传递 type
      })

      if (response.status === 200) {
        alert('添加成功')
        message.value = '商品添加成功'
        messageType.value = 'success'
      }
    } catch (error) {
      alert('添加失败')
      message.value = '商品添加失败，请检查输入'
      messageType.value = 'error'
    }
  }
</script>

<style scoped>
  .add-product {
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
