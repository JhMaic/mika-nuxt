export const useGlobalState = createGlobalState(() => {
  const liffObject = ref<any>();
  const isLogin = ref(false);
  const isInClient = ref(false);
  const code = ref<string>();
  const state = ref<string>();
  const liffUrl = ref<string>();
  const liffClientId = ref<string>();

  return reactive({
    liffObject,
    isLogin,
    isInClient,
    code,
    state,
    liffUrl,
    liffClientId,
  });
});
