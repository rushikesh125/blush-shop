"use client";
import { useUser } from "@/utils/firebase/user/read";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";

const CheckoutLayout = ({ children }) => {
  const user = useSelector((state) => state.user);
  const { data, error, isLoading } = useUser({ uid: user?.uid });

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  if (isLoading) {
    return (
      <div className="text-2xl h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  if (type == "cart" && (!data?.cart || data?.cart?.length === 0)) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }
  if (type == "buynow" && (!productId || !color || !size || !quantity)) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Product Not Found!.
      </div>
    );
  }
  if (type != "buynow" && type != "cart") {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Product Not Found!.
      </div>
    );
  }
  return (
    <>
      <main>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </>
  );
};

export default CheckoutLayout;
