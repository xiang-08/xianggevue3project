<template>
  <div class="topbar">
    <div class="topbar_left">
      <!-- 左侧图标 -->
      <el-icon style="margin-right:10px;" @click="changeIcon">
        <component :is="!SettingsStore.fold ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path"
          v-show="item.meta.title">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="topbar_right">
      <el-button size="small" icon="Refresh" circle @click="updateRefesh"></el-button>
      <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover" :visible="visible">
        <template #reference>
          <el-button size="small" icon="Setting" circle @click="visible = !visible"></el-button>
        </template>
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker v-model="color" size="small" :predefine="predefineColors" @change="setcolor" />
          </el-form-item>
          <el-form-item label="切换夜晚模式">
            <el-switch v-model="dark" />
          </el-form-item>
        </el-form>
      </el-popover>
      <img :src="userStore.avatar" style="width: 20px;height: 20px;margin: 0 10px;">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
  import useSettingsStore from '@/stores/modules/settings';
  import useUserStore from '@/stores/modules/user';
  import { ArrowRight } from '@element-plus/icons-vue'
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  //控制菜单折叠
  const SettingsStore = useSettingsStore()
  const changeIcon = () => {
    SettingsStore.fold = !SettingsStore.fold
  }
  //控制主内容区刷新
  const updateRefesh = () => {
    SettingsStore.refresh = !SettingsStore.refresh
  }
  //动态生成面包屑
  const $route = useRoute()
  //全屏按钮
  const fullScreen = () => {
    //全屏为真
    const full = document.fullscreenElement
    if (!full) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
  //用户头像以及名称
  const userStore = useUserStore()

  //退出登录
  const $router = useRouter()
  const logOut = () => {
    //清空仓库中的用户数据
    userStore.userLogOut()
    //跳转到登录页面
    //并且能实现退出登录后重新登录账号不丢失当前路由信息
    $router.push({
      path: '/login',
      query: { redirect: $route.path }
    })
  }
  //设置按钮
  const visible = ref(false)
  //主题颜色
  const color = ref('#409eff')
  const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
  ])
  const setcolor = () => {
    const el = document.documentElement
    el.style.setProperty('--el-color-primary', color.value)
  }
  //暗黑模式
  const dark = ref(false)
  watch(() => dark.value, () => {
    const html = document.documentElement
    if (dark.value) { html.classList.add('dark') } else { html.classList.remove('dark') }

  })
</script>


<style scoped lang="scss">
  .topbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: linear-gradient(to bottom right, #e6f7ff, #fff9eb);

    .topbar_left {
      display: flex;
      align-items: center;

      .el-breadcrumb .el-icon {
        margin: 0px 4px;
      }
    }

    .topbar_right {
      display: flex;
      align-items: center;


      .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
