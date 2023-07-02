import {ref} from 'vue'

import { projectAuth, onAuthStateChanged } from '@/firebase/init'

const user = ref()

onAuthStateChanged(projectAuth, (__user) => {
    user.value = __user
    console.log(user.value)
})

const getUser = () =>{
    return {user}
}

export default getUser