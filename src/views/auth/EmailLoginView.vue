<template>
   <v-container>
        <v-row class="text-h4 text-center mt-10 font-weight-bold">
            <v-col>
                Welcome back!
            </v-col>
        </v-row>
    </v-container>

    <div class="mx-5">

    
    <v-container class="mt-10 bg-white rounded form_container">

     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      color="indigo" bg-color="white" variant ="outlined"
    ></v-text-field>

    <v-text-field type="password" color="indigo" bg-color="white" 
    v-model="password" label="Password" required variant ="outlined"> </v-text-field>


    <div v-if="error" class="text-red pb-3 font-weight-light">
        {{error}}
    </div>
    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="validate"
      :loading="isPending"
    >
      Log in
    </v-btn>

     <v-row class="mt-7 justify-center">
        <div class="w-100 text-center">
            or
        </div>
        <v-col class="text-center column-style" cols="12">
        <v-btn prepend-icon="mdi-google" class="button-style bg-black" @click="logUserInWithGoogle" flat>Continue with Google</v-btn>
        </v-col>
        
  </v-row>

    <v-row class="mt-16 justify-center">
    <v-col class="text-center">
      <div>
        <span class="px-5 o">Don't have an account ?</span>
        <span>
          <v-btn class="bg-black" to="/signup" flat>
           Sign up
        </v-btn>
        </span>
      </div>
    </v-col>

  </v-row>

    </v-container>
  </v-form>
  </v-container>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router';
import googleLogin from '@/composables/googleLogin'
// import { projectAuth, getRedirectResult,} from '@/firebase/init';

const valid = ref(true)

const email = ref('')
const emailRules = ref([
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])

const password = ref('')
const {login, error, isPending} = useLogin()

const form = ref(null)
const validate = () =>{
    if (form.value.validate()){
        console.log('Valid form')
        logUserIn()

    }
    else{
        console.log("invalid form")
    }
    // console.log(form)
}

const router = useRouter()
const logUserIn = async () => {
   await login(email.value, password.value)

   if(!error.value){
    router.push('/')
   }
   else{
    console.log(error.value)
   }
}

 const {logInWithGoogle, googleError} = googleLogin()

    const logUserInWithGoogle = async () => {
        // This will not resolve it will be interrupted by page redirect
        //We catch the user obeject in the getRedirect method below
        await logInWithGoogle()
        .then((res) => {
            console.log(res.user)
            console.log('98fsd')
        })
        // await getRedirectResult(projectAuth)

        if(!googleError.value){
            router.push('/')    
            console.log('HMMM@')
        }
        else{
            console.log(googleError.value)
            console.log("HMMMMMMerror")
        }
    }




</script>

<!-- <script>
// import {ref,} from 'vue'
// import useLogin from '@/composables/useLogin'
// import { useRouter } from 'vue-router';
import googleLogin from '@/composables/googleLogin'
// import { getRedirectResult } from '@firebase/auth';
// import { projectAuth, onAuthStateChanged } from '@/firebase/init';


export default {
    name:'LoginWithEmail',

    setup(){
        const {logInWithGoogle, googleError} = googleLogin()

    // const router = userouter()
    const logUserInWithGoogle = async () => {

        await logInWithGoogle()
        // await getRedirectResult(projectAuth)
        console.log('HMMMMM#Q#R')

        if(!googleError.value){
            // router.push('/')
            console.log('HMMM@')
        }
        else{
            console.log(googleError.value)
            console.log("HMMMMMM")
        }
    }
    
    return {logUserInWithGoogle}
    }
}

</script> -->


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

.form_container{
    max-width: 460px;
}

</style>