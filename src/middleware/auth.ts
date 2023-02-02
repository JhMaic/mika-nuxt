export default defineNuxtRouteMiddleware((to, from) => {
  if (!useNuxtApp().$liff.isLoggedIn()) {
    alert("this page is only for logged-in user !");
    return false;
  }
});
