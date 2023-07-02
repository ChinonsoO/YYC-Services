<template>
  <v-app class=" app-background" :style=test> 
    <!-- bg-grey-lighten-4 -->
    <Navbar/>
    <v-main >
      <router-view/>
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<script>

import Navbar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
    name: "App",
    data: () => ({
    //
    }),
    components: { Navbar, AppFooter }
}
</script>

<!-- <script setup>
import {useRouter} from 'vue-router'
const router = useRouter()

watch(router.name, () =>{
  if (router.name == "Dashboard") {
    bgImage = './assets/triangles (2).svg'
  }
} )

</script> -->

<style>
.app-background{
  background: #FAFFD8;
  overflow-x: hidden !important;

}

html, body{
    -webkit-overflow-scrolling : touch !important;
    
}



</style>
