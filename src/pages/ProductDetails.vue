<template>
  <div class="page-container">
    <Header />
    <div class="container page-content">
      <div class="row mb-4">
        <div class="col-8 offset-2 mt-3" v-if="product">
          <h4>{{ product.name }}</h4>
          <b-button-group class="mb-3">
            <b-button variant="secondary" @click="addToCart">
              加入购物车&nbsp;( •̀ ω •́ )✧
            </b-button>
          </b-button-group>
          <b-card
            :img-src="product.imageUrl"
            img-alt="Card image"
            img-bottom
            :footer="product.price + '元'"
            footer-tag="header">
            <b-card-text> {{ product.description }} </b-card-text>
          </b-card>

          <!-- 数量选择器和购买按钮 -->
          <div class="mt-4">
            <label for="quantity">数量:</label>
            <input
              type="number"
              id="quantity"
              v-model="quantity"
              min="1"
              class="form-control"
              style="width: 100px; display: inline-block;"
            />
            <br>
            <br>
            <b-button variant="success" @click="buyProduct" class="ml-2">
              购买
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import Header from '@/components/Header.vue'
  import { defineProps, ref, onMounted } from 'vue'
  import axios from 'axios'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  // 单个商品详情
  const product = ref(null) // 用来存储商品详情

  // 接收路由传递过来的参数
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  })

  // 获取 Vuex Store
  const store = useStore()

  // 计算属性，从 Vuex Store 获取 userId
  const userId = computed(() => store.state.userId)
  console.log(userId.value)

  // 数量选择器的响应式变量
  const quantity = ref(1)

  // 请求商品详情
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`/hello/product/details/${props.id}`)
      product.value = response.data
      console.log(response)
    } catch (error) {
      console.error('请求失败:', error)
    }
  }

  // 加入购物车方法
  const addToCart = async () => {
    if (!userId.value) {
      console.error('用户未登录，无法加入购物车')
      return
    }

    try {
      const response = await axios.post(
        '/hello/cart/add',
        `userId=${userId.value}&productId=${props.id}&quantity=1`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      console.log('加入购物车成功:', response)
      alert('加入购物车成功')
    } catch (error) {
      console.error('加入购物车失败:', error)
      alert('加入购物车失败')
    }
  }

  // 购买产品方法
  const buyProduct = async () => {
    if (!userId.value) {
      console.error('用户未登录，无法购买')
      return
    }

    try {
      const response = await axios.post(
        '/hello/order/buy',
        `userId=${userId.value}&productId=${props.id}&quantity=${quantity.value}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      console.log('购买成功:', response)
      alert('购买成功')
    } catch (error) {
      console.error('购买失败:', error)
      alert('购买失败')
    }
  }

  // 在组件挂载时发送请求
  onMounted(() => {
    fetchProductDetails()
  })
</script>

<style scoped>

  .ml-2{
    margin-right: 10px;
    width: 150px;
  }
</style>