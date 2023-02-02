<template>
  <div>
    <div class="header-login">ログイン状態：{{ isLoggedIn }}</div>
    <div class="header-login">外部ブラウザ：{{ isInClient }}</div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const isLoggedIn = computed(() => useNuxtApp().$liff.isLoggedIn());
const isInClient = computed(() => useNuxtApp().$liff.isInClient());
</script>

<style>
.header-login {
  font-size: larger;
}
</style>
