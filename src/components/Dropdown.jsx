// components/Dropdown.js
"use client";

import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/utils/firebase/firebase";
import toast from "react-hot-toast";
const Dropdown = ({ username,photoURL }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <button
        id="dropdownDividerButton"
        onClick={toggleDropdown}
        className="text-black bg-gray-200  font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center shadow-sm"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        &nbsp;
        {username && username.split(" ")[0]}
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownDivider"
          className="absolute z-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2"
        >
          <ul
            className="py-2 text-sm text-black"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2 flex justify-center items-center cursor-pointer" onClick={()=>{
            signOut(auth).then(() => {
              toast.success("Logged out")
            }).catch((error) => {
              toast.error(error.message)
            });
          }}>
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
