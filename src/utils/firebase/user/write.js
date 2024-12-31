import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updatefavorite = async ({ uid, list }) => {
  await setDoc(doc(db, `users/${uid}`), { favorites: list }, { merge: true });
};
export const updateCart = async ({ uid, list }) => {
  // console.log("LIST:",list);
  
  await setDoc(doc(db, `users/${uid}`), { cart: list }, { merge: true });
};
