import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import './styles/GlobalStyles.vue'
import { FaFilter, MdMoneyoff, FaHighlighter, GiTicket } from "oh-vue-icons/icons"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

addIcons(FaFilter, MdMoneyoff, FaHighlighter, GiTicket);

const app = createApp(App)

app.component("v-icon", OhVueIcon);
app.use(router)

app.use(Toast);

app.mount('#app')