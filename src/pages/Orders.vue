<template>
  <div class="orders-page">
    <Header />
    <h1>我的订单</h1>
    <div v-if="orders.length === 0" class="empty-orders">
      <p>您还没有任何订单</p>
    </div>
    <div v-else class="order-list">
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>订单日期</th>
            <th>订单状态</th>
            <th>总金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="order-item">
            <td>{{ order.id }}</td>
            <td>{{ order.orderDate }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.totalAmount.toFixed(2) }} 元</td>
            <td>
              <a
                v-if="order.status"
                href="javascript:;"
                @click="cancleOrder(order.id)"
                >取消订单</a
              >
              <a href="javascript:;" @click="goToorderDetails(order.id)"
                >查看详情</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios'
  import { ref, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import Header from '@/components/Header.vue'

  const store = useStore()
  const router = useRouter()
  const userId = computed(() => store.getters.getUserId)
  const orders = ref([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/hello/order/user/${userId.value}`)
      console.log('Response Data:', response.data)
      // 直接使用 response.data，因为它已经是一个数组
      if (Array.isArray(response.data)) {
        orders.value = response.data.map(order => ({
          id: order.id,
          orderDate: new Date(order.createdAt).toLocaleDateString(),
          status: order.status,
          totalAmount: order.totalPrice,
        }))
      } else {
        console.error('获取订单列表失败: 数据格式不正确', response.data)
      }
    } catch (error) {
      console.error('获取订单列表失败:', error)
    }
  }

  const goToorderDetails = (orderId: number) => {
    router.push({ name: 'OrderDetails', params: { orderId: orderId } })
  }

  const cancleOrder = async (orderId: number) => {
    try {
      const response = await axios.put('/hello/order/cancel?orderId=' + orderId)
      console.log('订单取消成功', response.data)
      fetchOrders()
    } catch (error) {
      console.error('取消订单失败', error)
    }
  }

  onMounted(() => {
    fetchOrders()
  })
</script>

<style scoped>
  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 36px;
  }

  td a {
    margin-right: 5px; /* 根据需要调整间距 */
  }

  .orders-page {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  .empty-orders {
    margin-top: 20px;
    text-align: center;
  }
</style>
