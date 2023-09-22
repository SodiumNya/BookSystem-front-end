import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/app.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import Toaster from '@meforma/vue-toaster';
const app = createApp(App)

app.use(router)
    .use(Toaster)

app.mount('#app')

