"use client";

import { Rating } from "@mui/material";
import React, { useState } from "react";
import CustomBtn3 from "./CustomBtn3";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUser } from "@/utils/firebase/user/read";
import { addReview } from "@/utils/firebase/review/write";

const AddReview = ({productId}) => {
  const user = useSelector(state=>state.user);
  const [isLoading,setIsLoading] = useState(false);
  const {data:userData} = useUser({uid:user?.uid})
  const [rating,setRating] = useState(4);
  const [reviewMsg,setReviewMsg] = useState("");
  const handleSubmit = async()=>{
    setIsLoading(true)
    try {
      if(!user){
        throw new Error("Please Login First")
      }
      if(!rating || !reviewMsg){
        throw new Error("Please enter review")
      }
      await addReview({uid:user?.uid,productId:productId,displayName:user?.displayName,photoURL:userData?.photoURL,rating:rating,review:reviewMsg})
      toast.success("Review added")
      setRating(4)
      setReviewMsg("")
    } catch (error) {
      toast.error(error?.message)
    }
    setIsLoading(false)
  }
  return (
    <>
      <div className="border rounded-lg p-2 w-full md:w-1/2 lg:w-1/3">
        <h3  className="text-lg font-semibold">Rate this Product</h3>
        <Rating value={rating} onChange={(e,newValue)=>setRating(newValue)}/>
        <textarea
          type="text"
          value={reviewMsg}
          onChange={e=>setReviewMsg(e.target.value)}
          className="w-full rounded-lg px-2 py-1 outline-none border"
          placeholder="Enter Your Review"
          maxLength={200}
        />
        <CustomBtn3 isLoading={isLoading} onClick={handleSubmit} className={`rounded-md px-2 py-1 bg-black text-white `}>Submit</CustomBtn3>
      </div>
    </>
  );
};

export default AddReview;
