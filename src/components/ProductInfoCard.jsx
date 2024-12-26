"use client";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import ImageSlideshow from "@/components/ImageSlideshow";

const ProductInfoCard = ({ id, productname, price, colors, description, sizes }) => {
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
    <div className="p-4 mt-4 border-t border-b border-black/[0.10] mx-2 md:mx-10 sm:flex bg-white">
      {/* Image Slideshow */}
      <div className="w-full sm:w-1/2 p-2 flex justify-center">
        <ImageSlideshow images={colors} selectedColor={selectedColor} />
      </div>

      {/* Product Details */}
      <div className="w-full sm:w-1/2 p-4 sm:flex flex-col justify-center">
        <h3 className="font-semibold text-3xl my-2">{productname}</h3>
        <p className="text-gray-700 my-2">{description}</p>
        <p className="text-2xl my-2">&#8377;{price}</p>

        {/* Color Selection */}
        <div className="my-2">
          <span className="font-medium">Color:</span>
          <div className="flex gap-2 mt-2">
            {colors.map((colorObj,index) => (
              (colorObj.color !== "f")?<button
              key={index}
              className={`px-2 py-1 rounded-md text-xs  border ${
                selectedColor === colorObj.color
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-black border-gray-300"
              }`}
              onClick={() => setSelectedColor(colorObj.color)}
            >
              {colorObj.color }
            </button>:""
            ))}
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
        <div className="flex gap-2">
          <AddToCartBtn itemId={id} />
          <button className="text-sm rounded-md px-6 py-3 bg-black text-white">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
