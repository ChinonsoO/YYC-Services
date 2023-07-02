<template>


    <!-- <div class="banner">
        
    </div> -->
    <v-container class="container mt-16">

        <v-tabs
      v-model="tab"
      background-color="" class="form_container mx-auto mt-5 mb-3 rounded"
        center-active show-arrows>
        <v-tab value="appointments" class="text-purple">Appointments</v-tab>
        <v-tab values="clients" class="text-purple" v-if="props.isUserAHost">Client Bookings</v-tab>
        <v-tab value="Favourites" class="text-purple">Favourites</v-tab>
        <!-- <v-tab value="three">Item Three</v-tab> -->
        <v-tab value="profile" class="text-purple">My Profile</v-tab>

        </v-tabs>

        <div class="title mt-5">
        <!-- <h1 class="text-blue-lighten-4 text-h6 pa-5">Appoinments</h1> -->

        </div>

        <v-window v-model="tab">

        <v-window-item value="appointments">
        
        <div class="text-center loadingBanner" v-if="isGetAppointmentsPending" >
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>

        <div v-else v-for="(hostId, appoinments) in bookedAppointments" :key="hostId" > 
        
        
        <v-card v-for="(appoinment, i ) in bookedAppointments[appoinments]" :key="i" flat class="pa-5 mt-2 dashboard-card bg-white">
            <v-row class="upcoming">
                <v-col cols="12" md="6">
                    <div class="text-caption text-teal-lighten-2">Type</div>
                    <div v-if="appoinment.service == 'barber'" >
                            <v-icon icon="mdi-content-cut" class="pr-3 pl-1" size="x-small"></v-icon>Barber
                        </div>
                        <div v-else-if="appoinment.service == 'hairStyle'">
                            <v-icon icon="mdi-face-shimmer-outline" class="pr-3 pl-1" size="x-small"></v-icon>Hairstyle
                        </div>
                        <div v-else>
                            <v-icon icon="mdi-lipstick" class="pr-3 pl-1" size="x-small"></v-icon>Nailstyle
                        </div>
                </v-col>
                <v-col cols="6"  sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Host</div>
                    <div>{{ appoinment.name }}</div>
                </v-col>
                <v-col cols="6"  sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Date</div>
                    <div class="font-weight-bold">{{convertStringToDate(appoinment.date)}} <span class="font-weight-regular">{{ convert24to12(appoinment.time) }}</span></div>
                </v-col>
                <v-col>
                    <div class="text-caption text-teal-lighten-2">Status</div>
                    <div>Upcoming</div>
                </v-col>
            </v-row>
        </v-card>

    </div>
        <!-- <v-card flat class="pa-5 mt-2 dashboard-card bg-white">
            <v-row class="upcoming">
                <v-col cols="12" md="6">
                    <div class="text-caption text-teal-lighten-2">Type</div>
                    <div><v-icon icon="mdi-content-cut" class="pr-3 pl-1" size="x-small"></v-icon>Barber</div>
                </v-col>
                <v-col cols="6" sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Host</div>
                    <div>John Doe</div>
                </v-col>
                <v-col cols="6"  sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Date</div>
                    <div class="font-weight-bold">July 28th 2022 <span class="font-weight-regular">3:00 Am</span></div>
                </v-col>
                <v-col  sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Status</div>
                    <div>Upcoming</div>
                </v-col>
            </v-row>
        </v-card> -->
        </v-window-item>

        <v-window-item value="clients" >

        <div class="text-center loadingBanner" v-if="isGetClientBookingsPending" >
            <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            ></v-progress-circular>
        </div>

        <div v-else v-for="(clientId, bookings) in bookedClients" :key="clientId">

        
            <v-card v-for="(booking, i ) in bookedClients[bookings]" :key="i" flat class="pa-5 mt-2 dashboard-card bg-white">
                
                <v-row class="upcoming">
                    <v-col cols="12" md="6">
                        <div class="text-caption text-teal-lighten-2">Type</div>
                        
                        <div v-if="booking.service == 'barber'" >
                            <v-icon icon="mdi-content-cut" class="pr-3 pl-1" size="x-small"></v-icon>Barber
                        </div>
                        <div v-else-if="booking.service == 'hairStyle'">
                            <v-icon icon="mdi-face-shimmer-outline" class="pr-3 pl-1" size="x-small"></v-icon>Hairstyle
                        </div>
                        <div v-else>
                            <v-icon icon="mdi-lipstick" class="pr-3 pl-1" size="x-small"></v-icon>Nailstyle
                        </div>

                    </v-col>
                    <v-col cols="6"  sm="4" md="2">
                        <div class="text-caption text-teal-lighten-2">Client</div>
                        <div>{{ booking.name }}</div>
                    </v-col>
                    <v-col cols="6"  sm="4" md="2">
                        <div class="text-caption text-teal-lighten-2">Date</div>
                        <div class="font-weight-bold">{{ convertStringToDate(booking.date) }} <span class="font-weight-regular">{{ convert24to12(booking.time) }}</span></div>
                        <!-- <div class="font-weight-bold">{{ booking.date }} <span class="font-weight-regular">{{ booking.time }}</span></div> -->

                    </v-col>
                    <v-col>
                        <div class="text-caption text-teal-lighten-2">Status</div>
                        <div>Upcoming</div>
                    </v-col>
                </v-row>

                
            </v-card>
    </div>

    <!-- Placeholder code -->
        <!-- <v-card flat class="pa-5 mt-2 dashboard-card bg-white">
            <v-row class="upcoming">
                <v-col cols="12" md="6">
                    <div class="text-caption text-teal-lighten-2">Type</div>
                    <div><v-icon icon="mdi-content-cut" class="pr-3 pl-1" size="x-small"></v-icon>Barber</div>
                </v-col>
                <v-col cols="6" sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Host</div>
                    <div>John Doe</div>
                </v-col>
                <v-col cols="6"  sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Date</div>
                    <div class="font-weight-bold">July 28th 2022 <span class="font-weight-regular">3:00 Am</span></div>
                </v-col>
                <v-col  sm="4" md="2">
                    <div class="text-caption text-teal-lighten-2">Status</div>
                    <div>Upcoming</div>
                </v-col>
            </v-row>
        </v-card> -->
        </v-window-item>

        <v-window-item value="Favourites">
            <div>
                <h2 class="text-blue-grey">COMING SOON ...</h2>
            </div>
        </v-window-item>

        <v-window-item value="profile">
            <v-card>
                <v-row class="py-5 avatarRow"> 
                    <v-col cols="12" class="text-center">
                    <div class="line-through">

                    </div>
                    <v-avatar size="150px">
                        <!-- <v-icon>
                            mdi-account-circle
                        </v-icon> -->
                        <v-img :src="props.userAvatar" cover>

                        </v-img>
                    <!-- <v-img>

                    </v-img> -->
                </v-avatar>
                    </v-col>
                   
                </v-row>
                <v-row class="mt-5">
                    <v-col cols="12">
                        <div class="text-center">
                            <v-card-title class="text-h4 font-weight-bold">
                                {{user.displayName}}
                            </v-card-title>
                            {{extractMonthYearFromUserProfile(user.metadata.creationTime)}}
                        </div>

                    </v-col>
                    <v-col cols="12">
                        <v-row class="pa-5">
                            <v-col class="text-subtitle-2">
                                <div class="text-subtitle-2 subtitle pa-1 text-grey" >
                                    VERIFIED INFO
                                    
                                </div>
                                <div class="text-body-2  pa-1 verified-info">
                                    <span>Email Address</span>
                                    <v-icon end class="text-blue">mdi-checkbox-marked-circle-outline</v-icon>
                                </div>
                                <div class="text-body-2 verified-info pa-1">Phone Number
                                    <v-icon end class="text-blue">mdi-checkbox-marked-circle-outline</v-icon>
                                    </div>
                            </v-col>
                        </v-row>
                        <v-row class="pa-5">
                            <v-col cols="12" class="text-subtitle-2 text-grey subtitle">
                                SERVICES YOU OFFER
                            </v-col>
                            <v-col cols="12" lg="6">

                                <div>
                                    <h2 class="text-blue-grey">COMING SOON ...</h2>
                                </div>
                                <!-- <v-card link>
                                    <v-img src="../assets/hair-stylist.jpg" class="align-end">
                                    <v-card-title  class="font-weight-bold text-white ">
                                        Hairstyling
                                    </v-card-title>
                                    </v-img>
                                    
                                </v-card> -->

                            </v-col>
                        </v-row>
                        <v-row class="pa-5">
                            <v-col cols="12" class="text-subtitle-2 text-grey subtitle">
                                REVIEW'S FROM GUESTS
                            </v-col>
                            <v-col class="text-subtitle-2 text-grey subtitle">
                                COMING SOON ...
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-window-item>
        </v-window>

        
        
    </v-container>
    
    
</template>

<script setup>

/* eslint-disable */
import getUser from '@/composables/getUser';
import {ref, onBeforeMount, computed} from 'vue'
// import {useRouter} from 'vue-router' 
import { defineProps } from 'vue';
import getBookingForHost from '@/composables/getBookingForHost'
import getBookingForUser from '@/composables/getBookingForUser';
// import { useRoute } from 'vue-router';
// const router = useRouter()
// const route = useRoute()

const tab = ref(null)


const {user} = getUser()

const bookedClients = ref(null)
const bookedAppointments = ref(null)


const {getClientBookings, isGetClientBookingsPending, getClientBookingsError} = getBookingForHost()

const {getAppointments, isGetAppointmentsPending, getAppointmentsError} = getBookingForUser()



const getClientDocs = async () => {
    bookedClients.value = await getClientBookings(user.value.uid)
}

const getAppointmentDocs = async () => {
    bookedAppointments.value = await getAppointments(user.value.uid)
    console.log('hmmmm')
}

onBeforeMount(() => {
    getClientDocs()
    getAppointmentDocs()
})


const props = defineProps({
  userAvatar: String,
  isUserAHost: Boolean
})

function extractMonthYearFromUserProfile(dateStr) {
    // Create a Date object from the string
    const date = new Date(dateStr);

    // Extract the month and the year
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Return the month and year
    return `${month} ${year}`
}



const convert24to12 = (timeStr)  => {

    const [hours, minutes, seconds] = timeStr.split(':');

    // Check if hours are greater than 12 (PM)
    if (hours > 12) {
        // Format hours to 12-hour time and prepend '0' if single digit
        return `${hours - 12}:${minutes} PM`;
    }
    else if (hours === '12') {
        // Handle noon (12 PM)
        return `${hours}:${minutes} PM`;
    }
    else if (hours === '00') {
        // Handle midnight (12 AM)
        return `12:${minutes}: AM`;
    }
    else {
        // Format hours to 12-hour time and prepend '0' if single digit
        return `${hours.padStart(2, '0')}:${minutes} AM`;
    }
}

const convertStringToDate = (dateStr) => {
    const [month, day, year] = dateStr.split('-');
    // JavaScript counts months from 0 to 11, January is 0, December is 11
    // Therefore, we subtract 1 from the month to get the correct value
    const dateObj =  new Date(year, month - 1, day);

    return dateObj.toDateString()
}


</script>


<style scoped>

.dashboard-card .upcoming{
    border-left: 4px solid #BBDEFB !important;
}

.dashboard-card{
    /* background-color: #FAFFD8; */
    
}

.banner{
    /* background:blue; */
    background: url('../assets/test-banner.png');
    height: 200px;
    background-size: cover;
    /* max-width: 1000px; */
        /* opacity: 0.6; */
}

.verified-info{
    display: flex;
    justify-content: space-between;
}
.container{
    max-width: 1000px;
    font-family: BasisGrotesque, Avenir, "Helvetica Neue", Helvetica, sans-serif;

    /* min-height: 85vh;   */
}
.avatarRow{
    position: relative;
}
@font-face {
  font-family: BasisGrotesque;
  src: url('../assets/Basis Grotesque.ttf');
}

.test-container{
    /* margin-top:50px; */
    /* position: relative;  */
    /* margin-top: 25%; */

    }

.line-through{
    position: absolute;
    margin: 0 !important;
    padding: 0 !important;
    border-bottom: 1px solid #e6e6e6;
    /* margin-left: -15px !important; */
    margin-top: -15px !important;
    background:red;
    width: 100%;
    /* height: 37%; */
    /* height: 50%; */
    top: 60%;
}

.subtitle{
    font-family: 'Roboto', sans-serif;

}

.title{
    position: relative;
}
</style>