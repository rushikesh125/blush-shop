import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateRandomId } from "@/utils/utils";

export const createAdmin = async (data) => {
  if (!data.adminName) {
    throw new Error("Admin Name is required");
  }
  if (!data.adminEmail) {
    throw new Error("Admin Email is required");
  }
 const randID = generateRandomId()
  try {
    await setDoc(doc(db, "admins", randID), {
      id:randID,
      adminName: data.adminName,
      adminEmail: data.adminEmail,
    });
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};
