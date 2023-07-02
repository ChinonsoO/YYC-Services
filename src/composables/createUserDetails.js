import {ref} from 'vue'
/* eslint-disable */

import {db, getDoc, doc, setDoc, updateProfile} from '@/firebase/init'
import { projectAuth, projectStorage, uploadBytes } from '@/firebase/init'
import {ref as storageRef} from '@/firebase/init'
import { getDownloadURL } from 'firebase/storage';

const isCreateUserPending = ref(false)
const createUserError = ref(null)

const createUser = async (userDetails, imageFile, userId ) => {


    createUserError.value = null

    isCreateUserPending.value = true

    

    try{
        const userRef = doc(db, 'users', userId);

        const docSnapshot = await getDoc(userRef);
        
        if (docSnapshot.exists()) {
            throw new Error("This User Already Exists")
        }

        const filePath = ref(`userAvatar/${userId}${imageFile.name}`)

        const userAvatarRef = storageRef(projectStorage, filePath.value)

        await uploadBytes(userAvatarRef, imageFile,)
        const publicImageUrl = await getDownloadURL(userAvatarRef)

        userDetails.userAvatarSrc = publicImageUrl

        await setDoc(userRef, userDetails)

        await updateProfile(projectAuth.currentUser, {
            photoURL: publicImageUrl,
            displayName: `${userDetails.firstName} ${userDetails.lastName}`
        })

        // Check if userUid exists in localStorage
        let existingData = localStorage.getItem(userId);

        if (existingData) {
           // If userId exists, parse the existing data and merge with new data
           existingData = JSON.parse(existingData);
           localStorage.setItem(userId, JSON.stringify({
               ...existingData,
               createdUserDetails: true,
               isHost: false,
               userAvatarSrc: publicImageUrl
           }));
           } 
           else {
               // If userId doesn't exist, save new data
               localStorage.setItem(userId, JSON.stringify({
                    createdUserDetails: true,
                    isHost: false,
                    userAvatarSrc: publicImageUrl
               }));
           }


        isCreateUserPending.value = false


    }   
    catch (err){
        createUserError.value = err
        console.log(createUserError.value)
        isCreateUserPending.value = false
    }

}

const createUserDetails = () => {
    return {createUser, isCreateUserPending, createUserError}
}

export default createUserDetails