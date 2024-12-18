<template>
  <!-- 动态生成菜单组件 -->
  <template v-for="(item) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 只有一个路由 -->
    <el-menu-item v-if="item.children && item.children.length == 1 && !item.meta.hidden" :index="item.path"
      @click="goRoute">
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有多个路由 -->
    <el-sub-menu v-if="item.children && item.children.length > 1 && !item.meta.hidden" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <menuComponent :menuList="item.children"></menuComponent>
    </el-sub-menu>
  </template>
</template>
<script setup lang="ts">
  import type { MenuItemRegistered } from 'element-plus';
  import { useRouter } from 'vue-router';
  const $router = useRouter()

  defineProps(['menuList'])

  const goRoute = (item: MenuItemRegistered) => {
    $router.push(item.index)
  }
</script>
<style scoped lang="scss">
  .el-menu {
    border-right: none;
  }
</style>
