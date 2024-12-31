<template>
  <div class="cart-page">
    <Header />
    <h1>购物车</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>您的购物车为空</p>
    </div>
    <div v-else class="cart-items">
      <table>
        <thead>
          <tr>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>
              <img
                :src="item.imageUrl"
                alt="商品图片"
                class="product-image"
                onerror="this.onerror=null; this.src='/path/to/default/image.jpg';" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price.toFixed(2) }}</td>
            <td>
              <button @click="decreaseQuantity(index)" class="plain-button">
                -
              </button>
              {{ item.quantity }}
              <button @click="increaseQuantity(index)" class="plain-button">
                +
              </button>
            </td>
            <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button @click="removeFromCart(index)" class="plain-button">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total-price">
        <p>总价: {{ totalPrice.toFixed(2) }} 元</p>
      </div>
      <button class="checkout-button" @click="checkout">去结算</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios'
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import Header from '@/components/Header.vue'
  import router from '@/router'

  const store = useStore()
  const userId = computed(() => store.getters.getUserId)
  const cartItems = ref([])

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  })

  const fetchCartItems = async () => {
    try {
      console.log('User ID:', userId.value) // 打印用户 ID 以检查是否正确
      const response = await axios.get('/hello/cart/get', {
        params: { userId: userId.value },
      })

      console.log('Response Data:', response.data) // 打印数据以检查结构
      cartItems.value = response.data.map(item => ({
        name: item.product ? item.product.name : '未知商品',
        price: item.product ? item.product.price : 0,
        quantity: item.quantity,
        imageUrl: item.product ? item.product.imageUrl : '',
        productId: item.productId,
      }))
    } catch (error) {
      console.error('获取购物车数据失败:', error)
    }
  }

  const increaseQuantity = (index: number) => {
    cartItems.value[index].quantity++
  }

  const decreaseQuantity = (index: number) => {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity--
    } else {
      removeFromCart(index)
    }
  }

  const removeFromCart = async (index: number) => {
    try {
      const productId = cartItems.value[index].productId
      if (!productId) {
        console.error('Product ID 未找到')
        return
      }

      const response = await axios.delete(`/hello/cart/delete`, {
        params: {
          userId: userId.value,
          productId: productId,
        },
      })

      console.log('删除成功:', response.data)
      alert('删除成功！')

      cartItems.value.splice(index, 1)
    } catch (error) {
      console.error('删除失败:', error)
      alert('删除失败，请重试。')
    }
  }

  const checkout = async () => {
    try {
      const response = await axios.post(
        '/hello/order/buyFromCart',
        `userId=${userId.value}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      console.log('结算成功:', response.data)
      alert('结算成功！')
      // 清空购物车列表
      cartItems.value = []
      // 跳转到结算页面
      router.push('/order')
    } catch (error) {
      console.error('结算失败:', error)
      alert('结算失败，请重试。')
    }
  }

  onMounted(() => {
    fetchCartItems()
  })
</script>

<style scoped>
  .plain-button {
    border: none;
  }

  .cart-page {
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 36px;
  }

  .product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .empty-cart {
    text-align: center;
    margin-top: 50px;
  }

  .cart-items table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .cart-items th,
  .cart-items td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .cart-items th {
    background-color: #f4f4f4;
  }

  .total-price {
    text-align: right;
    margin-bottom: 20px;
  }

  .checkout-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }

  .checkout-button:hover {
    background-color: #218838;
  }
</style>
