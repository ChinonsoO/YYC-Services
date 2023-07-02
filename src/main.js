import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { onAuthStateChanged } from './firebase/init'
import { projectAuth } from './firebase/init'
import '@mdi/font/css/materialdesignicons.css'
// import vuetify from ' ./plugins/vuetify'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { loadFonts } from './plugins/webfontloader'


const vuetify = createVuetify({
   components,
   directives,
 })

let app

onAuthStateChanged(projectAuth, () =>{
   if (!app){
    app = createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
   }  
})

loadFonts()

