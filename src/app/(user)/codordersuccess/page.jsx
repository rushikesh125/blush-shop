"use client"
import confetti from "canvas-confetti";
import Link from "next/link";
import React, { useEffect } from "react";

const CodOrderSuccess = () => {
  useEffect(()=>{
    confetti();
  },[])
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-3">
        <div>
          <img src="/svg/order-placed-successfully.svg" alt="order-placed-img" className="w-52"/>
        </div>
        <div className="font-semibold text-2xl">
          Order Placed{" "}
          <span className="text-accent-color-dark font-bold">Successfully</span>
        </div>
        <div>
          <Link href={`/`} className="rounded-md px-2 py-1 bg-slate-100 hover:bg-slate-200 ">View Orders</Link>
        </div>
      </div>
    </>
  );
};

export default CodOrderSuccess;
