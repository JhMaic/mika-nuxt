<template>
  <div>
    <div></div>
    <div>HERE IS HELLO</div>
    <div>
      <button @click="showGlobalState">show global states</button>
      <button @click="showUsrState">show user states</button>
    </div>

    <div>
      <label for="msgText">message:</label>
      <input id="msgText" v-model="msg" type="text" />
      <button @click="sendMsg">send</button>
      <button @click="sendMsgOther">sendToOther</button>
    </div>
    <p>{{ stateInfo }}</p>
    <br />
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
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const stateInfo = ref();
const usrProfile = reactive({
  opened: false,
  displayName: "",
  userId: "",
  pictureUrl: "" as string | undefined,
});
const msg = ref("");
const app = useNuxtApp();
const showGlobalState = () => {
  stateInfo.value = useGlobalState();
};

const showUsrState = async () => {
  const profile = await app.$liff.getProfile();
  usrProfile.displayName = profile.displayName;
  usrProfile.userId = profile.userId;
  usrProfile.pictureUrl = profile.pictureUrl;
  usrProfile.opened = true;
};

const sendMsg = async () => {
  try {
    await app.$liff.sendMessages([{ type: "text", text: msg.value }]);
    alert("send success!");
    app.$liff.closeWindow();
  } catch (e) {
    alert(e);
  }
};
const sendMsgOther = async () => {
  try {
    const ok = await app.$liff.shareTargetPicker([
      { type: "text", text: msg.value },
    ]);
    ok ? alert("send success !") : alert("キャンセルされた");
  } catch (e) {
    alert(e);
  }
};
</script>
