"use client";
import CartProduct from "@/components/CartProduct";
import CustomBtn3 from "@/components/CustomBtn3";
import { useProduct } from "@/utils/firebase/products/read";
import { useUser } from "@/utils/firebase/user/read";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const { data } = useUser({ uid: user?.uid });
  return (
    <>
      <div className="px-5 py-5 md:px-10 lg:px-20">
        <h3 className="text-center text-2xl text-accent-color">Cart</h3>
        <div className="w-full mx-auto  p-2 my-2 md:w-7/12 flex justify-center items-center">
          <Link
            href={`/checkout?type=cart`}
            className="bg-black rounded-md px-2 py-1 text-white"
          >
            Checkout
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center my-2">
          {data?.cart?.length >= 1 ? (
            data?.cart?.map((item) => (
              <CartItem key={item.id} productInfo={item} />
            ))
          ) : (
            <div className="text-accent-color text-xl">No Items in Cart</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;

const CartItem = ({ productInfo }) => {
  // console.log('cartItem:',productInfo);
  const [item, setItem] = useState({});
  const {
    data: product,
    isLoading,
    error,
  } = useProduct({ productId: productInfo?.id });
  useEffect(() => {
    setItem({ ...product });
    console.log("product::", item);
  }, [product]);

  // console.log('CartItem:',product);
  item.selectedProductColor = product?.colors.filter(
    (item) => item.color == productInfo?.color
  );
  item.selectedSize = productInfo?.size;
  item.selectedQuantity = productInfo?.quantity;
  if (error) {
    return <div>{error?.message}</div>;
  }
  if (isLoading) {
    return <div>Loading Cart Info ...</div>;
  }
  return <CartProduct cartInfo={item} />;
};
