<template>
    <div class="activities-page">
      <Header />
      <h1>秒杀活动列表</h1>
      <div v-if="activities.length === 0" class="empty-activities">
        <p>当前没有可用的秒杀活动</p>
      </div>
      <div v-else class="activity-list">
        <table>
          <thead>
            <tr>
              <th>活动ID</th>
              <th>活动标题</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.id" class="activity-item">
              <td>{{ activity.id }}</td>
              <td>{{ activity.title }}</td>
              <td>{{ new Date(activity.startTime).toLocaleDateString() }}</td>
              <td>{{ new Date(activity.endTime).toLocaleDateString() }}</td>
              <td>{{ activity.status }}</td>
              <td>
                <a href="javascript:;" @click="goToActivityDetails(activity.id)">前往活动</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Header from '@/components/Header.vue';
  
  const router = useRouter();
  const activities = ref([]);
  
  const fetchActivities = async () => {
    try {
      const response = await axios.get('/hello/seckill-activity/seckill/activities');
      console.log('Response Data:', response.data);
      if (Array.isArray(response.data)) {
        activities.value = response.data;
      } else {
        console.error('获取活动列表失败: 数据格式不正确', response.data);
      }
    } catch (error) {
      console.error('获取活动列表失败:', error);
    }
  };
  
  const goToActivityDetails = (activityId: number) => {
    console.log('Go to activity details:', activityId);
    router.push({ name: 'ActivityDetails', params: { activityId : activityId } });
  };
  
  onMounted(() => {
    fetchActivities();
  });
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 36px;
  }
  
  .activities-page {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
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
  
  .empty-activities {
    margin-top: 20px;
    text-align: center;
  }
  </style>