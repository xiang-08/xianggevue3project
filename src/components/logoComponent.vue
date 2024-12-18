<template>
  <div class="logo" v-if="settings.logoHidden">
    <img :src="settings.logo">
    <p>{{ settings.title }}</p>
  </div>
</template>
<script lang="ts" setup>
  import settings from "@/settings";
</script>
<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 15px;

    img {
      width: 40px;
      height: 40px;
    }

    p {
      color: white;
      font-size: 20px;
      margin-left: 15px;
      white-space: nowrap;
    }

  }
</style>
