export const useGlobalState = createGlobalState(() => {
  const liffObject = ref<any>();
  const code = ref<string>();
  const state = ref<string>();
  const liffUrl = ref<string>();
  const liffClientId = ref<string>();

  return reactive({
    liffObject,
    code,
    state,
    liffUrl,
    liffClientId,
  });
});
