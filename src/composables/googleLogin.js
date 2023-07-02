import {ref} from 'vue'
import {provider, signInWithRedirect} from '@/firebase/init.js'
// import { signInWithRedirect } from '@/firebase/init.js'
import { projectAuth } from '@/firebase/init'

const googleError = ref(null)
const isPending = ref(false)

const logInWithGoogle = async () =>{

    googleError.value = null
    isPending.value = true


    try{
        // This WILL NOT resolve it is interrupted by the page redirect
        const res = await signInWithRedirect(projectAuth, provider)

    if (!res){
        throw new Error('Could not complete Login')
    }
    
    googleError.value = null
    isPending.value = false
   
    }
    catch (err) {
        console.log(err)
        googleError.value = err.message
        isPending.value = false

    }

    
        
}

const googleLogin = () => {
    return {logInWithGoogle, googleError,}
}

export default googleLogin