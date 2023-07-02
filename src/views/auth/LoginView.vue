<template>

<v-container class="mt-16">
  <v-row>
    <v-col class="text-center">
      <div class="text-h4 font-weight-bold text-black">
      Welcome to YYC Services
      </div>

    </v-col>
    
  </v-row>
  <v-row class="mt-16 justify-center">
    <v-col class="text-center column-style" cols="12">
      <v-btn prepend-icon="mdi-google" class="button-style bg-black" @click="logUserInWithGoogle" flat>Continue with Google</v-btn>
    </v-col>

  </v-row>
  <v-row class="justify-center">
   <v-col cols="12" class="text-center column-style ">
      <v-btn flat prepend-icon="mdi-email" class="button-style bg-black" to="/signup/email" >
      Continue with email
    </v-btn>
    </v-col>

  </v-row>

  <v-row class="mt-16 justify-center">
    <v-col class="text-center">
      <div>
        <span class="px-5 o">Already have an account?</span>
        <span>
          <v-btn class="bg-black" flat to="/login/email">
            Log in
        </v-btn>
        </span>
      </div>
    </v-col>

  </v-row>
  

</v-container>
</template>

<script setup>
import googleLogin from '@/composables/googleLogin'

// import {ref} from 'vue'

const {logInWithGoogle} = googleLogin()


const logUserInWithGoogle = async () => {
   await logInWithGoogle()
   
}

</script>

<style scoped>

.button-style{
  /* max-width: 460px !important;
  width: 460px! important;
  min-width: 260px; */

  width: 100% !important;
}

.column-style{
  max-width: 460px;
}
</style>