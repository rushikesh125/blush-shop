"use client";
import Loading from "@/app/loading";
import { deleteReview } from "@/utils/firebase/review/delete";
import { useReviews } from "@/utils/firebase/review/read";
import { Avatar, Rating } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomBtn3 from "./CustomBtn3";
import TrashIcon from "./SvgIcons/TrashIcon";
import toast from "react-hot-toast";

const ShowReviews = ({ productId }) => {
  const { data, isLoading, error } = useReviews({ productId: productId });
  const user = useSelector((state) => state.user);
  const [isLoad, setIsLoad] = useState(false);
  if (isLoading) {
    return (
      <div className="w-full h-44">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  //   console.log("reviews:", data);
  const handleDeleteReview = async () => {
    setIsLoad(true);
    try {
      if (confirm("Delete Review ?")) {
        if (!user) {
          throw new Error("Please Login First");
        }

        await deleteReview({ uid: user?.uid, productId: productId });
        toast.success("Review Deleted");
      }
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoad(false);
  };
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <h3 className="text-lg font-semibold">Reviews</h3>
        {!data && <div> no review yet</div>}
        {data &&
          data.map((item) => (
            <div key={item?.uid} className="relative flex my-2 gap-1 md:gap-3">
              {user?.uid == item?.uid && (
                <CustomBtn3
                  className={`absolute top-0 right-0 bg-red-100 text-red-500 p-1 rounded-full`}
                  onClick={handleDeleteReview}
                  isLoading={isLoad}
                >
                  <TrashIcon />
                </CustomBtn3>
              )}
              <div>
                <Avatar url={item?.photoURL} />
              </div>
              <div className="flex-1">
                <div className="text-xs">
                  <h4>{item?.displayName}</h4>
                  <Rating value={item?.rating} readOnly size="small" />
                </div>
                <div className="text-xs text-slate-700">
                  <p>{item?.review}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ShowReviews;
