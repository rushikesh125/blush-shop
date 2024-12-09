"use Client";
import React from "react";

const SignInWithGoogleBtn = ({ isLoading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg flex justify-center items-center  border-black border w-full
        ${
          isLoading
            ? " cursor-not-allowed"
            : ""
        }`}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
        
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
          </svg>
          &nbsp;Sign In with Google
        
        </>
        
      )}
    </button>
  );
};

export default SignInWithGoogleBtn;
