import {ref} from 'vue'
import { db,  doc, setDoc  } from '@/firebase/init'
// getDocs,
// DEPRECATED //

const useCollection = (collection) =>{
    const error = ref(null)

    const addHost = async (data, uid, availabilityData, timeDoc) =>{
        error.value = null

        try{
            //In futures use query to see if we actually need to write to that doc
            //cuz query allows us to see documents but doesn't count as a read unless we 
            //actually have that document
            const docRef =  doc(db, collection, uid )
            await setDoc(docRef, data, {merge:true})

            // if (availabilityData && timeDoc){
                const subDocRef = doc(db, `serviceHosts/${uid}/availability`, timeDoc )
                await setDoc(subDocRef, availabilityData)
            // }

            
            
        }
        catch(err) {
            console.log(err.message)
            error.value = "Unable to fetch hosts please try again later"
        }


    }   

    return {addHost, error}

    
}

// console.log(useCollection.test1)

// const {test1, error} = useCollection()

export default useCollection 