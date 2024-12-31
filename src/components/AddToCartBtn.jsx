import React, { useState } from "react";
import CustomBtn3 from "./CustomBtn3";
import toast from "react-hot-toast";
import { updateCart } from "@/utils/firebase/user/write";
import { useSelector } from "react-redux";
import { useUser } from "@/utils/firebase/user/read";

const AddToCartBtn = ({ productId ,quantity,size,color}) => {
  const user = useSelector((state) => state.user);
  // console.log('user:',user);
  const { data } = useUser({ uid: user?.uid });
  // console.log('data:',data);
  const [isLoading, setIsLoading] = useState(false);
// console.log('quantity:',quantity);
  const isAdded = data?.cart?.find(item=>item.id == productId);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        throw new Error("Please Login in");
      }
      if (isAdded) {
        let newList = data?.cart?.filter((item) => item.id != productId);
        await updateCart({ list: newList, uid: user?.uid });
        // console.log("Updated new List");
        toast.success("Removed From Cart");
      } else {
        await updateCart({
          list: [...(data?.cart ?? []), {id:productId,quantity:quantity,size:size,color:color}],
          uid: user?.uid,
        });
        console.log("Updated List");
        toast.success("Added to Cart");
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <CustomBtn3
        onClick={handleClick}
        isLoading={isLoading}
        className={`p-2  bg-pink-400 text-white rounded-md flex items-center justify-center border-2 border-pink-400  `}
      >
        {isAdded?"Remove from Cart":"Add to Cart"}
      </CustomBtn3>
    </>
  );
};

export default AddToCartBtn;
