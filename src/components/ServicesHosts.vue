<template>
<!-- <h1>BarbersPage</h1> -->

<!-- <v-container> -->
    <v-container class="px-0" >
       
        <v-card flat class="py-0 switch_card">
        
             <v-row class="pl-lg-7 px-5" >
                <v-col cols="6" class="date-column__style">
                    <div class="py-3">
                        Date
                    </div>
                      <n-date-picker v-model:value="selectedDate" :is-date-disabled="onlyAllowFutureDate" type="date" :input-readonly="dontShowKeyboardOnMobile" />
                      
                </v-col>
                <v-col cols="6" class="date-column__style">
                    <div class="py-3">
                       Time 
                    </div>
                    <n-time-picker use-12-hours v-model:value="selectedTime" input-readonly="true"
                     default-formatted-value="HH:mm:ss" :hours="[7,8,9,10,11,12,13,14,15,16,17,18,19,]" :minutes="30" :seconds="[0]"/>
                </v-col>
                <v-col>
                    <div class="py-3">
                        Selected
                    </div>
                    <div class="text-h6 ">
                        {{chosenTimeMessage}}
                    </div>
                </v-col>
                
             </v-row>

             <v-row class="pl-lg-7 px-5 py-3">
                    <v-menu :close-on-content-click="false">
                        <template v-slot:activator="{props}">
                        <v-btn flat v-bind="props">
                        <svg width="30px" height="30px" viewBox="0 0 0.9 0.9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.337 0.188a0.037 0.037 0 1 0 0 0.075 0.037 0.037 0 0 0 0 -0.075zM0.231 0.188a0.113 0.113 0 0 1 0.212 0H0.713a0.037 0.037 0 1 1 0 0.075h-0.269a0.113 0.113 0 0 1 -0.212 0H0.188a0.037 0.037 0 0 1 0 -0.075h0.044zM0.563 0.412a0.037 0.037 0 1 0 0 0.075 0.037 0.037 0 0 0 0 -0.075zm-0.106 0a0.113 0.113 0 0 1 0.212 0H0.713a0.037 0.037 0 1 1 0 0.075h-0.044a0.113 0.113 0 0 1 -0.212 0H0.188a0.037 0.037 0 1 1 0 -0.075h0.269zM0.337 0.637a0.037 0.037 0 1 0 0 0.075 0.037 0.037 0 0 0 0 -0.075zm-0.106 0a0.113 0.113 0 0 1 0.212 0H0.713a0.037 0.037 0 1 1 0 0.075h-0.269a0.113 0.113 0 0 1 -0.212 0H0.188a0.037 0.037 0 1 1 0 -0.075h0.044z" fill="#0D0D0D"/></svg>
                        </v-btn>
                        
                        </template>
                        <v-list>

                            <!-- <v-radio-group>
                            <v-radio label="Barbers" value="barber"></v-radio>
                            <v-radio label="HairStylists" value="hairStylist"></v-radio>
                            <v-radio label="NailStylists" value="nailStylist"></v-radio>

                            </v-radio-group> -->
                            <v-list-item>
                                <v-checkbox
                            v-model="selectedServices"
                            label="Barbers"
                            value="barber"
                            color="primary"
                            ></v-checkbox>

                            </v-list-item>

                            <v-list-item>
                                <v-checkbox
                                v-model="selectedServices"
                                label="Hairstylists"
                                value="hairStylist"
                                color="primary"
                                ></v-checkbox>
                            </v-list-item>

                            <v-list-item>
                                <v-checkbox
                            v-model="selectedServices"
                            label="NailStylists"
                            value="nailStylist"
                            color="primary"
                            ></v-checkbox>
                            </v-list-item>

                        </v-list>
                        
                           

                            
                    </v-menu>
             </v-row>

            <!-- <v-row class="pl-lg-7 px-5">
            
                <v-col cols="6" md="4" lg="2" class="switch-column" >
                    
                      
                        <div class="switch-input barber_input">
                        <v-switch class="test pl-lg-5" append-icon="mdi-content-cut" inline color="primary"
                            v-model="selectedServices"
                            label="Barbers"
                            value="barber" hide-details
                            >
                            
                        </v-switch>
                        </div>
                </v-col>

                <v-col cols="6" md="4" lg="2" class="switch-column">
                    <div class="switch-input">

                    
                    <v-switch inline
                    v-model="selectedServices"
                    label="Hairstylists"
                    value="hairStylist"
                    color="primary" hide-details append-icon="mdi-face-shimmer-outline"></v-switch>
                    </div>
                </v-col>

                <v-col cols="7" md="4" lg="2" class="switch-column">
                    <div class="switch-input" >

                    
                    <v-switch inline
                    v-model="selectedServices"
                    label="NailStylists"
                    value="nailStylist"
                    color="primary" hide-details append-icon="mdi-lipstick"></v-switch>
                    </div>
                </v-col>
                    
                
        
            </v-row> -->
        </v-card>

        <!-- Loading state of hosts -->
        <v-row v-if="isPending">
            <v-col cols="12" lg="4" class="px-7" v-for="n in 6" :key="n">
                <v-card>
                    <v-img src="../assets/hostPlaceholder.jpg">
                        <n-skeleton style="z-index: 1" class="position-absolute" height="100%"></n-skeleton>
                    </v-img>
                    <v-card-title>
                        <n-skeleton width="33%"></n-skeleton>
                    </v-card-title>
                    <v-card-subtitle class="pb-3">
                        <n-skeleton width="33%"></n-skeleton>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text class="font-weight-bold text-subtitle-1 text-end">
                        <!-- <n-skeleton></n-skeleton> -->
                        Book Now
                    </v-card-text>
                </v-card>
            </v-col>    
        </v-row>
        
        <v-row v-else>

            
            <v-col cols="12" lg="4" class="px-7" v-for="doc in docs"  :key="doc.id">
                <!-- Collage idea of displaying host images, it doesn't look nice though -->
                <!-- <v-container fluid>
                    <v-row :align="center">
                        <v-col cols="6  "
                        v-for="(value, typeOfImage) in doc.HostImages" :key="typeOfImage"
                        >
                        <v-card flat>
                            <v-img :src="value[0]" cover >

                            </v-img>
                        </v-card>
                       
                        </v-col>
                    </v-row>
                </v-container> -->

                <v-card class="mt-4 rounded-2" link :to="`/booking/${doc.id}/${doc.name}/${doc.location}/${doc.services}/${selectedTime}/${selectedDate}`" >
                       <v-progress-linear
                            v-if="loading"
                            class="position-absolute"
                            style="z-index: 1"
                            color="deep-purple"
                            height="10"
                            indeterminate
                            ></v-progress-linear>
                    <v-img class="align-end" :src="doc.primaryHostImageUrl" cover>
                    
                    </v-img>
                    <v-card-title class="text-black">
                    {{doc.name}}
                    </v-card-title>
                    <v-card-subtitle class="pb-3">
                        {{doc.location}}
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text class="font-weight-bold text-subtitle-1 text-end">Book Now</v-card-text>
                    <!-- <v-card-actions class="pa-0 ">
                        <v-btn block class="button-background rounded-0 bg-white card-text ma-0">
                            <div class="book-now__container"> 
                                <span class="font-weight-bold">BOOK NOW</span>

                                <v-icon end>mdi-arrow-right-thick</v-icon> 
                                
                            </div>
                            </v-btn>
                    </v-card-actions> -->
                    
                
                </v-card >
            </v-col>
            
            
        </v-row>

        <v-row class="errorColumn mt-5" v-if="getHostError">
            <v-col cols="12" class="align-center my-auto">
                <v-card class="text-center my-auto"  variant="plain" >
                    <v-card-item > 
                        <v-card-title>
                            <v-icon>mdi-inbox-remove</v-icon>
                            <!-- Sorry no hosts match this criteria please try again later. -->
                            <span class="px-2">{{getHostError.message}}</span>
                        </v-card-title>
                    </v-card-item>
                    <!-- <v-card-title>
                        Hello
                    </v-card-title> -->
                </v-card>
            </v-col>
        </v-row>

</v-container>
<div>
    {{error}}
</div>

<div>
    {{batchWriteError}}
</div>

<!-- <div>
{{getHostError}}
</div> -->

<!-- <v-btn @click="console.log(new Date(selectedDate).toLocaleDateString())">
    Set doc
</v-btn>

<v-btn @click ="logUser">
    Log User
</v-btn>

<v-btn @click = "addHostAvailability">
Add host availability
</v-btn>

<v-btn @click = "getAvailableHosts">
    Get host
</v-btn>


<v-btn @click="test"> 
    test Reactivity
</v-btn> -->
<!-- </v-container> -->

</template>

<script setup>

/* eslint-disable */

import {onMounted, ref, computed, watch, watchEffect} from 'vue'
// import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import createHostAvailabilty from '@/composables/createHostAvailability'
import getHost from '@/composables/getHost'
import { NTimePicker, NDatePicker, NSkeleton } from 'naive-ui'

const dontShowKeyboardOnMobile = ref(true)

//   export default{
//         data: () => ({
//             selectedServices: [],
//             cards: [
//                     {src:"hostPlaceholder.jpg", Title:"John Doe", },
//                     {src:"hair-stylist.jpg", Title:"John Doe"},
//                     {src:"nail-stylist.jpg", Title:"John Doe"}
            
//             ]
//         }),

//         components:{
//             NTimePicker,
//             NDatePicker
//         }

//     }

// const defaultTime = ref(null)
const {user} = getUser()

console.log(user.value.uid)

// const loadingDocs = ref(true)

//One day in milliseconds
const d = 864e5;
// const h = 36e5;
// const m = 6e4;
// const s = 1e3;



const onlyAllowFutureDate = (dateChosen) =>{

    //Only allows user to select future days
  
    const dateChosen_Day = new Date(dateChosen).getDate()
    const dateChosen_Month = new Date(dateChosen).getMonth()

    const nowDay = new Date(Date.now()).getDate()
    const nowMonth = new Date(Date.now()).getMonth()

    // console.log(dateChosen_Day, nowDay)

    //Makes sure the user can only book on a future date and 31 days in advance
    if (dateChosen_Day < nowDay  && dateChosen_Month === nowMonth || dateChosen > Date.now() + d*31){
        return true
}

}

const loading = ref(false)

const docs = ref(null)

const selectedServices = ref(["barber", "hairStylist", "nailStylist"])

const selectedDate = ref(Date.now() + d)

//Default value is 10:00:00 Am
const selectedTime = ref(1659445200000 + (36e5 *3))


const chosenTimeMessage = computed(()=>{
    const day = new Date(selectedDate.value).toDateString()

    const time = new Date(selectedTime.value).toLocaleTimeString()
    return (day + " at " + time) 
})

const {filteredHosts, getHostError, isPending} = getHost()

const getAvailableHosts = async () =>{
    const services = selectedServices.value

    //Format : HH:mm:ss
    const searchTime = new Date(selectedTime.value).toTimeString().split(' ')[0]

    console.log(searchTime)
    
    //Integer where from 0 - 6 : Sunday - Saturday
    const searchDay = new Date(selectedDate.value).getDay()


    console.log(searchDay)
    // In the below we remove the fourth element from the UTC string (the time), then we join the string back together
    let searchDate = new Date(selectedDate.value).toLocaleDateString()
    searchDate = searchDate.replaceAll('/', '-', )
    // searchDate.splice(4,4)
    // searchDate = searchDate.join(' ')
    //Logs in the format Wed, 17 Aug 2022

    console.log(searchDate)

    // loadingDocs.value = true
    docs.value = await filteredHosts(services, searchTime, searchDay, searchDate)

    

}

watch([selectedDate, selectedTime, selectedServices], async () => {
    await getAvailableHosts();
});





// const Selected = watch(selectedServices, () =>{
//     if ((selectedServices.value.length) == 1){
//         return true
//     }
// })


// const watchServcies = watch([selectedServices, selectedDate, selectedTime], ([newSelectedServices,], [oldSelectedServices,]) =>{
//     if (newSelectedServices.length != 0){
//         selectedServices.value = newSelectedServices
//         // console.log("Old => ", oldSelectedServices, oldSelectedServices.length)
//         // console.log("Current => ", selectedServices.value, selectedServices.value.length)
//         if (oldSelectedServices.length != 0){
//             setTimeout(getAvailableHosts(), 500)
//         }
//     }
//     else{
//         setTimeout( () => selectedServices.value = oldSelectedServices)
//     }
    
// })



// watch((docs), () =>{
//     console.log(docs.value)
// })

const cards = ref([
    {src:"IMG_0526.jpg", Title:"John Doe", },
    {src:"hair-stylist.jpg", Title:"John Doe"},
    {src:"nail-stylist.jpg", Title:"John Doe"}
])




onMounted(() => {
   getAvailableHosts()
})


// const {addHost, error} = useCollection('serviceHosts')


// const handleClick = async () =>{
//     const data = {
//         name: "Mark"
//     }

//     const availabilityData = {
//         availability: true
//     }

//     const timeDoc = new Date(selectedTime.value).toLocaleTimeString().split(' ')[0]
//    await addHost(data, user.value.uid, availabilityData, timeDoc )
// }


const logUser = () =>{
    // console.log(user.value)
    // console.log(useCollection().addHost)
}

const {batchWrite, batchWriteError} = createHostAvailabilty('serviceHosts')

const addHostAvailability = async () =>{

    const service = {
        services:['barber', 'hairStylist']
    }
    const notAvailableDays = {notAvailableDates: {}}

    const hostInfo = {
        location: "Nw Calgary",
        name: "John Smith"
    }

   await batchWrite(user.value.uid, service, notAvailableDays)

    if(!batchWriteError.value){
        console.log("Sucess")
    }
}






const test = (id) =>{
    // loading.value = !loading.value
    // console.log(selectedServices.value)
    console.log(id)
}
</script>

<style scoped>

.switch-input{
    max-width: 175px !important;
}

.errorColumn{
    height: 500px;
    /* background: grey; */
}

.car{

}

/* input[type="text"],
input[type="number"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  font-size: 16px !important;
} */

/* .barber_input{
    padding-left:20px;
} */

.date-column__style{
    max-width: 300px;
}

.switch_card{
    background-color: transparent;
}

.switch-column{
    /* padding: 4px; */
    max-width: 185px !important;
}
</style>