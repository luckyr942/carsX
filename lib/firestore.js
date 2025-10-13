// helps for the CRUD function in the app 
import { ref } from 'firebase/storage';
import { auth, storage } from './firebase';

export async function uploadPosts(image, caption){
    try {
        const user = auth.currentUser;
        if(!user) throw new Error("User not logged in!");

        //Upload image to the firebase storage;
        const imageRef = ref(storage, '')

    } catch (error) {
        
    }
}