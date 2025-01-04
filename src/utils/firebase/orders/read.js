"use client";
import { db } from "../firebase"; // Adjust this path based on your project structure
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useOrders({ uid="sdksdk" }) {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["orders", uid], // Key to identify this subscription
    ([path, uid], { next }) => {
      // Define Firestore collection reference
      const ref = query(collection(db, "orders"), where("uid", "==", uid),orderBy('createdAt','desc'));
      // Setup Firestore listener
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((item) => item.data())
          ),
        (err) => next(err, null)
      );

      return () => unsub();
    }
  );

  console.log(error?.message)
  return {
    data: data,
    error: error?.message,
    isLoading: data === undefined,
  };
}
