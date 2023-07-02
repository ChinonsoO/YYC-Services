
/* eslint-disable */

import {ref} from 'vue'
import { doc, db, setDoc, updateDoc } from "@/firebase/init"; 


const createHostAvailability = (collection) =>{
    const batchWriteError = ref(null)


    const batchWrite = async (hostUid, services, notAvailableDates, hostInfo) =>{
        batchWriteError.value = null

        try{
           

            //Time is 7:00 Am for this 
            const firstTimeSlot = ref(1659445200000)

            const firstTimeDateObj = new Date(firstTimeSlot.value)

            const timeToString = new Date(firstTimeSlot.value).toTimeString().split(' ')[0]

            // console.log(collection, hostUid)

            // console.log(firstTimeDateObj)
            
            console.log(timeToString)

            // console.log(new Date(1659574800000).toTimeString().split(' ')[0])

            const addTime = function addMinutes(date, minutes) {
                return new Date(date.getTime() + minutes*60000);
            }

            // console.log(addTime(firstTimeDateObj, 30))

            let timeSlotsArray = [timeToString]

            let timeSlotsArrayObj = [firstTimeDateObj]



            while (timeSlotsArray[timeSlotsArray.length - 1] != '21:00:00'){

                let newDateObj = addTime(timeSlotsArrayObj[timeSlotsArrayObj.length -1 ], 30)

                timeSlotsArrayObj.push(newDateObj)
                timeSlotsArray.push(newDateObj.toTimeString().split(' ')[0])
                // newDateObj = timeSlotsArrayObj[timeSlotsArrayObj.length - 1]

            }

            // console.log(timeSlotsArray)

            const availabilityData = Object.fromEntries(
                timeSlotsArray.map(time => [time, {
                    available: true,
                    dayAvailability: {
                        0:true,
                        1:true,
                        2:true,
                        3:true,
                        4:true,
                        5:true,
                        6:true,
                    }
                }])
            )

            const mergedData = {
                ...availabilityData,
                ...services,
                ...notAvailableDates
            }
            console.log(mergedData)


            // timeSlotsArray.forEach((subDocId) => {
            //     if (subDocId == "7:00:00 AM"){
            //         console.log("HMMMMM343")
            //         const docRef = doc(db, collection, hostUid)
            //         batch.set(docRef, {
            //             services: services
            //         })
            //         writes ++
            //     }
            //     const subDocRef = doc(db, `${collection}/${hostUid}/availability`,subDocId)
            //     batch.set(subDocRef, {available:true})
            //     writes ++
            // })
            
            const docRef = doc(db, collection, hostUid)
            await setDoc(docRef, {
                servicesAndAvailability: mergedData,
                hostInformation: hostInfo
            }).then( async () => {
                const userDocRef = doc(db, 'users', hostUid )
                await updateDoc(userDocRef, {
                    isHost: true    
                });
            })
            // Check if hostUid exists in localStorage
             let existingData = localStorage.getItem(hostUid);

             if (existingData) {
                // If hostUid exists, parse the existing data and merge with new data
                existingData = JSON.parse(existingData);
                localStorage.setItem(hostUid, JSON.stringify({
                    ...existingData,
                    isHost: true
                }));
                } 
                else {
                    // If hostUid doesn't exist, save new data
                    localStorage.setItem(hostUid, JSON.stringify({
                        isHost:true
                    }));
                }




        
            
            
            

        }
        catch(err){
            console.log(err.message)
            batchWriteError.value = "Could not create host please try again later"
        }

        
    }

    return {batchWrite, batchWriteError}
}

export default createHostAvailability