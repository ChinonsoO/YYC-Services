import {ref} from 'vue'
import {query, where, db, collection, doc, onSnapshot} from '@/firebase/init'
// DEPRECATED
const getCollection = (col) => {
    const documents = ref(null)
    const getHosterror = ref(null)

     const filteredHosts = (services, time, day, bookedTimeToDateString) =>{

        const collectionRef = collection(db, col)
         const q = query(docRef, where('servicesAndAvailability.services', 'array-contains-any', services ),
                            where("servicesAndAvailability."+ time  +".available", "==", true),
                            //day is a value from 0-6 with 0 being sunday and 6 being saturday
                            where("servicesAndAvailability."+ time  +".dayAvailability."+ day,"==", true ),)

        const unsub = onSnapshot(q, (querySnapshot) =>{
            let idResults =[]
            let results = []

            querySnapshot.forEach((doc) => {
                if (!(bookedTimeToDateString in doc.data().servicesAndAvailability.notAvailableDates)){
                    idResults.push(doc.id)
                }
                // console.log(doc.id, " => ", doc.data())
            })
        })
    
    }
}



// const unsub = onSnapshot(q, (querySnapshot) =>{
//     const matchingHosts = []
//     if (querySnapshot.empty){
//         throw new Error("No Hosts match this criteria please check back later")
//     }

//     querySnapshot.forEach((doc) => {
//         if (!(bookedTimeToDateString in doc.data().servicesAndAvailability.notAvailableDates)){
//             matchingHosts.push(doc.id)
//         }
//         // console.log(doc.id, " => ", doc.data())
//     })

//     let mathchingHostsRefs = matchingHosts.map(id =>{ 
//         return onSnapshot(doc(db, 'hosts', id), (docs) =>{
//             matchingHostDocs.value.push(docs.data())
//             // console.log(matchingHostDocs)

//             return matchingHostDocs
//         })

// })
// })