// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt"],
  // FE only
  ssr: false,
  srcDir: "src/",
  typescript: {
    strict: true,
  },
  // import
  imports: {
    dirs: ["services/**"],
  },
});
