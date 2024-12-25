import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateRandomId } from "@/utils/utils";

export const updateAdmin = async (data) => {
  if (!data.adminName) {
    throw new Error("Admin Name is required");
  }
  if (!data.adminEmail) {
    throw new Error("Admin Email is required");
  }
  if(!data.id){
    throw new Error("ID is Required")
  }
 const randID = data.id
  try {
    await updateDoc(doc(db, "admins", randID), {
      id:randID,
      adminName: data.adminName,
      adminEmail: data.adminEmail,
    });
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};