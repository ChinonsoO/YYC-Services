import {ref} from 'vue'
/* eslint-disable */

import {db, getDoc, doc, arrayUnion, updateDoc} from '@/firebase/init'

const isBookingPending = ref(false)
const createBookinigError = ref(null)

const createBooking = async (service, selectedDate, selectedTime, hostId, userId, userDislayName ) => {
    createBookinigError.value = null

    isBookingPending.value = true


    try{
        const docRef = doc(db, 'serviceHosts', hostId);
        const docSnapshot = await getDoc(docRef);

       const hostName = docSnapshot.data().hostInformation.name

        const userDocRef = doc(db, 'users', userId);

        if (!docSnapshot.exists()) {
            throw new Error("No Hosts match this criteria please check back later")
        }

        // Define updates
        let updates = {};
        updates[`servicesAndAvailability.notAvailableDates.${selectedDate}`] = arrayUnion(selectedTime);
        updates[`bookings.${userId}`] = arrayUnion({ date: selectedDate, service, time:selectedTime, name: userDislayName });

        // Update document
        await updateDoc(docRef, updates);

        // Define reference to user's document
        

        // Define updates for users document
        let userUpdates = {};
        userUpdates[`appointments.${hostId}`] = arrayUnion({ date: selectedDate, service, time:selectedTime, name: hostName  });


        // Update users document
        await updateDoc(userDocRef, userUpdates);

        isBookingPending.value = false;
    }
    catch (err){
        createBookinigError.value = err
        console.log(createBookinigError.value)
        isBookingPending.value = false
    }

}

const booking = () => {
    return {createBooking, isBookingPending, createBookinigError}
}

export default booking