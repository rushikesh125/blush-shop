import { collection, doc, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import useSWRSubscription from "swr/subscription";

export function useReviews({ productId }) {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    [`products/${productId}/reviews`], // Key to identify this subscription
    ([path], { next }) => {
      // Define Firestore collection reference
      const ref = query(
        collection(db, path),
        orderBy("createdAt", "desc"),
        limit(2)
      );
      // Setup Firestore listener
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          next(null, snapshot.docs.length ===0 ? null : snapshot.docs.map(snap=>snap.data()) );
        },
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  };
}
