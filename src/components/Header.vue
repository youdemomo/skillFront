<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <div>
        <img
          src="../assets/headImg.jpg"
          alt=""
          title="这是你的头像(●'◡'●)"
          class="headImg" />
        <router-link to="/">主页</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/search">搜索</router-link>
      </div>
      <!-- 右侧购物车跳转按钮和商品数量显示 -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/cart"> 我的购物车 </b-nav-item>
        <!-- 分界线 -->
        &nbsp; | &nbsp;
        <b-nav-item to="/order"> 我的订单 </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { mapState } from 'vuex'

  // 路由器
  const router = useRouter()
  let cartItemsCount = ref(1)

  function goToHome() {
    console.log('点击')

    router.push('/home')
  }
</script>

<style scoped>
  a {
    font-family: '微软雅黑';
    font-size: 1.2rem;
  }
  a:hover {
    text-decoration: underline;
  }
  a {
    text-decoration: none;
    margin-left: 20px;
  }
  .header-badge {
    font-size: 0.95rem;
  }
  .headImg {
    width: 50px;
    border-radius: 50px;
    margin-left: 25px;
  }
</style>
