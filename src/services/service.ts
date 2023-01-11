const lineRedirectedCheck = (urlQuery: any) => {
  if (
    urlQuery.code &&
    urlQuery.state &&
    urlQuery.liffRedirectUri &&
    urlQuery.liffClientId
  ) {
    const globalState = useGlobalState();
    globalState.code = urlQuery.code;
    globalState.state = urlQuery.state;
    globalState.liffUrl = urlQuery.liffRedirectUri;
    globalState.liffClientId = urlQuery.liffClientId;
    globalState.isLogin = true;
    globalState.isInClient = useNuxtApp().$liff.isInClient();
    return urlQuery.liffRedirectUri;
  }
  return false;
};
export { lineRedirectedCheck };
