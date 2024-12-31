<template>
  <div id="home">
    <nav class="shell">
      <ul class="buttons">
        <li class="li">
          返回到
          <ul>
            <li @click="toHome">主页 -></li>
            <li @click="toLogin">登录界面 -></li>
            <li @click="toAdmin">管理员初始界面 -></li>
          </ul>
        </li>

        <li class="li">
          秒杀活动管理
          <ul>
            <li @click="toShowActivity">查看所有活动 -></li>
            <li @click="toAddActivity">新增秒杀活动 -></li>
          </ul>
        </li>

        <li class="li">
          商品管理
          <ul>
            <li @click="toShowProduct">查看所有商品 -></li>
            <li @click="toAddGoods">添加商品 -></li>
            <li @click="toAddProduct">新增秒杀商品 -></li>
            <li @click="toDeleteProduct">删除秒杀商品 -></li>
          </ul>
        </li>
      </ul>
    </nav>
    <!-- 路由展示区 -->
    <div class="showRoute">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  // 获取路由器
  const router = useRouter()

  // 主页
  function toHome() {
    router.push('/')
  }

  // 登录
  function toLogin() {
    router.push('/login')
  }

  // 管理员初始界面
  function toAdmin() {
    router.push('/admin')
  }

  // 查看所有活动
  function toShowActivity() {
    router.push('/admin/showActivity')
  }

  // 新增活动
  function toAddActivity() {
    router.push('/admin/addActivity')
  }

  // 查看所有商品
  function toShowProduct() {
    router.push('/admin/showProduct')
  }

  // 添加商品
  function toAddGoods() {
    router.push('/admin/addGoods')
  }

  // 新增秒杀商品
  function toAddProduct() {
    router.push('/admin/addProduct')
  }

  // 删除秒杀商品
  function toDeleteProduct() {
    router.push('/admin/deleteProduct')
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  #home {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #e0e5fb;
  }

  .showRoute {
    flex-grow: 1;
    margin-left: 280px;
    padding: 20px;
    overflow: auto;
    background-color: #e0e5fb;
  }

  .shell {
    position: fixed;
    width: 280px;
    height: 650px;
    background-color: #8a98c9;
  }
  .buttons {
    margin: 60px 0;
    color: #fff;
  }
  .li {
    letter-spacing: 2px;
    font: 600 17px '';
    padding: 16px 52px;
    transition: 0.3s;
  }
  .li::after {
    content: '';
    position: absolute;
    left: 20px;
    margin-top: -22px;
    display: block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
  }
  .buttons > li:hover {
    background-color: #beb5df;
  }

  .li ul {
    width: 0;
    height: 530px;
    padding: 60px 0;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    background-color: #59699b;
    transition: 0.3s;
  }

  .li ul li {
    padding: 16px 24px;
    transition: 0.3s;
  }

  .li:hover ul {
    width: 228px;
    height: 650px;
  }
  .li ul li:hover {
    background-color: #828eb9;
  }
</style>
