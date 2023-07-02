import {ref} from 'vue'
/* eslint-disable */

import {db, getDoc, doc} from '@/firebase/init'

const isGetAppointmentsPending = ref(false)
const getAppointmentsError = ref(null)

const getAppointments = async (userId) => {
    getAppointmentsError.value = null

    isGetAppointmentsPending.value = true


    try{
        const docRef = doc(db, 'users', userId);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
            throw new Error("No Hosts match this criteria please check back later")
        }

        let appointments = docSnapshot.data().appointments || {};
        isGetAppointmentsPending.value = false;
        return appointments;


    }
    catch (err){
        getAppointmentsError.value = err
        console.log(getAppointmentsError.value)
        isGetAppointmentsPending.value = false
    }

}

const getBookingForUser = () => {
    return {getAppointments, isGetAppointmentsPending, getAppointmentsError}
}

export default getBookingForUser