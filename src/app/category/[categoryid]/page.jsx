import CategoryArea from "@/components/CategoryArea";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/utils/firebase/products/read_server";
import React from "react";

const CategoryProduct = async ({ params }) => {
  const { categoryid } = await params;
  const catProducts = await getProductsByCategory({ id: categoryid });
  console.log("res:", catProducts);
  return (
    <>
    
    {/* <div className="px-5 py-5 md:px-10 lg:px-20 md:pb-10"> */}
        <div className="my-10 md:my-20">
          <h1 className="text-center text-2xl">Products</h1>
          <div className="flex flex-wrap justify-evenly py-5  gap-y-2 md:gap-x-2 md:gap-y-6">
            {catProducts.length >=1?catProducts?.map((item) => (
              <ProductCard key={item.id} {...item} />
            )):<div className="text-red-400">Products not found</div>}
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default CategoryProduct;
