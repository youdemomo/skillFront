<template>
  <div>
    <h2>查看所有活动</h2>
    <table>
      <thead>
        <tr>
          <th>活动ID</th>
          <th>标题</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <!-- 使用 v-for 遍历活动数据并渲染每一行 -->
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ activity.id }}</td>
          <td>{{ activity.title }}</td>
          <td>{{ activity.startTime }}</td>
          <td>{{ activity.endTime }}</td>
          <td>{{ activity.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  export default {
    setup() {
      const activities = ref([])

      onMounted(async () => {
        try {
          const response = await axios.get(
            '/hello/seckill-activity/seckill/activities',
          )
          activities.value = response.data
          console.log(response)
        } catch (error) {
          console.error('获取活动数据失败', error)
        }
      })

      return {
        activities,
      }
    },
  }
</script>

<style scoped>
  table {
    width: 100%;
    border-collapse: collapse; /* 让单元格边框合并 */
  }

  th,
  td {
    padding: 12px 16px; /* 单元格内边距 */
    text-align: left; /* 左对齐 */
    border: 1px solid #ddd; /* 单元格之间有边框 */
  }

  th {
    background-color: #f2f2f2; /* 表头背景色 */
    font-weight: bold;
  }

  /* 每隔一行颜色不同 */
  tr:nth-child(even) {
    background-color: #f9f9f9; /* 偶数行背景色 */
  }

  tr:nth-child(odd) {
    background-color: #ffffff; /* 奇数行背景色 */
  }

  /* 鼠标悬浮到行时高亮 */
  tr:hover {
    background-color: #e0e0e0; /* 鼠标悬浮行的背景色 */
    cursor: pointer; /* 鼠标变成手型 */
  }

  /* 优化表格外观 */
  table th,
  table td {
    text-align: center; /* 内容居中 */
  }
</style>
