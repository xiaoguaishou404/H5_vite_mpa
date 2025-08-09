import { createApp } from "vue";
import UserLevel from "./userLevel.vue";
import "@/shared/styles/global.css";
import { createVfm } from "vue-final-modal";
import 'vue-final-modal/style.css'

const app = createApp(UserLevel);
const vfm = createVfm();
app.use(vfm).mount("#app");

