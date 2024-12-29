import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updatefavorite = async ({ uid, list }) => {
  await setDoc(doc(db, `users/${uid}`), { favorites: list }, { merge: true });
};
