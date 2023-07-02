// Signing up the user through firebase
import {ref} from 'vue'
import {ref as storageRef} from '@/firebase/init'
import { projectAuth, projectStorage } from '@/firebase/init'
import { createUserWithEmailAndPassword, updateProfile } from '@/firebase/init'
import { doc, db, setDoc, deleteUser, signOut, uploadBytes, deleteDoc } from "@/firebase/init"; 
import { getDownloadURL } from 'firebase/storage';



const error = ref(null)
// Is our function pending?

const isPending = ref(false)

const signup = async (email, password, userDetails, imageFile) =>  {
    // This is just in case we previously invoked this function and got and error, we dont't want to show the user the previous error
    error.value = null

    //We start our asynchronous function to sign the user up
    isPending.value = true
    try {
        // storing the response of the createUserWithEmailAndPassword in a res variable
        const res = await createUserWithEmailAndPassword(projectAuth, email, password)   
        
        if (!res){
            throw new Error('Could not complete Signup')
        }

        try{
            const uid = res.user.uid
            const userRef = doc(db, 'users', uid)
            //Add userProfilePic
            const filePath = ref(`userAvatar/${uid}${imageFile.name}`)

            const userAvatarRef = storageRef(projectStorage, filePath.value)

            //eslint-disable-next-line
            const imageRes = await uploadBytes(userAvatarRef, imageFile,)
            const publicImageUrl = await getDownloadURL(userAvatarRef)

            userDetails.userAvatarSrc = publicImageUrl
            await setDoc(userRef, userDetails)
            
            await updateProfile(projectAuth.currentUser, {
                photoURL: publicImageUrl,
                displayName: `${userDetails.firstName} ${userDetails.lastName}`
            })

            // Check if userUid exists in localStorage
            let existingData = localStorage.getItem(uid);

            if (existingData) {
            // If uid exists, parse the existing data and merge with new data
            existingData = JSON.parse(existingData);
            localStorage.setItem(uid, JSON.stringify({
                ...existingData,
                createdUserDetails: true,
                isHost: false,
                userAvatarSrc: publicImageUrl
            }));
            } 
            else {
                // If uid doesn't exist, save new data
                localStorage.setItem(uid, JSON.stringify({
                        createdUserDetails: true,
                        isHost: false,
                        userAvatarSrc: publicImageUrl
                }));
            }


            //Add user Details
            isPending.value = false

        }catch(err){
            console.log(err.message)
            const currentUser = projectAuth.currentUser
                try{
                    const uid = res.user.uid
                    const userRef = doc(db, 'users', uid)
                    await deleteDoc(userRef)
                }catch(err){
                    console.log(err.message)
                }
            await deleteUser(currentUser)
            await signOut(projectAuth)

            error.value = "Could not complete signup, please try again later"
            isPending.value = false
       
        }
    }catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false



    }
}

// This is the function that will return the values we will use in other components
const useSignup = () => {

    return {signup, error, isPending}
}

export default useSignup