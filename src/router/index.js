import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import FindPassword from '@/pages/FindPassword.vue'
import ProductDetails from '@/pages/ProductDetails.vue'
import Cart from '@/pages/Cart.vue'
import Orders from '@/pages/Orders.vue'
import OrderDetails from '@/pages/OrderDetails.vue'
import Activities from '@/pages/Activities.vue'
import ActivityDetails from '@/pages/ActivityDetails.vue'
import SearchProduct from '@/pages/SearchProduct.vue'
import Administrator from '@/pages/admin/Administrator.vue'
import ShowActivity from '@/pages/admin/ShowActivity.vue'
import AddActivity from '@/pages/admin/AddActivity.vue'
import ShowProduct from '@/pages/admin/ShowProduct.vue'
import AddProduct from '@/pages/admin/AddProduct.vue'
import DeleteProduct from '@/pages/admin/DeleteProduct.vue'
import AddGoods from '@/pages/admin/AddGoods.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    // 首页
    { path: '/', component: Home },
    // 登录
    {
      path: '/login',
      component: Login,
    },
    // 找回密码
    {
      path: '/findPassword',
      component: FindPassword,
    },
    // 商品详情
    {
      path: '/detail/:id',
      name: 'Detail',
      component: ProductDetails,
      props: true,
    },
    // 搜索商品
    {
      path: '/search',
      name: 'Search',
      component: SearchProduct,
    },
    //购物车
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    //订单
    {
      path: '/order',
      name: 'Order',
      component: Orders,
      props: true,
    },
    // 订单详情
    {
      path: '/orderDetails/:orderId', // 添加动态参数 orderId
      name: 'OrderDetails',
      component: OrderDetails,
      props: true,
    },
    // 活动
    {
      path: '/activity',
      name: 'Activity',
      component: Activities,
    },
    // 活动详情
    {
      path: '/activityDetails/:activityId', // 添加动态参数 activityId
      name: 'ActivityDetails',
      component: ActivityDetails,
      props: true,
    },
    // 管理员
    {
      path: '/admin',
      name: 'Admin',
      component: Administrator,
      children: [
        // 查看所有活动
        { path: 'showActivity', component: ShowActivity },
        // 添加活动
        { path: 'addActivity', component: AddActivity },
        // 查看所有商品
        { path: 'showProduct', component: ShowProduct },
        // 添加秒杀商品
        { path: 'addProduct', component: AddProduct },
        // 添加商品
        { path: 'addGoods', component: AddGoods },
        // 删除秒杀商品
        { path: 'deleteProduct', component: DeleteProduct },
      ],
    },
  ],
})
