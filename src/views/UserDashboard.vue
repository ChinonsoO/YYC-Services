<template>
  <div class="background-image">
 

</div> 
<Dashboard :userAvatar="userAvatar" :isUserAHost="isUserAHost"/>
  <!-- <HelloWorld /> -->
  <!-- <h1>Homepage</h1> -->
  
</template>

<script>
import { defineComponent } from 'vue';

// Components
// import HelloWorld from '../components/HelloWorld.vue';
import Dashboard from '@/components/LoginDashboard.vue';

export default defineComponent({
    name:"DashboardView",

     components: {
      Dashboard
    // HelloWorld,
    ,}
});
</script>

<script setup>
import { projectAuth, onAuthStateChanged, } from '@/firebase/init'
import {ref} from 'vue'
import {db, doc, getDoc} from '@/firebase/init'


const userAvatar = ref('sdds')
const isUserAHost = ref(false)

onAuthStateChanged(projectAuth, async (user) =>{
        if (user){
            try{
                // router.push('/')
                userAvatar.value = user.photoURL
                const userData = JSON.parse(localStorage.getItem(user.uid))

                if (userData){
                    
                    isUserAHost.value = userData['isHost']                                   
                }
                else{
                
                    const userRef = doc(db, 'users', user.uid);
                    const docSnapshot = await getDoc(userRef); 
                      isUserAHost.value = docSnapshot.data().isHost

                }

            }
            catch(err){
                console.log(err)
            }        
          }
    })

</script>

<style scoped>
.background-image{
  position: fixed;

  /* position: absolute; */
  background: url('../assets/backimageYYCservices (1).png');
  /* background: url('../assets/triangles (1).svg');     */
  /* background-size: cover; */
  width: 100vw;
  height: 100vh !important;
  /* margin-top:50%; */
  /* overflow-y: hidden !important; */
  opacity: 0.6;
  background-size: cover;
  /* background-repeat: no-repeat; */
}



</style>