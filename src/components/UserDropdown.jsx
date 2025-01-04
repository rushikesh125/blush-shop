import { auth } from "@/utils/firebase/firebase";
import { signOut } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import UserIcon from "./SvgIcons/UserIcon";
import Link from "next/link";

const UserDropdown = ({ username, userEamil, userPhotoURL }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("right-0"); // Default position
  const [imgSrc, setImgSrc] = useState(userPhotoURL);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        setDropdownPosition("left-0");
      } else {
        setDropdownPosition("right-0");
      }
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative mx-2">
      {imgSrc ? (
        <img
          id="avatarButton"
          type="button"
          onClick={toggleDropdown}
          className="w-8 h-8 rounded-full cursor-pointer"
          src={imgSrc}
          alt="profile-img"
          onError={() => setImgSrc("../images/user-profile.jpg")}
        />
      ) : (
        <UserIcon
          className={`w-6 h-6 rounded-full cursor-pointer`}
          type="button"
          onClick={toggleDropdown}
        />
      )}
      {isDropdownOpen && (
        <div
          id="userDropdown"
          ref={dropdownRef}
          className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${dropdownPosition}`}
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>{username}</div>
            <div className="font-medium truncate">{userEamil}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                My account
              </a>
            </li>
            <li>
              <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                My Orders
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                favorites
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <div
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    toast.success("Logged out");
                  })
                  .catch((error) => {
                    toast.error(error.message);
                  });
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
