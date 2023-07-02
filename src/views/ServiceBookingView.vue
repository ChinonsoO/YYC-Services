<template>
  <!-- Hello BABY {{route.params.id}} -->
  <!-- <img src= "@/assets/hostPlaceholder.jpg" alt=""> -->
  <v-container fluid class="Banner mx-0 pa-0">
    <div class="padding">

    </div>
    <div class="bannerImage">
        <v-carousel hide-delimiters class="imagetest" :height="carouselHeight">

            <v-carousel-item v-if="!isPending && hostDoc && hostDoc.hostInformation">

               
                <v-img cover eager class="bannerImage" :height="carouselHeight" aspect-ratio="1.7778" :src="hostDoc.hostInformation.primaryHostImageUrl">

                </v-img>
            </v-carousel-item>

            <v-carousel-item v-else>
            <div class="text-center loadingBanner" >
                <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                ></v-progress-circular>
            </div>
            </v-carousel-item>

                <!-- <v-carousel-item eager 
                v-for="(item,i) in items"
                :key="i"
                >
                <v-img  :src="require(`../assets/${item.src}`)" aspect-ratio="1.7778" cover eager class="bannerImage">
                    
                </v-img>
                
                </v-carousel-item> -->

                <v-carousel-item eager 
                    v-for="(pair) in carouselImages"
                    :key="pair[0]" 
                    >
                    <v-img  :src="pair[1][0]" aspect-ratio="1.7778" cover eager class="bannerImage">
                        
                    </v-img>
                
                </v-carousel-item>
        </v-carousel>
    </div>
        
    
  </v-container>

  <v-container class="mt-5 overviewContainer">
    <v-row>
        <v-col cols="12" order-sm="1" order-md="1">
            <div class="text-h4 font-weight-bold">{{ route.params.name }}</div>
        </v-col>
        <v-col cols="12" md="8" order-sm="3" order-md="3">
            <v-row>
                <v-col cols="12">
                    <v-avatar size="80px" class="mt-5">
                        <div v-if="!isPending && hostDoc && hostDoc.hostAvatarSrc">
                            <img class="host_Avatar" :src="hostDoc.hostAvatarSrc" cover>
                        </div>
                    </v-avatar>
                </v-col>
                <v-col cols="12" class="mt-3">
                    <div class="font-weight-bold subtitle">
                         Description
                    </div>
                    <v-tabs v-model="selectedServiceTab" class="">
                        <v-tab class="" value="barber">Haircuts</v-tab>
                        <v-tab value="nailStylist">Nails </v-tab>
                        <v-tab value="hairStylist">Hair</v-tab>
                        <v-tab value="aboutMe">About Me</v-tab>
                        
                    </v-tabs>

                    
                    <div class="Details-textDescription" >
                        <v-window v-model ="selectedServiceTab" >
                            <!-- <v-window-item v-for="(doc, i) in descriptions" :key="i" :value="doc.value">

                            <div ref="checkContainerOverflow" class="Details-textDescription__DescriptionWrapper my-5" :class="hideText && [overflowHidden, hideTextWrapper]">
                            <div v-if="hideText" class="TextFadeOut">
                                
                            </div>
                            <p>
                                {{doc.description}}
                            </p>
                            
                            </div>
                        </v-window-item> -->
                        <v-window-item value="barber" eager >

                            <div ref="checkContainerOverflow" class="Details-textDescription__DescriptionWrapper my-5" :class="hideText && [overflowHidden, hideTextWrapper]">
                            <div v-if="hideText" class="TextFadeOut">
                                
                            </div>
                            <p>
                                {{barberDescription}} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem nulla voluptatum fugit unde accusamus nihil recusandae, maxime provident aliquam mollitia consectetur. Error corrupti fugit quo accusantium veniam. Natus odio facilis similique quos delectus quia expedita minus perspiciatis non, iure soluta rerum recusandae sunt dignissimos illum sint, laborum magnam ullam dolorem minima! Pariatur quae, amet voluptatum cupiditate cumque voluptatibus quo ipsam. Velit, quam possimus iusto facere reprehenderit praesentium consequatur voluptate quia rerum deleniti sequi in impedit, culpa voluptatibus ab. Quia at praesentium molestias? Quis quam minus ipsam rerum, molestiae in tempora, itaque ex cum corporis aspernatur quos fuga unde consequuntur temporibus.
                            </p>
                            
                            </div>
                        </v-window-item>
                        <v-window-item value="nailStylist" eager>
                            <div ref="checkContainerOverflow__Nailstyle" class="Details-textDescription__DescriptionWrapper my-5" :class="hideText && [overflowHidden, hideTextWrapper]">
                        <div v-if="hideText" class="TextFadeOut">
                            
                        </div>
                        <p>
                            {{nailStyleDescription}}
                        </p>
                        
                        </div>

                        </v-window-item>
                        <v-window-item value="aboutMe" eager>
                            <div ref="checkContainerOverflow__Nailstyle" class="Details-textDescription__DescriptionWrapper my-5" :class="hideText && [overflowHidden, hideTextWrapper]">
                        <div v-if="hideText" class="TextFadeOut">
                            
                        </div>
                        <p v-if="!isPending && hostDoc && hostDoc.hostInformation">
                            {{hostDoc.hostInformation.aboutMe}}
                        </p>
                        
                        </div>

                        </v-window-item>
                        </v-window>
                        
                        <div>
                        <v-btn variant="outlined"  class="rounded-0" @click="hideText = !hideText">
                            More
                        </v-btn>
                        </div>
                        
                    </div>

                    <!--     -->

                </v-col>
            </v-row>
            <div class="font-weight-bold mt-5 subtitle">Photos</div>
            <v-row>
                <v-col>
                    <v-tabs v-model="selectedServicePhoto">
                        <v-tab value="barber" v-if="route.params.services.includes('barber')">
                            Haircuts
                        </v-tab>
                        <v-tab value = "nailStylist" v-if="route.params.services.includes('nailStylist')">
                            Nails
                        </v-tab>
                        <v-tab value ="hairStylist" v-if="route.params.services.includes('hairStylist')">
                            Hair
                        </v-tab>
                    </v-tabs>
                    <v-window v-model ="selectedServicePhoto">
                        <template v-if="!isPending && hostDoc && hostDoc.hostInformation">

                        
                        <v-window-item value="barber">
                            <v-row>
                                <v-col
                                v-for="i in hostDoc.hostInformation.HostImages.barberImages"
                                :key="i"
                                cols="6"
                                md="4"
                                >
                                <v-img
                                    :src="i"
                                    aspect-ratio="1"
                                ></v-img>
                                </v-col>
                            </v-row>
                        </v-window-item>
                        <v-window-item value="nailStylist">
                            <v-row>
                                <v-col
                                v-for="i in hostDoc.hostInformation.HostImages.nailStyleImages"
                                :key="i"
                                cols="6"
                                md="4"
                                >
                                <v-img
                                    :src="i"
                                    aspect-ratio="1"
                                ></v-img>
                                </v-col>
                            </v-row>
                        </v-window-item>
                        <v-window-item value="hairStylist">
                            <v-row>
                                <v-col
                                v-for="i in hostDoc.hostInformation.HostImages.hairStyleImages"
                                :key="i"
                                cols="6"
                                md="4"
                                >
                                <v-img
                                    :src="i"
                                    aspect-ratio="1"
                                ></v-img>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </template>
                    <div class="text-center loadingBanner" v-else >
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                                ></v-progress-circular>
                        </div>
                    
                    </v-window>

                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="4" order-sm="2" order-md="3">
            <v-row>
                <v-col cols="12">
                     <div class=" font-weight-bold pb-3 subtitle">
                    Appointment Time
                    </div>
                    <n-date-picker v-model:value="selectedDate" :is-date-disabled="onlyAllowFutureDate" type="date" />
                </v-col>
                <v-col cols="12">
                   
                    <n-time-picker use-12-hours v-model:value="selectedTime" :input-readonly="false"
                     default-formatted-value="HH:mm:ss" :hours="[7,8,9,10,11,12,13,14,15,16,17,18,19,]" :minutes="30" :seconds="[0]"/>
                </v-col>
                <v-col cols="12">
                    <div class="font-weight-bold pb-3 subtitle">
                        Location
                    </div>
                    <div>
                        <v-card flat variant="outlined" class="pa-2">
                        {{route.params.location}}
                        </v-card>
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-card flat class="pa-2 pl-0">
                        <v-card-title>
                            Services
                        </v-card-title>



                        <v-chip
                            class="ma-2"
                            color="primary"
                            v-if="route.params.services.includes('barber')"
                            >
                            Barber   
                            </v-chip>

                            <v-chip
                            class="ma-2"
                            color="primary"
                            v-if="route.params.services.includes('hairStylist')">
                            HairStylist
                            </v-chip>

                            <v-chip
                            class="ma-2"
                            color="primary"
                            v-if="route.params.services.includes('nailStylist')">
                            Nailstylist
                            </v-chip>
                    </v-card>
                    <!-- <div class="serviceMenu">
                  <v-menu>  
                    <template v-slot:activator="{props}">
                    <v-btn flat v-bind="props" variant="outlined">
                    <div class="serviceMenu__Button">
                        <span class="pr-1" >Services</span>
                    <v-icon icon="mdi-chevron-down"></v-icon>
                    </div>
                        
                    </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            v-sw
                        </v-list-item>
                    </v-list>  
                  </v-menu>
                    </div> -->
                </v-col>
                
            </v-row>

        </v-col>
    </v-row>
  </v-container>

  <v-toolbar class="fixed-toolbar" >
    <v-spacer ></v-spacer>
    <!-- <v-btn color="primary" >
        <v-toolbar-title>Book Now</v-toolbar-title>
    </v-btn> -->
    <v-menu>
        <template v-slot:activator="{props}">
            <v-icon v-bind="props" icon="mdi-chevron-up" class="mr-3"></v-icon>
        </template>
        <v-list>

            <v-list-item > 
                <v-list-item-title class="font-weight-bold">
                    Select a service
                </v-list-item-title>
            </v-list-item>

            <v-radio-group v-model="selectedServiceToBook">
            <v-list-item v-if="route.params.services.includes('barber')">
                <v-radio label="Barber" value="barber"></v-radio>
                </v-list-item>

                <v-list-item v-if="route.params.services.includes('hairStylist')">
                    <v-radio label="HairStyle" value="hairStylist"></v-radio>
                </v-list-item>

                <v-list-item v-if="route.params.services.includes('nailStylist')">
                    <v-radio label="NailStyle" value="nailStylist"></v-radio>
                </v-list-item>
            </v-radio-group>

        </v-list>
    </v-menu>
    <div>
        <v-btn color="primary" @click="bookUser" v-if="!createBookingError" border :disabled="selectedServiceToBook == null" :loading="isBookingPending"  >
        BOOK NOW
        </v-btn>
        <v-btn color="red"  v-else :disabled="selectedServiceToBook == null" :loading="isBookingPending"  >
            Error Please Try again later
        </v-btn>
    </div>
    
<!--     
    <v-toolbar-title class="pl-3 font-weight-bold" color="black " v-else>
        This is your host page
    </v-toolbar-title> -->
  </v-toolbar>

</template>



<script setup>
/*eslint-disable*/
import {ref,computed, onMounted, watch, watchEffect} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { NTimePicker, NDatePicker,} from 'naive-ui'
import getUser from '@/composables/getUser'
import getHostInfo from '@/composables/getHostInfo'
import booking from '@/composables/createBooking'





const isMounted = ref(false)

const selectedServicePhoto = ref(null)

const selectedServiceTab = ref(['barber'])

const isDescriptionTextOverflown = ref(false)

const barberDescriptionOverflow = ref(false)
const nailStyleDescriptionOverflow = ref(false)




const {hostInfo, getHostInfoError, isPending} = getHostInfo()



 const isOverflown = (ref) =>{
        // const test = ref.value.scrollHeight > ref.value.clientHeight || ref.value.scrollWidth > ref.value.clientWidth

     
            barberDescriptionOverflow.value = checkContainerOverflow.value.scrollHeight > checkContainerOverflow.value.clientHeight || checkContainerOverflow.value.scrollWidth > checkContainerOverflow.value.clientWidth
            nailStyleDescriptionOverflow.value = checkContainerOverflow__Nailstyle.value.scrollHeight > checkContainerOverflow__Nailstyle.value.clientHeight || checkContainerOverflow__Nailstyle.value.scrollWidth > checkContainerOverflow__Nailstyle.value.clientWidth


            // console.log(ref.value.scrollHeight)

        }


// watch(selectedServiceTab, () =>{
//     isOverflown()
//     barberDescriptionOverflow.value = checkContainerOverflow.value.scrollHeight > checkContainerOverflow.value.clientHeight || checkContainerOverflow.value.scrollWidth > checkContainerOverflow.value.clientWidth
//     nailStyleDescriptionOverflow.value = checkContainerOverflow__Nailstyle.value.scrollHeight > checkContainerOverflow__Nailstyle.value.clientHeight || checkContainerOverflow__Nailstyle.value.scrollWidth > checkContainerOverflow__Nailstyle.value.clientWidth

//     console.log(barberDescriptionOverflow.value, nailStyleDescriptionOverflow.value)

//     if (selectedServiceTab.value = 'barber'){
//             console.log('gsdg')
//         isDescriptionTextOverflown.value = barberDescriptionOverflow.value

//     }
//     else if(selectedServiceTab.value = 'nailStylist'){
//         console.log('sdfsdf')
//         isDescriptionTextOverflown.value = nailStyleDescriptionOverflow.value
//     }
// })


//GetHostDocument

const route = useRoute();
const router = useRouter()

const hostDoc = ref(null)
const hostAvatar = ref(null)

const getHostDetails = async () => {
    hostDoc.value = await hostInfo(route.params.id)
    console.log(hostDoc.value)

    //Idea to use locastorage to store hosts data, but can't figure out what to do when hosts update their data
    //how do we change the storage to reflect that? Make some kind of watcher on our database?
    //    const visitedHosts = JSON.parse(localStorage.getItem('visitedHosts'))

    //    if (visitedHosts){

    //    }
    //    else{

    //     hostDoc.value = await hostInfo(route.params.id)

    //     const hostId = route.params.id

    //     const visitedHostsObj = {
    //         hostId: hostDoc.value
    //     }

    //     localStorage.setItem('visitedHosts', JSON.stringify(visitedHostsObj)); 
    //    }


}

onMounted( () =>{
 isMounted.value = true
 getHostDetails()

})


const {user} = getUser()

const userIsOwnerOfPage = computed( () => {
    if (user.value.uid == route.params.id){
        return true
    }
    return false
})



// Function to create a booking

const {createBooking, isBookingPending, createBookingError} = booking()

const selectedServiceToBook = ref(null)

const selectedDate = ref(parseInt(route.params.selectedDate))

const selectedTime = ref(parseInt(route.params.selectedTime))

const bookUser = async () => {

    let searchDate = new Date(selectedDate.value).toLocaleDateString()
    searchDate = searchDate.replaceAll('/', '-')
    // searchDate.splice(4,4)
    // searchDate = searchDate.join(' ')
    //Logs in the format Wed, 17 Aug 2022

    const searchTime = new Date(selectedTime.value).toTimeString().split(' ')[0]

    await createBooking(selectedServiceToBook.value, searchDate, searchTime, route.params.id, user.value.uid, user.value.displayName )

    router.push('/Dashboard')


}




const barberDescription = ref("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem nulla voluptatum fugit unde accusamus nihil recusandae, maxime provident aliquam mollitia consectetur. Error corrupti fugit quo accusantium veniam. Natus odio facilis similique quos delectus quia expedita minus perspiciatis non, iure soluta rerum recusandae sunt dignissimos illum sint, laborum magnam ullam dolorem minima! Pariatur quae, amet voluptatum cupiditate cumque voluptatibus quo ipsam. Velit, quam possimus iusto facere reprehenderit praesentium consequatur voluptate quia rerum deleniti sequi in impedit, culpa voluptatibus ab. Quia at praesentium molestias? Quis quam minus ipsam rerum, molestiae in tempora, itaque ex cum corporis aspernatur quos fuga unde consequuntur temporibus.")
const nailStyleDescription = ref("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus cupiditate et cum quam amet architecto tempora, nam ex repudiandae inventore!")
const hairStyleDescription = ref('')    

// Returns true if the element with the ref checkContainerOverflow is overflown
// const isOverflown = computed(() =>{
//     if (isMounted.value){
//         if (selectedServiceTab.value == 'barber'){
//             console.log(selectedServiceTab.value)
//             const test = checkContainerOverflow.value.scrollHeight > checkContainerOverflow.value.clientHeight || checkContainerOverflow.value.scrollWidth > checkContainerOverflow.value.clientWidth
//             console.log(test, "Mounted", checkContainerOverflow.value.scrollHeight)
//             return checkContainerOverflow.value.scrollHeight > checkContainerOverflow.value.clientHeight || checkContainerOverflow.value.scrollWidth > checkContainerOverflow.value.clientWidth
//         }
//         else if (selectedServiceTab.value == 'nailStylist'){
//             console.log(selectedServiceTab.value)
//             const test = checkContainerOverflow__Nailstyle.value.scrollHeight > checkContainerOverflow__Nailstyle.value.clientHeight || checkContainerOverflow__Nailstyle.value.scrollWidth > checkContainerOverflow__Nailstyle.value.clientWidth
//             console.log(test, "Mounted", checkContainerOverflow__Nailstyle.value.scrollHeight)
//             return checkContainerOverflow__Nailstyle.value.scrollHeight > checkContainerOverflow__Nailstyle.value.clientHeight || checkContainerOverflow__Nailstyle.value.scrollWidth > checkContainerOverflow.value.clientWidth
//         }
//     }
//     else{
//         return
//     }
    
// })




const checkContainerOverflow = ref(null)
const checkContainerOverflow__Nailstyle = ref(null)
const checkContainerOverflow__HairStyle = ref(null)


const descriptions = ref([
    {
        value:'barber',
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, sapiente. Iure et cum nostrum reprehenderit repellendus, aspernatur autem, quidem amet dicta porro ipsam beatae, perspiciatis reiciendis temporibus accusantium in vitae quae itaque laborum dolorum. Totam ipsa harum iste labore ex qui ut et exercitationem! Quod laborum perferendis ducimus error suscipit voluptates esse modi quae nemo unde fugit temporibus, eveniet est eos dolorem tempora nostrum, doloremque reprehenderit blanditiis numquam optio eaque earum magni. Consectetur placeat impedit doloremque dolorem. Ipsam ratione voluptatum soluta nostrum eligendi harum veritatis totam tempora dignissimos aliquam dicta, beatae eaque possimus et autem laborum, corporis, fuga unde culpa.",
        ref: 'checkContainerOverflow'
    },
    {
        value: 'nailStylist',
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus cupiditate et cum quam amet architecto tempora, nam ex repudiandae inventore!",
        ref: "test1"

    }
])

const { name } = useDisplay()



const carouselHeight = computed(() => {
// name is reactive and
// must use .value
    switch (name.value) { 
        case 'xs': return '250'
        case 'sm': return '250'
        case 'md': return '400'
        case 'lg': return '600'
        case 'xl': return '700'
        case 'xxl': return '700'
        default: 'auto'
    }

})


// Filters the hostDocument for serviceImages that are not the primary service image. 
const carouselImages = computed( () => {
    if (!hostDoc.value || !hostDoc.value.hostInformation) {
            return [];
        }
    // [[keyName, value ], [keyName, value ]]
    const carouselImages =  Object.entries(hostDoc.value.hostInformation.HostImages).filter(([keyName, value]) => {
            return  value.length > 0 && !keyName.includes(hostDoc.value.hostInformation.primaryService);
    });

    return carouselImages
})




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

const test = () =>{
    console.log('hdfms')
}


const hideText = ref(true)
const overflowHidden = 'overflow-hidden'
const hideTextWrapper = 'hideText-Wrapper'

const loading = ref(false)



const docs = ref(null)

//One day in milliseconds
const d = 864e5;

const selectedServices = ref(["barber"])



const items = ref([
            {
            src: 'IMG_0526.jpg',
          },
          {
            src:'hostPlaceholder.jpg'
          },
          {
            src:'cool-background (3).png'
          },
          {
            src:'IMG_0614.jpg'
          }

        ])

</script>

<style scoped>

.fixed-toolbar{
    position: fixed;
    bottom: 0;
    z-index: 2; 
    /* bottom: 0; */
    /* bottom: 0%; */
}

.bannerImage button{
    background-color: black !important;
}

.bannerImage i{
    color: white;
}



.overviewContainer{
    max-width: 1024px;
}

.Banner{
   position: relative !important;
}
.padding{
    background-image: linear-gradient(to bottom, rgba(35, 31, 32, 0.4), rgba(12, 0, 51, 0));
    display: block;
    height: 30%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
}

.bannerImage{
    /* max-height: 700px; */
    /* height: 700px; */
}

.subtitle{
    /* font-size: 12px; */
    /* font-weight: 900; */
}


.host_Avatar{
     height: 100%;
        width: 100%;
}   

.serviceMenu button{
    width: 100% !important;
    display: flex !important;
    justify-content: start !important;
}

.serviceMenu__Button{
    width: 100%;
    display: flex;
    justify-content: start;

}

.TextFadeOut{
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    margin: 0px;
    height: 4em;
    background: linear-gradient(0deg, #FAFFD8, rgba(255, 255, 255, 0));
}

.loadingBanner{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hideText-Wrapper{
    max-height: 130px;
}

.Details-textDescription__DescriptionWrapper{
    position: relative;

}

.Details-textDescription{
    position: relative;
}


@media only screen and (max-width: 1200px){



}

</style>