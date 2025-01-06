"use client";
import { db } from "../firebase"; // Adjust this path based on your project structure
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  startAfter,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useUser({ uid }) {
  // Subscribe to Firestore collection using SWRSubscription
  const { data, error } = useSWRSubscription(
    ["users", uid], // Key to identify this subscription
    ([path, uid], { next }) => {
      // Define Firestore collection reference
      const ref = doc(db, `users/${uid}`);
      // Setup Firestore listener
      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.exists() ? snapshot.data() : null),
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
