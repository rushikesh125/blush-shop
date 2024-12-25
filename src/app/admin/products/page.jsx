import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between bg-white p-2">
          <div>Products</div>
          <Link
            href={"/admin/products/form"}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Create +
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
