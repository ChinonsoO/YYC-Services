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
      <v-tab value="signUp">About Me</v-tab>
      
      <!--Uncomment below line and below code if you want to experiment with add a profile picture tab in the future  -->
      <!-- <v-tab value="addAvatar"  :disabled="!formValid">Add a profile picture</v-tab> -->
    </v-tabs>

    <v-container class="mt-10 bg-white rounded form_container">

    <v-window v-model="tab">

     
    
      <v-window-item value="signUp">
          
        
        <v-form
        v-model="formValid"
        lazy-validation
          >
        <v-container>

        <v-row>
        <v-col class="Description-TextField mb-2">
            <v-textarea class="Description-TextField__Text text-wrap"
            hint="This will appear on your host profile !"
            style="word-break: break-word"
      v-model="hostDescription"
          
          counter="1000"
          label="Write a short description about yourself."
          required color="indigo"
          bg-color="white"
          variant ="outlined"
          maxlength="1000"
        ></v-textarea>
       
            </v-col>

        </v-row>

        <v-row>
            <v-col class="Select-Services">
                <v-combobox
          v-model="selectedServices"
          :items="serviceItems"
          label="What Services do you offer"
          :rules="hostDescriptionRules"
          multiple
          chips
          bg-color="white"
        ></v-combobox>
         <!-- <template v-slot:label>
            <div>What services do you offer</div>
        </template> -->
            </v-col>
        </v-row>

        <v-row>
        <v-col class="Select-Services">
        <v-radio-group
            v-model="primaryService"
          label="What is your primary service"
        >
        <v-radio v-if="selectedServices.includes('Haircuts')" label="Haircuts" value="barber"></v-radio>
        <v-radio v-if="selectedServices.includes('HairStyles')" label="HairStyles" value="hairStylist"></v-radio>
        <v-radio v-if="selectedServices.includes('NailStyles')" label="NailStyles" value="nailStylist"></v-radio>
      
      </v-radio-group>
         <!-- <template v-slot:label>
            <div>What services do you offer</div>
        </template> -->
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-select
                v-model="location"
              label="Select your location"
              :items="['NE Calgary', 'NW Calgary', 'SE Calgary', 'SW Calgary']"
              variant="outlined"
              required 
              :rules = "selectRules" 
            ></v-select>
         <!-- <template v-slot:label>
            <div>What services do you offer</div>
        </template> -->
            </v-col>
        </v-row>
        

        <v-text-field
          label="Instagram"
          color="indigo" bg-color="white" variant ="outlined"
        >
        <template v-slot:prepend>
            <v-icon color="blue-darken-3">mdi-instagram</v-icon>
        </template>
        
        </v-text-field>
    
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
        <v-row>
                <v-col cols="12">
                       
                    <div class="font-weight-bold text-h6">
                        Upload your greatest works!
                        <div class="text-caption text-grey">The first photo of your primary service is what will appear on search results </div>
                    </div>
                  
                </v-col>
        </v-row>
        <v-row>
                <v-col cols="12">
                    <v-tabs v-model="servicePhotosTabs" center-active>
                        <v-tab value="barber" :disabled="!selectedServices.includes('Haircuts')">Haircuts</v-tab>

                        <v-tab value="hairStylist" :disabled="!selectedServices.includes('HairStyles')" >Hairstyles</v-tab>
                        <v-tab value="nailStylist" :disabled="!selectedServices.includes('NailStyles')">NailStyles</v-tab>

                    </v-tabs>
                    <v-window v-model="servicePhotosTabs">
                        <v-window-item value="barber" :disabled="!selectedServices.includes('Haircuts')">
                       <v-row>

                             
                        <v-col 
                        v-for="i in 6"
                        :key="i"
                        cols="12"
                        md="4">
                        <v-file-input @change="barberUploaderOnFileChanged"
                        :id="`Barbimage${i}`" 
                        ref="barberPhotosUploader"
                        accept="image/png, image/jpeg, image/jpg" 
                        class="d-none"
                        :rules="barberPhotosRules" 
                        >

                        </v-file-input>
                        <!-- <input
                        :id="`image${i}`" 
                        ref="barberPhotosUploader" 
                        class="d-none" 
                        type="file" 
                        @change="barberUploaderOnFileChanged"
                    >    -->
                        <v-card flat class="bg-grey-lighten-2" height="150" :link="selectedServices.length != 0" @click=" selectedServices.length != 0 ? handleFileImport(i, 'barber'): pass">
                        <div v-if="!barberPhotosSrc[`Barbimage${i}`]" class="d-flex flex-column h-100 justify-center align-center">
                            <v-icon>mdi-camera</v-icon>
                            <div class="mt-3">Upload a photo</div>
                        </div>
                        <v-img v-else :src="barberPhotosSrc[`Barbimage${i}`]" cover>


                        </v-img>
                        </v-card>
                    </v-col>
                    </v-row>   

                    </v-window-item>
                      <v-window-item value="hairStylist" :disabled="!selectedServices.includes('HairStyles')">
                          <v-row>
                          <v-col 
                          v-for="i in 6"
                          :key="i"
                          cols="12"
                          md="4">
            
                      <v-file-input
                      :id="`Hairimage${i}`" 
                      ref="hairStylePhotosUploader" 
                      class="d-none"
                      accept="image/png, image/jpeg, image/jpg" 
                      @change="hairStyleUploaderOnFileChanged"
                      >

                      </v-file-input>
                          <v-card flat class="bg-grey-lighten-2" height="150" :link="selectedServices.length != 0" @click=" selectedServices.length != 0 ? handleFileImport(i, 'hairStylist'): pass">
                          <div v-if="!hairStylePhotosSrc[`Hairimage${i}`]" class="d-flex flex-column h-100 justify-center align-center">
                              <v-icon>mdi-camera</v-icon>
                              <div class="mt-3">Upload a photo</div>
                          </div>
                          <v-img v-else :src="hairStylePhotosSrc[`Hairimage${i}`]" cover>


                          </v-img>
                          </v-card>
                      </v-col>
                      </v-row>   

                    </v-window-item>

                    <v-window-item value="nailStylist" :disabled="!selectedServices.includes('NailStyles')">
                          <v-row>
                          <v-col 
                          v-for="i in 6"
                          :key="i"
                          cols="12"
                          md="4">
            
                      <v-file-input
                      :id="`Nailimage${i}`" 
                      ref="nailStylePhotosUploader" 
                      class="d-none"
                      accept="image/png, image/jpeg, image/jpg" 
                      @change="nailStyleUploaderOnFileChanged"
                      >

                      </v-file-input>
                          <v-card flat class="bg-grey-lighten-2" height="150" :link="selectedServices.length != 0" @click=" selectedServices.length != 0 ? handleFileImport(i, 'nailStylist'): pass">
                          <div v-if="!nailStylePhotosSrc[`Nailimage${i}`]" class="d-flex flex-column h-100 justify-center align-center">
                              <v-icon>mdi-camera</v-icon>
                              <div class="mt-3">Upload a photo</div>
                          </div>
                          <v-img v-else :src="nailStylePhotosSrc[`Nailimage${i}`]" cover>


                          </v-img>
                          </v-card>
                      </v-col>
                      </v-row>   

                    </v-window-item>

                    </v-window>
                </v-col>
                    
             </v-row>
              



        <div v-if="barberPhotosUploadError" class="text-red pb-3 font-weight-light">
            {{barberPhotosUploadError}}
        </div>

        <div v-if="noImageUploadedError" class="text-red pb-3 font-weight-light">
          {{noImageUploadedError}}
        </div>

        <!-- <div v-if="hairStylePhotosUploadError">
            {{hairStylePhotosUploadError}}
        </div>
        <div v-if="nailStylePhotosUploadError">
            {{nailStylePhotosUploadError}}
        </div> -->
        <v-btn
          :disabled="!formValid"
          color="primary"
          class="mr-4 mt-3"
          @click="handleSubmit"
          :loading="barberPhotosLoading"
        >
          Continue
        </v-btn>

        <!-- <div>
            {{barberPhotosLoading}}
        </div> -->


        <!-- <v-row class="mt-16 justify-center">
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

      </v-row> -->

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
        
      <!-- <v-window-item value="addAvatar" class="text-center">

        <v-avatar v-if="avataPhotoSrc['avatarImage']" size="150">
        <div>
          <img :src="avataPhotoSrc['avatarImage']" v-if="avataPhotoSrc['avatarImage']" alt="" class="user_Avatar">
        </div>
        </v-avatar >

        <v-form v-model="imageValid">
          <v-container>
        



             <v-file-input @change="avatarUploaderOnFileChanged" 
            :rules="imageRules"
            accept="image/png, image/jpeg, image/jpg"
            id="avatarImage"
            ref="avatarPhotoUploader"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            required
            v-model="imageFile"
            :error-messages="imageErrorMessage"
            
            
          ></v-file-input>
          

          <v-btn
              :disabled="!imageValid"
              color="primary"
              class="mr-4 mt-3"
              @click="handleSubmit"
              :loading="nailStylePhotosLoading || hairStylePhotosLoading || barberPhotosLoading"
            >
              Sign up
             </v-btn>

             
             

          </v-container>
        </v-form>
      </v-window-item> -->
  </v-window> 
  </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<script setup>
import {ref,computed} from 'vue' 
import { useRouter } from 'vue-router';
import getUser from '../composables/getUser'
import addImages from '../composables/useImageStorage'
import createHostAvailabilty from '@/composables/createHostAvailability'

const router = useRouter()


const {user} = getUser()

const formValid = ref(false)

const tab = ref(null)

const hostDescription = ref('')
const imageFile = ref()

const servicePhotosTabs = ref([])

const selectedServices = ref([])
const location = ref(null)

const primaryService = ref(null)


//Form Rules
const hostDescriptionRules = computed (() =>{
    const rules = []
    

    if (selectedServices.value){
      const rule = v => {
        for (let i = 0; i< v.length; i++){
          if (!['Haircuts', 'HairStyles', 'NailStyles'].includes(v[i])){
            return 'Invalid Service Present'
          }
          else {
            return true
          }
        }
      }
      rules.push(rule)
    }

    if (selectedServices.value){
       const rule = v => (v.includes('Haircuts') || v.includes('HairStyles') || v.includes('NailStyles')) || 'Please select a service'
       rules.push(rule)
    }

    if (selectedServices.value){
        const rule = v => (v && v.length <= 3) || 'Invalid Number of Services'
        rules.push(rule)
    }

    


    // if (selectedServices.value){
    //     const rule = v => (v.sort() === "Haircuts, HairStyles, NailStyles") || 'Invalid Services Detected'
    //     rules.push(rule)
    // }

    return rules
})

const selectRules = computed( () => {
  const rules = []

  const rule = v => !!v ||  'Please select a location'

  rules.push(rule)

  return rules

})

const imageUploadRules = computed(() => {
    const rules = [];

    const rule = () => {
        // Check if each selected service has at least one image uploaded
        for (let service of selectedServices.value) {
            if (service === 'Haircuts' && Object.keys(barberPhotos.value).length === 0) {
                return 'Please upload at least one image for Haircuts service.';
            }
            if (service === 'HairStyles' && Object.keys(hairStylePhotos.value).length === 0) {
                return 'Please upload at least one image for HairStyles service.';
            }
            if (service === 'NailStyles' && Object.keys(nailStylePhotos.value).length === 0) {
                return 'Please upload at least one image for NailStyles service.';
            }
        }
        // If all selected services have at least one image uploaded
        return true;
    };

    rules.push(rule);

    return rules;
});



const {loading: barberPhotosLoading } = addImages(`barberImages/${user.value.uid}`)
// const {loading: hairStylePhotosLoading} = addImages(`hairStyleImages/${user.value.uid}`)
// const {loading: nailStylePhotosLoading} = addImages(`nailStyleImages/${user.value.uid}`)

//For some reason an error in one triggers the rest of the errors
const {error: barberPhotosUploadError} = addImages(`barberImages/${user.value.uid}`)
// const {error: hairStylePhotosUploadError} = addImages(`hairStyleImages/${user.value.uid}`)
// const {error: nailStylePhotosUploadError} = addImages(`nailStyleImages/${user.value.uid}`)


// watch(barberPhotosLoading, () =>{
//     console.log(barberPhotosLoading.value)
// })
// const barberPhotosLoading = ref(false)

const noImageUploadedError = ref(null)


const serviceItems=['Haircuts', 'HairStyles', 'NailStyles']

/* eslint-disable */
const barberPhotos  = ref ({})
const nailStylePhotos = ref({})
const hairStylePhotos = ref({})

const barberPhotosUploader   = ref(null)
const hairStylePhotosUploader = ref(null)
const nailStylePhotosUploader = ref(null)

//Sources we use to display the images to the user

const barberPhotosSrc = ref({})
const hairStylePhotosSrc = ref({})
const nailStylePhotosSrc = ref({})


const barberPhotosRules = computed(() =>{
    const rules = []

    if (Object.keys(barberPhotos.value).length != 0){
        const rule = () => (selectedServices.value.includes('Haircuts')) || "Selected Service does not match uploaded images"
        rules.push(rule)
    }
    return rules
})


const handleFileImport = (i, service) =>{
    if (service == 'barber'){
        barberPhotosUploader.value[i-1].click()
    }
    else if (service == 'hairStylist'){
        hairStylePhotosUploader.value[i-1].click()
    }
    else if (service == 'nailStylist') {
        nailStylePhotosUploader.value[i-1].click()
    }
    else{
      avatarPhotoUpoloader.value.click()
    }
}



const barberUploaderOnFileChanged = (e) =>{

    let imageId = e.target.id

    const file = ref(null)
    file.value = e.target.files[0]
    barberPhotos.value[imageId] = file.value

    barberPhotosSrc.value[imageId] = URL.createObjectURL(file.value)
} 

const hairStyleUploaderOnFileChanged = (e) =>{
     let imageId = e.target.id

    const file = ref(null)
    file.value = e.target.files[0]
    hairStylePhotos.value[imageId] = file.value

    hairStylePhotosSrc.value[imageId] = URL.createObjectURL(file.value)

}

const nailStyleUploaderOnFileChanged = (e) =>{
    let imageId = e.target.id

    const file = ref(null)
    file.value = e.target.files[0]
    nailStylePhotos.value[imageId] = file.value

    nailStylePhotosSrc.value[imageId] = URL.createObjectURL(file.value)

}

const {batchWrite, batchWriteError} = createHostAvailabilty('serviceHosts')


const handleSubmit = async () =>{

  if (imageUploadRules.value[0]() !== true) {
        noImageUploadedError.value = imageUploadRules.value[0]()
        return;
    }

  let barberPublicImageUrls = []
  let hairStylePublicImageUrls = []
  let nailStylePublicImageUrls = []


    if (Object.keys(barberPhotos.value).length != 0){
            const {imageWrite: barberImagesWrite} = addImages(`barberImages/${user.value.uid}`)
            barberPublicImageUrls = await barberImagesWrite(user.value.uid, barberPhotos)
    }
    
    if (Object.keys(hairStylePhotos.value).length != 0){
            const{imageWrite: hairStyleImagesWrite} = addImages(`hairStyleImages/${user.value.uid}`)
            hairStylePublicImageUrls = await hairStyleImagesWrite(user.value.uid, hairStylePhotos)
    } 
    if (Object.keys(nailStylePhotos.value).length != 0){
            const {imageWrite: NailStyleImagesWrite} = addImages(`nailStyleImages/${user.value.uid}`)
             nailStylePublicImageUrls = await NailStyleImagesWrite(user.value.uid, nailStylePhotos)
    } 

    // console.log(barberPublicImageUrls)
    // console.log(hairStylePublicImageUrls)


    addHostAvailability(barberPublicImageUrls, hairStylePublicImageUrls, nailStylePublicImageUrls)



    
}

const addHostAvailability = async (barberImageUrls, hairStyleImageUrls, nailStyleImageUrls) =>{

    const notAvailableDays = {notAvailableDates: {}}
    
    let chosenServices = []

    for(let i =0; i< selectedServices.value.length; i++){
      if (selectedServices.value[i] == 'Haircuts'){
        chosenServices.push('barber')
      }
      else if (selectedServices.value[i] == 'HairStyles'){
        chosenServices.push('hairStylist')
      }
      else if (selectedServices.value[i] == 'NailStyles'){
        chosenServices.push('nailStylist')
      }
    }

    const service = {
      services: chosenServices
    }

    let primaryUrl = null

    if (primaryService.value === "barber"){
      primaryUrl = barberImageUrls[0]
    }
    else if (primaryService.value === "hairStylist"){
      primaryUrl = hairStyleImageUrls[0]
    }
    else if (primaryService.value === "nailStylist"){
      primaryUrl = nailStyleImageUrls[0]
    }

    const hostInfo = {
        location: location.value,
        name: user.value.displayName,
        primaryHostImageUrl: primaryUrl,
        aboutMe: hostDescription.value,
        HostImages: {
          barberImages: barberImageUrls,
          hairStyleImages: hairStyleImageUrls,
          nailStyleImages: nailStyleImageUrls
        }

    }



   await batchWrite(user.value.uid, service, notAvailableDays, hostInfo)

    if(!batchWriteError.value){
        router.push('/')
    }

    
}

// addHostAvailability()





const handleContinue = () =>{
   tab.value = 'addAvatar'
}

// Avatar Tab


const imageValid = ref(false)

const avataPhotoSrc = ref({})
const avatarPhotoUpoloader = ref(null)
const avatarPhotos = ref({})

const imageErrorMessage = ref("");

const avatarUploaderOnFileChanged = (e) => {
  let imageId = e.target.id
  const file = ref(null)
  file.value = e.target.files[0];
  if(file.value.size > 10 * 1024 * 1024) { // check if file size is more than 10MB
    imageErrorMessage.value = "File size should not be more than 10MB.";
    imageFile.value = null; // clear the file input
  } else {
    imageErrorMessage.value = ""; // clear the error message
    
  }

  avatarPhotos.value[imageId] = file.value

  avataPhotoSrc.value[imageId] = URL.createObjectURL(file.value)

  
}



const imageRules = computed( () => {
  const rules = []

  const rule = v => !!v ||  'An Image is Required'

  rules.push(rule)

  return rules

})

</script>

<style scoped>
.form_container{
    max-width: 800px;
}

.Description-TextField{
}

.Description-TextField__Text .v-input__control{
    /* min-height: 200px !important; */
}


</style>