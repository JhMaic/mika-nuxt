import liff from "@line/liff";

export default defineNuxtPlugin(() => {
  const globalState = useGlobalState();
  liff
    .init({
      liffId: import.meta.env.VITE_LIFF_TOKEN,
      // withLoginOnExternalBrowser: true,
    })
    .catch((e) => {
      console.error(e);
    });
  globalState.liffObject = liff;
  return {
    provide: {
      liff,
    },
  };
});
