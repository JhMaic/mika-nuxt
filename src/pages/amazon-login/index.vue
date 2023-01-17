<script lang="ts" setup>
// definePageMeta({
//   middleware: ["auth"],
// });

const app = useNuxtApp();
const usrProfile = reactive({
  opened: false,
  displayName: "",
  userId: "",
  pictureUrl: "" as string | undefined,
});
const showUsrState = async () => {
  const profile = await app.$liff.getProfile();
  usrProfile.displayName = profile.displayName;
  usrProfile.userId = profile.userId;
  usrProfile.pictureUrl = profile.pictureUrl;
  usrProfile.opened = true;
};
type Options = {
  interactive?: string;
  popup?: boolean;
  response_type?: string;
  scope: string | string[];
  state?: string;
  pkce?: boolean;
  code_challenge?: string;
};

type AmazonProfile = {
  PrimaryEmail: string;
  CustomerId: string;
  Name: string;
};

const profile = ref<AmazonProfile>();

onMounted(() => {
  // Login with Amazon SDKのjsをロードが完了したらグローバルに「amazon」変数が生えているはずなので
  // それを使ってAmazon開発者コンソールで発行したクライアントIDを設定する
  window.onAmazonLoginReady = function () {
    amazon.Login.setClientId(
      "amzn1.application-oa2-client.ac7e68bdbce34544b76a13a5e409ea69"
    );
    console.log("[LOG]setClientId  complate", amazon);
  };

  // Login with Amazon SDKのjsをロードするためにscriptタグを動的に追加する
  setTimeout(() => {
    console.log("[LOG]", document.getElementById("amazon-root"));
    const a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.id = "amazon-login-sdk";
    a.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
    document.getElementById("amazon-root")?.appendChild(a);

    console.log("[LOG]amazon-login-sdk appended");

    const url = new URL(window.location.href);
    const params = url.searchParams;

    const authCode = params.get("code");

    console.log("[LOG]Auth Code", authCode);

    // authorize後のリダイレクトによるアクセスの場合はURLのクエリパラメータに認可コードが埋まっている
    if (authCode) {
      let count = 0;

      const retrieveToken = () => {
        if (count > 10) {
          throw new Error("retrieveToken failed ");
        }

        if (!window.amazon) {
          count++;
          setTimeout(retrieveToken, 100);
          return;
        }

        amazon.Login.retrieveToken(
          authCode,
          (response: { access_token: string }) => {
            console.log("[LOG]retrieveToken", response);

            amazon.Login.retrieveProfile(
              response.access_token,
              (response: { profile: AmazonProfile }) => {
                console.log("[LOG] retrieveProfile", response.profile);

                profile.value = response.profile;
              }
            );
          }
        );
      };

      retrieveToken();
    }
  }, 0);
});

const authorize = () => {
  const options: Options = { scope: "profile", pkce: true, popup: false };
  console.log("[LOG]redirect", new URL(window.location.href).href);
  // ログイン処理
  amazon.Login.authorize(options, new URL(window.location.href).href);
};

const logout = () => {
  amazon.Login.logout();
  profile.value = undefined;
};
</script>

<template>
  <div>
    <client-only placeholder="Loading...">
      <div>LWA Sample</div>
      <div id="amazon-root"></div>

      <div v-if="profile">
        <p>
          おなまえ:<span style="font-weight: bold">{{ profile.Name }}</span>
        </p>
        <p>
          おメール:<span style="font-weight: bold">{{
            profile.PrimaryEmail
          }}</span>
        </p>
        <p>
          AmazonCustomerID:<span style="font-weight: bold">{{
            profile.CustomerId
          }}</span>
        </p>

        <div>
          <button @click="logout">Logout</button>
        </div>
      </div>
      <div v-else>
        <a id="LoginWithAmazon" @click="authorize">
          <img
            border="0"
            alt="Login with Amazon"
            src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
            width="156"
            height="32"
          />
        </a>
      </div>
    </client-only>
    <div>
      <button @click="showUsrState">show user states</button>
      <div v-if="usrProfile.opened">
        <img :src="usrProfile.pictureUrl" width="400" height="400" />
        <div>
          <label for="usrId">userId:</label>
          <input id="usrId" type="text" disabled :value="usrProfile.userId" />
        </div>
        <div>
          <label for="usrName">userName:</label>
          <input
            id="usrName"
            type="text"
            disabled
            :value="usrProfile.displayName"
          />
        </div>
      </div>
    </div>
  </div>
</template>
