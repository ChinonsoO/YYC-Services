<template>
<nav>
    <v-app-bar flat class="bg-blue-lighten-3 px-5">
        <v-app-bar-title class="text-uppercase text-purple app-bar-title">
            <a href="/">
                <span class = "font-weight-light">YYC</span>
                <span>Services</span>  
            </a>    
        </v-app-bar-title>
         <v-app-bar-nav-icon v-if="!not_mobile" @click.stop="drawer=!drawer" class="ml-auto" ></v-app-bar-nav-icon>

        <template v-if="not_mobile">
        <v-btn variant="text" :to=" loggedInUser ? '/services' : '/login/email' ">
            <!-- <span>Our Services</span> -->
            Our Services
        </v-btn>
       


        



      
        <!-- Menu -->
        <div class="text-center px-3 " v-if="loggedInUser">
            <v-menu >
                <template v-slot:activator="{props}">
                <v-btn flat v-bind="props">
                <v-icon icon="mdi-chevron-down"></v-icon>
                    Menu
                </v-btn>
                
                </template>  
                <v-list>
                    <v-list-item :prepend-icon="item.icon" :value="item.value" v-for ="(item, index) in menu_Items" :key="index" :to="item.to">
                    
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                        
                    </v-list-item>
                    <v-list-item to="/become-a-host" v-if="isUserAHost === false" class="mr-2 Become-Host_Btn mb-4 mt-1">
                        <template v-slot:prepend>
                            <v-icon  color="orange">mdi-star</v-icon>
                        </template>
                        <v-list-title class="font-weight-bold">Become a host!</v-list-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="logout" v-if="loggedInUser" prepend-icon="mdi-logout">
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

        <v-btn class ="" to="/about">
            <span>About Us</span>
        </v-btn>

            <!-- <v-btn flat class=" mx-5" v-if="!loggedInUser" to="/signup">
                <span>Signup</span>
                <v-icon icon="mdi-login" end> </v-icon>
            </v-btn> -->

        <v-btn flat class=" mx-5" to="/login/email" v-if="!loggedInUser">
            <span>Login</span>
            <v-icon icon="mdi-login" end> </v-icon>
        </v-btn>

          

        <v-btn flat class=" mx-5" @click="logout" v-if="loggedInUser">
            <span>Logout</span>
            <v-icon icon="mdi-login" end> </v-icon>
        </v-btn>

        <!-- <v-avatar class="test1">
            <v-icon size="x-large" color="indigo" v-if="!loggedInUser">mdi-account-circle-outline</v-icon>
            <v-img v-else :src=user_Avatar class="user_avatar">
                
            </v-img>
        </v-avatar> -->

        <v-avatar>
            <v-icon size="x-large" color="indigo" v-if="!loggedInUser || getPhotoUrlError ">mdi-account-circle-outline</v-icon>
            <v-img v-else cover :src="user_Avatar" require alt="" class="user_Avatar"></v-img>

        </v-avatar>





        


        </template>

        

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary color="blue-lighten-4">

         <v-list-item v-if ="!showLogin"
          :prepend-avatar="user_Avatar"
          :title="user_Name"
        ></v-list-item>


       <v-divider></v-divider>

        <v-list density="compact"  class="bg-blue-lighten-4">
          <v-list-item  v-for ="(item, index) in mobile_Drawer" :key="index" :prepend-icon="item.icon" :title="item.title" :value="item.value" router :to="item.to"></v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="showLogin"  prepend-icon="mdi-login" class="mt-1" title="Login" to="/login/email" value="Login"></v-list-item>
        <v-list-item v-else  prepend-icon="mdi-login" class="mt-1" title="Logout" @click="logout" value="Logout"></v-list-item>

        </v-list>
    
    </v-navigation-drawer>
    

</nav>
<!-- {{not_mobile}} -->

<div class="loading-overlay" v-if="isRedirectPending">
    <div class="text-center loading-overlay-spinnerContainer" >
                <v-progress-circular
                :size="75"
                color="primary"
                indeterminate
                ></v-progress-circular>
    </div>
</div>
    
</template>

<script setup > 
// To use the setup tag and define our variables we first need to import 'ref' then to creat a new data property we wrap the value of the variable in the ref function
import { ref} from 'vue'
import { useDisplay } from 'vuetify'
import { computed } from "vue"
import { useRouter } from 'vue-router';
// import {auth, provider,  signOut, onAuthStateChanged, signInWithRedirect} from '../firebase/init.js'
import { projectAuth, signOut, onAuthStateChanged, getRedirectResult } from '@/firebase/init'; 
import {db, doc, getDoc} from '@/firebase/init'

import getPhotoUrl from '@/composables/getPhotoUrl'

// eslint-disable-next-line
const {getUrl, isGetPhotoUrlPending, getPhotoUrlError} = getPhotoUrl()

const router = useRouter()
const drawer = ref(false)
const showLogin = ref(true)
const {name} = useDisplay()
const user_Name = ref(null)
const user_Avatar = ref("")
const loggedInUser = ref(false)
const isUserAHost = ref(false)

const menu_Items = [
    { title: 'My Dashboard',  icon:"mdi-view-dashboard", value:"My Dashboard", to:"/Dashboard"},
    { title: 'View Services',  value:"Barber", icon:"mdi-content-cut", to:"/services" },
    // { title: 'Hairstylists',  value:"Hairstylists" ,  icon:"mdi-face-shimmer-outline",},
    // { title: 'Nailstylists',  value:"Nailstylists" ,  icon:"mdi-lipstick",},
]

const mobile_Drawer = [
    { title: 'My Dashboard',  icon:"mdi-view-dashboard", value:"Home",}, 
    // { title: 'Our Services',  icon:"mdi-nature-people", value:"Our Services", to:""},
    { title: 'View Services',  value:"Barber", icon:"mdi-content-cut", to:"/Services"},
    // { title: 'Hairstylists',  value:"Hairstylists" ,  icon:"mdi-face-shimmer-outline",},
    // { title: 'Nailstylists',  value:"Nailstylists" ,  icon:"mdi-lipstick",},
    { title: 'About Us',  icon:"mdi-forum", value:"About", to:"/about"},
    // { title: 'My Dashboard',  icon:"mdi-view-dashboard", value:"My Dashboard"},


]



//The below line of code checks to see whether we are on a mobile or desktop then returns true if we are not 
//and false if we are. This done using vuetify's breakpoints, and the computed property.
//Refers to this link: https://next.vuetifyjs.com/en/features/display-and-platform/
const not_mobile = computed( () =>{
     switch (name.value) {
          case 'xs':
          return false
          case 'sm': return false
          case 'md': 
          return true
          case 'lg': return true
          case 'xl': return true
          case 'xxl': return true
          default: return false
        }
})





onAuthStateChanged(projectAuth, async (user) =>{
        if (user){
            try{
                // router.push('/')
                loggedInUser.value = true
                
                const userData = JSON.parse(localStorage.getItem(user.uid))
                
                if (userData){
                    
                    isUserAHost.value = userData['isHost']

                    if (userData['userAvatarSrc']){
                            user_Avatar.value = userData['userAvatarSrc']
                    }
                    else{
                        user_Avatar.value = await getUrl(user.uid)
                    }
                    
                }
                else{
                    user_Avatar.value = await getUrl(user.uid)


                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef); 
                    isUserAHost.value = docSnapshot.data().isHost



                }

            }
            catch(err){
                console.log(err)
            }
        }
        else{
            loggedInUser.value = false
            showLogin.value = true
            router.push('/')
        }
    })


const isRedirectPending = ref(false) 

getRedirectResult(projectAuth)

.then( async (res) => {
    if (res){
        isRedirectPending.value = true
        const user = res.user

        if (user){

            const userData = JSON.parse(localStorage.getItem(user.uid))
            if (userData){
                isUserAHost.value = userData['isHost']
                if (userData['createdUserDetails'] === true){
                    router.push('/')
                    isRedirectPending.value = false
                }
                else{
                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef); 

                    if (docSnapshot.exists()) {
                        router.push('/')
                        isRedirectPending.value = false
                    }
                    else{
                        router.push('/signup/user-details')
                        isRedirectPending.value = false

                    }
                }
            }
            else{
                const userRef = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userRef); 

                if (docSnapshot.exists()) {
                    router.push('/')
                    isRedirectPending.value = false
                }
                else{
                    router.push('/signup/user-details')
                    isRedirectPending.value = false

                }
            }

           
        }
     
    }

        
})

const logout = async () => {

    try{
        await signOut(projectAuth)
        // window.location.href = '/'
        router.push('/')
        //Figure out a better way than reoloading the page  
        // window.location.reload()

    }

    catch(err){
        console.log(err)
    }
}

</script>

<style scoped>

/* .app-bar-title{
    max-width: 500px;
} */

.Become-Host_Btn{
    border: 1px solid black;
    border-left: none;
}

.loading-overlay{
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    position: fixed;
    background-color: white;
}

.loading-overlay-spinnerContainer{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user_Avatar{
    /* width: 50px;
    height: 50px; */
    /* margin-top: 5px; */
    height: 100%;
    width: 100%;
}

a{
    text-decoration: none;
    color: inherit;
}


</style>