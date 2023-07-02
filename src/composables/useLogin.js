// Signing up the user through firebase
import {ref} from 'vue'
import { projectAuth } from '@/firebase/init'
import { signInWithEmailAndPassword } from '@/firebase/init'

const error = ref(null)
// Is our function pending?

const isPending = ref(false)

const login = async (email, password) =>  {
    // This is just in case we previously invoked this function and got and error, we dont't want to show the user the previous error
    error.value = null

    //We start our asynchronous function to sign the user up
    isPending.value = true
    try {
        // storing the response of the signInWithEmailAndPassword in a res variable
        const res = await signInWithEmailAndPassword(projectAuth, email, password) 
        
        if (!res){
            throw new Error('Could not complete Login')
        }

        error.value = null
        isPending.value = false
       

    } catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false



    }
}

// This is the function that will return the values we will use in other components
const useLogin = () => {

    return {login, error, isPending}
}

export default useLogin