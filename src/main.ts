import './assets/main.css'


import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import Ripple from 'primevue/ripple';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        color: 'indigo',
    },
    
    ripple: true
})


app.directive('ripple', Ripple);

app.use(createPinia())
app.use(router)

app.mount('#app')