import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return null;
  }
};

export const getProduct = async (productId) => {
  try {
    // Create a reference to the product document
    const productRef = doc(db, "products", productId);

    // Fetch the document
    const productSnap = await getDoc(productRef);

    // Check if the document exists
    if (productSnap.exists()) {
      return productSnap.data(); // Return the product data along with its ID
    } else {
      console.log("No such document!");
      return null; // Return null if the document does not exist
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw new Error("Failed to fetch product");
  }
};

// export const getNewArrivalProducts = async () => {
//   const q = query(
//     collection(db, "products"),
//     where("category", "array-contains", "new Arrival")
//   );
//   const res = await getDocs(q);
//   console.log(res.data);

//   res.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// };

export const getProductsByCategoryName = async ({catName}) => {
  try {
    // Define the Firestore query to fetch products with "new Arrival" in the category array
    const q = query(
      collection(db, "products"),
      where("category", "array-contains",catName)
    );

    // Fetch the documents matching the query
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs);
    return querySnapshot.docs.map((item) => item.data());
    // return products; // Return the array of products
  } catch (error) {
    toast.error(error?.message);
    return null;
  }
};
export const getProductsByCategoriesName = async ({catArray}) => {
  // console.log(catArray);
  
  try {
    // Define the Firestore query to fetch products with "new Arrival" in the category array
    const q = query(
      collection(db, "products"),
      where("category", "array-contains-any",catArray),
      limit(10)
    );

    // Fetch the documents matching the query
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs);
    return querySnapshot.docs.map((item) => item.data());
    // return products; // Return the array of products
  } catch (error) {
    toast.error(error?.message);
    return null;
  }
};

export const getProductsByCategory = async ({ id }) => {
  try {
    const cateRes = await getDoc(doc(db, "categories", id));
    // 
    const catName =  cateRes.exists()?cateRes.data():null;
    // console.log(catName);
    
    if(catName){
      const q = query(
        collection(db, "products"),
        where("category", "array-contains", catName.categoryName)
      );
  
      // Fetch the documents matching the query
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs);
      return querySnapshot.docs.map((item) => item.data());
    }
  } catch (error) {
    throw new Error(error);
    // toast.error(error?.message);
  }
};
