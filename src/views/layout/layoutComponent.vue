<template>
  <div class="home_container">
    <!-- 左侧导航区 -->
    <div class="slider" :class="{ fold: SettingsStore.fold ? true : false }">
      <LogoView></LogoView>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#001529" text-color="white" :default-active="$route.path"
          :collapse="SettingsStore.fold ? true : false">
          <MenuCompoment :menuList="RouteListStore.menuRoutes"></MenuCompoment>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="topBar" :class="{ fold: SettingsStore.fold ? true : false }">
      <TopBar></TopBar>
    </div>

    <!-- 主内容区 -->
    <div class="main" :class="{ fold: SettingsStore.fold ? true : false }">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" v-if="flag" />
        </transition>
      </router-view>
    </div>
  </div>


</template>

<script setup lang="ts">
  import MenuCompoment from '@/components/menuComponent.vue';
  import LogoView from '@/components/logoComponent.vue';
  import useRouteListStore from '@/stores/modules/routeList'
  import { useRoute } from 'vue-router';
  import TopBar from '@/components/topBar.vue';
  import useSettingsStore from '@/stores/modules/settings';
  import { nextTick, onMounted, ref, watch } from 'vue';
  import useUserStore from '@/stores/modules/user';

  //传递动态生成的菜单信息
  const RouteListStore = useRouteListStore()
  //刷新时不丢失焦点
  const $route = useRoute()
  //控制页面折叠
  const SettingsStore = useSettingsStore()
  //主页面刷新监听
  const flag = ref(true)
  watch(() => SettingsStore.refresh, () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  })
  //用户头像以及名称
  const userStore = useUserStore()
  //挂载时获取用户信息
  onMounted(() => {
    //获取用户信息并存储在user仓库
    userStore.userInfo()
  })

</script>

<style lang="scss">
  .home_container {
    width: 100%;
    height: 100vh;
    position: relative;

    .slider {
      width: $base-menu-width;
      height: 100vh;
      background-color: #001529;
      transition: width 0.3s ease-in-out;


      &.fold {
        width: $base-menu-min-width;
      }

      .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);

        .el-menu {
          border: none;
        }
      }
    }

    .topBar {
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      position: fixed;
      top: 0;
      left: $base-menu-width;
      transition: all 0.3s ease-in-out;


      &.fold {
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }

    .main {
      position: absolute;
      top: $base-tabbar-height;
      left: $base-menu-width;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      // background-color: white;
      padding: 20px;
      overflow: auto;
      transition: all 0.3s ease-in-out, height 0s;

      &.fold {
        width: calc(100vw - $base-menu-min-width);
        left: $base-menu-min-width;
      }

      .fade-enter-from {
        opacity: 0;
      }

      .fade-enter-active {
        transition: all 0.6s;
      }

      .fade-enter-to {
        opacity: 1;
      }
    }
  }
</style>
