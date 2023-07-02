import {ref} from 'vue'

import {db, getDoc, doc} from '@/firebase/init'

const isGetClientBookingsPending = ref(false)
const getClientBookingsError = ref(null)

const getClientBookings = async (hostId) => {
    getClientBookingsError.value = null

    isGetClientBookingsPending.value = true


    try{

        const docRef = doc(db, 'serviceHosts', hostId);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            throw new Error("No Hosts match this criteria please check back later")
        }

        let bookings = docSnapshot.data().bookings || {};
        isGetClientBookingsPending.value = false;
        return bookings;


    }
    catch (err){
        getClientBookingsError.value = err
        console.log(getClientBookingsError.value)
        isGetClientBookingsPending.value = false
    }

}

const getBookingForHost = () => {
    return {getClientBookings, isGetClientBookingsPending, getClientBookingsError}
}

export default getBookingForHost