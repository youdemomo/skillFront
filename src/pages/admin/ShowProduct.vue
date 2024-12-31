<template>
  <div class="product-list">
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名称</th>
            <th>价格</th>
            <th>图片</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>¥{{ product.price.toFixed(2) }}</td>
            <td>
              <img
                :src="product.imageUrl"
                alt="product.name"
                class="product-image" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="products.length === 0" class="empty-message">暂无商品</div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  // 响应式数据，存储商品列表
  const products = ref<Array<any>>([])

  // 组件挂载时，调用接口获取商品列表
  onMounted(async () => {
    try {
      const response = await axios.get('/hello/product/list')
      if (response.status === 200) {
        products.value = response.data
        console.log(response.data)
      }
    } catch (error) {
      console.error('获取商品列表失败', error)
    }
  })
</script>

<style scoped>
  .product-list {
    max-width: 1000px;
    margin: 0 auto;
  }

  .table-responsive {
    margin-top: 1.5em;
  }

  .product-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }

  .empty-message {
    text-align: center;
    color: #777;
    font-size: 18px;
  }
</style>
