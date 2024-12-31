<template>
    <div class="order-details-page">
      <Header />
      <h1>订单详情</h1>
      <div v-if="!selectedOrder" class="loading">
        <p>加载中...</p>
      </div>
      <div v-else class="order-details">
        <p>订单号: {{ selectedOrder.id }}</p>
        <p>用户ID: {{ selectedOrder.userId }}</p>
        <p>订单状态: {{ selectedOrder.status }}</p>
        <p>订单日期: {{ selectedOrder.orderDate }}</p>
        <p>总金额: {{ selectedOrder.totalAmount.toFixed(2) }} 元</p>
        <table>
          <thead>
            <tr>
              <th>商品名称</th>
              <th>单价</th>
              <th>数量</th>
              <th>小计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in selectedOrder.items" :key="item.productId">
              <td>{{ item.product.name }}</td>
              <td>{{ item.price.toFixed(2) }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Header from '@/components/Header.vue';
  
  const route = useRoute();
  const selectedOrder = ref(null);

  const props = defineProps({
    orderId: {
      type: String,
      required: true,
    },
  })

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/hello/order/orderid/${props.orderId}`);
      console.log('订单id:', props.orderId);
      selectedOrder.value = {
        id: response.data.id,
        userId: response.data.userId,
        status: response.data.status,
        orderDate: new Date(response.data.createdAt).toLocaleDateString(),
        totalAmount: response.data.totalPrice,
        items: response.data.orderItems ? response.data.orderItems.map(item => ({
          product: item.product,
          price: item.price,
          quantity: item.quantity
        })) : []
      };
    } catch (error) {
      console.error('获取订单详情失败:', error);
    }
  };
  
  onMounted(() => {
    fetchOrderDetails();
  });
  </script>
  
  <style scoped>
  .order-details-page {
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 36px;
  }
  
  .loading {
    text-align: center;
    margin-top: 50px;
  }
  
  .order-details table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .order-details th, .order-details td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .order-details th {
    background-color: #f4f4f4;
  }
  </style>