import {ref} from 'vue'
//eslint-disable-next-line
import {query, where, db, collection, getDocs, getDoc, doc, onSnapshot} from '@/firebase/init'
// import { onSnapshot } from 'firebase/firestore'



const isPending = ref(false)
const getHostInfoError = ref(null)
/* eslint-disable */
const hostInfo = async (hostId) =>{

  
    getHostInfoError.value = null


    isPending.value = true
    
    //Gets the documnet name that matches the host ID

    try{


        const docRef = doc(db, 'serviceHosts', hostId);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            throw new Error("No Hosts match this criteria please check back later")
        }

        // Extract the host data from the document snapshot
        const hostData = docSnapshot.data();

        const userDocRef = doc(db, 'users', hostId)
        const userDocSnapshot = await getDoc(userDocRef)

        if (!userDocSnapshot.exists()) {
            throw new Error("No Hosts match this criteria please check back later")
        }
        
        const hostAvatarSrc = userDocSnapshot.data().userAvatarSrc

    isPending.value = false
    return {
        ...hostData,
        hostAvatarSrc: hostAvatarSrc
    }

    }catch(err){
        console.log(err)
        getHostError.value = err
        isPending.value = false
    }
    
}



const getHostInfo = () =>{
    return {hostInfo, getHostInfoError, isPending}
}



export default getHostInfo
