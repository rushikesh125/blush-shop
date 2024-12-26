
import Link from "next/link";
import React from "react";

const ProductCard = ({colors,id,price,productname}) => {
  
  return (
    <Link href={`/product/${id}`} className=" w-1/2 md:w-1/5">
      <div className="overflow-hidden">
        <img
          src={`${colors[0].url}`}
          alt="card-img"
          className="w-full hover:scale-125 object-cover transition"
        />
      </div>
      <div className="text-center py-2">
        <h5 className="font-semibold text-gray-600">
          {productname}
        </h5>
        <p>&#8377; {price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
