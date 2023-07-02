/* eslint-disable */
import {ref} from 'vue'
import {getDownloadURL, projectStorage, ref as storageRef} from '@/firebase/init'
import {uploadBytes,} from '@/firebase/init'
import { doc, db } from "@/firebase/init"; 


const loading = ref(false)
const error = ref(null)

const addImages = (filepath) =>{

    
    error.value= null
    const imagesUrlObj = ref({})
    

    const imageWrite = async (hostUid, imageObj,) =>{
        loading.value = true
        const hostRef = doc(db, 'serviceHosts', hostUid)

        const imagesUrlData = []
        //Add Images
        try{
            // throw new Error ('An error has occured please try again later')
            for (const image in imageObj.value){
                const imageFilePath = ref(`${filepath}/${image}`)
                const imageRef = storageRef(projectStorage, imageFilePath.value)
                const imageRes = await uploadBytes(imageRef, imageObj.value[image])
                const publicImageUrl = await getDownloadURL(imageRef)
                imagesUrlData.push(publicImageUrl)

                // console.log(filepath)

                // if (filepath.includes('barberImages')){
                //     imagesUrlData.push[image] = publicImageUrl
                // }
                // else if (filepath.includes('hairStyleImages')){
                //     imagesUrlData.hairStyleImages[image] = publicImageUrl
                // }
                // else if (filepath.includes('nailStyleImages')){
                //     imagesUrlData.nailStyleImages[image] = publicImageUrl
                // }

                // imagesUrlData.barberImages.image = publicImageUrl

            }
            loading.value = false
        }
        catch(err){
            error.value = err
            console.log(err)
            loading.value=false
        }
        return imagesUrlData
    }

    return {imageWrite, loading, error}
}

export default addImages