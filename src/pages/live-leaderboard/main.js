import { createApp } from 'vue'
import LiveLeaderboard from './liveLeaderboard.vue'
import '@/shared/styles/global.css'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import '@/shared/utils/safeArea.js'

const app = createApp(LiveLeaderboard)
const vfm = createVfm()
app.use(vfm).mount('#app')
