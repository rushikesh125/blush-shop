
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  return (
    <Link href={`/product/1`} className=" w-1/2 md:w-1/5">
      <div className="overflow-hidden">
        <img
          src="https://museoutfitters.in/wp-content/uploads/2024/12/IMG_5405-1536x1536.png"
          alt="card-img"
          className="w-full hover:scale-125 object-cover transition"
        />
      </div>
      <div className="text-center py-2">
        <h5 className="font-semibold text-gray-600">
          Baggy Offshoulder Sweater
        </h5>
        <p>$ 1,499.00</p>
      </div>
    </Link>
  );
};

export default ProductCard;
