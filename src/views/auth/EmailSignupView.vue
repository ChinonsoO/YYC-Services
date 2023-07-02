<template>

    <v-container>
        <v-row class="text-h4 text-center mt-10 font-weight-bold">
            <v-col>
                Lets gets Started!
            </v-col>
        </v-row>
    </v-container>


    

    <div class="mx-5">
    

    <v-tabs
      v-model="tab"
      background-color="primary" class="form_container mx-auto mt-5 rounded"
    >
      <v-tab value="signUp">Sign up</v-tab>
      <v-tab value="addAvatar"  :disabled="!formValid">Add a profile picture</v-tab>
      <!-- <v-tab value="three">Item Three</v-tab> -->
    </v-tabs>

    <v-container class="mt-10 bg-white rounded form_container">

    <v-window v-model="tab">

     
    
        <v-window-item value="signUp">
          
        
        <v-form
        ref="form"
        v-model="formValid"
        lazy-validation
          >
        <v-container>

        <v-row>
            <v-col>
                <v-text-field
          v-model="firstName"
          :counter="10"
          :rules="nameRules"
          label="First name"
          required color="indigo"
          bg-color="white"
          variant ="outlined"
        ></v-text-field>
            </v-col>

            <v-col>
                <v-text-field
          v-model="lastName"
          :counter="10"
          :rules="nameRules"
          label="Last name"
          required
          bg-color="white"
          color="indigo"
          variant ="outlined"
        ></v-text-field>
            </v-col>
        </v-row>
        

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          color="indigo" bg-color="white" variant ="outlined"
        ></v-text-field>

        <v-text-field type="password" color="indigo" bg-color="white" 
        v-model="password" :rules="passRule" label="Password" required variant ="outlined"> </v-text-field>

        <v-text-field type="password" color="indigo" bg-color="white" 
        v-model="confirmPassword" :rules="confirmPasswordRules" variant ="outlined" label="Confirm Password" required></v-text-field>

        <!-- <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select> -->

        <!-- <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox> -->

        <div v-if="error" class="text-red pb-3 font-weight-light">
            {{error}}
        </div>
        <v-btn
          :disabled="!formValid"
          color="primary"
          class="mr-4"
          @click="validate"
          :loading="isPending"
        >
          Continue
        </v-btn>

        <v-row class="mt-16 justify-center">
        <v-col class="text-center">
          <div>
            <span class="px-5 o">Already have an account?</span>
            <span>
              <v-btn class="bg-black" to="/login/email" flat>
                Log in
            </v-btn>
            </span>
          </div>
        </v-col>

      </v-row>

        <!-- <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn> -->

        <!-- <v-btn
          color="warning"
          @click="resetValidation"
        >
          Reset Validation
        </v-btn> -->
        </v-container>
      </v-form>
      </v-window-item>
        
      <v-window-item value="addAvatar" class="text-center">

        <v-avatar v-if="imageUrl" size="150">
        <div>
          <img :src="imageUrl" v-if="imageUrl" alt="" class="user_Avatar">
        </div>

        <!-- <v-img v-if="imageUrl" :src="imageUrl"  >

        </v-img> -->
        </v-avatar >

        <v-form ref="imageForm" v-model="imageValid">
          <v-container>
            <!-- <v-validation v-model="imageValid" :disabled="true"> -->
             <v-file-input @change="onFileChange" @click:clear="onFileChange"
            :rules="imageRules"
            accept="image/png, image/jpeg, image/jpg image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            required
            v-model="imageFile"
            
            
          ></v-file-input>
          <v-btn
              :disabled="!imageValid"
              color="primary"
              class="mr-4"
              @click="handleSubmit"
              :loading="isPending"
            >
              Sign up
             </v-btn>

             
              <!-- </v-validation> -->

          </v-container>
        </v-form>
      </v-window-item>
  </v-window> 
  </v-container>
  </div>
</template>




<script setup>
 /* eslint-disable */
import {ref, watch} from 'vue'
import { computed } from 'vue'
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';



const tab = ref(null)

const firstName = ref('')
const lastName= ref('')

//Form Validation
const form = ref(null)


const formValid = ref(true)

const nameRules = [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ]

const email = ref('')
const emailRules = ref([
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])

const password = ref('')
const confirmPassword = ref ('')
const passRule = ref([
    v=> !!v || 'Please enter a passsword',
    v => (v && v.length >= 4) || 'Password must be greater than or equal to 4 characters',
    // v => (!!v && v) === confirmPassword.value || 'Values do not match'
    
])

watch(password, ()=>{
  validateForm()
})

const validateForm = () =>{
  form.value.validate()
}








const validate = () =>{
    if (form.value.validate()){

        console.log('Valid signupform')
        tab.value = "addAvatar"
        // handleSubmit()

    }
    else{
        console.log("invalid form")
    }
    // console.log(form)
}





const confirmPasswordRules = computed( () =>{   

    const rules = []
            if (password.value){
                const rule = v => (!!v) || 'Please confirm your password'
                rules.push(rule)
            }


            if (password.value){
                const rule = v => (!!v && v) === password.value ||
              'Values do not match'

              rules.push(rule)
            }

            return rules

})

//Image Validation
const imageForm = ref(null)
const imageValid = ref(true)

const imageRules = ref([
  value => !value || !value.length || value[0].size < 6000000 || 'Avatar size should be less than 6 MB!',
  v => !!v || "Please upload an avatar image",
  v => (v && v.length > 0) || 'File is required',
])


watch(imageValid, () =>{
  // validateImg()
  // console.log(imageValid.value)
})




// Show Preview Image

//Img url we'll use as a src for our image
const imageUrl = ref(null)

//Image file we plan on uploading, we have set a v-model on our file input to model this
const imageFile = ref()

const file = ref(null)
const onFileChange = (e) =>{
  if (imageUrl.value){
    imageUrl.value = null
    URL.revokeObjectURL(file.value)
  }
  else{
    file.value = e.target.files[0];
    imageUrl.value = URL.createObjectURL(file.value);
  }
 
}

//Signing Up User

const {signup, error, isPending} = useSignup()
const router = useRouter()

const handleSubmit = async () => {
  //We invoke our signUp composable to sign the user up with email and password

  const userDetails = {
    firstName: firstName.value,
    lastName: lastName.value,
    favourites:[],
    isHost: false
  }

  // console.log(imageFile.value[0])
    await signup(email.value, password.value, userDetails, imageFile.value[0])

    if (!error.value){
      console.log('no error')
        router.push('/')
    }
    else{
        if (error.value == 'Firebase: Error (auth/email-already-in-use).'){
            error.value = "Email is already in use"
        }
        console.log(error)
    }
}
 

</script>


<script>

 export default {
    data: () => ({
      imgRules: [
        value => {
          return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
        },
      ],
    }),
  }
// export default {
//      data: () => ({
//       valid: true,
//       firstName: '',
//       lastName: '',
//       nameRules: [
//         v => !!v || 'Name is required',
//         v => (v && v.length <= 10) || 'Name must be less than 10 characters',
//       ],
//       email: '',
//       emailRules: [
//         v => !!v || 'E-mail is required',
//         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
//       ],
//       select: null,
//       items: [
//         'Item 1',
//         'Item 2',
//         'Item 3',
//         'Item 4',
//       ],
//       checkbox: false,
//       password: '',
//       confirmPassword: '',
//       passRule: [
//         v=> !!v || 'Please enter a passsword',
//         v => (v && v.length >= 4) || 'Password must be greater than or equal to 4 characters'

//       ]
//     }),

//     methods: {
//       validate () {
//         if(this.$refs.form.validate()){
//             console.log("Valid form")
//         }
//         else{
//             console.log("Invalid form")
//         }
        
//       },
//     //   reset () {
//     //     console.log(this.password)
//     //     this.$refs.form.reset()
//     //   },
//     //   resetValidation () {
//     //     this.$refs.form.resetValidation()
//     //   },
//     },

//     computed: {
//         passwordRules () {
//             const rules = []

//             if (this.password){
//                 const rule = v => (!!v) || 'Please confirm your password'
//                 rules.push(rule)
//             }


//             if (this.password){
//                 const rule = v => (!!v && v) === this.password ||
//               'Values do not match'

//               rules.push(rule)
//             }

//             return rules


//         }


//     }

// }
</script>

<style scoped>

.form_container{
    max-width: 460px;
}

.user_Avatar{
  width: 100%;
  background-size: cover;
}
</style>