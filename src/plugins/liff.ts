import liff from "@line/liff";

export default defineNuxtPlugin(() => {
  liff
    .init({
      liffId: import.meta.env.VITE_LIFF_TOKEN,
      // withLoginOnExternalBrowser: true,
    })
    .catch((e) => {
      console.error(e);
    });
  return {
    provide: {
      liff,
    },
  };
});
