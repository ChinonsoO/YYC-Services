import {ref} from 'vue'
//eslint-disable-next-line
import {query, where, db, collection, getDocs, getDoc, doc, onSnapshot} from '@/firebase/init'
// import { onSnapshot } from 'firebase/firestore'



const isPending = ref(false)
const getHostError = ref(null)
/* eslint-disable */
const filteredHosts = async (services, time, day, bookedTimeToDateString) =>{

  
    getHostError.value = null


    isPending.value = true
    // console.log(isPending.value)

    try {
        if (services.length == 0){
            throw new Error("Please select a service.")
        }
    }catch(err){
        console.log(err)
        getHostError.value = err
        isPending.value = false
    }
    
    //Gets the host documents that match the given service and availability
    const docRef = collection(db, 'serviceHosts')
    const q = query(docRef, where('servicesAndAvailability.services', 'array-contains-any', services ),
                            where("servicesAndAvailability."+ time  +".available", "==", true),
                            //day is a value from 0-6 with 0 being sunday and 6 being saturday
                            where("servicesAndAvailability."+ time  +".dayAvailability."+ day,"==", true ),)

    

    try{
        const querySnapshot = await getDocs(q)
        if (!q){
            throw new Error("No Hosts fit this criteria please try again later")
        }       

        const matchingHosts = []
        let matchingHostDocs = null

        console.log(querySnapshot)
        if (querySnapshot.empty){
            throw new Error("No Hosts match this criteria please check back later")
        }
        
        querySnapshot.forEach((doc) => {
            //Checks to make sure someones eles hasn't already booked this time slot

           const bookedDates = doc.data().servicesAndAvailability.notAvailableDates

            if (bookedTimeToDateString in bookedDates){
               if (!(bookedDates[bookedTimeToDateString].includes(time))){
                    
                const obj = {
                    ...doc.data().hostInformation,
                    id: doc.id,
                    services: doc.data().servicesAndAvailability.services
                }
            
                    matchingHosts.push(obj)
               }
            }

            else{
                const obj = {
                    ...doc.data().hostInformation,
                    id: doc.id,
                    services: doc.data().servicesAndAvailability.services
                }
            
                    matchingHosts.push(obj)
               }
            })
            
        
        // <--- OLD CODE BELLOW --> 
        //     console.log(matchingHosts)

        //     let mathchingHostsRefs = matchingHosts.map(id =>{ 
        //         return getDoc(doc(db, 'hosts', id))
        
        // })

        //     await Promise.all(mathchingHostsRefs)
        //     .then(docs => {
        //         let matchingHostDocuments = docs.map(doc => doc.data())
        //         matchingHostDocs = matchingHostDocuments
        //         //The case where a host document has not been created for a host, ideally we would like to remove this documnt from this array
        //         //and not crash our application entirely.
        //         if (matchingHostDocs.includes(undefined)) {
        //             throw new Error ("Could not fetch hosts please try again later")
        //         }
        //         return matchingHostDocs
            
        //     })


    isPending.value = false
    return matchingHosts

    }catch(err){
        console.log(err)
        getHostError.value = err
        isPending.value = false
    }
    
}



const getHost = () =>{
    return {filteredHosts, getHostError, isPending}
}


// const getAllHostsPending = ref(false)
// const getAllHostError = ref(null)

// const getAllHosts = (searchTime, searchDay, bookedTimeToDateString) => {
//     getAllHostError.value = null

//     getAllHostsPending.value = true

//     const docRef = collection(db, 'serviceHosts')
        
// }

export default getHost
