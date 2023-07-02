<template>
<div id="#footer">
    <v-container fluid class="pa-0 mt-6">
        <v-row class="footer-container my-0">
            <v-col >
                <div class="pa-3">
                <a href="">
            <!-- <span class = "font-weight-light text-h6 text-lg-h4 text-purple">YYC</span>
            <span class="text-h6 text-lg-h4 text-black">Services</span> -->
                </a>
                </div>

            </v-col>
            <v-col class="text-end px-7">
                <v-btn icon class="footer-buttons bg-black">
                    <v-icon class="pa-5" color="blue" icon="mdi-instagram"></v-icon>
                </v-btn>
                <v-btn class="footer-buttons bg-black" icon>
                    <v-icon class="pa-5" color="blue" icon="mdi-phone"></v-icon>
                </v-btn>

                <v-btn class="footer-buttons bg-black" icon>
                    <v-icon class="pa-5" color="blue" icon="mdi-email"></v-icon>
                </v-btn>
                

            </v-col>
        </v-row>
    </v-container>

</div>
    
</template>

<script>

// import {mdiInstagram} from '@mdi/font'

export default {
    data: () => ({
    //   mdiInstagram
    }),
  }

</script>

<style>

.footer-container{
    height: 15vh;
    /* background: rgb(0,0,0);
    background: linear-gradient(225deg, rgba(0,0,0,1) 33%, rgba(0,7,36,1) 48%); */
}

.footer-buttons{
    display: inline-block !important;
    margin: 4px;
}

a{
    text-decoration: none;
}

</style>