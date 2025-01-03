"use client";
import React from "react";
import Drawer from "./Drawer";
import Link from "next/link";
import { setUser, clearUser } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/utils/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import UserDropdown from "./UserDropdown";
import { redirectURL, RedirectURL } from "@/utils/constants";
import CartIcon from "./SvgIcons/CartIcon";
import { useUser } from "@/utils/firebase/user/read";
const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  // console.log("USER DETAILS", userDetails);
  const {data:userData} = useUser({uid:userDetails?.uid})
  // console.log('userDAta:',userData);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        // console.log(userData);
        
        dispatch(setUser(userData));
        // const baseUrl = window.location.origin; // Current domain
        // const referrer = document.referrer; // Previous page URL
    
        // if (referrer && referrer.startsWith(baseUrl)) {
        //   // If the previous page is within the same domain, redirect back
        //   router.back();
        // } 
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <nav className="sticky z-50 top-0 bg-opacity-55 backdrop-blur-xl border border-b border-gray-800/[0.10] text-black bg-white  sm:px-4 py-3 flex gap-x-2 items-center justify-between">
      <div className="flex  ms-4 sm:ms-6  items-center ">
        <Link href={`/`} className=" mx-1 md:mx-2 ms-4">
          Blush Shop LOGO
        </Link>
      </div>
      <div className="flex mx-2 md:mx-2 px-2">
        <button className="mx-2 hover:text-accent-color">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="mx-2 hover:text-accent-color hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="size-5 hover:text-accent-color bi bi-instagram"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
          </svg>
        </button>
        <Link href={`/cart`} className="relative mx-2 hover:text-accent-color  ">
            <CartIcon/>
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent-color  rounded-full -top-2 -end-2 ">{userData?.cart?.length ?? 0}</div>
        </Link>

        {userDetails ? (
          <>
            {/* <Dropdown username={userDetails.displayName}/> */}
            <UserDropdown username={userDetails?.displayName} userEamil={userDetails?.email} userPhotoURL={userDetails?.photoURL}/>
          </>
        ) : (
          <>
            <Link
              href={`/login`}
              className="  rounded-full text-black px-3 py-1  mx-1 md:mx-2 hover:text-accent-color"
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 inline-block font-extralight"
              >
                <path
                  fillRule="evenodd"
                  d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
