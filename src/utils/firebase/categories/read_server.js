import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getCategories = async () => {
  try {
    const list = await getDocs(collection(db, "categories"));
    return list.docs.map((snap) => snap.data());
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategoryById = async ({ id }) => {
  try {
    const docs = await getDoc(doc(db, "categories", id));
    if (docs.exists()) {
      return docs.data();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};
