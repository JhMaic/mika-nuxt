<template>
  <div>
    <div class="header-login">ログイン状態：{{ useGlobalState().isLogin }}</div>
    <div class="header-login">
      外部ブラウザ：{{ !useGlobalState().isInClient }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.header-login {
  font-size: larger;
}
</style>
