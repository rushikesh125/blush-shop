import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../firebase"

export const addReview = async ({uid,productId,displayName,photoURL,rating,review})=>{
    const ref=doc(db,`products/${productId}/reviews/${uid}`);
    await setDoc(ref,{
        rating:rating ?? "",
        review:review ?? "",
        productId:productId ?? "",
        uid:uid ?? "",
        displayName:displayName ?? "",
        photoURL:photoURL ?? "",
        createdAt:Timestamp.now()
    })
}