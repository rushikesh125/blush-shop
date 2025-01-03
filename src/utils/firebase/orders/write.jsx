import { generateRandomId } from "@/utils/utils"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// metaData --> PaymentMode , ProductsPrice , IsPaid , ProductStatus
export const createOrder =async({uid,productList,address,metaData})=>{
    const OrderId = generateRandomId();
    const ref = doc(db,"orders",OrderId);
    await setDoc(ref,{
        uid,
        productList,
        address,
        metaData
    })
}