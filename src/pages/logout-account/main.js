import { createApp } from "vue";
import LogoutAccount from "./logoutAccount.vue";
import "@/shared/styles/global.css";
import { createVfm } from "vue-final-modal";
import 'vue-final-modal/style.css'

const app = createApp(LogoutAccount);
const vfm = createVfm();
app.use(vfm).mount("#app");

