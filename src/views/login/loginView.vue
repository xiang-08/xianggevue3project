<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="form" ref="loginForm" :model="loginFormData" :rules="rules">
          <h1>Hellow</h1>
          <h2>欢迎来到{{ settings.title }}</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginFormData.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password :prefix-icon="Lock" v-model="loginFormData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" @click="login" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { User, Lock } from '@element-plus/icons-vue'
  import { reactive, ref } from 'vue';
  import useUserStore from "@/stores/modules/user";
  import { useRoute, useRouter } from 'vue-router';
  import { ElNotification } from 'element-plus';
  import { getTime } from '@/utils/time';
  import settings from '@/settings';
  //编程式路由
  const $router = useRouter()
  //使用仓库
  const useStore = useUserStore()
  //登录按钮加载效果
  const loading = ref(false)
  //收集表单数据
  const loginFormData = reactive({ username: 'admin', password: '111111' })
  const loginForm = ref()
  //登录方法
  const $route = useRoute()
  const login = async () => {
    //保证校验通过再发送请求
    try { await loginForm.value.validate() } catch { return }// 或者 await loginForm.value.validate()
    loading.value = true
    try {
      await useStore.userLogin(loginFormData)
      //实现退出登录后重新登陆重定向
      const redirect = ($route.query.redirect as string) || '/'
      $router.push(redirect)
      ElNotification({
        type: 'success',
        title: `HI,${getTime()}好`,
        message: '欢迎回来'
      })
      loading.value = false
    } catch (error) {
      ElNotification({
        type: 'error',
        message: (error as Error).message
      })
      loading.value = false
    }

  }
  //表单验证
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 5, message: '用户名至少为五位', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码至少为六位', trigger: 'blur' }
    ]
  }
</script>

<style scoped lang="scss">
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .form {
      width: 80%;
      position: relative;
      top: 30vh;
      background: url('@/assets/images/login_form.png') no-repeat;
      background-size: cover;
      padding: 40px;

      h1 {
        color: white;
        font-size: 40px;
      }

      h2 {
        color: white;
        font-size: 20px;
        margin: 20px 0px;
      }

      .login_btn {
        width: 100%;
      }
    }
  }
</style>
