// "use client";
// import Checkout from "@/components/Checkout";
// import { useProductsByIds } from "@/utils/firebase/products/read";
// import { useUser } from "@/utils/firebase/user/read";
// import { useSearchParams } from "next/navigation";
// import React from "react";
// import { useSelector } from "react-redux";

// const CheckoutPage = () => {
//   const user = useSelector((state) => state.user);
//   const { data: userData } = useUser({ uid: user?.uid });

//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");
//   const productId = searchParams.get("productId");
//   const quantity = searchParams.get("quantity") || 1;
//   const size = searchParams.get("size");
//   const color = searchParams.get("color");

//   const productIdList =
//     type === "buynow" ? [productId] : userData?.cart?.map((item) => item?.id);

//   const { data: products, error, isLoading } = useProductsByIds({ idsList: productIdList });

//   if (!productIdList || productIdList.length === 0) {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center">
//         Product Not Found
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="text-2xl h-screen w-screen flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-2xl h-screen w-screen flex justify-center items-center">
//         {error.message || "An error occurred"}
//       </div>
//     );
//   }

//   const productList =
//     type === "buynow"
//       ? [
//           {
//             id: productId,
//             quantity,
//             size,
//             color: products[0]?.colors?.filter((item) => item.color === color),
//             product: products[0],
//           },
//         ]
//       : userData?.cart?.map((item) => {
//           const product = products.find((pro) => pro.id === item.id);
//           return {
//             ...item,
//             color: product?.colors?.filter((col) => col.color === item.color),
//             product,
//           };
//         });

//   console.log("Products:", products);
//   console.log("Product List:", productList);

//   return (
//     <div className="w-full md:w-11/12 mx-auto px-2 md:px-5 py-10 border my-5">
//       <h1 className="text-center text-xl text-accent-color">Checkout</h1>
//       <Checkout productList={productList} />
//     </div>
//   );
// };

// export default CheckoutPage;


"use client";
import Checkout from "@/components/Checkout";
import { useProductsByIds } from "@/utils/firebase/products/read";
import { useUser } from "@/utils/firebase/user/read";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";

const CheckoutPageContent = () => {
  const user = useSelector((state) => state.user);
  const { data: userData } = useUser({ uid: user?.uid });

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity") || 1;
  const size = searchParams.get("size");
  const color = searchParams.get("color");

  const productIdList =
    type === "buynow" ? [productId] : userData?.cart?.map((item) => item?.id);

  const { data: products, error, isLoading } = useProductsByIds({ idsList: productIdList });

  if (!productIdList || productIdList.length === 0) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Product Not Found
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-2xl h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-2xl h-screen w-screen flex justify-center items-center">
        {error.message || "An error occurred"}
      </div>
    );
  }

  const productList =
    type === "buynow"
      ? [
          {
            id: productId,
            quantity,
            size,
            color: products[0]?.colors?.filter((item) => item.color === color),
            product: products[0],
          },
        ]
      : userData?.cart?.map((item) => {
          const product = products.find((pro) => pro.id === item.id);
          return {
            ...item,
            color: product?.colors?.filter((col) => col.color === item.color),
            product,
          };
        });

  return (
    <div className="w-full md:w-11/12 mx-auto px-2 md:px-5 py-10 border my-5">
      <h1 className="text-center text-xl text-accent-color">Checkout</h1>
      <Checkout productList={productList} />
    </div>
  );
};

const CheckoutPage = () => (
  <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
    <CheckoutPageContent />
  </Suspense>
);

export default CheckoutPage;
