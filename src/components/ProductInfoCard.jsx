"use client";
import React, { useEffect, useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import ImageSlideshow from "@/components/ImageSlideshow";
import CustomBtn2 from "./CustomBtn2";
import HeartIcon from "./SvgIcons/HeartIcon";
import FavoriteBtn from "./FavoriteBtn";
import Link from "next/link";
import AddReview from "./AddReview";
import ShowReviews from "./ShowReviews";
import { Rating } from "@mui/material";
import { getProductReviewCounts } from "@/utils/firebase/products/read_server";
import { useProductReviewCounts } from "@/utils/firebase/products/read";
import Loading from "@/app/loading";

const ProductInfoCard = ({
  id,
  productname,
  price,
  colors,
  description,
  sizes,
}) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.color);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };
  return (
    <>
      <div className="p-4 mt-4 border-t border-b border-black/[0.10]  mx-2 md:mx-10">
        <div className="  sm:flex bg-white">
          {/* Image Slideshow */}
          <div className="w-full sm:w-1/2 p-2 flex justify-center">
            <ImageSlideshow images={colors} selectedColor={selectedColor} />
          </div>

          {/* Product Details */}
          <div className="w-full sm:w-1/2 p-4 sm:flex flex-col justify-center">
            <h3 className="font-semibold text-3xl my-2">{productname}</h3>
            <p className="text-gray-700 my-2">{description}</p>
            <TotalReviews productId={id}/>
            <p className="text-2xl my-2">&#8377;{price}</p>

            {/* Color Selection */}
            <div className="my-2">
              <span className="font-medium">Color:</span>
              <div className="flex gap-2 mt-2">
                {colors.map((colorObj, index) =>
                  colorObj.color !== "f" ? (
                    <button
                      key={index}
                      className={`px-2 py-1 rounded-md text-xs  border ${
                        selectedColor === colorObj.color
                          ? "bg-black text-white border-black"
                          : "bg-gray-200 text-black border-gray-300"
                      }`}
                      onClick={() => setSelectedColor(colorObj.color)}
                    >
                      {colorObj.color}
                    </button>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div className="my-2">
              <span className="font-medium">Size:</span>
              <div className="flex gap-2 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-2 py-1 rounded-md text-xs border ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-gray-200 text-black border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <span className="bg-yellow-100 px-2 py-0 text-yellow-500 font-semibold inline-block rounded-md">
                in Stock
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="my-2 flex items-center">
              <button
                className="text-center p-2 border w-10 border-black/[0.10]"
                onClick={decreaseProductQuantity}
              >
                -
              </button>
              <input
                type="number"
                name="productQuantity"
                readOnly
                value={productQuantity}
                className="outline-none p-2 border w-12 text-center border-black/[0.10]"
              />
              <button
                className="p-2 border w-10 text-center border-black/[0.10]"
                onClick={increaseProductQuantity}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 items-center">
              <AddToCartBtn
                productId={id}
                quantity={productQuantity}
                size={selectedSize}
                color={selectedColor}
              />
              <Link
                href={`/checkout?type=buynow&productId=${id}&quantity=${productQuantity}&color=${selectedColor}&size=${selectedSize}`}
                className="text-sm rounded-md px-6 py-3 bg-black text-white"
              >
                Buy Now
              </Link>
              <FavoriteBtn productId={id} />
            </div>
          </div>
        </div>
        <div className="w-full my-5 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          <AddReview productId={id}/>
          <ShowReviews productId={id}/>
        </div>
      </div>
    </>
  );
};

export default ProductInfoCard;

const TotalReviews = ({ productId }) => {
  const { data: counts, error, isLoading } = useProductReviewCounts({ productId });
  const [rating, setRating] = useState(null);
  // Use useEffect outside of conditionals to ensure hooks are always called in the same order
  useEffect(() => {
    if (counts) {
      setRating(counts.averageRating);
    }
  }, [counts]); // Dependency array ensures the effect runs only when 'counts' changes

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }


  return (
    <>
      {counts && (
        <div className="w-full flex items-center gap-2">
          <Rating size="small" readOnly defaultValue={5} value={rating} />
          <h3 className="text-sm text-gray-500">{counts.totalReviews} Reviews</h3>
        </div>
      )}
    </>
  );
};
