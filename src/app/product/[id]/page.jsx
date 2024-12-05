import React from "react";
import { fetchProductInfo } from "@/utils/utils";
import AddToCartBtn from "@/components/AddToCartBtn";

const ProductPage = async ({ params }) => {
  const productId = await params.id;
  const productInfo = await fetchProductInfo(productId);
  console.log(productInfo);
  if (!productInfo.success) {
    return <div>Error Fetching Data</div>;
  }
  const { id, title, rating, price, image, description } = productInfo.data;
  return (
    <div className="p-4 mt-4 rounded-xl shadow-md mx-2 sm:flex bg-white">
      <div className="w-full sm:w-1/2 p-2 flex justify-center">
        <img src={`${image}`} alt="product-image" className="w-80 " />
      </div>
      <div className="w-full sm:w-1/2   p-4 sm:flex flex-col justify-center">
        <h3 className="font-semibold text-3xl my-2">{title}</h3>
        <p className="text-gray-700 my-2">{description}</p>
        <div className="flex items-center mt-2 mb-5 text-center my-2">
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.floor(rating.rate) }).map((_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            {rating.rate < 5 && (
              <svg
                className="w-4 h-4 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            )}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
            {rating.rate}
          </span>
        </div>
        <p className="text-2xl my-2">${price}</p>
        <div>
          <AddToCartBtn itemId={id} /> &nbsp;
          <button className="px-4 my-2 py-1 border border-black hover:bg-black hover:text-white">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
