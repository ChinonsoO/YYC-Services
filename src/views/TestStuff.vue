<template>
    <v-app>
      <v-app-bar app color="primary" fixed>
        <v-app-bar-nav-icon />
        <v-toolbar-title>YYC Barbers</v-toolbar-title>
        <v-spacer />
        <v-btn text>Home</v-btn>
        <v-btn text>Hosts</v-btn>
        <v-btn text>Services</v-btn>
      </v-app-bar>
      <v-content>
        <v-img src="../assets/hero_img.jpg" :height= "imgHeight" cover object-fit="center">
          <v-row class="fill-height" align="center" justify="center" >
            <v-col color="primary" class="text-center" cols="12">
                <v-card dark class="px-5 py-5">
                <v-card-text class="display-3 font-weight-bold">
                  YYC Barbers
                </v-card-text>
            </v-card>
            </v-col>
        </v-row>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
import { useDisplay } from 'vuetify';
import { computed } from "vue"


export default {
  name: 'App',
  setup() {
    const { height } = useDisplay();
    const imgHeight = computed(() => `calc(100vh - 64px - ${height}px)`);
    return { imgHeight };
  },
};
</script>

<style>
  .fill-height {
    height: 100%;
  }
</style>  