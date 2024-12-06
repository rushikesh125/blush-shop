"use client";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import ImageSlideShow from "@/components/ImageSlideshow"
const ProductInfoCard = ({ id, title, price, image, description, color }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const increaseProductQuantity = ()=>{
    setProductQuantity(productQuantity+1);
  }
  const decreaseProductQuantity = ()=>{
    if (productQuantity<=1){
        return
    }else{
        setProductQuantity(productQuantity-1)
    }
  }
  return (
    <div className="p-4 mt-4 border-t border-b border-black/[0.10]  mx-2 md:mx-10 sm:flex bg-white">
      <div className="w-full sm:w-1/2 p-2 flex justify-center ">
        {/* <img src={`${image}`} alt="product-image" className="w-80 " /> */}
        <ImageSlideShow/>
      </div>

      <div className="w-full sm:w-1/2   p-4 sm:flex flex-col justify-center">
        <h3 className="font-semibold text-3xl my-2">{title}</h3>
        <p className="text-gray-700 my-2">{description}</p>

        <p className="text-2xl my-2">${price}</p>
        <div>
          Color:
          {color &&
            color.map((item) => (
              <span className="mx-1 uppercase" key={item}>
                {item}
              </span>
            ))}
        </div>
        <div>
          <span className="bg-yellow-200 px-2 py-0 text-gray-700 font-semibold inline-block rounded-sm">
            in Stock
          </span>
        </div>
        <div className="my-2">
          <button
            className=" text-center p-2 border w-20 border-black/[10]"
            onClick={decreaseProductQuantity}
          >
            -
          </button>
          <input
            type="number"
            name="productQuantity"
            readOnly
            value={productQuantity}
            className="outline-none p-2 border w-20 text-center  border-black/[10]"
          />
          <button
            className="p-2 border w-20 text-center  border-black/[10]"
            onClick={increaseProductQuantity}
          >
            +
          </button>
        </div>
        <div>
          <AddToCartBtn itemId={id} /> &nbsp;
          <button className="text-sm rounded-md px-6 py-3 bg-black text-white">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
