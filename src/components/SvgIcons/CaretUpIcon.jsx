"use client"
import { scrollToTop } from "@/utils/utils";
import React from "react";

const CaretUpIcon = ({ className, onClick }) => {
  return (
    <>
      <svg
      onClick={scrollToTop}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={`bi bi-caret-up w-10 h-10 p-2 bg-slate-200 rounded-full hover:bg-accent-color cursor-pointer fixed right-5 bottom-5 z-20`}
        viewBox="0 0 16 16"
      >
        <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
      </svg>
    </>
  );
};

export default CaretUpIcon;
