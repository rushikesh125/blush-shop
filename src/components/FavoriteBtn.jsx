import React, { useState } from "react";
import CustomBtn3 from "./CustomBtn3";
import HeartIcon from "./SvgIcons/HeartIcon";
import toast from "react-hot-toast";
import { updatefavorite } from "@/utils/firebase/user/write";
import { useSelector } from "react-redux";
import { useUser } from "@/utils/firebase/user/read";

const FavoriteBtn = ({ productId }) => {
  const user = useSelector((state) => state.user);
  // console.log('user:',user);
  const { data } = useUser({ uid: user?.uid });
  console.log('data:',data);
  const [isLoading,setIsLoading] = useState(false)
  const handleClick = async () => {
    setIsLoading(true)
    
    try {
      if(!user?.uid){
        throw new Error("Please Login in"); 
      }
      if (data?.favorites?.includes(productId)) {
        let newList = data?.favorites?.filter((item) => item != productId);
        await updatefavorite({ list: newList, uid: user?.uid });
        console.log('Updated new List');
        toast.success('removed from favorites')
      } else {
        await updatefavorite({
          list: [...(data?.favorites ?? []), productId],
          uid: user?.uid,
        });
        console.log('Updated List');
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false)
  };
  const isLiked = data?.favorites?.includes(productId);
  return (
    <>
      <CustomBtn3
      onClick={handleClick}
        isLoading={isLoading}
        className={`p-2 ${isLiked?"text-white bg-pink-400":"text-pink-400"} flex items-center justify-center border-2 border-pink-400 rounded-full hover:bg-pink-400 hover:text-white`}
      >
        <HeartIcon className={` `} />
      </CustomBtn3>
    </>
  );
};

export default FavoriteBtn;
