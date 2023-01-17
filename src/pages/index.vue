<template>
  <div>
    <button @click="btn">toHello(only for logged-in user)</button>
    <button @click="login">login</button>
    <button @click="navigateTo('amazon-login')">login With Amazon</button>
  </div>
</template>

<script setup lang="ts">
import { lineRedirectedCheck } from "~/services/service";

const app = useNuxtApp();
const router = useRouter();

if (lineRedirectedCheck(router.currentRoute.value.query)) {
  alert("login success");
  router.replace("");
}

const btn = () => {
  navigateTo("/hello");
};
const login = () => {
  app.$liff.login();
};

// const test = () => {
//   useGlobalState().isLogin = true;
// };
</script>
