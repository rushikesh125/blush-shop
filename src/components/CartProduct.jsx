import React, { useState } from "react";
import TrashIcon from "./SvgIcons/TrashIcon";
import CustomBtn3 from "./CustomBtn3";
import { useSelector } from "react-redux";
import { useUser } from "@/utils/firebase/user/read";
import toast from "react-hot-toast";
import { updateCart } from "@/utils/firebase/user/write";
import Link from "next/link";

const CartProduct = ({ cartInfo }) => {
  const user = useSelector((state) => state.user);
  const { data } = useUser({ uid: user?.uid });
  const [isRemoving, setIsRemoving] = useState(false);
  // console.log("cartInfo::", cartInfo);
  const {
    id,
    price,
    productname,
    category,
    description,
    selectedQuantity,
    selectedProductColor,
    selectedSize,
  } = cartInfo;

  const handleRemove = async () => {
    setIsRemoving(true);
    if(confirm("Are you sure ?")) {
      try {
        const newList = data?.cart?.filter((d) => d.id != id);
        await updateCart({list:newList,uid:user?.uid});
        toast.success("Product Removed from Cart");
      } catch (error) {
        toast.error(error?.message);
      }
    }
    setIsRemoving(false);
  };

  return (
    <>
      <div className="w-full md:w-9/12 lg:w-7/12 border-b py-2">
        <div className="md:p-5 flex flex-row-reverse items-center">
          <div className="w-1/3">
            {selectedProductColor[0]?.url && (
              <img
                src={`${selectedProductColor[0]?.url}`}
                alt="Product-img"
                className=""
              />
            )}
          </div>
          <div className="w-2/3 p-1 flex flex-col md:gap-1">
            <h2 className="font-semibold md:text-xl">{productname}</h2>
            <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
            <p className="text-xs">
              Selected Size :
              <span className="px-2 bg-black text-white rounded-md">
                {selectedSize}
              </span>
            </p>
            <p className="text-xs">
              Quantity :
              <span className="px-2 bg-accent-color text-white rounded-md">
                {selectedQuantity}
              </span>
            </p>
            <p className="text-xs">
              Selected Color : &nbsp;
              <span className="px-2 bg-black text-white rounded-md">
                {selectedProductColor[0]?.color}
              </span>
            </p>
            <div className="font-semibold">&#8377;{price}</div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <CustomBtn3 isLoading={isRemoving} onClick={handleRemove} className="text-xs inline-flex font-semibold text-red-500 bg-red-100 rounded-md cursor-pointer items-center justify-center px-2 py-1">
            <TrashIcon />
            Remove
          </CustomBtn3>
          <Link href={`/checkout?type=buynow&productId=${id}`} className="text-xs inline-flex text-white bg-black rounded-md cursor-pointer items-center justify-center px-2 py-1">
            Place Order
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
