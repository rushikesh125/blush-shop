"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@/store/userSlice";
import { auth } from "@/utils/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const AdminNav = ({ toggleAdminNav }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const adminDetails = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        dispatch(setUser(adminData));
      } else {
        dispatch(clearUser());
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="w-full bg-white px-4 py-3 md:px-10 md:py-5 border-b flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button
        className="block md:hidden"
        onClick={toggleAdminNav}
        aria-label="Toggle Sidebar"
        aria-expanded="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span>Admin Panel</span>

      {/* User Info and Logout */}
      {adminDetails ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{adminDetails.displayName || "Admin"}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout 
          </button>
        </div>
      ) : (
        <span className="text-sm text-gray-500">Not logged in</span>
      )}
    </nav>
  );
};

export default AdminNav;
