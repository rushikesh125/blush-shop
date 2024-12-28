import { getCategories } from "@/utils/firebase/categories/read_server";
import Link from "next/link";
import React from "react";

const CategoryArea = async () => {
  const categoris = await getCategories();
  // console.log("categories:", categoris);
  return (
    <>
      <div className="Category-options  overflow-x-auto mx-auto gap-x-8 w-9/12  flex justify-between  mt-5 py-5 scrollbar-hide ">
        <Link href={`/`} className="hover:text-accent-color whitespace-nowrap ">
          All Products
        </Link>
        {categoris &&
          categoris?.map((item, index) => (
            <Link
              href={`/category/${item.id}`}
              className="hover:text-accent-color uppercase text-sm whitespace-nowrap"
              key={index}
            >
              {item?.categoryName}
            </Link>
          ))}

        {/* <Link href={`/`} className="hover:text-accent-color whitespace-nowrap">
          Top
        </Link>
        <Link href={`/`} className="hover:text-accent-color whitespace-nowrap">
          Pant
        </Link>
        <Link href={`/`} className="hover:text-accent-color whitespace-nowrap">
          Dress
        </Link>
        <Link href={`/`} className="hover:text-accent-color whitespace-nowrap">
          Coord set
        </Link>
        <Link href={`/`} className="hover:text-accent-color whitespace-nowrap">
          Bundles
        </Link>
        <Link href={`/`} className="hover:text-accent-color whitespace-nowrap">
          Under ₹499
        </Link> */}
      </div>
    </>
  );
};

export default CategoryArea;
