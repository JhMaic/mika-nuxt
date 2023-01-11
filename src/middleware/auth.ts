export default defineNuxtRouteMiddleware((to, from) => {
  if (!useGlobalState().isLogin) {
    alert("this page is only for logged-in user !");
    return false;
  }
});
