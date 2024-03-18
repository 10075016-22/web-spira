import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import 'devextreme/dist/css/dx.light.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




// router
import router from './router'


// store
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState({
  storage: sessionStorage
}))

import { PiniaSharedState } from 'pinia-shared-state'

pinia.use(PiniaSharedState({
  enable: true,
  initialize: true,
  type: 'localstorage'
}))


// Configuration axios
import environment from '@/config/environment.js'
import axios from "axios"
const axiosConfig = {
  'Content-Type': 'application/json;charset=UTF-8',
  "Access-Control-Allow-Origin": "*",
  'Access-Control-Allow-Methods': '*'
};

axios.defaults.baseURL = environment;
axios.defaults.headers.common = axiosConfig
console.log(process.env.NODE_ENV);


axios.interceptors.response.use( (response) => { 
  return response
}, (err) => {
    const { response: { status, data } } = err;
    if (!window.navigator.onLine) {
      console.log('Problemas de conexión a internet :(');
    }
    if(status){
      if (status === 401) {
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = ''
      }
    }
  }
);

const app = createApp(App, {
  setup() {}
})

loadFonts()

app
  .use(VueSweetalert2)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')
