<template>
    <div class="page-container">
      <Header />
      <div class="container page-content">
        <div class="activity-details">
          <h1>秒杀活动详情</h1>
          <div class="row mb-4">
            <div
              class="col-8 offset-2 col-sm-6 offset-sm-0 col-lg-4 mt-3"
              v-for="product in products"
              :key="product.productId">
              <b-card
                class="card-custom"
                :title="product.productName"
                :sub-title="product.price"
                :img-src="product.productImageUrl"
                img-alt="Card image"
                img-top
                :align="'center'">
                <hr />
                <a href="javascript:;" @click="goToItemDetails(product.id)" class="bold-red-no-underline">
                    ¥ {{ product.price }}
                </a>
              </b-card>
            </div>
          </div>
          <a href="javascript:;" @click="goToHome" class="back-link">返回活动列表</a>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Header from '@/components/Header.vue'
  import { useRouter, useRoute } from 'vue-router'

  const products = ref([])
  
  const router = useRouter()
  const route = useRoute()
  
  const fetchActivityDetails = async () => {
    try {
      const activityId = route.params.activityId
      console.log("xxx:"+activityId)
      const response = await axios.get(`/hello/admin/seckill/products/${activityId}`)
      products.value = response.data
      console.log(response)
    } catch (error) {
      console.error('请求失败:', error)
    }
  }
  
  // 转跳至商品详情
  const goToItemDetails = (productId: number) => {
    // 路由跳转，并将 productId 传递给 /detail 路由
    router.push({ name: 'Detail', params: { id: productId } })
  }
  
  // 返回
  const goToHome = () => {
    router.push({ name: 'Activity' })
  }
  
  onMounted(() => {
    fetchActivityDetails()
  })
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 36px;
  }

  .bold-red-no-underline {
  text-decoration: none;
  font-size: 18px;
  /* font-weight: bold; */
  color: red;
}

  .page-container {
    width: 100%;
    padding: 20px;
  }
  
  .container.page-content {
    width: 100%;
  }
  
  .activity-details {
    text-align: center;
  }
  
  .activity-image {
    margin: 20px 0;
  }
  
  .activity-banner {
    max-width: 100%;
    height: auto;
  }
  
  .row.mb-4 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .card-custom {
    display: flex;
    flex-direction: column;
    height: 100%; /* 确保卡片占满容器 */
  }
  
  .card-custom .card-body {
    flex-grow: 1; /* 卡片的主体内容占据剩余空间 */
  }
  
  .col-lg-4 {
    display: flex;
    flex-direction: column;
  }
  
  .back-link {
    display: inline-block;
    margin-top: 20px;
    color: #007bff;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  </style>